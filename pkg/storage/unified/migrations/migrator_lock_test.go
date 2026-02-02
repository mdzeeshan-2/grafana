package migrations

import (
	"context"
	"testing"
	"time"

	"github.com/grafana/grafana/apps/dashboard/pkg/apis/dashboard/v1beta1"
	folders "github.com/grafana/grafana/apps/folder/pkg/apis/folder/v1beta1"
	"github.com/grafana/grafana/pkg/infra/db"
	"github.com/grafana/grafana/pkg/infra/log"
	"github.com/grafana/grafana/pkg/storage/legacysql"
	"github.com/grafana/grafana/pkg/storage/unified/resourcepb"
	"github.com/grafana/grafana/pkg/util/testutil"
	"github.com/stretchr/testify/require"
	"k8s.io/apimachinery/pkg/runtime/schema"
)

type fakeStreamProvider struct {
	stream resourcepb.BulkStore_BulkProcessClient
	err    error
}

func (f fakeStreamProvider) createStream(_ context.Context, _ MigrateOptions, _ *MigrationRegistry) (resourcepb.BulkStore_BulkProcessClient, error) {
	return f.stream, f.err
}

type fakeBulkProcessClient struct {
	resourcepb.BulkStore_BulkProcessClient
}

func (f fakeBulkProcessClient) CloseAndRecv() (*resourcepb.BulkResponse, error) {
	return &resourcepb.BulkResponse{}, nil
}

type tableLockerMock struct {
	unlockFunc func() error
	tables     []string
}

func (m *tableLockerMock) LockMigrationTables(ctx context.Context, tables []string) (func() error, error) {
	m.tables = tables
	return m.unlockFunc, nil
}

func TestUnifiedMigrationLocksTables(t *testing.T) {
	folderGR := schema.GroupResource{Group: folders.GROUP, Resource: folders.RESOURCE}
	dashboardGR := schema.GroupResource{Group: v1beta1.GROUP, Resource: v1beta1.DASHBOARD_RESOURCE}
	resources := []schema.GroupResource{folderGR, dashboardGR}
	lockTables := []string{"folder", "dashboard"}

	unlockCalled := false
	tableLocker := &tableLockerMock{
		unlockFunc: func() error {
			unlockCalled = true
			return nil
		},
	}
	migrateFolders := func(_ context.Context, _ int64, _ MigrateOptions, _ resourcepb.BulkStore_BulkProcessClient) error {
		return nil
	}
	migrateDashboards := func(_ context.Context, _ int64, _ MigrateOptions, _ resourcepb.BulkStore_BulkProcessClient) error {
		return nil
	}

	registry := NewMigrationRegistry()
	registry.Register(MigrationDefinition{
		ID: "folders-dashboards",
		Resources: []ResourceInfo{
			{GroupResource: folderGR, LockTable: "folder"},
			{GroupResource: dashboardGR, LockTable: "dashboard"},
		},
		Migrators: map[schema.GroupResource]MigratorFunc{
			folderGR:    migrateFolders,
			dashboardGR: migrateDashboards,
		},
	})

	migrator := &unifiedMigration{
		tableLocker: tableLocker,
		streamProvider: fakeStreamProvider{
			stream: fakeBulkProcessClient{},
		},
		log:      log.New("test.migrations"),
		registry: registry,
	}

	_, err := migrator.Migrate(context.Background(), MigrateOptions{
		Namespace: "default",
		Resources: resources,
	})
	require.NoError(t, err)
	require.True(t, unlockCalled)
	require.Len(t, tableLocker.tables, len(lockTables))
	for _, table := range lockTables {
		require.Contains(t, tableLocker.tables, table)
	}
}

func TestIntegrationTableLocker(t *testing.T) {
	testutil.SkipIntegrationTestInShortMode(t)

	if db.IsTestDbSQLite() {
		t.Skip("skipping integration test on SQLite")
	}

	dbstore := db.InitTestDB(t)
	sqlProvider := legacysql.NewDatabaseProvider(dbstore)

	t.Run("lock and unlock tables", func(t *testing.T) {
		locker := &legacyTableLocker{sql: sqlProvider}
		ctx := context.Background()

		unlock, err := locker.LockMigrationTables(ctx, []string{"dashboard", "folder"})
		require.NoError(t, err)
		require.NotNil(t, unlock)

		err = unlock()
		require.NoError(t, err)
	})

	t.Run("empty tables list returns no-op", func(t *testing.T) {
		locker := &legacyTableLocker{sql: sqlProvider}
		ctx := context.Background()

		unlock, err := locker.LockMigrationTables(ctx, []string{})
		require.NoError(t, err)
		require.NotNil(t, unlock)

		err = unlock()
		require.NoError(t, err)
	})

	t.Run("duplicate tables are deduplicated", func(t *testing.T) {
		locker := &legacyTableLocker{sql: sqlProvider}
		ctx := context.Background()

		unlock, err := locker.LockMigrationTables(ctx, []string{"dashboard", "dashboard", "folder"})
		require.NoError(t, err)
		require.NotNil(t, unlock)

		err = unlock()
		require.NoError(t, err)
	})

	t.Run("verify lock prevents writes via insert", func(t *testing.T) {
		locker := &legacyTableLocker{sql: sqlProvider}
		ctx := context.Background()

		// Get SQL helper to access the database
		sqlHelper, err := sqlProvider(ctx)
		require.NoError(t, err)

		// Lock the dashboard table (READ lock)
		unlock, err := locker.LockMigrationTables(ctx, []string{"dashboard"})
		require.NoError(t, err)
		require.NotNil(t, unlock)

		// Try to write to the locked table from a separate connection (goroutine).
		quotedTable := sqlHelper.DB.Quote("dashboard")
		writeErr := make(chan error, 1)
		go func() {
			// UPDATE on a READ-locked table will block until the lock is released.
			_, werr := sqlHelper.DB.GetEngine().Exec(
				"UPDATE " + quotedTable + " SET title = title WHERE org_id = -1",
			)
			writeErr <- werr
		}()

		// Verify that the write is blocked while the lock is held
		select {
		case <-writeErr:
			t.Fatal("Write should be blocked while lock is held")
		case <-time.After(2 * time.Second):
			// Good — write is still blocked after 2s
		}

		// Release the lock
		require.NoError(t, unlock())

		// Now write should complete
		select {
		case err = <-writeErr:
			require.NoError(t, err, "Write should succeed after unlock")
		case <-time.After(10 * time.Second):
			t.Fatal("Write is still blocked after unlock")
		}
	})
}

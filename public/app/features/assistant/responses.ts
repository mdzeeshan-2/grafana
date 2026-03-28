interface ResponsePattern {
  keywords: string[];
  response: string;
}

const RESPONSE_PATTERNS: ResponsePattern[] = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings'],
    response:
      "Hello! I'm the Grafana Assistant. I can help you with questions about Grafana, dashboards, alerting, data sources, and observability concepts. What would you like to know?",
  },
  {
    keywords: ['dashboard', 'create dashboard', 'new dashboard', 'build dashboard'],
    response:
      "To create a new dashboard in Grafana:\n\n1. Click the **+** icon in the top navigation or use the **Quick Add** button\n2. Select **New Dashboard**\n3. Click **Add visualization** to add your first panel\n4. Choose a data source and configure your query\n5. Customize the panel's visualization type, title, and options\n6. Click **Save** to save your dashboard\n\nYou can also import pre-built dashboards from the Grafana dashboard library.",
  },
  {
    keywords: ['alert', 'alerting', 'notification', 'alert rule'],
    response:
      "Grafana Alerting lets you monitor your data and get notified when something goes wrong.\n\n**Key concepts:**\n- **Alert rules** define the conditions that trigger alerts\n- **Contact points** specify where notifications are sent (email, Slack, PagerDuty, etc.)\n- **Notification policies** control routing and grouping of alerts\n\nTo create an alert rule, go to **Alerting > Alert rules > New alert rule**, then configure your query, condition, and evaluation settings.",
  },
  {
    keywords: ['data source', 'datasource', 'add data source', 'connect'],
    response:
      "Grafana supports many data sources including:\n\n- **Prometheus** — Metrics monitoring\n- **Loki** — Log aggregation\n- **Tempo** — Distributed tracing\n- **InfluxDB** — Time series database\n- **MySQL / PostgreSQL** — SQL databases\n- **Elasticsearch** — Search and analytics\n\nTo add a data source, go to **Connections > Data sources > Add data source**, select the type, and configure the connection settings.",
  },
  {
    keywords: ['promql', 'prometheus query', 'metric query'],
    response:
      'PromQL (Prometheus Query Language) is used to query metrics from Prometheus.\n\n**Common patterns:**\n- `up` — Check if targets are up\n- `rate(http_requests_total[5m])` — Per-second rate over 5 minutes\n- `histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))` — 95th percentile latency\n- `sum by (job) (rate(http_requests_total[5m]))` — Aggregate by label\n\nUse the Explore view to experiment with queries interactively.',
  },
  {
    keywords: ['logql', 'loki query', 'log query', 'logs'],
    response:
      'LogQL is the query language for Grafana Loki.\n\n**Examples:**\n- `{job="nginx"}` — All logs from nginx\n- `{job="nginx"} |= "error"` — Filter for errors\n- `{job="nginx"} | json | status >= 400` — Parse JSON and filter\n- `rate({job="nginx"} |= "error" [5m])` — Error rate over time\n\nUse the **Explore** view with a Loki data source to query logs.',
  },
  {
    keywords: ['panel', 'visualization', 'graph', 'chart'],
    response:
      "Grafana offers many visualization types:\n\n- **Time series** — Line/area/bar charts over time\n- **Stat** — Single value with optional sparkline\n- **Gauge** — Value within a range\n- **Table** — Tabular data display\n- **Bar chart** — Categorical comparisons\n- **Heatmap** — Density visualization\n- **Logs** — Log line display\n\nTo change a panel's visualization, edit the panel and select a different type from the visualization picker on the right.",
  },
  {
    keywords: ['explore', 'query editor'],
    response:
      "**Explore** is Grafana's query-focused interface for ad-hoc data investigation.\n\nAccess it from the left menu via the compass icon. Key features:\n- Switch between data sources\n- Split view for comparing queries side by side\n- Query history for recent queries\n- Rich query editors with autocomplete for PromQL, LogQL, TraceQL\n- Correlations between metrics, logs, and traces",
  },
  {
    keywords: ['variable', 'template variable', 'dashboard variable'],
    response:
      "Dashboard variables make dashboards interactive and reusable.\n\n**Types:**\n- **Query** — Values from a data source query\n- **Custom** — Manually defined values\n- **Constant** — Fixed value\n- **Data source** — Switch between data sources\n- **Interval** — Time interval selection\n\nAdd them in **Dashboard settings > Variables**. Reference them in queries with `$variable_name` or `${variable_name}` syntax.",
  },
  {
    keywords: ['transform', 'transformation'],
    response:
      "Transformations process query results before visualization.\n\n**Common transformations:**\n- **Reduce** — Collapse rows to a single value (min, max, mean, etc.)\n- **Filter by value** — Show only rows matching conditions\n- **Group by** — Aggregate data by field values\n- **Join by field** — Combine results from multiple queries\n- **Calculate field** — Add computed columns\n\nAdd transformations in the panel editor's **Transform** tab.",
  },
  {
    keywords: ['user', 'permission', 'role', 'rbac', 'access'],
    response:
      "Grafana has a role-based access control system:\n\n**Built-in roles:**\n- **Viewer** — Can view dashboards and panels\n- **Editor** — Can create and edit dashboards\n- **Admin** — Full control including user and data source management\n\n**Folder & dashboard permissions** provide fine-grained access control. Go to **Administration > Users and access** to manage users, teams, and roles.",
  },
  {
    keywords: ['plugin', 'install plugin'],
    response:
      'Grafana plugins extend functionality with new data sources, panels, and apps.\n\nTo install plugins:\n1. Go to **Administration > Plugins and data > Plugins**\n2. Search for the plugin\n3. Click **Install**\n\nOr use the CLI: `grafana cli plugins install <plugin-id>`\n\nPopular plugins include Zabbix, Infinity (for REST APIs), FlowCharting, and many more from the Grafana plugin catalog.',
  },
  {
    keywords: ['annotation', 'annotations'],
    response:
      "Annotations mark points in time on graphs to highlight events.\n\n**Types:**\n- **Built-in annotations** — Manually added via the UI\n- **Query-based annotations** — From data source queries\n- **API annotations** — Created programmatically\n\nAdd annotations in **Dashboard settings > Annotations**, or click on a graph and select **Add annotation**. They're useful for correlating deployments, incidents, or configuration changes with metric behavior.",
  },
  {
    keywords: ['what can you do', 'help', 'capabilities', 'what do you know'],
    response:
      "I can help you with various Grafana topics:\n\n- **Dashboards** — Creating, editing, and managing dashboards\n- **Queries** — Writing PromQL, LogQL, TraceQL, and SQL queries\n- **Alerting** — Setting up alert rules and notifications\n- **Data sources** — Connecting and configuring data sources\n- **Visualizations** — Choosing and configuring panel types\n- **Administration** — Users, permissions, and plugins\n- **Observability concepts** — Metrics, logs, traces, and best practices\n\nJust ask me anything about Grafana!",
  },
  {
    keywords: ['traceql', 'trace', 'tracing', 'tempo'],
    response:
      'TraceQL is used to query traces in Grafana Tempo.\n\n**Examples:**\n- `{ resource.service.name = "frontend" }` — Traces from a service\n- `{ span.http.status_code >= 400 }` — Traces with errors\n- `{ duration > 2s }` — Slow traces\n- `{ resource.service.name = "frontend" } >> { resource.service.name = "backend" }` — Frontend calls to backend\n\nUse the **Explore** view with a Tempo data source to search and visualize traces.',
  },
];

const FALLBACK_RESPONSE =
  "I appreciate your question! While I'm currently running in basic mode without a backend connection, I can help with common Grafana topics like dashboards, alerting, data sources, queries (PromQL, LogQL, TraceQL), visualizations, and more.\n\nTry asking me about:\n- How to create a dashboard\n- Setting up alerts\n- Writing PromQL or LogQL queries\n- Available panel types\n- Data source configuration";

export function getAssistantResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase().trim();

  for (const pattern of RESPONSE_PATTERNS) {
    if (pattern.keywords.some((kw) => lower.includes(kw))) {
      return pattern.response;
    }
  }

  return FALLBACK_RESPONSE;
}

export const SUGGESTED_QUESTIONS = [
  'What can you help me with?',
  'How do I create a dashboard?',
  'How do I set up alerting?',
  'What data sources does Grafana support?',
  'How do I write a PromQL query?',
];

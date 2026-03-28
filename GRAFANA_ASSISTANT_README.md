# Grafana Assistant (OSS)

An AI-powered assistant sidebar built into Grafana OSS, inspired by Grafana Cloud's Assistant experience. This feature adds a chat interface directly into the Grafana UI where users can ask questions about Grafana concepts, dashboards, alerting, data sources, query languages, and more.

## What It Does

The Grafana Assistant is a right-side chat panel accessible from the top navigation bar. Currently it operates in **basic mode** with pre-built responses covering common Grafana topics. It is designed to be extended with a real backend/LLM connection in the future.

### Features

- **Sparkle icon** in the top toolbar to toggle the assistant sidebar
- **Welcome screen** with suggested questions to get started
- **Chat interface** with user and assistant message bubbles
- **Markdown-lite rendering** — bold text, inline code, lists, and numbered items
- **Typing indicator** with animated dots while the assistant "thinks"
- **Thumbs up/down feedback** on assistant responses
- **Clear conversation** button to start fresh
- **Keyboard shortcut** — `Enter` to send, `Shift+Enter` for new line
- **Responsive layout** — main content area shifts left when the assistant is open

### Supported Topics

The assistant can answer questions about:

| Topic | Examples |
|-------|----------|
| Dashboards | Creating, editing, managing dashboards |
| Alerting | Alert rules, contact points, notification policies |
| Data Sources | Prometheus, Loki, Tempo, MySQL, PostgreSQL, etc. |
| PromQL | Prometheus query language patterns and examples |
| LogQL | Loki query language patterns and examples |
| TraceQL | Tempo trace query language |
| Visualizations | Panel types — time series, stat, gauge, table, etc. |
| Explore | Ad-hoc querying and data investigation |
| Variables | Template variables and dashboard interactivity |
| Transformations | Data processing before visualization |
| Users & RBAC | Roles, permissions, access control |
| Plugins | Installing and managing plugins |
| Annotations | Marking events on graphs |

## Prerequisites

- **Go** (v1.24+) — for the backend
- **Node.js** (v22+) — for the frontend
- **Yarn** (v4+) — JavaScript package manager
- **Make** — build automation
- **Git** — version control

## Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/mdzeeshan-2/grafana.git
cd grafana
```

### 2. Install Frontend Dependencies

```bash
yarn install --immutable
```

### 3. Install Backend Dependencies

Go dependencies are fetched automatically on first build.

## Running the Application

You need **two terminal windows** — one for the backend and one for the frontend.

### Terminal 1: Start the Backend

```bash
make run
```

This compiles and starts the Grafana backend server with hot reload (using `air`). On first run, it will download Go dependencies and build the binary, which can take several minutes.

The backend serves the API and the application at **http://localhost:3000**.

### Terminal 2: Start the Frontend

```bash
yarn start
```

This starts the webpack dev server that compiles the frontend TypeScript/React code and watches for file changes. On first run, it builds plugin workspaces and then compiles the main Grafana frontend.

### 3. Access Grafana

Open **http://localhost:3000** in your browser.

**Default credentials:**
- Username: `admin`
- Password: `admin`

(You'll be prompted to change the password on first login — you can skip it.)

## Using the Grafana Assistant

1. Look for the **sparkle icon** (✨) in the top-right toolbar, between the search bar and the help button
2. Click it to **open the assistant sidebar**
3. Try one of the **suggested questions** on the welcome screen, or type your own question
4. The assistant responds with helpful information about Grafana
5. Use **thumbs up/down** to provide feedback on responses
6. Click the **trash icon** to clear the conversation
7. Click the **X** or the sparkle icon again to close the sidebar

## Project Structure (Assistant Files)

```
public/app/features/assistant/
├── AssistantContext.tsx    # React context provider (state management)
├── AssistantPanel.tsx      # Main chat sidebar UI component
├── AssistantButton.tsx     # Top bar sparkle icon button
└── responses.ts            # Keyword-based response engine

Modified files:
├── public/app/AppWrapper.tsx                                    # Added AssistantContextProvider
├── public/app/core/components/AppChrome/AppChrome.tsx           # Added assistant sidebar rendering
└── public/app/core/components/AppChrome/TopBar/SingleTopBar.tsx # Added assistant button to toolbar
```

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      AppWrapper.tsx                       │
│  ┌───────────────────────────────────────────────────┐   │
│  │            AssistantContextProvider                │   │
│  │  ┌─────────────────────────────────────────────┐  │   │
│  │  │              AppChrome.tsx                   │  │   │
│  │  │  ┌──────────┐  ┌──────────┐  ┌───────────┐ │  │   │
│  │  │  │ TopBar   │  │  Main    │  │ Assistant │ │  │   │
│  │  │  │ + Button │  │ Content  │  │  Panel    │ │  │   │
│  │  │  └──────────┘  └──────────┘  └───────────┘ │  │   │
│  │  └─────────────────────────────────────────────┘  │   │
│  └───────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## Future Enhancements

This is the **frontend-only foundation**. Planned next steps:

- **Backend API connection** — Connect to an LLM backend for real AI-powered responses
- **Context awareness** — Feed current page/dashboard context into prompts
- **@ mentions** — Reference specific data sources, dashboards, and panels
- **Query generation** — Generate PromQL, LogQL, TraceQL queries from natural language
- **Dashboard creation** — Create dashboards from conversational descriptions
- **Conversation history** — Persist chat history across sessions

## Troubleshooting

### Backend won't start
- Ensure Go 1.24+ is installed: `go version`
- First build downloads many dependencies — give it a few minutes
- Check if port 3000 is already in use: `lsof -i :3000`

### Frontend won't compile
- Ensure Node.js 22+ is installed: `node --version`
- Run `yarn install --immutable` to ensure dependencies are installed
- Check for TypeScript errors: `yarn typecheck`

### Assistant button doesn't appear
- Make sure both backend and frontend servers are running
- Hard refresh the browser (`Cmd+Shift+R` / `Ctrl+Shift+R`)
- Check the browser console for JavaScript errors

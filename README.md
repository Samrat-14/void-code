# VoidCode

VoidCode is a terminal-native AI coding assistant built as a Bun monorepo. It combines a local TUI client, an AI-powered server, shared schemas, and a Prisma-backed database layer to create and manage coding sessions that can either analyze a codebase or make changes directly.

## Overview

The project is centered around two working modes:

- **PLAN** — read-only analysis, research, and planning
- **BUILD** — implementation mode with file editing and shell access

A session can be tied to a working directory, allowing the assistant to inspect a project, stream responses, call tools, and persist conversation history.

## Architecture

This repository is organized as a Bun workspace monorepo:

- `packages/cli` — terminal UI client built with React and OpenTUI
- `packages/server` — Hono-based API server that streams model output and executes tools
- `packages/database` — Prisma schema, generated client, and database exports
- `packages/shared` — shared model definitions, schemas, and stream event contracts

## Features

- Terminal-first chat interface
- Session creation and history persistence
- Streaming assistant responses over SSE
- Support for reasoning/text/tool-call stream parts
- Tool-enabled coding workflows against a local project directory
- Distinct PLAN and BUILD operating modes
- Multiple AI provider integrations
- Resumable interrupted assistant responses

## Supported model providers

The server currently resolves chat models from these providers:

- Anthropic
- OpenAI
- Azure OpenAI
- Google

Model metadata and defaults are defined in `packages/shared/src/models.ts`.

## Tooling model

When a session is associated with a working directory, the assistant can use filesystem and shell tools.

### PLAN mode

Available tools:

- `readFile`
- `listDirectory`
- `glob`
- `grep`

### BUILD mode

Includes all PLAN tools plus:

- `writeFile`
- `editFile`
- `bash`

This enables the assistant to inspect code in PLAN mode and implement changes in BUILD mode.

## Data model

The database layer uses Prisma with PostgreSQL and persists:

- **Session**
  - title
  - working directory (`cwd`)
  - timestamps
- **Message**
  - role (`USER`, `ASSISTANT`, `ERROR`)
  - mode (`PLAN`, `BUILD`)
  - model id
  - content
  - structured parts
  - completion status (`COMPLETE`, `INTERRUPTED`)
  - duration

Schema source: `packages/database/prisma/schema.prisma`

## Runtime flow

1. The CLI creates or opens a session.
2. The session is stored by the server and persisted in the database.
3. User prompts are submitted to the chat endpoint.
4. The server selects the requested model and builds a system prompt.
5. If a working directory is present, tools are exposed according to the chosen mode.
6. The assistant streams reasoning, text, and tool events back to the CLI.
7. Final assistant output is saved to the database.

## Development

### Prerequisites

- [Bun](https://bun.sh)
- PostgreSQL database connection for Prisma
- Credentials for whichever AI providers you want to use

### Install dependencies

```bash
bun install
```

### Run the server

```bash
bun run dev:server
```

### Run the CLI

```bash
bun run dev:cli
```

## Environment notes

The codebase expects provider and database configuration through environment variables.

Based on the current implementation, you will likely need values such as:

- `DATABASE_URL`
- provider-specific API keys such as OpenAI, Anthropic, Google, or Azure credentials
- `AZURE_API_VERSION` when using Azure models
- `API_URL` for pointing the CLI at a running server if not using the default `http://localhost:3000`

You should create an environment file strategy appropriate for your setup before running the app.

## API summary

### Sessions

- `GET /sessions` — list sessions
- `GET /sessions/:id` — get a session with messages
- `POST /sessions` — create a session

### Chat

- `POST /chat/:sessionId` — submit a new user message and stream the assistant response
- `POST /chat/:sessionId/resume` — resume an interrupted response

## Monorepo scripts

At the repository root:

```bash
bun run dev:server
bun run dev:cli
```

Within packages:

- `packages/cli`: `bun run dev`
- `packages/server`: `bun run dev`, `bun run build`
- `packages/database`: `bun run db:generate`

## Tech stack

- Bun
- TypeScript
- React
- OpenTUI
- Hono
- Vercel AI SDK (`ai`)
- Prisma
- Zod
- PostgreSQL

## License

This project is licensed under the terms of the [LICENSE](./LICENSE) file.

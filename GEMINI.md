# UIGen - AI-powered React Component Generator

## Project Overview

UIGen is an AI-powered application designed to generate React components with a live preview functionality. It allows users to describe desired React components via chat, view them in real-time, and then switch to a code view for editing. Key features include AI-driven component generation using Anthropic Claude, a virtual file system (no direct file writes to disk), syntax highlighting, component persistence for registered users, and code export capabilities.

**Key Technologies:**

*   **Frontend:** Next.js 15 (with App Router), React 19, TypeScript
*   **Styling:** Tailwind CSS v4
*   **Backend/Database:** Prisma with SQLite
*   **AI Integration:** Anthropic Claude AI, Vercel AI SDK

## Building and Running

### Prerequisites

*   Node.js 18+
*   npm

### Setup

1.  **Optional:** Add your Anthropic API key to the `.env` file. If not provided, the application will use static code generation instead of an LLM.

    ```
    ANTHROPIC_API_KEY=your-api-key-here
    ```

2.  Install dependencies and initialize the database:

    ```bash
    npm run setup
    ```

    This command performs the following actions:
    *   Installs all project dependencies.
    *   Generates the Prisma client.
    *   Runs database migrations.

### Running the Application

*   **Development Mode:**

    ```bash
    npm run dev
    ```

    The application will be accessible at [http://localhost:3000](http://localhost:3000).

*   **Building for Production:**

    ```bash
    npm run build
    ```

*   **Starting Production Server:**

    ```bash
    npm run start
    ```

## Development Conventions

*   **Language:** TypeScript is used throughout the project for type safety and improved developer experience.
*   **Styling:** Tailwind CSS v4 is used for utility-first styling.
*   **Database Management:** Prisma is used as the ORM for interacting with the SQLite database, handling schema definitions and migrations.
*   **Code Quality:** ESLint is configured for code linting (as indicated by `.eslintrc.json` and `npm run lint` script).
*   **Testing:** Vitest is used for running tests (as indicated by `vitest.config.mts` and `npm run test` script).
*   **Next.js Architecture:** The project leverages the Next.js 15 App Router for routing and rendering.

## Usage Workflow

1.  Sign up or proceed as an anonymous user.
2.  Input a description of the desired React component into the chat interface.
3.  Observe the generated components in the real-time preview panel.
4.  Switch to the Code view to inspect and modify the generated code.
5.  Iteratively refine components by providing further instructions to the AI.
6.  Export the finalized generated code.

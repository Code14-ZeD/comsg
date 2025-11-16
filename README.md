# Comsg — Generate High-Quality Commit Messages from Git Diffs

Comsg is a developer tool that automatically converts Git stagged diffs into clear, consistent, and context-aware commit messages. By analyzing code changes at a semantic level, Comsg helps maintain a clean commit history without requiring developers to manually craft messages for every change.

## Features

### 🔍 Diff Parsing

- Accepts Git staged changes
- Identifies added, removed, and modified lines
- Handles multi-file diffs and complex change sets

### 🤖 AI-Driven Commit Message Generation

- Interprets the intent behind code changes
- Generates concise commit titles and optional extended descriptions
- Supports multi-scope summaries for large patches

### 🧱 Commit Standard Support

Comsg supports the full range of Conventional Commit types, including:

- **feat** — a new feature
- **fix** — a bug fix
- **docs** — documentation changes
- **style** — code style changes (formatting, missing semicolons, etc.)
- **refactor** — code restructuring without functional changes
- **test** — adding or updating tests
- **build** — build system or dependency changes
- **ci** — CI/CD configuration updates
- **perf** — performance improvements
- **chore** — maintenance tasks not affecting source code

These commit types help maintain consistent and meaningful commit history across projects and teams.

---

## Installation

Follow these steps to install Comsg globally:

### 1. Clone the project

```bash
git clone <repo-url>
cd comsg
```

### 2. Make the CLI executable

```bash
chmod +x index.js
```

### 3. Install globally using npm

```bash
npm link
```

After installation, the comsg command becomes available system-wide.

## Usage

Before running Comsg, you must add your OpenAI API key in the project where you want to use this tool.

### 1. Create a `.env` file

In the root of your project:

```bash
nano .env
```

Add the following environment variable:

```ini
OPENAI_API_KEY=your_api_key_here
```

### 2. Generate a commit message automatically

```bash
comsg
```

Comsg will analyze your current Git stagged diff and generate a commit message based on your changes.

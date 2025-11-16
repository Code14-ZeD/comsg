# Comsg — Generate High-Quality Commit Messages from Git Diffs

Comsg is a developer tool that automatically converts Git diffs into clear, consistent, and context-aware commit messages. By analyzing code changes at a semantic level, Comsg helps maintain a clean commit history without requiring developers to manually craft messages for every change.

## Features

### 🔍 Diff Parsing

- Accepts raw Git diffs, staged changes, or patch files
- Identifies added, removed, and modified lines
- Handles multi-file diffs and complex change sets

### 🤖 AI-Driven Commit Message Generation

- Interprets the intent behind code changes
- Generates concise commit titles and optional extended descriptions
- Supports multi-scope summaries for large patches

### 🧱 Commit Standard Support

- Conventional Commits (e.g., `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`)
- Semantic and team-customizable formats
- Configurable message templates

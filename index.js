#!/usr/bin/env node

import { Agent, run, tool } from "@openai/agents";
import z from "zod";
import { spawn } from "child_process";
import "dotenv/config";

async function getDiff() {
  const git = spawn("git", ["diff", "--staged"]);

  const decoder = new TextDecoder();
  let output = "";

  for await (const chunk of git.stdout) {
    output += decoder.decode(chunk);
  }

  for await (const chunk of git.stderr) {
    console.error(decoder.decode(chunk));
  }

  const exitCode = await new Promise((resolve) => git.on("close", resolve));

  if (exitCode !== 0) {
    throw new Error("git diff failed");
  }

  return output;
}

const commitTool = tool({
  name: "commit-tool",
  description: `An intelligent tool that transforms raw Git diffs into clear, concise, and meaningful commit messages. Analyzes code changes and automatically generates commit messages that follow best-practice conventions such as Conventional Commits.
    Rules:
    - Always generate commit messages in the format: <type>(<scope>): <description>
    - Use types like feat, fix, docs, style, refactor, test, chore
    - Scope is optional but should indicate the area of code affected
    - Description should be imperative and concise
    - If no changes are detected, respond with "No changes to commit."
    - Ensure commit messages are 50 characters or less for the description part.
    Allowed types:
    feat — a new feature
    fix — a bug fix
    docs — documentation changes
    style — code style changes (formatting, missing semicolons, etc.)
    refactor — code restructuring without functional changes
    test — adding or updating tests
    build — build system or dependencies
    ci — CI/CD configuration
    perf — performance improvements
    chore — maintenance tasks not affecting source code`,
  parameters: z.object({}),
  execute: async (m) => {
    const diff = await getDiff();
    diff && console.log("Staged Changes:\n", diff);
    return diff;
  },
});

const gitAgent = new Agent({
  name: "git-agent",
  instructions: "An agent that can perform Git operations.",
  tools: [commitTool],
});

async function main(q = "") {
  const result = run(gitAgent, q);
  console.log((await result).finalOutput);
}

main("Create a commit message for the staged changes.");

import { Agent, run, tool } from "@openai/agents";
import z from "zod";
import execSync from "child_process";
import "dotenv/config";

async function getDiff() {
  try {
    return execSync("git diff --staged", { encoding: "utf-8" });
  } catch (error) {
    console.error;
  }
}

const commitTool = tool({
  name: "commit-tool",
  description:
    "An intelligent tool that transforms raw Git diffs into clear, concise, and meaningful commit messages. Analyzes code changes and automatically generates commit messages that follow best-practice conventions such as Conventional Commits",
  parameters: z.object({}),
  execute: async (message) => {
    // Simulate git commit operation
    const diff = await getDiff();
    console.log("Staged Changes:\n", diff);
    return `Committed changes with message: "${message}"`;
  },
});

const gitAgent = new Agent({
  name: "git-agent",
  instructions: "An agent that can perform Git operations.",
  tools: [commitTool],
});

async function main(q = "") {
  const result = run(gitAgent, q);
}

main("Create a commit message for the staged changes.");

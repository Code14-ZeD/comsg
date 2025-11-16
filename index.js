import { Agent, run, tool } from "@openai/agents";
import z from "zod";
import { execSync } from "child_process";
import "dotenv/config";

async function getDiff() {
  try {
    const diff = execSync("git diff --staged", { encoding: "utf-8" });
    return diff;
  } catch (error) {
    console.error("Error getting git diff:", error);
  }
}

const commitTool = tool({
  name: "commit-tool",
  description:
    "An intelligent tool that transforms raw Git diffs into clear, concise, and meaningful commit messages. Analyzes code changes and automatically generates commit messages that follow best-practice conventions such as Conventional Commits. Commit message should only be one line. And if there are no changes, respond with 'No change(s) to commit.'",
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

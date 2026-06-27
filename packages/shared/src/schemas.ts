import { z } from "zod";
import { tool } from "ai";

export const Mode = {
  BUILD: "BUILD",
  PLAN: "PLAN",
} as const;

export const modeSchema = z.enum([Mode.BUILD, Mode.PLAN]);

export type ModeType = (typeof Mode)[keyof typeof Mode];

export const toolInputSchemas = {
  readFile: z.object({
    path: z.string().describe("Relative path to the file to read"),
  }),
  listDirectory: z.object({
    path: z
      .string()
      .default(".")
      .describe("Relative path to the directory to list (defaults to project root)"),
  }),
  glob: z.object({
    pattern: z.string().describe("Glob pattern to match (e.g. '**/*.ts', 'src/**/*.tsx')"),
    path: z.string().default(".").describe("Directory to search in (defaults to project root)"),
  }),
  grep: z.object({
    pattern: z.string().describe("Regex pattern to search for"),
    path: z.string().default(".").describe("Directory to search in (defaults to project root)"),
    include: z
      .string()
      .optional()
      .describe("Optional glob pattern to filter files (e.g. '*.ts', '*.tsx')"),
  }),
  writeFile: z.object({
    path: z.string().describe("Relative path to the file to write"),
    content: z.string().describe("The full content to write to the file"),
  }),
  editFile: z.object({
    path: z.string().describe("Relative path to the file to edit"),
    oldString: z
      .string()
      .describe("The exact text to find and replace (must be unique in the file)"),
    newString: z.string().describe("The text to replace it with"),
  }),
  bash: z.object({
    command: z.string().describe("The shell command to execute"),
    description: z.string().optional().describe("Short description of the command"),
    timeout: z.number().optional().describe("Timeout in milliseconds"),
  }),
} as const;

export const readOnlyToolContracts = {
  readFile: tool({
    description:
      "Read the contents of a file in the project. Returns the file text, truncated if very large.",
    inputSchema: toolInputSchemas.readFile,
  }),
  listDirectory: tool({
    description:
      "List files and directories in a project directory. Returns names with type indicators.",
    inputSchema: toolInputSchemas.listDirectory,
  }),
  glob: tool({
    description:
      "Find files matching a glob pattern. Returns file paths relative to the project root. Skips node_modules and hidden directories.",
    inputSchema: toolInputSchemas.glob,
  }),
  grep: tool({
    description:
      "Search file contents using a regex pattern. Returns matching lines with file paths and line numbers. Skips hidden directories, node_modules, binary files.",
    inputSchema: toolInputSchemas.grep,
  }),
} as const;

export const buildToolContracts = {
  ...readOnlyToolContracts,
  writeFile: tool({
    description:
      "Create or overwrite a file in the project. Creates parent directories if they don't exist.",
    inputSchema: toolInputSchemas.writeFile,
  }),
  editFile: tool({
    description:
      "Make a targeted edit to a file by replacing an exact string match. The oldString must appear exactly once in the file (for safety). Use this for surgical edits instead of rewriting entire files.",
    inputSchema: toolInputSchemas.editFile,
  }),
  bash: tool({
    description:
      "Execute a shell command in the project directory. Use this for running tests, builds, git operations, package installs, and any other shell commands.",
    inputSchema: toolInputSchemas.bash,
  }),
} as const;

export type ToolContracts = typeof buildToolContracts;

export function getToolContracts(mode: ModeType) {
  return mode === Mode.PLAN ? readOnlyToolContracts : buildToolContracts;
}

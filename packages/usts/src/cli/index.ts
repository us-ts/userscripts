import { parseArgs } from "node:util";

type CLICommand = "help" | "build";

type Flags = {} & Record<string, never>;

interface Args {
  values: Flags;
  positionals: string[];
}

async function printHelp() {
  console.log("Run `usts build` to build a userscript");
}

function resolveCommand(parsedArgs: Args): CLICommand {
  const cmd = parsedArgs.positionals[2];

  if (!cmd) {
    return "help";
  }

  const supportedCommands = new Set(["build"]);
  if (supportedCommands.has(cmd)) {
    return cmd as CLICommand;
  }

  return "help";
}

async function runCommand(cmd: CLICommand) {
  switch (cmd) {
    case "help": {
      await printHelp();
      return;
    }
    case "build": {
      const { build } = await import("./build/index.js");
      await build();
      return;
    }
  }
}

export async function cli(argv: string[]): Promise<void> {
  const parsedArgs = parseArgs({ args: argv, allowPositionals: true });
  const cmd = resolveCommand(parsedArgs);
  await runCommand(cmd);
}

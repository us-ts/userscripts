import { parseArgs } from "node:util";

type CLICommand = "help" | "build";

type Flags = { watch: boolean };

interface Args {
  values: Flags;
  positionals: string[];
}

async function printHelp() {
  console.log(`
usts build - build a userscript
usts build --watch - build userscript in watch mode
`);
}

function isSupportedCommand<T extends CLICommand>(
  supportedCommands: T[],
  cmd: string,
): cmd is T {
  return new Set<string>(supportedCommands).has(cmd);
}

function resolveCommand(parsedArgs: Args): CLICommand {
  const cmd = parsedArgs.positionals[2];

  if (!cmd) {
    return "help";
  }

  if (isSupportedCommand(["build"], cmd)) {
    return cmd;
  }

  return "help";
}

async function runCommand(cmd: CLICommand, flags: Flags) {
  switch (cmd) {
    case "help": {
      await printHelp();
      return;
    }
    case "build": {
      const { build } = await import("./build/index.js");
      await build({ watch: flags.watch });
      return;
    }
  }
}

export async function cli(argv: string[]): Promise<void> {
  const parsedArgs = parseArgs({
    args: argv,
    allowPositionals: true,
    options: { watch: { type: "boolean", default: false } },
  });
  const cmd = resolveCommand(parsedArgs);
  await runCommand(cmd, parsedArgs.values);
}

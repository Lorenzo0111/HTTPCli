import type { FileSink } from "bun";
import { logger, parse } from ".";
import chalk from "chalk";

function printCursor(stdout: FileSink) {
  stdout.write(chalk.bgBlueBright(" > ") + " ");
}

export async function startRepl() {
  const writer = Bun.stdout.writer();
  printCursor(writer);

  let string = "";
  for await (const chunk of Bun.stdin.stream() as any) {
    const input = Buffer.from(chunk).toString();
    if (input === "exit\n") {
      process.exit(0);
    }

    if (input.endsWith("\\\n")) {
      string += input.slice(0, -2) + "\n";
      printCursor(writer);
      continue;
    }

    try {
      await parse(string + "\n" + input);
    } catch (e) {
      if (e instanceof Error) logger.error(e.message);
    }

    printCursor(writer);
  }
}

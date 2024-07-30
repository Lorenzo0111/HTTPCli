import type { BunFile, FileSink } from "bun";
import chalk from "chalk";
import { parse } from "..";
import * as logger from "../utils/logger";

function printCursor(stdout: FileSink) {
  stdout.write(chalk.bgBlueBright(" > ") + " ");
}

export async function startRepl(stdout: BunFile, stdin: BunFile) {
  const writer = stdout.writer();
  printCursor(writer);

  let string = "";
  for await (const chunk of stdin.stream() as any) {
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
      const result = await parse(string + "\n" + input);
      logger.logResult(result);
    } catch (e) {
      if (e instanceof Error) logger.error(e.message);
    }

    printCursor(writer);
  }
}

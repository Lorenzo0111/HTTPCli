import chalk from "chalk";
import { parse } from "../index.js";
import * as logger from "../utils/logger.js";

function printCursor(stdout: NodeJS.WriteStream) {
  stdout.write(chalk.bgBlueBright(" > ") + " ");
}

export async function startRepl(
  stdout: NodeJS.WriteStream,
  stdin: NodeJS.ReadStream
) {
  printCursor(stdout);

  let string = "";
  for await (const chunk of stdin) {
    const input = Buffer.from(chunk).toString();
    if (input === "exit\n") {
      process.exit(0);
    }

    if (input.endsWith("\\\n")) {
      string += input.slice(0, -2) + "\n";
      printCursor(stdout);
      continue;
    }

    try {
      const result = await parse(string + "\n" + input);
      logger.logResult(result);
    } catch (e) {
      if (e instanceof Error) logger.error(e.message);
    }

    printCursor(stdout);
  }
}

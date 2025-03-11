import { existsSync, readFileSync } from "node:fs";
import { parse, startRepl } from "../index.js";
import * as logger from "../utils/logger.js";

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    startRepl(process.stdout, process.stdin);
    return;
  }

  try {
    if (existsSync(args[0])) {
      const result = await parse(readFileSync(args[0], "utf-8"));
      logger.logResult(result);
    } else logger.error("File not found");
  } catch (e) {
    if (e instanceof Error) logger.error(e.message);
  }
}

main();

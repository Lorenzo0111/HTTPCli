import { parse, startRepl } from "..";
import * as logger from "../utils/logger";

async function main() {
  const args = Bun.argv.slice(2);

  if (args.length === 0) {
    startRepl(Bun.stdout, Bun.stdin);
    return;
  }

  const file = Bun.file(args[0]);
  try {
    if (await file.exists()) {
      const result = await parse(await file.text());
      logger.logResult(result);
    } else logger.error("File not found");
  } catch (e) {
    if (e instanceof Error) logger.error(e.message);
  }
}

main();

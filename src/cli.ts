import { logger, startRepl } from ".";
import { parse } from "./parser";

async function main() {
  const args = Bun.argv.slice(2);

  if (args.length === 0) {
    startRepl();
    return;
  }

  const file = Bun.file(args[0]);
  try {
    if (await file.exists()) await parse(await file.text());
    else logger.error("File not found");
  } catch (e) {
    if (e instanceof Error) logger.error(e.message);
  }
}

main();

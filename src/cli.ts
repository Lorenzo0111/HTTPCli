import { startRepl } from ".";
import { parse } from "./parser";

async function main() {
  const args = Bun.argv.slice(2);

  if (args.length === 0) {
    startRepl();
    return;
  }

  const file = Bun.file(args[0]);
  if (await file.exists()) parse(await file.text());
  else console.log("File not found");
}

main();

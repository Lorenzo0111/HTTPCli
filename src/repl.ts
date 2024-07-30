import type { FileSink } from "bun";
import { parse } from ".";

function printCursor(stdout: FileSink) {
  stdout.write("REPL > ");
}

export async function startRepl() {
  const writer = Bun.stdout.writer();
  printCursor(writer);

  for await (const chunk of Bun.stdin.stream() as any) {
    const input = Buffer.from(chunk).toString();
    if (input === "exit\n") {
      writer.write("Goodbye!\n");
      process.exit(0);
    }

    await parse(input);
    printCursor(writer);
  }
}

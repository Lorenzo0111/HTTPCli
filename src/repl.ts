import type { FileSink } from "bun";

function printCursor(stdout: FileSink) {
  stdout.write("REPL > ");
}

export async function startRepl() {
  const writer = Bun.stdout.writer();
  printCursor(writer);

  for await (const chunk of Bun.stdin.stream() as any) {
    const input = Buffer.from(chunk).toString();
    console.log(`> ${input}`);

    printCursor(writer);
  }
}

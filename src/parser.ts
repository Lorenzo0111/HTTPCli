import chalk from "chalk";
import { logger } from ".";

const methodRegex = /^(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS)/;
const urlRegex = /(?<=GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS)\s+(.*)/;
const headersRegex = /(?<key>.*): (?<value>.*)/;

export async function parse(content: string) {
  const instructions = content.split("--");

  for (const instruction of instructions) {
    const lines = instruction.trim().split("\n");
    const method = lines[0].match(methodRegex)?.[0];
    const urlPipe = lines[0].match(urlRegex)?.[1]?.split(" > ");

    const headersLines =
      lines.indexOf("") > -1
        ? lines.slice(1, lines.indexOf(""))
        : lines.slice(1);
    const headers = headersLines.map((line) => {
      const match = line.match(headersRegex);
      return {
        key: match?.groups?.key,
        value: match?.groups?.value,
      };
    });

    if (!method || !urlPipe?.length) throw new Error("Invalid syntax");

    const body =
      lines.indexOf("") > -1
        ? lines.slice(lines.indexOf("") + 1).join("\n")
        : undefined;

    logger.info(chalk.bgYellowBright(` ${method} `) + " " + urlPipe[0]);

    const response = await fetch(urlPipe[0], {
      headers: Object.fromEntries(
        headers.map((header) => [header.key, header.value])
      ),
      method,
      body,
    });

    const text = await response.text();
    const status = response.status;

    logger.info(chalk.bgGreenBright(` ${status} `));

    let resData = text;
    try {
      const json = JSON.parse(text);
      resData = JSON.stringify(json, null, 2);
    } catch {}

    logger.info(resData);

    if (urlPipe.length > 1) {
      const file = Bun.file(urlPipe[1]);
      const writer = file.writer();

      writer.write(resData);
      writer.end();
    }
  }
}

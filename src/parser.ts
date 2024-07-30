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
    const url = lines[0].match(urlRegex)?.[1];

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

    if (!method || !url) throw new Error("Invalid syntax");

    logger.info(chalk.bgYellowBright(` ${method} `) + " " + url);

    const response = await fetch(url, {
      headers: Object.fromEntries(
        headers.map((header) => [header.key, header.value])
      ),
      method,
    });

    const text = await response.text();
    const status = response.status;

    logger.info(chalk.bgGreenBright(` ${status} `));

    try {
      const json = JSON.parse(text);
      logger.info(JSON.stringify(json, null, 2));
    } catch {
      logger.info(text);
    }
  }
}

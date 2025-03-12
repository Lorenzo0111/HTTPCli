import axios from "axios";
import { writeFileSync } from "node:fs";
import type { ParseResult, RequestMethod } from "./index.js";

const methodRegex = /^(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS)/;
const urlRegex = /(?<=GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS)\s+(.*)/;
const headersRegex = /(?<key>.*): (?<value>.*)/;

export async function parse(content: string): Promise<ParseResult> {
  const items: ParseResult = [];
  const instructions = content.split("--");

  for (const instruction of instructions) {
    const lines = instruction.trim().split("\n");
    const method = lines[0].match(methodRegex)?.[0] as
      | RequestMethod
      | undefined;
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

    const response = await axios.request({
      method,
      url: urlPipe[0],
      headers: Object.fromEntries(
        headers.map((header) => [header.key, header.value])
      ),
      data: body,
    });

    const text =
      typeof response.data === "object"
        ? JSON.stringify(response.data, null, 2)
        : response.data;
    const status = response.status;

    if (urlPipe.length > 1) writeFileSync(urlPipe[1], text, "utf-8");

    items.push({
      request: {
        method,
        url: urlPipe[0],
        headers: Object.fromEntries(
          headers.map((header) => [header.key, header.value])
        ),
        body,
      },
      response: {
        status,
        data: text,
      },
    });
  }

  return items;
}

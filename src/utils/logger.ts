import chalk from "chalk";
import type { ParseResult } from "../types.js";

export function debug(message: string) {
  console.log(`${chalk.bgGreenBright(" DEBUG ")} ${message}`);
}

export function info(message: string) {
  console.log(`${chalk.bgBlueBright(" INFO ")} ${message}`);
}

export function warn(message: string) {
  console.log(`${chalk.bgYellowBright(" WARN ")} ${message}`);
}

export function error(message: string) {
  console.log(`${chalk.bgRedBright(" ERROR ")} ${message}`);
}

export function logResult(result: ParseResult) {
  for (const item of result) {
    info(
      `${chalk.bgYellowBright(` ${item.request.method} `)} ${item.request.url}`
    );
    info(
      `${chalk.bgGreenBright(` ${item.response.status} `)} ${
        item.response.data
      }`
    );
  }
}

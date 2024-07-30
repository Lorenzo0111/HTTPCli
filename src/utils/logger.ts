import chalk from "chalk";

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

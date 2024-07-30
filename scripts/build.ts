import { $ } from "bun";
import { rmSync, existsSync } from "node:fs";
import * as logger from "../src/utils/logger";

let now = new Date();

if (existsSync("bin")) rmSync("bin", { recursive: true });

logger.info("Building CLI for all platforms...");
const platforms = [
  "linux-x64",
  "linux-arm64",
  "windows-x64",
  "darwin-arm64",
  "darwin-x64",
];

for (const platform of platforms) {
  await build(platform);
}

async function build(target: string) {
  logger.info(`Building CLI for ${target}`);
  await $`bun build src/cli/cli.ts --compile --target=bun-${target} --outfile=bin/http-${target}`;
}

logger.info(`Completed in ${new Date().getTime() - now.getTime()}ms`);

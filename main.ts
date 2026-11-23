// one-emoji-01: a make.fun entry that delivers a single emoji.
//
// The whole entry is one warm gesture. This program's only job is to
// place it, byte for byte, into entry.txt inside the output directory
// the harness points at, so the gate can read it back.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry itself: heart hands. Nothing before it, nothing after it.
const ENTRY = "🫶";

function outputDir(): string {
  // The harness sets MAKEFUN_OUTPUT_DIR; /output is the contest default.
  // An empty value counts as unset rather than as a path.
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  return fromEnv ? fromEnv : "/output";
}

function main(): void {
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), ENTRY, "utf8");
}

try {
  main();
} catch (err) {
  const reason = err instanceof Error ? err.message : String(err);
  console.error(`main.ts: could not write entry.txt: ${reason}`);
  process.exit(1);
}

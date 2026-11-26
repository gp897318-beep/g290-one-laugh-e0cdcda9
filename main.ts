// g290-one-laugh-e0cdcda9 — make.fun entry for "One Line, One Laugh"
// (competition u-deysumbrella-one-line-one-laugh-e0cdcda9).
//
// The program writes exactly one funny line to /output/entry.txt.
// The gate in RULES.txt accepts UTF-8 text of 1 to 140 characters, a
// single line, not only whitespace — so the line is validated against
// every part of that gate here before anything is written.
//
// The line (112 characters, counted with node, not by hand):
//   "I told my therapist I talk to my plants. She said that is fine —
//    as long as they do not answer back in my voice."
//
// Why this line won the comparison of 10 candidates (fridge, cat,
// alarms, houseplant, password, burnt water, meeting, bedtime, GPS,
// therapist): the setup is a familiar confession, the therapist's
// approval is the turn, and "in my voice" is the tag — a second,
// darker surprise that lands on a single read, in plain spoken words,
// with no meme and no explanation of the joke. The cat line ("unpaid
// intern", 61 chars) was the fastest landing but the weakest on
// freshness; the plant line's closer ("so did the pressure") was good
// but the therapist's tag is the freshest image of the ten.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const LINE =
  "I told my therapist I talk to my plants. She said that is fine \u2014 " +
  "as long as they do not answer back in my voice.";

const MIN_CHARS = 1;
const MAX_CHARS = 140; // gate for this competition: 1 to 140 characters
const DEFAULT_OUTPUT = "/output/entry.txt";

function checkGate(line: string): number {
  const chars = [...line].length;
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${chars}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  return chars;
}

function main(): void {
  const chars = checkGate(LINE);
  const outPath = process.argv[2] ? resolve(process.argv[2]) : DEFAULT_OUTPUT;
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, LINE, { encoding: "utf8" });
  // Read the file back and confirm it is byte-identical to the validated
  // line, so a silent write or encoding problem fails loudly here instead
  // of reaching the gate with a different text than the one validated.
  if (readFileSync(outPath, { encoding: "utf8" }) !== LINE) {
    throw new Error("entry.txt does not match the validated line");
  }
  console.log(`wrote ${chars}-char entry to ${outPath}`);
}

main();

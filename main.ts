import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outputDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

const entryPath = join(dirname(fileURLToPath(import.meta.url)), "entry.txt");

let data: Buffer;
try {
  data = readFileSync(entryPath);
} catch {
  console.error("entry.txt not found next to main.ts");
  process.exit(1);
}

if (data.length === 0) {
  console.error("entry.txt is empty");
  process.exit(1);
}

const charCount = [...data.toString("utf-8")].length;
if (charCount < 1 || charCount > 200) {
  console.error(`entry.txt must be 1-200 characters, got ${charCount}`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), data);

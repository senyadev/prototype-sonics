import { execFileSync } from "node:child_process";
import { cpSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const commit = "6c2be4e32c68ea9891e68fc72b46f66acf7e299e";
const root = resolve(import.meta.dirname, "..");
const checkout = mkdtempSync(join(tmpdir(), "soniks-catalog-"));
function run(command, args, cwd = checkout) {
  execFileSync(command, args, { cwd, stdio: "inherit" });
}
run("git", [
  "clone",
  "https://github.com/sonik-space/soniks-design-system.git",
  ".",
]);
run("git", ["checkout", "--detach", commit]);
run("bun", ["install", "--frozen-lockfile"]);
run("bun", ["run", "build:storybook"]);
cpSync(
  join(checkout, "apps/storybook/storybook-static"),
  join(root, "public/component-library"),
  { recursive: true },
);
const source = readFileSync(
  join(checkout, "packages/styles/src/_typography.scss"),
  "utf8",
);
const styles = [...source.matchAll(/@mixin ([\w-]+)\s*\{([^}]+)\}/g)]
  .filter(([, , body]) => !body.includes("@include"))
  .map(([, name, body]) => ({
    name,
    family: body.includes("robotoMono") ? "Roboto Mono" : "Inter",
    size: Number(body.match(/font-size: (\d+)px/)[1]),
    weight: Number(body.match(/font-weight: (\d+)/)[1]),
    lineHeight: Number(body.match(/line-height-(\d+)/)[1]) / 100,
    uppercase: body.includes("text-transform: uppercase"),
  }));
writeFileSync(
  join(root, "src/typography.json"),
  JSON.stringify(styles, null, 2) + "\n",
);
console.log(
  `Catalog generated from ${commit}; ${styles.length} typography styles. Source checkout: ${checkout}`,
);

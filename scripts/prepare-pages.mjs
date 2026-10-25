import { mkdir, copyFile, writeFile } from "node:fs/promises";

// Real route entry points let static hosts serve direct links and refreshes.
for (const route of ["design-system", "stations/new"]) {
  await mkdir(`dist/${route}`, { recursive: true });
  await copyFile("dist/index.html", `dist/${route}/index.html`);
}
await writeFile("dist/.nojekyll", "");

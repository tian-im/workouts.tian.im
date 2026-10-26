import { cp, mkdir, rm, writeFile, access } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, "assets"), { recursive: true });

// ── Static pages ───────────────────────────────────────────────
await cp(path.join(root, "index.html"), path.join(dist, "index.html"));
await cp(path.join(root, "404.html"), path.join(dist, "404.html"));
for (const dir of ["james", "for-james"]) {
  await cp(path.join(root, dir), path.join(dist, dir), { recursive: true });
}
await cp(path.join(root, "assets"), path.join(dist, "assets"), { recursive: true });

// ── Custom domain + Pages plumbing ─────────────────────────────
await cp(path.join(root, "public", "CNAME"), path.join(dist, "CNAME"));
await writeFile(path.join(dist, ".nojekyll"), "");

// ── Tailwind ───────────────────────────────────────────────────
const localBin = path.join(root, "node_modules", ".bin", "tailwindcss");
const hasLocal = await exists(localBin);
const bin = hasLocal ? localBin : "npx";
const args = hasLocal
  ? ["-i", "src/input.css", "-o", "dist/assets/style.css", "--minify"]
  : [
      "--yes",
      "@tailwindcss/cli",
      "-i",
      "src/input.css",
      "-o",
      "dist/assets/style.css",
      "--minify",
    ];

execFileSync(bin, args, { stdio: "inherit", cwd: root });

const { size } = await import("node:fs").then((fs) =>
  fs.promises.stat(path.join(dist, "assets", "style.css")),
);
console.log(`✓ built dist/ (style.css ${(size / 1024).toFixed(1)} kB)`);

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const distHtmlPath = path.join(rootDir, "dist", "index.html");
const distNamedPath = path.join(rootDir, "dist", "lovec-bubaku-hra.html");
const publicNamedPath = path.join(rootDir, "public", "lovec-bubaku-hra.html");
const rootNamedPath = path.join(rootDir, "lovec-bubaku-hra.html");

if (!fs.existsSync(distHtmlPath)) {
  console.error("dist/index.html not found! Run vite build first.");
  process.exit(1);
}

let htmlContent = fs.readFileSync(distHtmlPath, "utf-8");

// Inline a self-contained SVG favicon so it never requests favicon.ico
const inlineFavicon = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2245%22 fill=%22%23ffd438%22 stroke=%22%231c1308%22 stroke-width=%228%22/><text y=%2265%22 font-size=%2250%22 x=%2222%22>👻</text></svg>`;

htmlContent = htmlContent.replace(
  /<link rel="icon"[^>]*>/i,
  `<link rel="icon" type="image/svg+xml" href="${inlineFavicon}" />`
);

// Write to all output locations
fs.writeFileSync(distHtmlPath, htmlContent, "utf-8");
fs.writeFileSync(distNamedPath, htmlContent, "utf-8");
fs.writeFileSync(publicNamedPath, htmlContent, "utf-8");
fs.writeFileSync(rootNamedPath, htmlContent, "utf-8");

const sizeKb = (Buffer.byteLength(htmlContent, "utf-8") / 1024).toFixed(1);
console.log(`✅ Single-file HTML successfully produced: ${sizeKb} KB`);
console.log(`   - ${distHtmlPath}`);
console.log(`   - ${distNamedPath}`);
console.log(`   - ${publicNamedPath}`);
console.log(`   - ${rootNamedPath}`);

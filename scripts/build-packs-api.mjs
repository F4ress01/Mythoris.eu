// Generuje public/api/packs.json z plikow .zip w public/packs/ (SHA-1, rozmiar, adres).
// Opisy: public/packs/meta.json  { "plik.zip": { "name": "...", "description": "...", "version": "1.0", "default": true } }
// Uruchamia sie automatycznie przed `npm run dev` i `npm run build`.
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const packsDir = join(root, "public", "packs");
const outFile = join(root, "public", "api", "packs.json");
const BASE = process.env.PACKS_BASE_URL || "https://mythoris.eu";
const MAX = 100 * 1024 * 1024; // limit pliku na GitHub Pages / GitHub
const WARN = 50 * 1024 * 1024;

mkdirSync(packsDir, { recursive: true });
const metaPath = join(packsDir, "meta.json");
const meta = existsSync(metaPath) ? JSON.parse(readFileSync(metaPath, "utf8")) : {};

const packs = [];
for (const file of readdirSync(packsDir).filter((f) => f.toLowerCase().endsWith(".zip")).sort()) {
  if (!/^[A-Za-z0-9._-]+$/.test(file)) throw new Error(`Niedozwolona nazwa pliku: ${file} (tylko litery, cyfry, . _ -)`);
  const path = join(packsDir, file);
  const size = statSync(path).size;
  if (size > MAX) throw new Error(`${file}: ${(size / 1048576).toFixed(1)} MB > 100 MB (limit GitHub)`);
  if (size > WARN) console.warn(`[packs] UWAGA: ${file} ma ${(size / 1048576).toFixed(1)} MB`);
  const data = readFileSync(path);
  // nazwy plikow w zipie sa zapisane jawnie - szybka kontrola, ze to resource pack
  if (!data.includes("pack.mcmeta")) throw new Error(`${file}: w zipie brak pack.mcmeta (pack musi byc w korzeniu archiwum)`);
  const m = meta[file] || {};
  const id = file.replace(/\.zip$/i, "").toLowerCase();
  packs.push({
    id,
    name: m.name || id,
    description: m.description || "",
    version: m.version || "",
    default: m.default === true,
    file,
    url: `${BASE}/packs/${file}`,
    sha1: createHash("sha1").update(data).digest("hex"),
    size,
  });
}

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, JSON.stringify({ generated: new Date().toISOString(), packs }, null, 2) + "\n");
console.log(`[packs] ${packs.length} pack(ow) -> public/api/packs.json`);

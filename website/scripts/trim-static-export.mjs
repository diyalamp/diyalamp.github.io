import { readFile, writeFile } from "node:fs/promises";

// These routes use plain links, images, and details elements. Keep their
// rendered HTML and structured data while dropping the unused Next runtime.
const staticRoutes = ["index.html", "alternatives/index.html"];
const chunkScripts = /<script\b[^>]*\bsrc="\/_next\/static\/chunks\/[^"]+\.js"[^>]*><\/script>/g;
const hydration = /<script>\s*(?:\(self\.__next_f=self\.__next_f\|\|\[\]\)\.push\(|self\.__next_f\.push\()[\s\S]*?<\/script>/g;
const chunkPreloads = /<link\b(?=[^>]*\bas="script")(?=[^>]*\bhref="\/_next\/static\/chunks\/)[^>]*>/g;

for (const route of staticRoutes) {
  const file = new URL(`../out/${route}`, import.meta.url);
  const original = await readFile(file, "utf8");
  const html = original.replace(chunkScripts, "").replace(hydration, "").replace(chunkPreloads, "");

  if (html === original || /<script\b(?!\s+type="application\/ld\+json">)/i.test(html) || /<link\b[^>]*\bas="script"/i.test(html)) {
    throw new Error(`Unexpected scripts in ${route}. Check the static page before deployment.`);
  }

  await writeFile(file, html);
  console.log(`${route}: ${Buffer.byteLength(original) - Buffer.byteLength(html)} fewer HTML bytes, no browser runtime`);
}

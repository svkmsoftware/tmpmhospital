// Generates quality-comparison previews of every image in public/images,
// at several JPEG/PNG quality levels, without touching originals or resizing.
// Output: image-quality-previews/quality-<N>/<same relative path as original>
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC_DIR = path.join(__dirname, "..", "public", "images");
const OUT_BASE = path.join(__dirname, "..", "image-quality-previews");
const QUALITY_LEVELS = [85, 70, 50, 30];
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg"]);

function walk(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results = results.concat(walk(full));
    else results.push(full);
  }
  return results;
}

async function main() {
  const files = walk(SRC_DIR).filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()));
  console.log(`Found ${files.length} images.\n`);

  const summary = {};
  for (const q of QUALITY_LEVELS) summary[q] = { original: 0, compressed: 0, count: 0 };

  for (const file of files) {
    const rel = path.relative(SRC_DIR, file);
    const ext = path.extname(file).toLowerCase();
    const originalSize = fs.statSync(file).size;

    for (const quality of QUALITY_LEVELS) {
      const outDir = path.join(OUT_BASE, `quality-${quality}`, path.dirname(rel));
      fs.mkdirSync(outDir, { recursive: true });
      const outPath = path.join(outDir, path.basename(file));

      let pipeline = sharp(file);
      // No .resize() call anywhere — dimensions stay exactly as the source.
      pipeline = ext === ".png"
        ? pipeline.png({ quality, compressionLevel: 9, palette: true })
        : pipeline.jpeg({ quality, mozjpeg: true });

      await pipeline.toFile(outPath);

      const newSize = fs.statSync(outPath).size;
      summary[quality].original += originalSize;
      summary[quality].compressed += newSize;
      summary[quality].count++;
    }
  }

  console.log("=== Summary ===");
  for (const q of QUALITY_LEVELS) {
    const s = summary[q];
    const pct = ((1 - s.compressed / s.original) * 100).toFixed(1);
    console.log(
      `quality-${q}: ${s.count} files, ${(s.original / 1024 / 1024).toFixed(1)}MB -> ${(s.compressed / 1024 / 1024).toFixed(1)}MB  (${pct}% smaller)`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

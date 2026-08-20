const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const OUT_ROOT = path.join(__dirname, "..", "public", "images", "icons", "dept-icons-extracted");
const MASTER_DIR = path.join(OUT_ROOT, "PNG 500x500");

// Sizes that get a real, spec-compliant single-image .ico (ICO format's width/height
// byte fields cap at 256 — 0 in that byte means "256", there is no way to encode 512).
const ICO_SIZES = [24, 64, 128, 256];
// 512 exceeds what the .ico format can declare, so it's delivered as a plain PNG instead.
const PNG_ONLY_SIZES = [512];

// Build a single-image .ico file that embeds a PNG (Vista+ style, supported by
// Windows, browsers, and every modern icon viewer).
function buildIco(pngBuffer, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type = icon
  header.writeUInt16LE(1, 4); // 1 image

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 = 256)
  entry.writeUInt8(size >= 256 ? 0 : size, 1); // height (0 = 256)
  entry.writeUInt8(0, 2); // color count
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // planes
  entry.writeUInt16LE(32, 6); // bit count
  entry.writeUInt32LE(pngBuffer.length, 8); // bytes in resource
  entry.writeUInt32LE(header.length + entry.length, 12); // offset

  return Buffer.concat([header, entry, pngBuffer]);
}

async function main() {
  const files = fs.readdirSync(MASTER_DIR).filter((f) => f.endsWith(".png"));
  console.log(`Found ${files.length} master icons.\n`);

  for (const size of ICO_SIZES) {
    const dir = path.join(OUT_ROOT, `${size} px`);
    fs.mkdirSync(dir, { recursive: true });
    for (const file of files) {
      const slug = file.replace(/\.png$/, "");
      const pngBuffer = await sharp(path.join(MASTER_DIR, file))
        .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer();
      const ico = buildIco(pngBuffer, size);
      fs.writeFileSync(path.join(dir, `${slug}.ico`), ico);
    }
    console.log(`OK  ${size}x${size} -> ${files.length} .ico files in "${size} px/"`);
  }

  for (const size of PNG_ONLY_SIZES) {
    const dir = path.join(OUT_ROOT, `${size} px`);
    fs.mkdirSync(dir, { recursive: true });
    for (const file of files) {
      const slug = file.replace(/\.png$/, "");
      await sharp(path.join(MASTER_DIR, file))
        .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toFile(path.join(dir, `${slug}.png`));
    }
    console.log(`OK  ${size}x${size} -> ${files.length} .png files in "${size} px/" (.ico format can't exceed 256px, see note)`);
  }

  console.log(`\nAll done. Output root:\n${OUT_ROOT}`);
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});

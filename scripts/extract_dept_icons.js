const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const PAGES_DIR =
  "C:\\Users\\Dhiraj.Chaudhari\\AppData\\Local\\Temp\\claude\\d--Web-Dev-Data-tmpmhospital\\f8aa30b2-885f-46ea-8e3e-8e8174d1a54a\\scratchpad\\docx_extract\\pages";
const OUT_ROOT = path.join(__dirname, "..", "public", "images", "icons", "dept-icons-extracted");
const MASTER_DIR = path.join(OUT_ROOT, "PNG 500x500");

// [name, page, x0, x1, y0, y1]
const ICONS = [
  // page 1
  ["Oncology", "page01", 300, 685, 865, 1336],
  ["Cardiology", "page01", 978, 1338, 865, 1336],
  ["Gastroenterology", "page01", 1691, 2118, 865, 1336],
  ["Neurology", "page01", 168, 611, 1716, 2176],
  ["Urology", "page01", 944, 1342, 1716, 2176],
  ["Neuro Surgery", "page01", 1676, 2076, 1716, 2176],
  ["Assisted Reproduction - IVF", "page01", 253, 634, 2552, 2980],
  ["Nephrology", "page01", 932, 1357, 2552, 2980],
  ["Otolaryngology", "page01", 1665, 2093, 2552, 2980],
  // page 2
  ["Paediatrics", "page02", 260, 636, 635, 1059],
  ["General Surgery", "page02", 1008, 1361, 635, 1059],
  ["Gynaecology", "page02", 1723, 2062, 635, 1059],
  ["Internal Medicine", "page02", 315, 668, 1468, 1904],
  ["Emergency Care", "page02", 989, 1390, 1468, 1904],
  ["Orthopaedics", "page02", 1692, 2058, 1468, 1904],
  ["Radiology", "page02", 293, 651, 2283, 2732],
  ["Pathology labs", "page02", 948, 1348, 2283, 2732],
  ["Dental", "page02", 1774, 2143, 2283, 2732],
  // page 3
  ["Ophthalmology", "page03", 231, 659, 549, 975],
  ["Psychiatry", "page03", 987, 1393, 549, 975],
  ["Pulmonology", "page03", 1680, 2079, 549, 975],
  ["Laser Surgery (Brain and Spine)", "page03", 219, 650, 1437, 1901],
  ["Cardiac Sciences (CVTS)", "page03", 984, 1433, 1437, 1901],
  ["Neurosciences", "page03", 1707, 2171, 1437, 1901],
  ["Nephrology 2", "page03", 201, 686, 2424, 2883],
  ["Plastic Surgery", "page03", 986, 1394, 2424, 2883],
  ["Vascular Surgery", "page03", 1662, 2126, 2424, 2883],
  // page 4
  ["Paediatric Surgery", "page04", 271, 700, 423, 902],
  ["Urology 2", "page04", 998, 1467, 423, 902],
  ["Arthroscopy", "page04", 1731, 2141, 423, 902],
  ["Joint Replacement", "page04", 291, 764, 1251, 1766],
  ["Physiotherapy and Rehabilitation", "page04", 1007, 1496, 1251, 1766],
  ["Dialysis", "page04", 1755, 2236, 1251, 1766],
  ["Blood Bank", "page04", 293, 621, 2160, 2594],
];

function slugify(name) {
  return name
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "_");
}

const MARGIN = 20;
const CANVAS = 500;
const CONTENT_MAX = 430; // leaves ~35px margin on each side within the 500 canvas

async function main() {
  fs.mkdirSync(MASTER_DIR, { recursive: true });

  const results = [];
  for (const [name, page, x0, x1, y0, y1] of ICONS) {
    const srcPath = path.join(PAGES_DIR, `${page}.png`);
    const meta = await sharp(srcPath).metadata();
    const left = Math.max(0, x0 - MARGIN);
    const top = Math.max(0, y0 - MARGIN);
    const width = Math.min(meta.width - left, x1 - x0 + MARGIN * 2);
    const height = Math.min(meta.height - top, y1 - y0 + MARGIN * 2);

    const cropped = await sharp(srcPath).extract({ left, top, width, height }).png().toBuffer();
    const trimmed = await sharp(cropped)
      .trim({ background: "#ffffff", threshold: 10 })
      .png()
      .toBuffer();
    const trimmedMeta = await sharp(trimmed).metadata();

    const scale = CONTENT_MAX / Math.max(trimmedMeta.width, trimmedMeta.height);
    const newW = Math.round(trimmedMeta.width * scale);
    const newH = Math.round(trimmedMeta.height * scale);

    const resized = await sharp(trimmed).resize(newW, newH).toBuffer();

    const slug = slugify(name);
    const outPath = path.join(MASTER_DIR, `${slug}.png`);
    await sharp({
      create: {
        width: CANVAS,
        height: CANVAS,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      },
    })
      .composite([{ input: resized, gravity: "center" }])
      .png()
      .toFile(outPath);

    results.push({ name, slug, outPath, w: trimmedMeta.width, h: trimmedMeta.height });
    console.log(`OK  ${name.padEnd(35)} -> ${slug}.png  (trimmed ${trimmedMeta.width}x${trimmedMeta.height})`);
  }

  console.log(`\nDone. ${results.length} icons extracted to:\n${MASTER_DIR}`);
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});

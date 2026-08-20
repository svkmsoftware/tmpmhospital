const sharp = require("sharp");
const P =
  "C:\\Users\\Dhiraj.Chaudhari\\AppData\\Local\\Temp\\claude\\d--Web-Dev-Data-tmpmhospital\\f8aa30b2-885f-46ea-8e3e-8e8174d1a54a\\scratchpad\\docx_extract\\pages\\page01.png";

async function main() {
  const meta = await sharp(P).metadata();
  console.log("page meta", meta.width, meta.height);
  const x0 = 1691, x1 = 2118, y0 = 865, y1 = 1336, MARGIN = 20;
  const left = Math.max(0, x0 - MARGIN);
  const top = Math.max(0, y0 - MARGIN);
  const width = Math.min(meta.width - left, x1 - x0 + MARGIN * 2);
  const height = Math.min(meta.height - top, y1 - y0 + MARGIN * 2);
  console.log({ left, top, width, height });

  const cropped = await sharp(P).extract({ left, top, width, height }).png().toBuffer();
  console.log("cropped size", cropped.length);
  const cmeta = await sharp(cropped).metadata();
  console.log("cropped meta", cmeta.width, cmeta.height);

  try {
    const trimmed = await sharp(cropped).trim({ background: "#ffffff", threshold: 10 }).png().toBuffer();
    console.log("trimmed ok", await sharp(trimmed).metadata());
  } catch (e) {
    console.log("TRIM ERROR", e.message);
  }
}
main();

const sharp = require("sharp");
const path = require("path");

function segmentBands(hasArr, from, to, minLen = 10, maxGap = 25) {
  const bands = [];
  let start = null, gap = 0;
  for (let i = from; i <= to; i++) {
    if (hasArr[i]) { if (start === null) start = i; gap = 0; }
    else if (start !== null) {
      gap++;
      if (gap > maxGap) { bands.push([start, i - gap]); start = null; gap = 0; }
    }
  }
  if (start !== null) bands.push([start, to]);
  return bands.filter((b) => b[1] - b[0] > minLen);
}

async function main() {
  const file = process.argv[2];
  const yFrom = process.argv[3] ? parseInt(process.argv[3], 10) : null;
  const yTo = process.argv[4] ? parseInt(process.argv[4], 10) : null;
  const maxGap = process.argv[5] ? parseInt(process.argv[5], 10) : 25;

  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  function isInkAt(x, y) {
    const idx = (y * width + x) * channels;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2];
    return r < 250 || g < 250 || b < 250;
  }

  if (yFrom === null) {
    const rowHasInk = new Array(height).fill(false);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x += 2) {
        if (isInkAt(x, y)) { rowHasInk[y] = true; break; }
      }
    }
    const bands = segmentBands(rowHasInk, 0, height - 1);
    console.log(`${path.basename(file)} (${width}x${height}): row bands`);
    bands.forEach((b, i) => console.log(`  row ${i}: y=${b[0]}-${b[1]} (h=${b[1] - b[0]})`));
  } else {
    const colHasInk = new Array(width).fill(false);
    for (let x = 0; x < width; x++) {
      for (let y = yFrom; y <= yTo; y += 2) {
        if (isInkAt(x, y)) { colHasInk[x] = true; break; }
      }
    }
    const bands = segmentBands(colHasInk, 0, width - 1, 10, maxGap);
    console.log(`col bands within y=${yFrom}-${yTo}:`);
    bands.forEach((b, i) => console.log(`  col ${i}: x=${b[0]}-${b[1]} (w=${b[1] - b[0]})`));
  }
}
main();

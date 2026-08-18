/**
 * AxKit v2.0 — generate-seed-brand.js
 * Primary hex 하나로 Seed Primitive 94개 원본 스케일 중 가장 톤이 아름다운 10단계를 매칭하여
 * seed-seed-tokens.css 브랜드 override 섹션을 생성하는 도구.
 * 
 * 사용법:
 *   node generate-seed-brand.js --primary "#0066FF" --output ./seed-tokens.css
 */

const fs = require('fs');

const args = process.argv.slice(2);
function getArg(flag) {
  const idx = args.indexOf(flag);
  return idx !== -1 ? args[idx + 1] : null;
}

const primaryInput = getArg('--primary') || '#0066FF';
const outputPath = getArg('--output') || './seed-tokens.css';

// Seed Primitive Palettes (@seed-design/css@2.3.0 원본 10단계 스케일 그대로)
const SEED_PALETTES = {
  carrot: {
    100: "#FFF2EC", 200: "#FFE8DB", 300: "#FFD5C0", 400: "#FFB999", 500: "#FF9364",
    600: "#FF6600", 700: "#E14D00", 800: "#B93901", 900: "#862B00", 1000: "#471601"
  },
  blue: {
    100: "#EFF6FF", 200: "#E2EDFC", 300: "#CBDFFA", 400: "#AACEFD", 500: "#85B8FD",
    600: "#5E98FE", 700: "#217CF9", 800: "#135FCD", 900: "#0B4596", 1000: "#032451"
  },
  green: {
    100: "#EDFAF6", 200: "#D9F6E9", 300: "#B9E9D2", 400: "#7DDCB3", 500: "#42C593",
    600: "#10AB7D", 700: "#079171", 800: "#00745F", 900: "#075445", 1000: "#0A2B24"
  },
  red: {
    100: "#FDF0F0", 200: "#FDE7E7", 300: "#FED4D2", 400: "#FEB7B3", 500: "#FE928D",
    600: "#FC6A66", 700: "#FA342C", 800: "#CA1D13", 900: "#921708", 1000: "#4A1209"
  },
  yellow: {
    100: "#FFF7DE", 200: "#FDEFB9", 300: "#FBDC65", 400: "#E9C647", 500: "#D4AB28",
    600: "#C49725", 700: "#9B7821", 800: "#755B22", 900: "#4F3E1F", 1000: "#2C2512"
  },
  purple: {
    100: "#F5F3FE", 200: "#EFEAFE", 300: "#E1D8FF", 400: "#D0C0FF", 500: "#B8A1FF",
    600: "#9F84FB", 700: "#8969EA", 800: "#6D50CB", 900: "#50379B", 1000: "#29175D"
  }
};

function hexToRgb(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return [ (num >> 16) & 255, (num >> 8) & 255, num & 255 ];
}

function colorDistance(hex1, hex2) {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  return Math.sqrt(Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2));
}

let bestMatch = 'carrot';
let minDistance = Infinity;

for (const [name, steps] of Object.entries(SEED_PALETTES)) {
  const dist = colorDistance(primaryInput, steps[600]);
  if (dist < minDistance) {
    minDistance = dist;
    bestMatch = name;
  }
}

const matchedScale = SEED_PALETTES[bestMatch];

const cssContent = `/**
 * AxKit v2.0 — seed-seed-tokens.css (Brand Override)
 * Primary Hex (${primaryInput}) ➔ Seed Primitive [${bestMatch}] 10단계 스케일 자동 매칭
 */

:root {
  /* Brand Primitive Overrides (${bestMatch} Palette Match) */
  --seed-color-palette-carrot-100: ${matchedScale[100]};
  --seed-color-palette-carrot-200: ${matchedScale[200]};
  --seed-color-palette-carrot-300: ${matchedScale[300]};
  --seed-color-palette-carrot-400: ${matchedScale[400]};
  --seed-color-palette-carrot-500: ${matchedScale[500]};
  --seed-color-palette-carrot-600: ${primaryInput}; /* Original Primary Input */
  --seed-color-palette-carrot-700: ${matchedScale[700]};
  --seed-color-palette-carrot-800: ${matchedScale[800]};
  --seed-color-palette-carrot-900: ${matchedScale[900]};
  --seed-color-palette-carrot-1000: ${matchedScale[1000]};

  /* Brand Semantic Overrides */
  --seed-color-fg-brand: var(--seed-color-palette-carrot-600);
  --seed-color-bg-brand-solid: var(--seed-color-palette-carrot-600);
  --seed-color-bg-brand-solid-pressed: var(--seed-color-palette-carrot-700); /* [CSS :hover / :active로 자동 처리] */
  --seed-color-bg-brand-weak: var(--seed-color-palette-carrot-100);
  --seed-color-bg-brand-weak-pressed: var(--seed-color-palette-carrot-200); /* [CSS :hover / :active로 자동 처리] */
  --seed-color-stroke-brand-solid: var(--seed-color-palette-carrot-700);
}
`;

fs.writeFileSync(outputPath, cssContent, 'utf-8');
console.log(`✅ Seed Brand Override 생성 완료 (${primaryInput} ➔ ${bestMatch} 매칭)`);
console.log(`출력 파일: ${outputPath}`);

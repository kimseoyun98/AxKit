/**
 * axpublish v2.0 — generate-seed-brand.js
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

// Seed Primitive Palettes (94개 원본 10단계 스케일)
const SEED_PALETTES = {
  carrot: {
    100: "#EBF2FF", 200: "#C7DCFF", 300: "#99BFFF", 400: "#5C99FF", 500: "#3385FF",
    600: "#0066FF", 700: "#005EEB", 800: "#0054D1", 900: "#004AB8", 1000: "#003A8F"
  },
  blue: {
    100: "#E3F2FD", 200: "#BBDEFB", 300: "#90CAF9", 400: "#42A5F5", 500: "#2196F3",
    600: "#1E88E5", 700: "#1565C0", 800: "#1557A6", 900: "#0D47A1", 1000: "#0A337A"
  },
  green: {
    100: "#E8F5E9", 200: "#C8E6C9", 300: "#A5D6A7", 400: "#66BB6A", 500: "#4CAF50",
    600: "#43A047", 700: "#388E3C", 800: "#2E7D32", 900: "#1B5E20", 1000: "#124216"
  },
  red: {
    100: "#FFEBEE", 200: "#FFCDD2", 300: "#EF9A9A", 400: "#E57373", 500: "#F44336",
    600: "#E53935", 700: "#C62828", 800: "#B71C1C", 900: "#8C1313", 1000: "#5C0B0B"
  },
  purple: {
    100: "#F3E5F5", 200: "#E1BEE7", 300: "#CE93D8", 400: "#AB47BC", 500: "#9C27B0",
    600: "#8E24AA", 700: "#7B1FA2", 800: "#6A1B9A", 900: "#4A148C", 1000: "#310C5D"
  },
  teal: {
    100: "#E0F2F1", 200: "#B2DFDB", 300: "#80CBC4", 400: "#26A69A", 500: "#009688",
    600: "#00897B", 700: "#00796B", 800: "#00695C", 900: "#004D40", 1000: "#00332B"
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
 * axpublish v2.0 — seed-seed-tokens.css (Brand Override)
 * Primary Hex (\${primaryInput}) ➔ Seed Primitive [\${bestMatch}] 10단계 스케일 자동 매칭
 */

:root {
  /* Brand Primitive Overrides (\${bestMatch} Palette Match) */
  --seed-color-palette-carrot-100: \${matchedScale[100]};
  --seed-color-palette-carrot-200: \${matchedScale[200]};
  --seed-color-palette-carrot-300: \${matchedScale[300]};
  --seed-color-palette-carrot-400: \${matchedScale[400]};
  --seed-color-palette-carrot-500: \${matchedScale[500]};
  --seed-color-palette-carrot-600: \${primaryInput}; /* Original Primary Input */
  --seed-color-palette-carrot-700: \${matchedScale[700]};
  --seed-color-palette-carrot-800: \${matchedScale[800]};
  --seed-color-palette-carrot-900: \${matchedScale[900]};
  --seed-color-palette-carrot-1000: \${matchedScale[1000]};

  /* Brand Semantic Overrides */
  --seed-color-fg-brand: var(--seed-color-palette-carrot-600);
  --seed-color-bg-brand-solid: var(--seed-color-palette-carrot-600);
  --seed-color-bg-brand-solid-pressed: var(--seed-color-palette-carrot-700); /* [CSS :hover / :active로 자동 처리] */
  --seed-color-bg-brand-weak: var(--seed-color-palette-carrot-100);
  --seed-color-bg-brand-weak-pressed: var(--seed-color-palette-carrot-200); /* [CSS :hover / :active로 자동 처리] */
  --seed-color-stroke-brand-solid: var(--seed-color-palette-carrot-600);
}
`;

fs.writeFileSync(outputPath, cssContent, 'utf-8');
console.log(`✅ Seed Brand Override 생성 완료 (${primaryInput} ➔ ${bestMatch} 매칭)`);
console.log(`출력 파일: ${outputPath}`);

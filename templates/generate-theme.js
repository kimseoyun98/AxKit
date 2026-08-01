#!/usr/bin/env node
/**
 * ============================================================
 *  generate-theme.js — axlab 프로젝트 컬러 스케일 생성기
 *
 *  Usage:
 *    node generate-theme.js --primary "#FF7300" --secondary "#3C62DD"
 *    node generate-theme.js --primary "#FF7300" --secondary "#3C62DD" --output ./src/theme.css
 *
 *  작동 방식:
 *    1. 제공된 hex → HSL 변환
 *    2. HSL 명도/채도 조작으로 13단계 스케일 생성
 *    3. Semantic 토큰에 자동 매핑
 *    4. theme.css 파일 출력
 *
 *  스케일 규칙 (shade 50 = 입력값 기준):
 *    10: L -40%              (가장 어두운 tint, 거의 검정)
 *    20: L -30%
 *    30: L -20%
 *    40: L -9%               → --color-primary-heavy  (pressed)
 *    45: L -4%               → --color-primary-strong (hover)
 *    50: base                → --color-primary-normal (default)
 *    55: L +4%
 *    60: L +10%              → --color-inverse-primary (다크 배경용)
 *    70: L +21%, S -5%
 *    80: L +31%, S -10%
 *    90: L +39%, S -30%
 *    95: L +45%, S -50%
 *    99: L +49%, S -80%      (거의 흰색 tint)
 * ============================================================
 */

const fs   = require('fs');
const path = require('path');


/* ──────────────────────────────────────────────────────────
 *  CLI 인자 파싱
 * ────────────────────────────────────────────────────────── */
const args   = process.argv.slice(2);
const getArg = (flag) => {
  const idx = args.indexOf(flag);
  return idx !== -1 ? args[idx + 1] : null;
};

const primaryHex   = getArg('--primary');
const secondaryHex = getArg('--secondary');
const outputPath   = getArg('--output') || './theme.css';

if (!primaryHex || !secondaryHex) {
  console.error('\n❌ 인자가 부족합니다.\n');
  console.error('Usage:');
  console.error('  node generate-theme.js --primary "#HEX" --secondary "#HEX"');
  console.error('  node generate-theme.js --primary "#FF7300" --secondary "#3C62DD" --output ./src/theme.css\n');
  process.exit(1);
}

if (!/^#[0-9A-Fa-f]{6}$/.test(primaryHex) || !/^#[0-9A-Fa-f]{6}$/.test(secondaryHex)) {
  console.error('\n❌ hex 형식이 올바르지 않습니다. 예: #FF7300\n');
  process.exit(1);
}


/* ──────────────────────────────────────────────────────────
 *  컬러 변환 유틸리티
 * ────────────────────────────────────────────────────────── */

/** hex #RRGGBB → { r, g, b } (0–255) */
function hexToRgb(hex) {
  const c = hex.replace('#', '');
  return {
    r: parseInt(c.slice(0, 2), 16),
    g: parseInt(c.slice(2, 4), 16),
    b: parseInt(c.slice(4, 6), 16),
  };
}

/** { r, g, b } → { h (0–360), s (0–100), l (0–100) } */
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6;               break;
      case b: h = ((r - g) / d + 4) / 6;               break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/** h (0–360), s (0–100), l (0–100) → hex #RRGGBB */
function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k     = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);


/* ──────────────────────────────────────────────────────────
 *  스케일 생성
 * ────────────────────────────────────────────────────────── */

/**
 * 베이스 hex로부터 13단계 컬러 스케일 생성
 * @param {string} hex - 기준 hex (#RRGGBB), shade 50에 위치
 * @returns {{ [shade: number]: string }} - 각 shade의 hex 값
 */
function generateScale(hex) {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);

  // shade → { lightness delta, saturation delta }
  const offsets = {
    10: { lD: -40, sD:   0 },
    20: { lD: -30, sD:   0 },
    30: { lD: -20, sD:   0 },
    40: { lD:  -9, sD:   0 },   // heavy / pressed
    45: { lD:  -4, sD:   0 },   // strong / hover
    50: { lD:   0, sD:   0 },   // base (입력값)
    55: { lD:  +4, sD:   0 },
    60: { lD: +10, sD:   0 },   // inverse
    70: { lD: +21, sD:  -5 },
    80: { lD: +31, sD: -10 },
    90: { lD: +39, sD: -30 },
    95: { lD: +45, sD: -50 },
    99: { lD: +49, sD: -80 },
  };

  const scale = {};
  for (const [shade, { lD, sD }] of Object.entries(offsets)) {
    const newL = clamp(l + lD, 2, 98);
    const newS = clamp(s + sD, 0, 100);
    scale[shade] = hslToHex(h, newS, newL);
  }
  return scale;
}


/* ──────────────────────────────────────────────────────────
 *  theme.css 생성
 * ────────────────────────────────────────────────────────── */

function generateThemeCss(primaryHex, secondaryHex) {
  const p = generateScale(primaryHex);
  const s = generateScale(secondaryHex);
  const now = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

  return `/*
 * ============================================================
 *  theme.css — 프로젝트 컬러 Override
 *
 *  ⛔  자동 생성된 파일입니다. 직접 편집하지 마세요.
 *      재생성: node generate-theme.js --primary "${primaryHex}" --secondary "${secondaryHex}"
 *
 *  생성일시: ${now}
 *  Primary:   ${primaryHex}
 *  Secondary: ${secondaryHex}
 *
 *  로드 순서:
 *    1. tokens.css  (Seed Design 기본값)
 *    2. theme.css   (이 파일, primary/secondary override)
 * ============================================================
 */

:root {

  /* ════════════════════════════════════════════════════════
   *  PRIMARY SCALE — ${primaryHex}
   *  tokens.css의 blue 기반 primary를 이 프로젝트 컬러로 교체
   * ════════════════════════════════════════════════════════ */
  --color-primary-10: ${p[10]};
  --color-primary-20: ${p[20]};
  --color-primary-30: ${p[30]};
  --color-primary-40: ${p[40]};
  --color-primary-45: ${p[45]};
  --color-primary-50: ${p[50]};   /* base */
  --color-primary-55: ${p[55]};
  --color-primary-60: ${p[60]};
  --color-primary-70: ${p[70]};
  --color-primary-80: ${p[80]};
  --color-primary-90: ${p[90]};
  --color-primary-95: ${p[95]};
  --color-primary-99: ${p[99]};

  /* Semantic override */
  --color-primary-normal:  ${p[50]};   /* 기본 상태      */
  --color-primary-strong:  ${p[45]};   /* hover          */
  --color-primary-heavy:   ${p[40]};   /* pressed        */
  --color-inverse-primary: ${p[60]};   /* 다크 배경 위   */


  /* ════════════════════════════════════════════════════════
   *  SECONDARY SCALE — ${secondaryHex}
   *  tokens.css에 없던 새 컬러 추가 (보조/서비스 컬러)
   * ════════════════════════════════════════════════════════ */
  --color-secondary-10: ${s[10]};
  --color-secondary-20: ${s[20]};
  --color-secondary-30: ${s[30]};
  --color-secondary-40: ${s[40]};
  --color-secondary-45: ${s[45]};
  --color-secondary-50: ${s[50]};   /* base */
  --color-secondary-55: ${s[55]};
  --color-secondary-60: ${s[60]};
  --color-secondary-70: ${s[70]};
  --color-secondary-80: ${s[80]};
  --color-secondary-90: ${s[90]};
  --color-secondary-95: ${s[95]};
  --color-secondary-99: ${s[99]};

  /* Semantic */
  --color-secondary-normal:  ${s[50]};
  --color-secondary-strong:  ${s[45]};
  --color-secondary-heavy:   ${s[40]};
  --color-inverse-secondary: ${s[60]};

}
`;
}


/* ──────────────────────────────────────────────────────────
 *  실행
 * ────────────────────────────────────────────────────────── */

const css     = generateThemeCss(primaryHex, secondaryHex);
const outDir  = path.dirname(outputPath);

if (outDir && !fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(outputPath, css, 'utf-8');

console.log('\n✅ theme.css 생성 완료');
console.log(`   출력 경로:  ${path.resolve(outputPath)}`);
console.log(`   Primary:   ${primaryHex}`);
console.log(`   Secondary: ${secondaryHex}`);
console.log('\n로드 순서:');
console.log('   1. tokens.css');
console.log('   2. theme.css  ← 이 파일\n');

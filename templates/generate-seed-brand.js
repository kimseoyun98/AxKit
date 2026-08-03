#!/usr/bin/env node
/**
 * axpublish v2.0 — generate-seed-brand.js
 * Primary hex 하나로 seed-tokens.css 브랜드 섹션 자동 생성
 *
 * Usage:
 *   node generate-seed-brand.js --primary "#0066FF" --output ./seed-tokens.css
 */

const fs   = require('fs');
const path = require('path');

/* ── CLI 파싱 ─────────────────────────────────────────── */
const args = process.argv.slice(2);
const get  = (flag) => { const i = args.indexOf(flag); return i !== -1 ? args[i+1] : null; };

const primaryHex = (get('--primary') || '#0066FF').replace(/"/g,'');
const outputPath = get('--output') || './seed-tokens.css';

/* ── HSL 유틸 ─────────────────────────────────────────── */
function hexToHsl(hex) {
  const r = parseInt(hex.slice(1,3),16)/255;
  const g = parseInt(hex.slice(3,5),16)/255;
  const b = parseInt(hex.slice(5,7),16)/255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b);
  let h,s,l=(max+min)/2;
  if(max===min){h=s=0;}else{
    const d=max-min;
    s=l>0.5?d/(2-max-min):d/(max+min);
    switch(max){case r:h=((g-b)/d+(g<b?6:0))/6;break;
                case g:h=((b-r)/d+2)/6;break;
                case b:h=((r-g)/d+4)/6;break;}
  }
  return [Math.round(h*360), Math.round(s*100), Math.round(l*100)];
}

function hslToHex(h,s,l) {
  s/=100; l/=100;
  const k=n=>((n+h/30)%12);
  const a=s*Math.min(l,1-l);
  const f=n=>l-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1)));
  return '#'+[f(0),f(8),f(4)].map(x=>Math.round(x*255).toString(16).padStart(2,'0')).join('');
}

/* ── 13단계 팔레트 생성 ─────────────────────────────────── */
function generatePalette(hex) {
  const [h,s,l] = hexToHsl(hex);
  // Seed carrot 매핑 (100=밝음, 900=어두움)
  const stops = {
    100: [h, Math.max(s-30,10), Math.min(l+38,96)],
    200: [h, Math.max(s-20,15), Math.min(l+28,90)],
    300: [h, Math.max(s-10,20), Math.min(l+18,82)],
    400: [h, s, Math.min(l+10,70)],
    500: [h, s, Math.min(l+5,60)],
    600: [h, s, l],                           // ← 입력값
    700: [h, Math.min(s+5,100), Math.max(l-8,10)],
    800: [h, Math.min(s+8,100), Math.max(l-16,8)],
    900: [h, Math.min(s+10,100), Math.max(l-24,5)],
  };
  const result = {};
  for(const [step,[hh,ss,ll]] of Object.entries(stops)){
    result[step] = hslToHex(hh,ss,ll);
  }
  return result;
}

/* ── 생성 ────────────────────────────────────────────── */
const palette = generatePalette(primaryHex);

const css = `/**
 * axpublish v2.0 — Brand Token Override
 * Generated: ${new Date().toISOString().slice(0,10)}
 * Primary: ${primaryHex}
 *
 * Usage:
 *   @import "@seed-design/css/all.css";
 *   @import "./seed-tokens.css";
 *
 * HTML: <html data-seed data-seed-color-scheme="system">
 */

[data-seed] {
  /* ── Primary (carrot override → 내 브랜드) ── */
  --seed-color-palette-carrot-100: ${palette[100]};
  --seed-color-palette-carrot-200: ${palette[200]};
  --seed-color-palette-carrot-300: ${palette[300]};
  --seed-color-palette-carrot-400: ${palette[400]};
  --seed-color-palette-carrot-500: ${palette[500]};
  --seed-color-palette-carrot-600: ${palette[600]};   /* Primary/Normal */
  --seed-color-palette-carrot-700: ${palette[700]};   /* Primary/Hover  */
  --seed-color-palette-carrot-800: ${palette[800]};   /* Primary/Pressed */
  --seed-color-palette-carrot-900: ${palette[900]};
}

/* ── 레이아웃 브레이크포인트 (타이포는 Seed clamp() 자동) ── */
:root {
  --layout-max-width: 1440px;
  --layout-padding:   var(--seed-dimension-x5);   /* 20px mobile */
}
@media (min-width: 768px) {
  :root { --layout-padding: var(--seed-dimension-x12); } /* 48px tablet */
}
@media (min-width: 1280px) {
  :root { --layout-padding: var(--seed-dimension-x16); } /* 64px desktop */
}
`;

fs.writeFileSync(path.resolve(outputPath), css, 'utf8');

console.log(`
✅ seed-tokens.css 생성 완료
   Primary:  ${primaryHex}
   Palette:
     carrot-100: ${palette[100]}  (tint)
     carrot-600: ${palette[600]}  (normal)
     carrot-700: ${palette[700]}  (hover)
     carrot-800: ${palette[800]}  (pressed)
   Output: ${outputPath}

다음 단계:
  1. import "@seed-design/css/all.css";   ← HTML 또는 JS에서
  2. import "./seed-tokens.css";
  3. <html data-seed data-seed-color-scheme="system">
`);

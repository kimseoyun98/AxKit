/**
 * @file scripts/generate-figma-action-button.js
 * @description Code-to-Figma Component Set Template Generator (1st Prototype: ActionButton)
 * 
 * Generates Figma Plugin Code / JSON spec to automatically create a Figma Component Set Node
 * with 100% matched Variant Property names matching React SEED 2.0 ActionButton props.
 */

const fs = require('fs');
const path = require('path');

// 1. ActionButton Variant Matrix (Matching React SEED 2.0 ActionButton)
const ACTION_BUTTON_VARIANTS = {
  name: "ActionButton",
  properties: {
    variant: ["brandSolid", "neutralSolid", "neutralWeak", "neutralOutline", "criticalSolid", "criticalWeak"],
    size: ["large", "medium", "small", "xsmall"],
    disabled: ["false", "true"],
    loading: ["false", "true"]
  },
  styleMapping: {
    brandSolid: { bg: "--seed-color-bg-brand-solid", fg: "--seed-color-fg-neutral-inverted" },
    neutralSolid: { bg: "--seed-color-bg-neutral-solid", fg: "--seed-color-fg-neutral-inverted" },
    neutralWeak: { bg: "--seed-color-bg-neutral-weak", fg: "--seed-color-fg-neutral" },
    neutralOutline: { bg: "--seed-color-bg-layer-default", fg: "--seed-color-fg-neutral", border: "--seed-color-stroke-neutral-weak" },
    criticalSolid: { bg: "--seed-color-bg-critical-solid", fg: "--seed-color-fg-neutral-inverted" },
    criticalWeak: { bg: "--seed-color-bg-critical-weak", fg: "--seed-color-fg-critical" }
  },
  sizeMapping: {
    large: { height: 52, px: 20, fontStyle: "t6Bold" },
    medium: { height: 44, px: 16, fontStyle: "t5Bold" },
    small: { height: 36, px: 12, fontStyle: "t4Bold" },
    xsmall: { height: 28, px: 8, fontStyle: "t2Bold" }
  }
};

function generateFigmaPluginCode(spec) {
  return `// ============================================================================
// Figma Plugin / Scripter Code: Auto-Generate ActionButton ComponentSet
// AxKit SEED 2.0 Code-to-Figma Template Generator (1st Prototype)
// ============================================================================

(async function createActionButtonComponentSet() {
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });

  const spec = ${JSON.stringify(spec, null, 2)};
  const components = [];
  
  let xOffset = 0;
  let yOffset = 0;
  const GAP_X = 140;
  const GAP_Y = 70;
  let colCount = 0;

  for (const variant of spec.properties.variant) {
    for (const size of spec.properties.size) {
      for (const disabled of spec.properties.disabled) {
        for (const loading of spec.properties.loading) {
          
          const sizeMeta = spec.sizeMapping[size];

          // Create Component Frame
          const comp = figma.createComponent();
          comp.name = \`variant=\${variant}, size=\${size}, disabled=\${disabled}, loading=\${loading}\`;
          
          // Layout & Sizing
          comp.layoutMode = "HORIZONTAL";
          comp.primaryAxisAlignItems = "CENTER";
          comp.counterAxisAlignItems = "CENTER";
          comp.paddingLeft = sizeMeta.px;
          comp.paddingRight = sizeMeta.px;
          comp.height = sizeMeta.height;
          comp.primaryAxisSizingMode = "AUTO";
          comp.counterAxisSizingMode = "FIXED";
          comp.cornerRadius = 8;

          // Text Node
          const textNode = figma.createText();
          textNode.fontName = { family: "Inter", style: "Bold" };
          textNode.characters = loading === "true" ? "로딩 중..." : "버튼 라벨";
          textNode.fontSize = size === "large" ? 18 : size === "medium" ? 16 : size === "small" ? 14 : 12;
          
          comp.appendChild(textNode);
          
          // Positon in grid
          comp.x = xOffset;
          comp.y = yOffset;
          
          colCount++;
          xOffset += GAP_X;
          if (colCount % 8 === 0) {
            xOffset = 0;
            yOffset += GAP_Y;
          }

          components.push(comp);
        }
      }
    }
  }

  // Combine into ComponentSetNode
  const componentSet = figma.combineAsVariants(components, figma.currentPage);
  componentSet.name = spec.name;
  
  figma.viewport.scrollAndZoomIntoView([componentSet]);
  figma.notify("✅ ActionButton ComponentSet 템플릿(96개 Variant)이 성공적으로 피그마에 생성되었습니다!");
})();
`;
}

const pluginCode = generateFigmaPluginCode(ACTION_BUTTON_VARIANTS);
const outputPath = path.join(__dirname, 'figma-action-button-plugin.js');

fs.writeFileSync(outputPath, pluginCode, 'utf-8');
console.log(`[Success] ActionButton Figma Plugin Code generated at: ${outputPath}`);

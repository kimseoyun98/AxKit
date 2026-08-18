import { IconChevronDownLine } from '@karrotmarket/react-monochrome-icon';
import { useState, useEffect } from 'react';
import { Sec } from '../components/UI';

const actionButtonPluginCode = `// ============================================================================
// Figma Plugin / Scripter Code: Auto-Generate ActionButton ComponentSet
// AxKit SEED 2.0 Code-to-Figma Template Generator (1st Prototype)
// ============================================================================

(async function createActionButtonComponentSet() {
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });

  const spec = {
    name: "ActionButton",
    properties: {
      variant: ["brandSolid", "neutralSolid", "neutralWeak", "neutralOutline", "criticalSolid", "criticalWeak"],
      size: ["large", "medium", "small", "xsmall"],
      disabled: ["false", "true"],
      loading: ["false", "true"]
    },
    sizeMapping: {
      large: { height: 52, px: 20 },
      medium: { height: 44, px: 16 },
      small: { height: 36, px: 12 },
      xsmall: { height: 28, px: 8 }
    }
  };
  
  const components = [];
  let xOffset = 0, yOffset = 0, colCount = 0;
  const GAP_X = 140, GAP_Y = 70;

  for (const variant of spec.properties.variant) {
    for (const size of spec.properties.size) {
      for (const disabled of spec.properties.disabled) {
        for (const loading of spec.properties.loading) {
          const sizeMeta = spec.sizeMapping[size];
          const comp = figma.createComponent();
          comp.name = \`variant=\${variant}, size=\${size}, disabled=\${disabled}, loading=\${loading}\`;
          comp.layoutMode = "HORIZONTAL";
          comp.primaryAxisAlignItems = "CENTER";
          comp.counterAxisAlignItems = "CENTER";
          comp.paddingLeft = sizeMeta.px;
          comp.paddingRight = sizeMeta.px;
          comp.height = sizeMeta.height;
          comp.cornerRadius = 8;

          const textNode = figma.createText();
          textNode.fontName = { family: "Inter", style: "Bold" };
          textNode.characters = loading === "true" ? "로딩 중..." : "버튼 라벨";
          textNode.fontSize = size === "large" ? 18 : size === "medium" ? 16 : size === "small" ? 14 : 12;
          
          comp.appendChild(textNode);
          comp.x = xOffset; comp.y = yOffset;
          
          colCount++;
          xOffset += GAP_X;
          if (colCount % 8 === 0) { xOffset = 0; yOffset += GAP_Y; }
          components.push(comp);
        }
      }
    }
  }

  const componentSet = figma.combineAsVariants(components, figma.currentPage);
  componentSet.name = spec.name;
  figma.viewport.scrollAndZoomIntoView([componentSet]);
  figma.notify("✅ ActionButton ComponentSet 템플릿(96개 Variant)이 성공적으로 생성되었습니다!");
})();`;

export function CodeToFigmaSection() {
  const [expanded, setExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        try {
          const targetEl = document.querySelector(hash);
          if (targetEl && (targetEl.id === 'a-code-to-figma' || targetEl.closest('#a-code-to-figma'))) {
            setExpanded(true);
          }
        } catch (e) {}
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(actionButtonPluginCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const prototypeList = [
    {
      id: 'action-button',
      name: 'ActionButton',
      specs: '96개 Variant (6종 Variant × 4종 Size × Disabled × Loading)',
      props: 'variant, size, disabled, loading',
      code: actionButtonPluginCode,
    },
    {
      id: 'field-button',
      name: 'FieldButton',
      specs: 'Input Button & Bottom Sheet 연동 템플릿',
      props: 'variant, size, tone, disabled',
    },
    {
      id: 'text-field',
      name: 'TextField',
      specs: 'Header - Input - Footer 3단 구조 템플릿',
      props: 'variant, size, disabled, invalid',
    },
  ];

  return (
    <Sec id="a-code-to-figma">
      <h2
        onClick={() => setExpanded(!expanded)}
        style={{
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          userSelect: 'none',
        }}
      >
        <span>Code-to-Figma</span>
        <IconChevronDownLine
          style={{
            width: 16,
            height: 16,
            color: 'var(--seed-color-fg-neutral-subtle, #94A3B8)',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            flexShrink: 0,
          }}
        />
      </h2>
      <p>
        React SEED 2.0 코드 속성을 읽어 피그마 Component Set 템플릿 노드를 자동 생성하는 스크립트 모움입니다.
      </p>

      {expanded && (
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {prototypeList.map((item) => (
            <div
              key={item.id}
              style={{
                border: '1px solid var(--seed-color-stroke-neutral-weak, #E2E8F0)',
                borderRadius: 8,
                padding: '12px 16px',
                backgroundColor: 'var(--seed-color-bg-layer-default, #FFFFFF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 240 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--seed-color-fg-neutral, #0F172A)' }}>
                  {item.name}
                </div>
                <div style={{ fontSize: 12, color: 'var(--seed-color-fg-neutral-subtle, #64748B)' }}>
                  {item.specs}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {item.code ? (
                  <button
                    onClick={handleCopyCode}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 6,
                      border: 'none',
                      backgroundColor: 'var(--seed-color-bg-brand-solid, #FF6E1D)',
                      color: '#FFFFFF',
                      fontWeight: 600,
                      fontSize: 12,
                      cursor: 'pointer',
                    }}
                  >
                    {copied ? '✓ 코드 복사됨' : '피그마 코드 복사'}
                  </button>
                ) : (
                  <span style={{ fontSize: 12, color: 'var(--seed-color-fg-neutral-subtle, #94A3B8)', padding: '6px 0' }}>
                    준비 중
                  </span>
                )}
                <a
                  href="https://www.figma.com"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: '6px 12px',
                    borderRadius: 6,
                    border: '1px solid var(--seed-color-stroke-neutral-weak, #CBD5E1)',
                    backgroundColor: 'var(--seed-color-bg-layer-default, #FFFFFF)',
                    color: 'var(--seed-color-fg-neutral, #334155)',
                    fontWeight: 600,
                    fontSize: 12,
                    textDecoration: 'none',
                  }}
                >
                  Figma ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </Sec>
  );
}

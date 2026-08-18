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
      status: 'DONE',
      statusLabel: '1st 프로토타입 완료',
      variantsCount: '96개 Variant',
      props: 'variant, size, disabled, loading',
      desc: 'React SEED 2.0 ActionButton 스펙을 읽어 6종 Variant × 4종 Size × 2종 Disabled × 2종 Loading 조합의 96개 피그마 템플릿 노드를 100% 1:1 이름 동기화로 자동 생성합니다.',
      figmaUrl: 'https://www.figma.com',
      codeAvailable: true,
    },
    {
      id: 'field-button',
      name: 'FieldButton (InputButton)',
      status: 'IN_PROGRESS',
      statusLabel: '프로토타입 설계 중',
      variantsCount: '48개 Variant 예정',
      props: 'variant, size, tone, disabled, clearButton',
      desc: '하단 피커/바텀시트 연동용 Input Button 스펙을 읽어 피그마 Component Set 및 Chip Value 노드 템플릿을 자동으로 빌드합니다.',
      figmaUrl: 'https://www.figma.com',
      codeAvailable: false,
    },
    {
      id: 'text-field',
      name: 'TextField',
      status: 'PLANNED',
      statusLabel: '대기 중',
      variantsCount: '32개 Variant 예정',
      props: 'variant, size, disabled, readOnly, invalid',
      desc: 'Text Input / Textarea 전용 Header-Input-Footer 3단 템플릿 구조를 피그마에 자동 노드 생성합니다.',
      figmaUrl: 'https://www.figma.com',
      codeAvailable: false,
    },
    {
      id: 'dialog-select',
      name: 'Dialog & Select',
      status: 'PLANNED',
      statusLabel: '대기 중',
      variantsCount: '모달 템플릿 예정',
      props: 'variant, size, state',
      desc: '오버레이 컴포넌트 및 셀렉트 드롭다운 메뉴 파이프라인 생성 예정.',
      figmaUrl: 'https://www.figma.com',
      codeAvailable: false,
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
        <span>Code-to-Figma Auto Generator</span>
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
        React SEED 2.0 코드 속성(Props)을 읽어 피그마 우측 패널의 Variant Property와 100% 1:1 일치하는 피그마 Component Set 템플릿 노드를 자동 생성하는 파이프라인 및 프로토타입 제작 현황입니다.
      </p>

      {expanded && (
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Status Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
            {prototypeList.map((item) => (
              <div
                key={item.id}
                style={{
                  border: item.status === 'DONE' ? '2px solid var(--seed-color-stroke-brand-default, #FF6E1D)' : '1px solid var(--seed-color-stroke-neutral-weak, #E2E8F0)',
                  borderRadius: 12,
                  padding: 20,
                  backgroundColor: 'var(--seed-color-bg-layer-default, #FFFFFF)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  boxShadow: item.status === 'DONE' ? '0 4px 14px rgba(255,110,29,0.08)' : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--seed-color-fg-neutral, #0F172A)' }}>
                    {item.name}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 999,
                      backgroundColor: item.status === 'DONE' ? 'var(--seed-color-bg-brand-solid, #FF6E1D)' : item.status === 'IN_PROGRESS' ? 'var(--seed-color-bg-neutral-weak, #F1F5F9)' : 'var(--seed-color-bg-layer-basement, #F8FAFC)',
                      color: item.status === 'DONE' ? '#FFFFFF' : item.status === 'IN_PROGRESS' ? 'var(--seed-color-fg-neutral, #334155)' : 'var(--seed-color-fg-neutral-subtle, #94A3B8)',
                    }}
                  >
                    {item.statusLabel}
                  </span>
                </div>

                <div style={{ fontSize: 13, color: 'var(--seed-color-fg-neutral-subtle, #64748B)', lineHeight: 1.5 }}>
                  {item.desc}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12 }}>
                  <div>
                    <strong style={{ color: 'var(--seed-color-fg-neutral)' }}>속성 매핑:</strong> <code>{item.props}</code>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--seed-color-fg-neutral)' }}>생성 스펙:</strong> <span style={{ color: 'var(--seed-color-fg-brand, #FF6E1D)', fontWeight: 600 }}>{item.variantsCount}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8, marginTop: 'auto', paddingTop: 8 }}>
                  {item.codeAvailable && (
                    <button
                      onClick={handleCopyCode}
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        borderRadius: 6,
                        border: 'none',
                        backgroundColor: 'var(--seed-color-bg-brand-solid, #FF6E1D)',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: 'pointer',
                        transition: 'opacity 0.2s ease',
                      }}
                    >
                      {copied ? '✓ 피그마 코드 복사됨!' : '⚡ 피그마 실행 코드 복사'}
                    </button>
                  )}
                  <a
                    href={item.figmaUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      padding: '8px 12px',
                      borderRadius: 6,
                      border: '1px solid var(--seed-color-stroke-neutral-weak, #CBD5E1)',
                      backgroundColor: 'var(--seed-color-bg-layer-default, #FFFFFF)',
                      color: 'var(--seed-color-fg-neutral, #0F172A)',
                      fontWeight: 600,
                      fontSize: 13,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    피그마 템플릿 열기 ↗
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Guide Card */}
          <div
            style={{
              padding: 16,
              borderRadius: 8,
              backgroundColor: 'var(--seed-color-bg-layer-basement, #F8FAFC)',
              border: '1px solid var(--seed-color-stroke-neutral-weak, #E2E8F0)',
              fontSize: 13,
              lineHeight: 1.6,
              color: 'var(--seed-color-fg-neutral, #334155)',
            }}
          >
            <strong>💡 Figma Plugin 실행 방법:</strong>
            <ol style={{ margin: '8px 0 0 18px', padding: 0 }}>
              <li>상단 <strong>[⚡ 피그마 실행 코드 복사]</strong> 버튼을 클릭합니다.</li>
              <li>Figma 메뉴 ➔ <code>Plugins</code> ➔ <code>Development</code> ➔ <code>Open Console</code> (또는 Scripter 플러그인)을 엽니다.</li>
              <li>콘솔창에 복사한 코드를 붙여넣고 <strong>Enter</strong>를 누르면 96개 ActionButton ComponentSet 노드가 피그마에 즉시 자동 생성됩니다!</li>
            </ol>
          </div>
        </div>
      )}
    </Sec>
  );
}

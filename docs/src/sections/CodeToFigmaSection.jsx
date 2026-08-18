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
      id: 'alertdialog',
      index: 1,
      name: 'AlertDialog',
      specs: '알럿 다이얼로그 모달 템플릿',
      props: 'variant, size, tone',
      hasCode: false,
    },
    {
      id: 'avatar',
      index: 2,
      name: 'Avatar',
      specs: '아바타 프로필 이미지 & 이니셜 템플릿',
      props: 'size, shape, badge',
      hasCode: false,
    },
    {
      id: 'accordion',
      index: 3,
      name: 'Accordion',
      specs: '아코디언 접기/펼치기 패널 템플릿',
      props: 'variant, size',
      hasCode: false,
    },
    {
      id: 'actionbutton',
      index: 4,
      name: 'ActionButton',
      specs: '96개 Variant (6종 Variant × 4종 Size × Disabled × Loading)',
      props: 'variant, size, disabled, loading',
      hasCode: true,
    },
    {
      id: 'attachment',
      index: 5,
      name: 'Attachment',
      specs: '첨부파일 칩 & 미리보기 템플릿',
      props: 'variant, size, closable',
      hasCode: false,
    },
    {
      id: 'badge',
      index: 6,
      name: 'Badge',
      specs: '상태 & 카운트 배지 템플릿',
      props: 'variant, size, tone',
      hasCode: false,
    },
    {
      id: 'bottomsheet',
      index: 7,
      name: 'BottomSheet',
      specs: '하단 시트 바텀시트 모달 템플릿',
      props: 'size, handle, snap',
      hasCode: false,
    },
    {
      id: 'callout',
      index: 8,
      name: 'Callout',
      specs: '강조 안내 콜아웃 박스 템플릿',
      props: 'tone, variant',
      hasCode: false,
    },
    {
      id: 'checkbox',
      index: 9,
      name: 'Checkbox',
      specs: '체크박스 컨트롤 & 그룹 템플릿',
      props: 'size, disabled, invalid',
      hasCode: false,
    },
    {
      id: 'chip',
      index: 10,
      name: 'Chip',
      specs: '필터 & 선택 칩 템플릿',
      props: 'variant, size, selected',
      hasCode: false,
    },
    {
      id: 'contentplaceholder',
      index: 11,
      name: 'ContentPlaceholder',
      specs: '스켈레톤 콘텐츠 플레이스홀더 템플릿',
      props: 'variant, shape',
      hasCode: false,
    },
    {
      id: 'contextualfloatingbutton',
      index: 12,
      name: 'ContextualFloatingButton',
      specs: '컨텍스트 플로팅 액션 버튼 템플릿',
      props: 'size, tone',
      hasCode: false,
    },
    {
      id: 'datepicker',
      index: 13,
      name: 'DatePicker',
      specs: '달력 날짜 피커 템플릿',
      props: 'mode, range, size',
      hasCode: false,
    },
    {
      id: 'dialog',
      index: 14,
      name: 'Dialog',
      specs: '표준 범용 다이얼로그 모달 템플릿',
      props: 'size, backdrop',
      hasCode: false,
    },
    {
      id: 'divider',
      index: 15,
      name: 'Divider',
      specs: '구분선 템플릿',
      props: 'orientation, tone',
      hasCode: false,
    },
    {
      id: 'fieldbutton',
      index: 16,
      name: 'FieldButton',
      specs: 'Input Button & 바텀시트 연동 템플릿',
      props: 'variant, size, tone, disabled',
      hasCode: false,
    },
    {
      id: 'floatingactionbutton',
      index: 17,
      name: 'FloatingActionButton',
      specs: '플로팅 FAB 버튼 템플릿',
      props: 'size, extended',
      hasCode: false,
    },
    {
      id: 'footer',
      index: 18,
      name: 'Footer',
      specs: '푸터 4종 프리셋 템플릿 (Minimal ~ Full Specs)',
      props: 'variant, layout',
      hasCode: false,
    },
    {
      id: 'helpbubble',
      index: 19,
      name: 'HelpBubble',
      specs: '말풍선 툴팁 헬프버블 템플릿',
      props: 'placement, closeButton',
      hasCode: false,
    },
    {
      id: 'identityplaceholder',
      index: 20,
      name: 'IdentityPlaceholder',
      specs: '사용자 이니셜/아바타 플레이스홀더 템플릿',
      props: 'size, shape',
      hasCode: false,
    },
    {
      id: 'imageframe',
      index: 21,
      name: 'ImageFrame',
      specs: '이미지 프레임 & 썸네일 템플릿',
      props: 'ratio, radius',
      hasCode: false,
    },
    {
      id: 'progresscircle',
      index: 22,
      name: 'ProgressCircle',
      specs: '원형 로딩 프로그레스 인디케이터 템플릿',
      props: 'size, value',
      hasCode: false,
    },
    {
      id: 'list',
      index: 23,
      name: 'List',
      specs: '리스트 및 아이템 템플릿',
      props: 'variant, size',
      hasCode: false,
    },
    {
      id: 'listheader',
      index: 24,
      name: 'ListHeader',
      specs: '리스트 섹션 헤더 템플릿',
      props: 'title, action',
      hasCode: false,
    },
    {
      id: 'menu',
      index: 25,
      name: 'Menu',
      specs: '드롭다운 메뉴 및 그룹 템플릿',
      props: 'size, placement',
      hasCode: false,
    },
    {
      id: 'notificationbadge',
      index: 26,
      name: 'NotificationBadge',
      specs: '알림 카운트 배지 템플릿',
      props: 'count, max',
      hasCode: false,
    },
    {
      id: 'pagebanner',
      index: 27,
      name: 'PageBanner',
      specs: '페이지 상단 배너 템플릿',
      props: 'variant, dismissible',
      hasCode: false,
    },
    {
      id: 'quantitypicker',
      index: 28,
      name: 'QuantityPicker',
      specs: '수량 수치 피커 템플릿',
      props: 'size, min, max',
      hasCode: false,
    },
    {
      id: 'radiogroup',
      index: 29,
      name: 'RadioGroup',
      specs: '라디오 단일 선택 그룹 템플릿',
      props: 'size, disabled',
      hasCode: false,
    },
    {
      id: 'reactionbutton',
      index: 30,
      name: 'ReactionButton',
      specs: '좋아요/리액션 버튼 템플릿',
      props: 'count, active',
      hasCode: false,
    },
    {
      id: 'resultsection',
      index: 31,
      name: 'ResultSection',
      specs: '결과/성공/실패 안내 섹션 템플릿',
      props: 'status, title',
      hasCode: false,
    },
    {
      id: 'segmentedcontrol',
      index: 32,
      name: 'SegmentedControl',
      specs: '세그먼티드 토글 컨트롤 템플릿',
      props: 'size, value',
      hasCode: false,
    },
    {
      id: 'selectbox',
      index: 33,
      name: 'SelectBox',
      specs: '체크/라디오 셀렉트 박스 그룹 템플릿',
      props: 'variant, state',
      hasCode: false,
    },
    {
      id: 'select',
      index: 34,
      name: 'Select',
      specs: '드롭다운 셀렉트 템플릿',
      props: 'size, placeholder',
      hasCode: false,
    },
    {
      id: 'taggroup',
      index: 35,
      name: 'TagGroup',
      specs: '태그 그룹 템플릿',
      props: 'variant, closable',
      hasCode: false,
    },
    {
      id: 'textfield',
      index: 36,
      name: 'TextField',
      specs: 'Header-Input-Footer 3단 텍스트 필드 템플릿',
      props: 'variant, size, disabled, invalid',
      hasCode: false,
    },
    {
      id: 'sidepanel',
      index: 37,
      name: 'SidePanel',
      specs: '사이드 패널 드로어 템플릿',
      props: 'placement, size',
      hasCode: false,
    },
    {
      id: 'skeleton',
      index: 38,
      name: 'Skeleton',
      specs: '스켈레톤 로딩 템플릿',
      props: 'variant, animation',
      hasCode: false,
    },
    {
      id: 'slider',
      index: 39,
      name: 'Slider',
      specs: '슬라이더 수치 조절 템플릿',
      props: 'size, min, max',
      hasCode: false,
    },
    {
      id: 'snackbar',
      index: 40,
      name: 'Snackbar',
      specs: '스낵바 알림 토스트 템플릿',
      props: 'tone, action',
      hasCode: false,
    },
    {
      id: 'switch',
      index: 41,
      name: 'Switch',
      specs: '스위치 토글 템플릿',
      props: 'size, disabled',
      hasCode: false,
    },
    {
      id: 'tabs',
      index: 42,
      name: 'Tabs',
      specs: '탭 네비게이션 템플릿',
      props: 'variant, size',
      hasCode: false,
    },
    {
      id: 'chiptabs',
      index: 43,
      name: 'ChipTabs',
      specs: '칩 스타일 탭 네비게이션 템플릿',
      props: 'size, selected',
      hasCode: false,
    },
    {
      id: 'loadingindicator',
      index: 44,
      name: 'LoadingIndicator',
      specs: '로딩 애니메이션 인디케이터 템플릿',
      props: 'size, tone',
      hasCode: false,
    },
    {
      id: 'responsivedialog',
      index: 45,
      name: 'ResponsiveDialog',
      specs: '반응형 다이얼로그 모달 템플릿',
      props: 'breakpoint, size',
      hasCode: false,
    },
    {
      id: 'responsivesidepanel',
      index: 46,
      name: 'ResponsiveSidePanel',
      specs: '반응형 사이드 패널 템플릿',
      props: 'breakpoint, position',
      hasCode: false,
    },
    {
      id: 'swipeablemenusheet',
      index: 47,
      name: 'SwipeableMenuSheet',
      specs: '스와이프 바텀 시트 메뉴 템플릿',
      props: 'snap, handle',
      hasCode: false,
    },
    {
      id: 'timepicker',
      index: 48,
      name: 'TimePicker',
      specs: '12시간제 스크롤 타임 피커 템플릿',
      props: 'format, step',
      hasCode: false,
    },
    {
      id: 'topnavigation',
      index: 49,
      name: 'TopNavigation',
      specs: '상단 네비게이션 바 템플릿',
      props: 'variant, title',
      hasCode: false,
    },
    {
      id: 'sidenavigation',
      index: 50,
      name: 'SideNavigation',
      specs: '사이드 메인 네비게이션 템플릿',
      props: 'collapsed, active',
      hasCode: false,
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
        <span>Code-to-Figma (50)</span>
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
        React SEED 2.0 50개 UI 컴포넌트 코드 속성을 읽어 피그마 Component Set 템플릿 노드를 자동 생성하는 스크립트 모음입니다. Component Gallery 50개 항목과 1:1 동일한 순서로 구성되어 있습니다.
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 280 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--seed-color-fg-neutral-subtle, #94A3B8)', minWidth: 24 }}>
                  #{item.index}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--seed-color-fg-neutral, #0F172A)' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--seed-color-fg-neutral-subtle, #64748B)' }}>
                    {item.specs}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {item.hasCode ? (
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
                    {copied ? '✓ Copied' : 'Copy Code'}
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

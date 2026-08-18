import { IconChevronDownLine } from '@karrotmarket/react-monochrome-icon';
import { useState, useEffect } from 'react';
import { Sec, TokenTable, Notice , ChipInfo} from '../components/UI'

const globalLevels = [
  { level: 'Level 0', name: 'layer-basement', desc: '화면 최하단 배경 레이어. 스크롤되는 모든 콘텐츠 뒤에 깔림' },
  { level: 'Level 1', name: 'layer-default', desc: '페이지 기본 레이아웃. Card/List/TextField/Top Navigation 등' },
  { level: 'Level 2', name: 'Bottom Sheet, Menu Sheet', desc: '화면을 덮으며 독립적인 Stacking Context를 생성' },
  { level: 'Level 3', name: 'Alert Dialog', desc: '가장 긴급한 정보를 처리하는 최상위 모달, 모든 UI 중 최상단' },
]

const localLevels = [
  { level: 'Level 1', name: 'Main Contents', desc: 'List, Callout, Tabs, Top Navigation 등 페이지 기본 레이아웃(골격)' },
  { level: 'Level 2', name: 'Floating Actions', desc: '기본 레이아웃보다 상위 레이어, 페이지 위에 떠있는 표면' },
  { level: 'Level 3', name: 'Transient Feedback', desc: '사용자 흐름을 방해하지 않는 일시적 피드백/시스템 알림' },
]

const layerRows = [
  { css: '--seed-color-bg-layer-basement', desc: 'Level 0 — 화면 최하단' },
  { css: '--seed-color-bg-layer-default', desc: 'Level 1 — 기본 레이아웃' },
  { css: '--seed-color-bg-layer-default-pressed', desc: 'Level 1 눌림' },
  { css: '--seed-color-bg-layer-fill', desc: '섹션 채우기' },
  { css: '--seed-color-bg-layer-floating', desc: '카드/FAB' },
  { css: '--seed-color-bg-layer-floating-pressed', desc: '카드/FAB 눌림' },
]

export function ElevationSection() {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        try {
          const targetEl = document.querySelector(hash);
          if (targetEl && (targetEl.id === 'f-elevation' || targetEl.closest('#f-elevation'))) {
            setExpanded(true);
          }
        } catch (e) {}
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);
  return (
    <Sec id="f-elevation">
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
        <span>Elevation</span>
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
        UI 요소 간의 상대적인 깊이와 계층 구조를 시각적으로 표현하는 디자인 원칙입니다. 물리적 세계의
        '높낮이' 개념을 차용해 사용자가 인터페이스를 더 직관적으로 이해하도록 돕습니다.
      </p>
      {expanded && (
        <div style={{ marginTop: 16 }}>

      <h3>Stacking Context — Global / Local</h3>
      <p>
        <strong>Global</strong> — 애플리케이션의 구조적 층위. Viewport 또는 컨테이너 역할의
        컴포넌트/레이어.
        <br />
        <strong>Local</strong> — 특정 컨텍스트 내 시각적 깊이. 화면 내 콘텐츠를 표현하는 컴포넌트이며
        항상 Global 위에 위치합니다.
      </p>

      <h3>Global Level — Container Component</h3>
      <TokenTable>
        <thead><tr><th>Level</th><th>대표 요소</th><th>설명</th></tr></thead>
        <tbody>
          {globalLevels.map(l => (
            <tr key={l.level}><td>{l.level}</td><td>{l.name}</td><td>{l.desc}</td></tr>
          ))}
        </tbody>
      </TokenTable>
      <p>
        새로 덮인 페이지(Page-over-Page)는 즉시 새로운 Global 기준(Context)이 되어, 그 안의 툴팁·메뉴도
        이 기준에 맞춰 올바르게 동작합니다.
      </p>

      <h3>Local Level — Content Component</h3>
      <p>콘텐츠 컴포넌트는 부모 표면(Global)의 Level을 승계하지만, 그 안에서 시각적 위계를 Level 1~3으로 나눕니다.</p>
      <TokenTable>
        <thead><tr><th>Level</th><th>이름</th><th>설명</th></tr></thead>
        <tbody>
          {localLevels.map(l => (
            <tr key={l.level}><td>{l.level}</td><td>{l.name}</td><td>{l.desc}</td></tr>
          ))}
        </tbody>
      </TokenTable>
      <p>
        같은 Level이라도 세분화된 쌓임 순서가 필요할 수 있습니다 (예: Top Navigation과 List는 둘 다
        Level 1이지만, 스크롤 시 List가 Top Navigation 아래로 들어가도록 배치 — 이때 elevation level을
        올리지 않고 그림자/라인으로 구분감만 줍니다).
      </p>

      <h3>Elevation을 표현하는 3가지 방법</h3>
      <p>
        <strong>Surface Color</strong> — 배경색 변경. Snackbar, Floating Action Button이 대표적.
        <br />
        <strong>Shadow</strong> — 가장 전통적인 방법. Contextual Floating Button이 대표적.
        <br />
        <strong>Stroke</strong> — 가장자리에 테두리 추가. Bottom Navigation이 대표적.
      </p>
      <Notice>
        Shadow는 다크 모드에서 잘 보이지 않는 한계가 있습니다 — 화면 전체에서 주목도가 높은 몇 안 되는
        요소에만 사용하세요.
      </Notice>

      <h3>Color — Layer Token</h3>
      <p>
        Layer Token은 '콘텐츠를 담는 컨테이너'의 표면 색상만 정의합니다(텍스트/아이콘 색은 포함 안 함).
        다크 모드에서는 고도가 높을수록 더 밝아지는 규칙을 따릅니다.
      </p>
      <TokenTable>
        <thead><tr><th>CSS Custom Property</th><th>설명</th></tr></thead>
        <tbody>
          {layerRows.map(r => (
            <tr key={r.css}><td><code>{r.css}</code></td><td>{r.desc}</td></tr>
          ))}
        </tbody>
      </TokenTable>

      <h3><code>bg-layer-basement</code> vs <code>bg-neutral-weak</code></h3>
      <p>
        라이트 모드에서는 비슷해 보이지만 다크 모드에서 다르게 동작합니다. <code>bg-layer-basement</code>는
        다크 모드에서 가장 낮은 0단계 대지 색값을 가지며 기본 화면 배경에 씁니다. <code>bg-neutral-weak</code>는
        라이트 모드 밝기 톤에 맞춰 다크 모드에서도 대응되는 톤으로 보여지므로, 배경이 다양한 고도에 맞춰
        조정되어야 할 때 씁니다.
      </p>
    
        </div>
      )}
</Sec>
  )
}

import { IconChevronDownLine } from '@karrotmarket/react-monochrome-icon';
import { useState, useEffect } from 'react';
import { Sec, TokenTable , ChipInfo} from '../components/UI'

export function DimensionSection() {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        try {
          const targetEl = document.querySelector(hash);
          if (targetEl && (targetEl.id === 'f-dimension' || targetEl.closest('#f-dimension'))) {
            setExpanded(true);
          }
        } catch (e) {}
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);
  const dimRows = [
    { token: 'x0_5', val: '2px' },
    { token: 'x1', val: '4px' },
    { token: 'x1_5', val: '6px' },
    { token: 'x2', val: '8px' },
    { token: 'x2_5', val: '10px' },
    { token: 'x3', val: '12px' },
    { token: 'x3_5', val: '14px' },
    { token: 'x4', val: '16px' },
    { token: 'x4_5', val: '18px' },
    { token: 'x5', val: '20px' },
    { token: 'x6', val: '24px' },
    { token: 'x7', val: '28px' },
    { token: 'x8', val: '32px' },
    { token: 'x9', val: '36px' },
    { token: 'x10', val: '40px' },
    { token: 'x12', val: '48px' },
    { token: 'x13', val: '52px' },
    { token: 'x14', val: '56px' },
    { token: 'x16', val: '64px' },
  ]

  const radRows = [
    { token: 'r0_5', val: '2px' },
    { token: 'r1', val: '4px' },
    { token: 'r1_5', val: '6px' },
    { token: 'r2', val: '8px' },
    { token: 'r2_5', val: '10px' },
    { token: 'r3', val: '12px' },
    { token: 'r3_5', val: '14px' },
    { token: 'r4', val: '16px' },
    { token: 'r5', val: '20px' },
    { token: 'r6', val: '24px' },
    { token: 'full', val: '9999px' },
  ]

  const semanticSpacingRows = [
    { token: 'spacing-x.between-chips', val: 'x2 (8px)' },
    { token: 'spacing-x.global-gutter', val: 'x4 (16px)' },
    { token: 'spacing-y.component-default', val: 'x3 (12px)' },
    { token: 'spacing-y.nav-to-title', val: 'x5 (20px)' },
    { token: 'spacing-y.screen-bottom', val: 'x14 (56px)' },
    { token: 'spacing-y.between-text', val: 'x1_5 (6px)' },
  ]

  const shadowRows = [
    { token: 's1', val: '0px 1px 4px 0px rgba(0,0,0,.078)' },
    { token: 's2', val: '0px 2px 10px 0px rgba(0,0,0,.102)' },
    { token: 's3', val: '0px 4px 16px 0px rgba(0,0,0,.122)' },
  ]
  const gradientRows = [
    { token: 'shimmer-neutral', val: '90deg, transparent 0%, rgba(255,255,255,.67) 46-54%, transparent 100%' },
    { token: 'shimmer-magic', val: '90deg, transparent 0%, rgba(255,249,245,.8) 46-54%, transparent 100%' },
    { token: 'glow-magic', val: '88deg, #fef6f7 0%, #fef0e7 80%, #f9f7f5 100%' },
    { token: 'glow-magic-pressed', val: '88deg, #fbf0f2 0%, #ffe8db 80%, #f5f2ef 100%' },
    { token: 'highlight-magic', val: '#f60 20%, #d25aca 100%' },
    { token: 'highlight-magic-pressed', val: '#e14f00 20%, #ae58bf 100%' },
  ]

  return (
    <Sec id="f-dimension">
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
        <span>Dimensions & Radius</span>
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
        SEED의 여백 및 치수 시스템은 4px 스케일(x1~x16) 기반으로 모듈러 그리드와 일관된 시각적 리듬을 제공합니다.
      </p>

      {expanded && (
        <div style={{ marginTop: 16 }}>
          <h3>Dimensions & Spacing</h3>
          <TokenTable>
            <thead><tr><th>Token</th><th>Value</th></tr></thead>
            <tbody>
              {dimRows.map(r => <tr key={r.token}><td>{r.token}</td><td>{r.val}</td></tr>)}
            </tbody>
          </TokenTable>

          <h3>Semantic Spacing</h3>
          <p>
            <strong>Horizontal</strong> — <code>global-gutter</code>는 화면 가장자리와 콘텐츠 사이 간격, <code>between-chips</code>는 칩 사이 간격.
            <br />
            <strong>Vertical</strong> — <code>nav-to-title</code>는 네비게이션 바와 타이틀 간격, <code>component-default</code>는 컴포넌트 기본 내부/간 간격,{' '}
            <code>screen-bottom</code>은 화면 하단 여백, <code>between-text</code>는 텍스트 줄 사이 간격.
          </p>
          <TokenTable>
            <thead><tr><th>Token</th><th>Value</th></tr></thead>
            <tbody>
              {semanticSpacingRows.map(r => <tr key={r.token}><td>{r.token}</td><td>{r.val}</td></tr>)}
            </tbody>
          </TokenTable>

          <h3 id="f-radius">Radius</h3>
          <p>컴포넌트/콘텐츠 모서리의 둥글기. 부드럽고 현대적인 느낌을 주고, 다양한 화면·컨텍스트에서 시각적 일관성을 유지합니다.</p>
          <TokenTable>
            <thead><tr><th>Token</th><th>Value</th></tr></thead>
            <tbody>
              {radRows.map(r => <tr key={r.token}><td>{r.token}</td><td>{r.val}</td></tr>)}
            </tbody>
          </TokenTable>

          <h3 id="f-shadow">Shadows</h3>
          <TokenTable>
            <thead><tr><th>Token</th><th>Value</th></tr></thead>
            <tbody>
              {shadowRows.map(r => <tr key={r.token}><td>{r.token}</td><td><code>{r.val}</code></td></tr>)}
            </tbody>
          </TokenTable>

          <h3 id="f-gradient">Gradients</h3>
          <p>배경과 아이콘 등에서 입체감이나 AI 기능을 표현할 때 사용하는 색상 토큰입니다.</p>
          <TokenTable>
            <thead><tr><th>Token</th><th>Value</th></tr></thead>
            <tbody>
              {gradientRows.map(r => <tr key={r.token}><td>{r.token}</td><td><code>{r.val}</code></td></tr>)}
            </tbody>
          </TokenTable>
        </div>
      )}
    </Sec>
  )
}

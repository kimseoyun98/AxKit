import { IconChevronDownLine } from '@karrotmarket/react-monochrome-icon';
import { useState, useEffect } from 'react';
import { Sec, TokenTable } from '../components/UI'

export function MotionSection() {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        try {
          const targetEl = document.querySelector(hash);
          if (targetEl && (targetEl.id === 'f-motion' || targetEl.closest('#f-motion'))) {
            setExpanded(true);
          }
        } catch (e) {}
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);
  const durRows = [
    { t: 'd1', val: '50ms' },
    { t: 'd2', val: '100ms' },
    { t: 'd3', val: '150ms' },
    { t: 'd4', val: '200ms' },
    { t: 'd5', val: '250ms' },
    { t: 'd6', val: '300ms' }
  ]
  const easeRows = [
    { t: 'linear', val: 'cubic-bezier(0, 0, 1, 1)', usage: '등속' },
    { t: 'easing', val: 'cubic-bezier(.35, 0, .35, 1)', usage: '버튼 클릭, 입력창 포커스 등 기능적인 마이크로 모션' },
    { t: 'enter', val: 'cubic-bezier(0, 0, .15, 1)', usage: '다이얼로그, 시트 등이 나타나는 매크로 모션' },
    { t: 'enter-expressive', val: 'cubic-bezier(.03, .4, .1, 1)', usage: 'enter 모션에서 특히 강조되어야 하는 움직임' },
    { t: 'exit', val: 'cubic-bezier(.35, 0, 1, 1)', usage: '다이얼로그, 시트 등이 사라지는 매크로 모션' },
    { t: 'exit-expressive', val: 'cubic-bezier(.35, 0, .95, .55)', usage: 'exit 모션에서 특히 강조되어야 하는 움직임' },
    { t: 'pressed-scale', val: 'cubic-bezier(0, 0, .15, 1)', usage: '눌림 상태 스케일 애니메이션' },
  ]

  return (
    <Sec id="f-motion">
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
        <span>Motion</span>
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
        SEED Motion 시스템은 UI 상호작용의 듀레이션(Duration)과 이징(Timing Function) 규격을 정의합니다.
      </p>
      {expanded && (
        <div style={{ marginTop: 16 }}>
          <p style={{ marginBottom: 16 }}>
            <strong>매크로 모션</strong> — 레이아웃 및 페이지 전환 같은 대규모 모션 (0.2초 초과).
            <br />
            <strong>마이크로 모션</strong> — 버튼 클릭, 포커스 등 요소 단위의 정교한 모션 (0.2초 이하).
          </p>

          <h3>Duration</h3>
      <TokenTable>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          {durRows.map(r => <tr key={r.t}><td>{r.t}</td><td>{r.val}</td></tr>)}
        </tbody>
      </TokenTable>

      <h3>Timing Function</h3>
      <TokenTable>
        <thead><tr><th>Token</th><th>Value</th><th>용도</th></tr></thead>
        <tbody>
          {easeRows.map(r => <tr key={r.t}><td>{r.t}</td><td><code>{r.val}</code></td><td>{r.usage}</td></tr>)}
        </tbody>
      </TokenTable>
    
        </div>
      )}
</Sec>
  )
}

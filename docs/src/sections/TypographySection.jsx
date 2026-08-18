import { IconChevronDownLine } from '@karrotmarket/react-monochrome-icon';
import { useState, useEffect } from 'react';
import { Sec, TokenTable, Notice , ChipInfo} from '../components/UI'

export function TypographySection() {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        try {
          const targetEl = document.querySelector(hash);
          if (targetEl && (targetEl.id === 'f-typography' || targetEl.closest('#f-typography'))) {
            setExpanded(true);
          }
        } catch (e) {}
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);
  // 실제 @seed-design/css: t1~t14 14단계, 각 단계마다 static px 값과 fluid(clamp) 값이 동시에 존재
  const rows = [
    { t: 't1', staticFs: 11, staticLh: 15, fluidRem: 0.6875 },
    { t: 't2', staticFs: 12, staticLh: 16, fluidRem: 0.75 },
    { t: 't3', staticFs: 13, staticLh: 18, fluidRem: 0.8125 },
    { t: 't4', staticFs: 14, staticLh: 19, fluidRem: 0.875 },
    { t: 't5', staticFs: 16, staticLh: 22, fluidRem: 1 },
    { t: 't6', staticFs: 18, staticLh: 24, fluidRem: 1.125 },
    { t: 't7', staticFs: 20, staticLh: 27, fluidRem: 1.25 },
    { t: 't8', staticFs: 22, staticLh: 30, fluidRem: 1.375 },
    { t: 't9', staticFs: 24, staticLh: 32, fluidRem: 1.5 },
    { t: 't10', staticFs: 26, staticLh: 35, fluidRem: 1.625 },
    { t: 't11', staticFs: 28, staticLh: 38, fluidRem: 1.75 },
    { t: 't12', staticFs: 32, staticLh: 42, fluidRem: 2 },
    { t: 't13', staticFs: 40, staticLh: 52, fluidRem: 2.5 },
    { t: 't14', staticFs: 48, staticLh: 60, fluidRem: 3 },
  ]

  return (
    <Sec id="f-typography">
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
        <span>Typography Tokens</span>
        <ChipInfo>14단계</ChipInfo>
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
        SEED은 fluid/static을 별개 단계로 나누지 않고, <code>t1</code>~<code>t14</code> 14단계 각각에
        static px 값과 fluid(<code>clamp()</code> 기반, 뷰포트에 따라 0.8~1.5배 스케일) 값을 동시에 정의합니다.
      </p>
      {expanded && (
        <div style={{ marginTop: 16 }}>
      <TokenTable>
        <thead>
          <tr>
            <th>Token</th>
            <th>Static Font Size</th>
            <th>Static Line Height</th>
            <th>Fluid 기준값 (rem)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.t}>
              <td>{r.t}</td>
              <td><code>{r.staticFs}px</code></td>
              <td><code>{r.staticLh}px</code></td>
              <td><code>{r.fluidRem}rem</code></td>
            </tr>
          ))}
        </tbody>
      </TokenTable>

      <Notice>
        <strong>t9~t14의 breakpoint별 정적 매핑에 대해</strong> — 실제 개발 구현에서는 SEED 공식 방식인
        <code>clamp()</code> 기반 fluid 스케일링(뷰포트에 따라 매끄럽게 값이 변함)을 사용하는 것이 맞습니다.
        이롬넷 Figma의 t9~t14 값이 Desktop/Tablet/Mobile 3단계로 나뉘어 있는 것은, Figma가 정적 값만
        표현할 수 있어서 fluid 스케일을 각 breakpoint의 스냅샷으로 근사 매핑해둔 것일 뿐입니다 — 개발
        시에는 이 정적 값을 그대로 3단계로 옮기지 말고 SEED의 fluid clamp() 공식을 적용하세요.
      </Notice>

      <h3 style={{ marginTop: 28 }}>React <code>&lt;Text&gt;</code> 컴포넌트 활용 (`@seed-design/react`)</h3>
      <p>피그마 텍스트 스타일과 1:1 매핑되는 <code>textStyle</code> 속성 및 멀티라인 말줄임 <code>maxLines</code> 속성을 활용합니다.</p>
      <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, padding: '14px 16px', margin: '14px 0', fontSize: 13, color: '#334155' }}>
        <div>• <strong>Figma 1:1 매핑</strong>: <code>&lt;Text color="fg.neutral" textStyle="t5Regular"&gt;텍스트&lt;/Text&gt;</code></div>
        <div>• <strong>말줄임(Ellipsis)</strong>: <code>&lt;Text maxLines={2}&gt;긴 텍스트...&lt;/Text&gt;</code> (지정한 줄 수 초과 시 <code>…</code> 자동 처리)</div>
        <div>• <strong>고정 스케일(Static)</strong>: <code>&lt;Text textStyle="t3StaticRegular"&gt;고정 텍스트&lt;/Text&gt;</code></div>
      </div>
    
        </div>
      )}
</Sec>
  )
}

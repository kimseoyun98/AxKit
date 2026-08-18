import { IconChevronDownLine } from '@karrotmarket/react-monochrome-icon';
import { useState, useEffect } from 'react';
import { Sec, TokenTable, Notice, ChipInfo } from '../components/UI';

const typographyTokensList = [
  { level: 't1', staticFs: '11px', staticLh: '15px', fluidRem: '0.6875rem', clampRule: 'clamp(0.6875rem, ...)', defaultWeight: 'Regular (400)' },
  { level: 't2', staticFs: '12px', staticLh: '16px', fluidRem: '0.7500rem', clampRule: 'clamp(0.75rem, ...)', defaultWeight: 'Regular (400)' },
  { level: 't3', staticFs: '13px', staticLh: '18px', fluidRem: '0.8125rem', clampRule: 'clamp(0.8125rem, ...)', defaultWeight: 'Regular (400)' },
  { level: 't4', staticFs: '14px', staticLh: '19px', fluidRem: '0.8750rem', clampRule: 'clamp(0.875rem, ...)', defaultWeight: 'Regular (400)' },
  { level: 't5', staticFs: '16px', staticLh: '22px', fluidRem: '1.0000rem', clampRule: 'clamp(1rem, ...)', defaultWeight: 'Regular (400)' },
  { level: 't6', staticFs: '18px', staticLh: '24px', fluidRem: '1.1250rem', clampRule: 'clamp(1.125rem, ...)', defaultWeight: 'Bold (700)' },
  { level: 't7', staticFs: '20px', staticLh: '27px', fluidRem: '1.2500rem', clampRule: 'clamp(1.25rem, ...)', defaultWeight: 'Bold (700)' },
  { level: 't8', staticFs: '22px', staticLh: '30px', fluidRem: '1.3750rem', clampRule: 'clamp(1.375rem, ...)', defaultWeight: 'Bold (700)' },
  { level: 't9', staticFs: '24px', staticLh: '32px', fluidRem: '1.5000rem', clampRule: 'clamp(1.5rem, ...)', defaultWeight: 'Bold (700)' },
  { level: 't10', staticFs: '26px', staticLh: '35px', fluidRem: '1.6250rem', clampRule: 'clamp(1.625rem, ...)', defaultWeight: 'Bold (700)' },
  { level: 't11', staticFs: '28px', staticLh: '38px', fluidRem: '1.7500rem', clampRule: 'clamp(1.75rem, ...)', defaultWeight: 'Bold (700)' },
  { level: 't12', staticFs: '32px', staticLh: '42px', fluidRem: '2.0000rem', clampRule: 'clamp(2rem, ...)', defaultWeight: 'Bold (700)' },
  { level: 't13', staticFs: '40px', staticLh: '52px', fluidRem: '2.5000rem', clampRule: 'clamp(2.5rem, ...)', defaultWeight: 'Bold (700)' },
  { level: 't14', staticFs: '48px', staticLh: '60px', fluidRem: '3.0000rem', clampRule: 'clamp(3rem, ...)', defaultWeight: 'Bold (700)' },
];

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
        <span>Typography Tokens (t1–t14)</span>
        <ChipInfo>14단계 수치표</ChipInfo>
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
        SEED 타이포그래피의 기초 14단계 수치표입니다. 각 단계마다 정적 px 값과 뷰포트 가변 <code>clamp()</code> fluid 값이 동시에 정의되어 있습니다.
      </p>

      {expanded && (
        <div style={{ marginTop: 16 }}>
          <Notice>
            <strong>t1~t14 Fluid Clamp 스케일링 원칙</strong><br />
            - SEED는 <code>t1</code>~<code>t14</code> 14단계 각각에 static px 값과 fluid(뷰포트에 따라 0.8~1.5배 반응하는 <code>clamp()</code>) 공식을 동시에 가지고 있습니다.<br />
            - 피그마의 t9~t14가 데스크톱/태블릿/모바일 3단계 정적 값으로 나뉘어 있는 것은 피그마 툴 표현 한계 때문이므로, 개발 시에는 SEED의 fluid clamp 공식을 적용합니다.
          </Notice>

          <h3 style={{ marginTop: 28 }}>SEED 2.0 Typography 14단계 기초 수치표</h3>
          <TokenTable>
            <thead>
              <tr>
                <th>Level</th>
                <th>Static Font Size</th>
                <th>Static Line Height</th>
                <th>Fluid Baseline (rem)</th>
                <th>Fluid Clamp Rule</th>
                <th>Default Weight</th>
              </tr>
            </thead>
            <tbody>
              {typographyTokensList.map(r => (
                <tr key={r.level}>
                  <td><strong>{r.level}</strong></td>
                  <td><code>{r.staticFs}</code></td>
                  <td><code>{r.staticLh}</code></td>
                  <td><code>{r.fluidRem}</code></td>
                  <td><code>{r.clampRule}</code></td>
                  <td>{r.defaultWeight}</td>
                </tr>
              ))}
            </tbody>
          </TokenTable>
        </div>
      )}
    </Sec>
  );
}

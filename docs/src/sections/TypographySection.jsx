import { IconChevronDownLine } from '@karrotmarket/react-monochrome-icon';
import { useState, useEffect } from 'react';
import { Sec, TokenTable, Notice, ChipInfo } from '../components/UI';

const textStyleMapping = [
  { level: 't1', staticFs: '11px', staticLh: '15px', fluidRem: '0.6875rem', fluidStyle: 't1Regular', staticStyle: 't1StaticRegular', defaultWeight: 'Regular (400)' },
  { level: 't2', staticFs: '12px', staticLh: '16px', fluidRem: '0.75rem', fluidStyle: 't2Regular', staticStyle: 't2StaticRegular', defaultWeight: 'Regular (400)' },
  { level: 't3', staticFs: '13px', staticLh: '18px', fluidRem: '0.8125rem', fluidStyle: 't3Regular', staticStyle: 't3StaticRegular', defaultWeight: 'Regular (400)' },
  { level: 't4', staticFs: '14px', staticLh: '19px', fluidRem: '0.875rem', fluidStyle: 't4Regular', staticStyle: 't4StaticRegular', defaultWeight: 'Regular (400)' },
  { level: 't5', staticFs: '16px', staticLh: '22px', fluidRem: '1.000rem', fluidStyle: 't5Regular', staticStyle: 't5StaticRegular', defaultWeight: 'Regular (400)' },
  { level: 't6', staticFs: '18px', staticLh: '24px', fluidRem: '1.125rem', fluidStyle: 't6Bold', staticStyle: 't6StaticBold', defaultWeight: 'Bold (700)' },
  { level: 't7', staticFs: '20px', staticLh: '27px', fluidRem: '1.250rem', fluidStyle: 't7Bold', staticStyle: 't7StaticBold', defaultWeight: 'Bold (700)' },
  { level: 't8', staticFs: '22px', staticLh: '30px', fluidRem: '1.375rem', fluidStyle: 't8Bold', staticStyle: 't8StaticBold', defaultWeight: 'Bold (700)' },
  { level: 't9', staticFs: '24px', staticLh: '32px', fluidRem: '1.500rem', fluidStyle: 't9Bold', staticStyle: 't9StaticBold', defaultWeight: 'Bold (700)' },
  { level: 't10', staticFs: '26px', staticLh: '35px', fluidRem: '1.625rem', fluidStyle: 't10Bold', staticStyle: 't10StaticBold', defaultWeight: 'Bold (700)' },
  { level: 't11', staticFs: '28px', staticLh: '38px', fluidRem: '1.750rem', fluidStyle: 't11Bold', staticStyle: 't11StaticBold', defaultWeight: 'Bold (700)' },
  { level: 't12', staticFs: '32px', staticLh: '42px', fluidRem: '2.000rem', fluidStyle: 't12Bold', staticStyle: 't12StaticBold', defaultWeight: 'Bold (700)' },
  { level: 't13', staticFs: '40px', staticLh: '52px', fluidRem: '2.500rem', fluidStyle: 't13Bold', staticStyle: 't13StaticBold', defaultWeight: 'Bold (700)' },
  { level: 't14', staticFs: '48px', staticLh: '60px', fluidRem: '3.000rem', fluidStyle: 't14Bold', staticStyle: 't14StaticBold', defaultWeight: 'Bold (700)' },
];

const textPropsList = [
  { prop: 'textStyle', type: 'TextStyleName', desc: 'Figma Text Style과 1:1 매핑 (글꼴 크기, 줄 간격, 굵기를 한번에 적용)', example: 'textStyle="t5Regular"' },
  { prop: 'fontSize', type: 'FontSizeName', desc: 't1 ~ t14 글꼴 크기 단독 지정', example: 'fontSize="t5"' },
  { prop: 'lineHeight', type: 'LineHeightName', desc: 'lineHeight 단독 지정 (기본값: fontSize 대응값)', example: 'lineHeight="t5"' },
  { prop: 'fontWeight', propType: '"regular" | "medium" | "bold"', desc: '글꼴 굵기 개별 설정', example: 'fontWeight="medium"' },
  { prop: 'textDecorationLine', propType: '"underline" | "line-through"', desc: '밑줄 및 취소선 추가 (링크 이외 밑줄 남발 주의)', example: 'textDecorationLine="line-through"' },
  { prop: 'maxLines', type: 'number', desc: '최대 줄 수 제한 및 초과 시 … 생략 부호(ellipsis) 자동 처리', example: 'maxLines={2}' },
  { prop: 'userSelect', propType: '"auto" | "none" | "text"', desc: '사용자 텍스트 드래그 선택 가능 여부 제어', example: 'userSelect="none"' },
  { prop: 'whiteSpace', propType: '"normal" | "nowrap" | "pre" | "pre-wrap" | ...', desc: '공백 및 줄바꿈 처리방식 (maxLines 미사용 시 적용)', example: 'whiteSpace="pre-wrap"' },
];

export function TypographySection() {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('tokens'); // 'tokens' | 'semantic'

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
        <span>Typography Tokens &amp; Semantic Text</span>
        <ChipInfo>2-Tab 뷰</ChipInfo>
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
        기초 폰트 수치 토큰(<code>t1</code>~<code>t14</code>) 탭과 시맨틱 텍스트 활용법(<code>textStyle</code>, <code>&lt;Text&gt;</code>) 탭으로 분리되어 있습니다.
      </p>

      {expanded && (
        <div style={{ marginTop: 16 }}>
          {/* 2-Tab Switcher */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            <button
              type="button"
              onClick={() => setActiveTab('tokens')}
              style={{
                padding: '8px 18px',
                borderRadius: 8,
                border: activeTab === 'tokens' ? 'none' : '1px solid var(--seed-color-stroke-neutral-weak, #E2E8F0)',
                background: activeTab === 'tokens' ? 'var(--seed-color-bg-brand-solid, #FF6F0F)' : 'var(--seed-color-bg-layer-default, #FFFFFF)',
                color: activeTab === 'tokens' ? '#FFFFFF' : 'var(--seed-color-fg-neutral, #0F172A)',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: 13,
                transition: 'all 0.15s ease',
              }}
            >
              1. Typography Tokens (t1 ~ t14 수치표)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('semantic')}
              style={{
                padding: '8px 18px',
                borderRadius: 8,
                border: activeTab === 'semantic' ? 'none' : '1px solid var(--seed-color-stroke-neutral-weak, #E2E8F0)',
                background: activeTab === 'semantic' ? 'var(--seed-color-bg-brand-solid, #FF6F0F)' : 'var(--seed-color-bg-layer-default, #FFFFFF)',
                color: activeTab === 'semantic' ? '#FFFFFF' : 'var(--seed-color-fg-neutral, #0F172A)',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: 13,
                transition: 'all 0.15s ease',
              }}
            >
              2. Semantic Text (&lt;Text&gt; &amp; textStyle 1:1)
            </button>
          </div>

          {activeTab === 'tokens' ? (
            <div>
              <p style={{ fontSize: 13.5, color: '#475569', marginBottom: 12 }}>
                SEED 2.0 타이포그래피의 기초 14단계 수치표입니다. 각 단계마다 정적 px 값과 뷰포트 가변 <code>clamp()</code> fluid 값이 동시에 정의되어 있습니다.
              </p>
              <TokenTable>
                <thead>
                  <tr>
                    <th>Token Level</th>
                    <th>Static Font Size</th>
                    <th>Static Line Height</th>
                    <th>Fluid Baseline (rem)</th>
                    <th>Default Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {textStyleMapping.map(r => (
                    <tr key={r.level}>
                      <td><strong>{r.level}</strong></td>
                      <td><code>{r.staticFs}</code></td>
                      <td><code>{r.staticLh}</code></td>
                      <td><code>{r.fluidRem}</code></td>
                      <td>{r.defaultWeight}</td>
                    </tr>
                  ))}
                </tbody>
              </TokenTable>
            </div>
          ) : (
            <div>
              <Notice>
                <strong>Figma Text Style ↔ React textStyle 1:1 매핑 가이드</strong><br />
                피그마 디자인의 Text Style 이름(예: <code>t5Regular</code>, <code>t6Bold</code>)은 React <code>&lt;Text textStyle="..."&gt;</code> 속성과 1:1 매핑됩니다.
                고정 폰트 스케일이 필요한 경우 <code>t5StaticRegular</code>와 같이 <code>Static</code> 토큰을 사용합니다.
              </Notice>

              <h3 style={{ marginTop: 20 }}>Figma Text Style ➔ React textStyle 1:1 매핑 사양표</h3>
              <TokenTable>
                <thead>
                  <tr>
                    <th>Level</th>
                    <th>Figma / React textStyle</th>
                    <th>Static textStyle (고정)</th>
                    <th>Default Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {textStyleMapping.map(r => (
                    <tr key={r.level}>
                      <td><strong>{r.level}</strong></td>
                      <td><code>{r.fluidStyle}</code></td>
                      <td><code>{r.staticStyle}</code></td>
                      <td>{r.defaultWeight}</td>
                    </tr>
                  ))}
                </tbody>
              </TokenTable>

              <h3 style={{ marginTop: 28 }}>React &lt;Text&gt; Component Extended Props</h3>
              <TokenTable>
                <thead>
                  <tr>
                    <th>Prop</th>
                    <th>Type / Options</th>
                    <th>설명 및 가이드</th>
                    <th>React Code 사용 예시</th>
                  </tr>
                </thead>
                <tbody>
                  {textPropsList.map(p => (
                    <tr key={p.prop}>
                      <td><code>{p.prop}</code></td>
                      <td><code>{p.type || p.propType}</code></td>
                      <td>{p.desc}</td>
                      <td><code>{p.example}</code></td>
                    </tr>
                  ))}
                </tbody>
              </TokenTable>
            </div>
          )}
        </div>
      )}
    </Sec>
  );
}

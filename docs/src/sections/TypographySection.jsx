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
        <span>Typography Tokens &amp; Text Component</span>
        <ChipInfo>14단계 &amp; textStyle</ChipInfo>
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
        SEED 타이포그래피는 <code>t1</code>~<code>t14</code> 14단계로 구성되며, 피그마와 1:1 매핑되는 <code>textStyle</code> 속성을 통해 글꼴 크기, 줄 간격, 굵기를 한번에 적용합니다.
      </p>
      {expanded && (
        <div style={{ marginTop: 16 }}>
          <Notice>
            <strong>Figma Text Style ↔ React textStyle 1:1 매핑 가이드</strong><br />
            피그마 디자인의 Text Style 이름(예: <code>t5Regular</code>, <code>t6Bold</code>)은 React <code>&lt;Text textStyle="..."&gt;</code> 속성과 1:1 매핑됩니다.
            고정 폰트 스케일이 필요한 경우 <code>t5StaticRegular</code>와 같이 <code>Static</code> 토큰을 사용합니다.
          </Notice>

          {/* 1. textStyle 1:1 매핑 명세표 */}
          <h3 style={{ marginTop: 28 }}>Figma Text Style ➔ React textStyle 1:1 매핑 사양표</h3>
          <p>피그마 디자인 텍스트 스타일과 SEED React 코드 매핑 사양입니다.</p>
          <TokenTable>
            <thead>
              <tr>
                <th>Level</th>
                <th>Figma / React textStyle</th>
                <th>Static textStyle (고정)</th>
                <th>Static Font Size</th>
                <th>Static Line Height</th>
                <th>Fluid (rem)</th>
                <th>Default Weight</th>
              </tr>
            </thead>
            <tbody>
              {textStyleMapping.map(r => (
                <tr key={r.level}>
                  <td><strong>{r.level}</strong></td>
                  <td><code>{r.fluidStyle}</code></td>
                  <td><code>{r.staticStyle}</code></td>
                  <td><code>{r.staticFs}</code></td>
                  <td><code>{r.staticLh}</code></td>
                  <td><code>{r.fluidRem}</code></td>
                  <td>{r.defaultWeight}</td>
                </tr>
              ))}
            </tbody>
          </TokenTable>

          {/* 2. Text 컴포넌트 Extended Props 표 */}
          <h3 style={{ marginTop: 36 }}>React &lt;Text&gt; Component Extended Props</h3>
          <p><code>@seed-design/react</code>의 <code>&lt;Text&gt;</code> 컴포넌트 주요 속성입니다.</p>
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

          {/* 3. 주의사항 및 실무 팁 */}
          <Notice style={{ marginTop: 28 }}>
            <strong>t9~t14 Fluid Clamp 스케일링 안내</strong> — 실제 개발 구현에서는 SEED 공식 방식인 <code>clamp()</code> 기반 fluid 스케일링(뷰포트에 따라 매끄럽게 값이 변함)이 적용됩니다.
            피그마의 t9~t14가 데스크톱/태블릿/모바일 3단계 정적 값으로 작성되어 있는 것은 피그마 표현 한계 때문이므로, 개발 시에는 SEED의 <code>textStyle</code>을 그대로 바인딩하세요.
          </Notice>
        </div>
      )}
    </Sec>
  );
}

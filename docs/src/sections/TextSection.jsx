import { IconChevronDownLine } from '@karrotmarket/react-monochrome-icon';
import { useState, useEffect } from 'react';
import { Sec, TokenTable, Notice, ChipInfo } from '../components/UI';

const roleAliases = [
  { alias: 'screenTitle', mapping: 't8Bold / t9Bold', desc: '화면에 크게 표시되는 주요 제목이나 타이틀에 사용합니다.' },
  { alias: 'articleBody', mapping: 't5Regular', desc: '게시물이나 콘텐츠 중심 섹션의 본문 텍스트에 사용합니다.' },
  { alias: 'articleNote', mapping: 't3Regular', desc: '주석, 참고 사항 및 상세 리스트 등 부가 정보에 사용하며, 일반 본문 텍스트에는 사용하지 않습니다.' },
];

const textStyleMapping = [
  { level: 't1', fluidStyle: 't1Regular', staticStyle: 't1StaticRegular', staticFs: '11px', staticLh: '15px', usage: '캡션, 극소형 텍스트 및 주석' },
  { level: 't2', fluidStyle: 't2Regular', staticStyle: 't2StaticRegular', staticFs: '12px', staticLh: '16px', usage: '배지, 헬퍼 텍스트, 타임스탬프' },
  { level: 't3', fluidStyle: 't3Regular', staticStyle: 't3StaticRegular', staticFs: '13px', staticLh: '18px', usage: '보조 본문, 아티클 노트 (articleNote)' },
  { level: 't4', fluidStyle: 't4Regular', staticStyle: 't4StaticRegular', staticFs: '14px', staticLh: '19px', usage: '서브 라벨, 약관, 컴팩트 본문' },
  { level: 't5', fluidStyle: 't5Regular (Default)', staticStyle: 't5StaticRegular', staticFs: '16px', staticLh: '22px', usage: '기본 본문 텍스트 (articleBody) — Default' },
  { level: 't6', fluidStyle: 't6Bold', staticStyle: 't6StaticBold', staticFs: '18px', staticLh: '24px', usage: '소제목, 카드 헤더, 강조 텍스트' },
  { level: 't7', fluidStyle: 't7Bold', staticStyle: 't7StaticBold', staticFs: '20px', staticLh: '27px', usage: '섹션 헤더, 모달 타이틀' },
  { level: 't8', fluidStyle: 't8Bold', staticStyle: 't8StaticBold', staticFs: '22px', staticLh: '30px', usage: '서브 스크린 타이틀, 대형 타이틀 (screenTitle)' },
  { level: 't9', fluidStyle: 't9Bold', staticStyle: 't9StaticBold', staticFs: '24px', staticLh: '32px', usage: '페이지 타이틀, 대형 히어로 헤더' },
  { level: 't10', fluidStyle: 't10Bold', staticStyle: 't10StaticBold', staticFs: '26px', staticLh: '35px', usage: '대형 대시보드 수치, 주요 랜딩 타이틀' },
  { level: 't11', fluidStyle: 't11Bold', staticStyle: 't11StaticBold', staticFs: '28px', staticLh: '38px', usage: '⚠️ sm(480px+) 이상 권장 — 초대형 히어로 헤딩' },
  { level: 't12', fluidStyle: 't12Bold', staticStyle: 't12StaticBold', staticFs: '32px', staticLh: '42px', usage: '⚠️ sm(480px+) 이상 권장 — 임팩트 디스플레이' },
  { level: 't13', fluidStyle: 't13Bold', staticStyle: 't13StaticBold', staticFs: '40px', staticLh: '52px', usage: '⚠️ sm(480px+) 이상 권장 — 대형 넘버 / 프로모션' },
  { level: 't14', fluidStyle: 't14Bold', staticStyle: 't14StaticBold', staticFs: '48px', staticLh: '60px', usage: '⚠️ sm(480px+) 이상 권장 — 최상위 프로모션 헤딩' },
];

const textPropsList = [
  { prop: 'textStyle', type: 'TextStyleName', defaultVal: '"t5Regular"', desc: 'Figma Text Style과 1:1 매핑 (글꼴 크기, 줄 간격, 굵기를 한번에 설정)' },
  { prop: 'fontSize', type: 'FontSizeName', defaultVal: 'undefined', desc: 't1 ~ t14 글꼴 크기 단독 지정' },
  { prop: 'lineHeight', type: 'LineHeightName', defaultVal: 'fontSize 대응값', desc: 'lineHeight 단독 지정' },
  { prop: 'fontWeight', type: '"regular" | "medium" | "bold"', defaultVal: 'textStyle 대응값', desc: '글꼴 굵기 개별 설정' },
  { prop: 'textDecorationLine', type: '"underline" | "line-through"', defaultVal: 'undefined', desc: '밑줄 및 취소선 추가 (링크 이외 밑줄 남발 주의)' },
  { prop: 'maxLines', type: 'number', defaultVal: 'undefined', desc: '최대 줄 수 제한 및 초과 시 … 생략 부호(ellipsis) 자동 처리' },
  { prop: 'userSelect', type: '"auto" | "none" | "text"', defaultVal: 'undefined', desc: '사용자 텍스트 드래그 선택 가능 여부 제어' },
  { prop: 'whiteSpace', type: '"normal" | "nowrap" | "pre" | "pre-wrap" | ...', defaultVal: 'undefined', desc: '공백 및 줄바꿈 처리방식 (maxLines 미사용 시 적용)' },
];

export function TextSection() {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        try {
          const targetEl = document.querySelector(hash);
          if (targetEl && (targetEl.id === 'f-text' || targetEl.closest('#f-text'))) {
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
    <Sec id="f-text">
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
        <span>Semantic Text (&lt;Text&gt; &amp; textStyle)</span>
        <ChipInfo>피그마 1:1</ChipInfo>
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
        피그마 Text Style과 1:1 매핑되는 시맨틱 <code>textStyle</code> 속성 및 <code>&lt;Text&gt;</code> 컴포넌트의 확장 속성 사양입니다.
      </p>

      {expanded && (
        <div style={{ marginTop: 16 }}>
          <Notice>
            <strong>Figma Text Style ↔ React textStyle 1:1 매핑 규칙</strong><br />
            - 기본값: <code>textStyle="t5Regular"</code> (16px / 22px)<br />
            - <strong>Semantic Role Aliases</strong>: <code>screenTitle</code>, <code>articleBody</code>, <code>articleNote</code> 등의 역할을 바로 사용할 수 있습니다.<br />
            - <strong>Breakpoint 권장사항</strong>: <code>t11</code>~<code>t14</code> 스타일은 모바일 화면에서 너무 크므로 <code>sm (480px+)</code> 이상에서 사용하는 것을 권장합니다.<br />
            - <strong>Static 토큰 (`*Static*`)</strong>: OS 폰트 스케일링에 반응하지 않는 고정 크기 텍스트에 적용합니다.
          </Notice>

          {/* 1. Semantic Role Aliases */}
          <h3 style={{ marginTop: 28 }}>1. Semantic Role Aliases</h3>
          <p>디자이너와 개발자가 특정 용도로 바로 사용할 수 있는 시맨틱 역할 별칭입니다.</p>
          <TokenTable>
            <thead>
              <tr>
                <th>Role Alias</th>
                <th>매핑 textStyle</th>
                <th>용도 및 가이드</th>
              </tr>
            </thead>
            <tbody>
              {roleAliases.map(r => (
                <tr key={r.alias}>
                  <td><code>{r.alias}</code></td>
                  <td><code>{r.mapping}</code></td>
                  <td>{r.desc}</td>
                </tr>
              ))}
            </tbody>
          </TokenTable>

          {/* 2. Figma textStyle 1:1 매핑 사양표 */}
          <h3 style={{ marginTop: 36 }}>2. Figma Text Style ➔ React textStyle 1:1 매핑 사양표</h3>
          <p>피그마 디자인 시스템 패널의 Text Style 이름과 React <code>textStyle</code> 1:1 대응표입니다.</p>
          <TokenTable>
            <thead>
              <tr>
                <th>Level</th>
                <th>Figma / React textStyle</th>
                <th>Static textStyle</th>
                <th>Static Size</th>
                <th>용도 및 권장 Breakpoint</th>
              </tr>
            </thead>
            <tbody>
              {textStyleMapping.map(r => (
                <tr key={r.level}>
                  <td><strong>{r.level}</strong></td>
                  <td><code>{r.fluidStyle}</code></td>
                  <td><code>{r.staticStyle}</code></td>
                  <td><code>{r.staticFs} / {r.staticLh}</code></td>
                  <td>{r.usage}</td>
                </tr>
              ))}
            </tbody>
          </TokenTable>

          {/* 3. Text 컴포넌트 Extended Props 표 */}
          <h3 style={{ marginTop: 36 }}>3. React &lt;Text&gt; Component Extended Props</h3>
          <TokenTable>
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type / Options</th>
                <th>Default</th>
                <th>설명 및 가이드</th>
              </tr>
            </thead>
            <tbody>
              {textPropsList.map(p => (
                <tr key={p.prop}>
                  <td><code>{p.prop}</code></td>
                  <td><code>{p.type}</code></td>
                  <td><code>{p.defaultVal}</code></td>
                  <td>{p.desc}</td>
                </tr>
              ))}
            </tbody>
          </TokenTable>
        </div>
      )}
    </Sec>
  );
}

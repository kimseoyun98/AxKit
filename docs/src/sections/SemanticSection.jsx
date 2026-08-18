import { IconChevronDownLine } from '@karrotmarket/react-monochrome-icon';
import { useState, useEffect } from 'react';
import { Sec, TokenTable, ChipInfo } from '../components/UI'

const fgRows = [
  { css: '--seed-color-fg-neutral', prim: 'gray-1000', desc: '기본 본문 텍스트' },
  { css: '--seed-color-fg-neutral-muted', prim: 'gray-800', desc: '보조 텍스트' },
  { css: '--seed-color-fg-neutral-subtle', prim: 'gray-700', desc: '힌트 텍스트' },
  { css: '--seed-color-fg-neutral-inverted', prim: 'gray-00', desc: '반전 배경 위 텍스트' },
  { css: '--seed-color-fg-placeholder', prim: 'gray-600', desc: '입력 필드 placeholder' },
  { css: '--seed-color-fg-disabled', prim: 'gray-500', desc: '비활성 텍스트' },
  { css: '--seed-color-fg-brand', prim: 'carrot-600', desc: '브랜드 링크/포인트' },
  { css: '--seed-color-fg-brand-contrast', prim: 'carrot-700', desc: '브랜드 텍스트 강조' },
  { css: '--seed-color-fg-positive', prim: 'green-700', desc: '성공 메시지' },
  { css: '--seed-color-fg-positive-contrast', prim: 'green-900', desc: '성공 텍스트 강조' },
  { css: '--seed-color-fg-critical', prim: 'red-700', desc: '에러 메시지' },
  { css: '--seed-color-fg-critical-contrast', prim: 'red-900', desc: '에러 텍스트 강조' },
  { css: '--seed-color-fg-warning', prim: 'yellow-700', desc: '경고 메시지' },
  { css: '--seed-color-fg-warning-contrast', prim: 'yellow-900', desc: '경고 텍스트 강조' },
  { css: '--seed-color-fg-informative', prim: 'blue-700', desc: '정보 메시지' },
  { css: '--seed-color-fg-informative-contrast', prim: 'blue-900', desc: '정보 텍스트 강조' },
]

const bgLayerRows = [
  { css: '--seed-color-bg-layer-default', prim: 'gray-00', desc: '기본 페이지 배경' },
  { css: '--seed-color-bg-layer-default-pressed', prim: 'gray-100', desc: '기본 배경 눌림' },
  { css: '--seed-color-bg-layer-fill', prim: 'gray-100', desc: '섹션 채우기' },
  { css: '--seed-color-bg-layer-floating', prim: 'gray-00', desc: '카드/FAB' },
  { css: '--seed-color-bg-layer-floating-pressed', prim: 'gray-100', desc: '카드/FAB 눌림' },
  { css: '--seed-color-bg-layer-basement', prim: 'gray-200', desc: '최하단 배경' },
]

const bgBrandRows = [
  { css: '--seed-color-bg-brand-solid', prim: 'carrot-600', desc: 'Primary 버튼' },
  { css: '--seed-color-bg-brand-solid-pressed', prim: 'carrot-700', desc: '눌림 상태' },
  { css: '--seed-color-bg-brand-weak', prim: 'carrot-100', desc: '연한 브랜드 배경' },
  { css: '--seed-color-bg-brand-weak-pressed', prim: 'carrot-200', desc: '연한 브랜드 배경 눌림' },
]

const bgNeutralRows = [
  { css: '--seed-color-bg-neutral-solid', prim: 'gray-1000', desc: '다크 버튼/스낵바' },
  { css: '--seed-color-bg-neutral-solid-muted', prim: 'gray-800', desc: '톤다운된 다크 배경' },
  { css: '--seed-color-bg-neutral-solid-muted-pressed', prim: 'gray-900', desc: '톤다운 다크 배경 눌림' },
  { css: '--seed-color-bg-neutral-inverted', prim: 'gray-900', desc: '반전 배경' },
  { css: '--seed-color-bg-neutral-inverted-pressed', prim: 'gray-800', desc: '반전 배경 눌림' },
  { css: '--seed-color-bg-neutral-weak', prim: 'gray-200', desc: '연한 중성 배경' },
  { css: '--seed-color-bg-neutral-weak-pressed', prim: 'gray-300', desc: '연한 중성 배경 눌림' },
  { css: '--seed-color-bg-neutral-weak-alpha', prim: 'static-black-alpha-200', desc: '투명 중성 오버레이' },
  { css: '--seed-color-bg-neutral-weak-alpha-pressed', prim: 'static-black-alpha-300', desc: '투명 중성 오버레이 눌림' },
  { css: '--seed-color-bg-disabled', prim: 'gray-200', desc: '비활성 배경' },
]

const bgStatusRows = [
  { css: '--seed-color-bg-positive-solid', prim: 'green-700', desc: '성공 배지' },
  { css: '--seed-color-bg-positive-solid-pressed', prim: 'green-800', desc: '성공 배지 눌림' },
  { css: '--seed-color-bg-positive-weak', prim: 'green-100', desc: '연한 성공 배경' },
  { css: '--seed-color-bg-positive-weak-pressed', prim: 'green-200', desc: '연한 성공 배경 눌림' },
  { css: '--seed-color-bg-critical-solid', prim: 'red-700', desc: '에러 배지' },
  { css: '--seed-color-bg-critical-solid-pressed', prim: 'red-800', desc: '에러 배지 눌림' },
  { css: '--seed-color-bg-critical-weak', prim: 'red-100', desc: '연한 에러 배경' },
  { css: '--seed-color-bg-critical-weak-pressed', prim: 'red-200', desc: '연한 에러 배경 눌림' },
  { css: '--seed-color-bg-warning-solid', prim: 'yellow-300', desc: '경고 배지' },
  { css: '--seed-color-bg-warning-solid-pressed', prim: 'yellow-400', desc: '경고 배지 눌림' },
  { css: '--seed-color-bg-warning-weak', prim: 'yellow-100', desc: '연한 경고 배경' },
  { css: '--seed-color-bg-warning-weak-pressed', prim: 'yellow-200', desc: '연한 경고 배경 눌림' },
  { css: '--seed-color-bg-informative-solid', prim: 'blue-700', desc: '정보 배지' },
  { css: '--seed-color-bg-informative-solid-pressed', prim: 'blue-800', desc: '정보 배지 눌림' },
  { css: '--seed-color-bg-informative-weak', prim: 'blue-100', desc: '연한 정보 배경' },
  { css: '--seed-color-bg-informative-weak-pressed', prim: 'blue-200', desc: '연한 정보 배경 눌림' },
]

const bgEtcRows = [
  { css: '--seed-color-bg-overlay', prim: 'static-black-alpha-700', desc: '딤 오버레이' },
  { css: '--seed-color-bg-overlay-muted', prim: 'static-black-alpha-500', desc: '약한 딤 오버레이' },
  { css: '--seed-color-bg-transparent', prim: '투명', desc: '완전 투명 배경' },
  { css: '--seed-color-bg-transparent-pressed', prim: 'static-black-alpha-100', desc: '투명 배경 눌림' },
  { css: '--seed-color-bg-transparent-selected', prim: 'static-black-alpha-200', desc: '투명 배경 선택됨' },
  { css: '--seed-color-bg-transparent-selected-pressed', prim: 'static-black-alpha-300', desc: '투명 배경 선택+눌림' },
]

const strokeRows = [
  { css: '--seed-color-stroke-neutral-solid', prim: 'gray-800', desc: '강한 선' },
  { css: '--seed-color-stroke-neutral-subtle', prim: 'static-black-alpha-200', desc: '카드 연한 선' },
  { css: '--seed-color-stroke-neutral-muted', prim: 'static-black-alpha-300', desc: '톤다운된 선' },
  { css: '--seed-color-stroke-neutral-weak', prim: 'gray-400', desc: '연한 선' },
  { css: '--seed-color-stroke-neutral-contrast', prim: 'gray-1000', desc: '고대비 선' },
  { css: '--seed-color-stroke-brand-solid', prim: 'carrot-700', desc: '브랜드 테두리' },
  { css: '--seed-color-stroke-brand-weak', prim: 'carrot-300', desc: '연한 브랜드 테두리' },
  { css: '--seed-color-stroke-focus-ring', prim: 'blue-600', desc: 'Focus Ring' },
  { css: '--seed-color-stroke-positive-solid', prim: 'green-700', desc: '성공 테두리' },
  { css: '--seed-color-stroke-positive-weak', prim: 'green-300', desc: '연한 성공 테두리' },
  { css: '--seed-color-stroke-critical-solid', prim: 'red-700', desc: '에러 테두리' },
  { css: '--seed-color-stroke-critical-weak', prim: 'red-300', desc: '연한 에러 테두리' },
  { css: '--seed-color-stroke-warning-solid', prim: 'yellow-700', desc: '경고 테두리' },
  { css: '--seed-color-stroke-warning-weak', prim: 'yellow-300', desc: '연한 경고 테두리' },
  { css: '--seed-color-stroke-informative-solid', prim: 'blue-700', desc: '정보 테두리' },
  { css: '--seed-color-stroke-informative-weak', prim: 'blue-300', desc: '연한 정보 테두리' },
]

const bannerRows = [
  { css: '--seed-color-banner-blue', prim: '#e1f7ff', desc: '배너 배경 - 블루' },
  { css: '--seed-color-banner-cool-gray', prim: '#ebf1f5', desc: '배너 배경 - 쿨그레이' },
  { css: '--seed-color-banner-green', prim: '#f0fbe5', desc: '배너 배경 - 그린' },
  { css: '--seed-color-banner-orange', prim: '#fff2e1', desc: '배너 배경 - 오렌지' },
  { css: '--seed-color-banner-pink', prim: '#ffebf1', desc: '배너 배경 - 핑크' },
  { css: '--seed-color-banner-purple', prim: '#f5ecff', desc: '배너 배경 - 퍼플' },
  { css: '--seed-color-banner-red', prim: '#ffecee', desc: '배너 배경 - 레드' },
  { css: '--seed-color-banner-teal', prim: '#e6faf6', desc: '배너 배경 - 틸' },
  { css: '--seed-color-banner-warm-gray', prim: '#f2f0ee', desc: '배너 배경 - 웜그레이' },
  { css: '--seed-color-banner-yellow', prim: '#fffae1', desc: '배너 배경 - 옐로우' },
]

const Table = ({ rows }) => (
  <TokenTable>
    <thead>
      <tr>
        <th>CSS Custom Property</th>
        <th>Primitive</th>
        <th>용도</th>
      </tr>
    </thead>
    <tbody>
      {rows.map(r => (
        <tr key={r.css}>
          <td><code>{r.css}</code></td>
          <td>{r.prim}</td>
          <td>{r.desc}</td>
        </tr>
      ))}
    </tbody>
  </TokenTable>
)

export function SemanticSection() {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        try {
          const targetEl = document.querySelector(hash);
          if (targetEl && (targetEl.id === 'f-semantic' || targetEl.closest('#f-semantic'))) {
            setExpanded(true);
          }
        } catch (e) {}
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);
  const total = fgRows.length + bgLayerRows.length + bgBrandRows.length + bgNeutralRows.length
    + bgStatusRows.length + bgEtcRows.length + strokeRows.length + bannerRows.length

  return (
    <Sec id="f-semantic">
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
        <span>Semantic Color &amp; State Tokens</span>
        <ChipInfo>84개 &amp; State</ChipInfo>
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
        의미(Role) 중심의 시맨틱 컬러 토큰과 UI 상호작용/옵션 상태(<code>pressed</code>, <code>hover</code>, <code>selected</code>, <code>disabled</code>) 토큰이 통합 구성되어 있습니다.
      </p>

      <p>
        SEED의 역할 기반 색상 시스템은 <strong>Property(속성) → Role(역할) → Variant(변형) → State(상태)</strong> 체계로 구성됩니다.
        <br />
        <strong>Property</strong> — Foreground(텍스트·아이콘), Background(화면/UI 배경), Stroke(경계선) 3가지 기본 속성.
        <br />
        <strong>Role</strong> — Brand(브랜드/주요 액션 강조), Neutral(일반 콘텐츠 기본색), Positive(성공/확인),
        Warning(주의 필요), Critical(오류/중요 문제), Informative(유용한 정보 전달).
        <br />
        <strong>Variant</strong> — 같은 Role이라도 강조도에 따라 <code>-weak</code>(낮은 강조)/<code>-solid</code>(높은 강조) 변형.
        <br />
        <strong>State</strong> — 버튼을 눌렀을 때처럼 상호작용에 따라 색상이 변하는 것(<code>-pressed</code> 등).
      </p>
      {expanded && (
        <div style={{ marginTop: 16 }}>
      <p style={{ fontSize: 12.5, color: '#9CA3AF' }}>
        접근성: 모든 역할 기반 색상은 의도된 전경/배경 조합에 대해 APCA 기준(Inclusive Design 참고)을
        충족하도록 설계됩니다. Layer 색상(깊이·계층 표현)은 Elevation 문서를 참고하세요.
      </p>

      <h3>Foreground (fg)</h3>
      <Table rows={fgRows} />

      <h3>Background — Layer</h3>
      <Table rows={bgLayerRows} />

      <h3>Background — Brand</h3>
      <Table rows={bgBrandRows} />

      <h3>Background — Neutral</h3>
      <Table rows={bgNeutralRows} />

      <h3>Background — Status (Positive / Critical / Warning / Informative)</h3>
      <Table rows={bgStatusRows} />

      <h3>Background — Overlay / Transparent</h3>
      <Table rows={bgEtcRows} />

      <h3>Stroke</h3>
      <Table rows={strokeRows} />

      <h3>Banner</h3>
      <Table rows={bannerRows} />
    
        </div>
      )}
</Sec>
  )
}

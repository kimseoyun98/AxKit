import { Sec, TokenTable } from '../components/UI'

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
  { css: '--seed-color-bg-magic-weak', prim: '#f9f2ee (light) / #201f1f (dark)', desc: 'AI/매직 기능 배경' },
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

// 공식 CSS: --seed-color-stroke-neutral-solid = gray-300 (light) / gray-400 (dark)
const strokeRows = [
  { css: '--seed-color-stroke-neutral', prim: 'gray-300 / dark: gray-300', desc: '기본 선 (field, divider)' },
  { css: '--seed-color-stroke-neutral-solid', prim: 'gray-300 / dark: gray-400', desc: '강한 선 ⚠️ fix/missing-stoke-neutral-solid' },
  { css: '--seed-color-stroke-neutral-muted', prim: 'gray-200 / dark: gray-200', desc: '흐린 선' },
  { css: '--seed-color-stroke-on-image', prim: 'static-black-alpha-50', desc: '이미지 위 선' },
  { css: '--seed-color-stroke-control', prim: 'gray-400 / dark: gray-400', desc: '컨트롤(체크박스 등) 테두리' },
  { css: '--seed-color-stroke-field', prim: 'gray-400 / dark: gray-400', desc: '인풋 필드 테두리' },
  { css: '--seed-color-stroke-field-focused', prim: 'gray-800 / dark: gray-800', desc: '포커스된 인풋 테두리' },
  { css: '--seed-color-stroke-brand', prim: 'carrot-300 / dark: carrot-300', desc: '브랜드 테두리' },
  { css: '--seed-color-stroke-positive', prim: 'green-300 / dark: green-300', desc: '성공 테두리' },
  { css: '--seed-color-stroke-critical', prim: 'red-300 / dark: red-300', desc: '에러 테두리' },
  { css: '--seed-color-stroke-informative', prim: 'blue-300 / dark: blue-300', desc: '정보 테두리' },
]

const bannerRows = [
  { css: '--seed-color-banner-blue', prim: '#e1f7ff / dark: #0d2a3a', desc: '배너 배경 - 블루' },
  { css: '--seed-color-banner-cool-gray', prim: '#ebf1f5 / dark: #242c33', desc: '배너 배경 - 쿨그레이' },
  { css: '--seed-color-banner-green', prim: '#f0fbe5 / dark: #1e361c', desc: '배너 배경 - 그린' },
  { css: '--seed-color-banner-orange', prim: '#fff2e1 / dark: #42230a', desc: '배너 배경 - 오렌지' },
  { css: '--seed-color-banner-pink', prim: '#ffebf1 / dark: #3b172c', desc: '배너 배경 - 핑크' },
  { css: '--seed-color-banner-purple', prim: '#f5ecff / dark: #2e1e45', desc: '배너 배경 - 퍼플' },
  { css: '--seed-color-banner-red', prim: '#ffecee / dark: #3a0f15', desc: '배너 배경 - 레드' },
  { css: '--seed-color-banner-teal', prim: '#e6faf6 / dark: #143633', desc: '배너 배경 - 틸' },
  { css: '--seed-color-banner-warm-gray', prim: '#f2f0ee / dark: #2f2b27', desc: '배너 배경 - 웜그레이' },
  { css: '--seed-color-banner-yellow', prim: '#fffae1 / dark: #3e2b00', desc: '배너 배경 - 옐로우' },
]

const mannerTempRows = [
  { css: '--seed-color-manner-temp-l1-bg', prim: '#f1f2f3 / dark: #292929', desc: '매너온도 L1 배경 (가장 낮음)' },
  { css: '--seed-color-manner-temp-l1-text', prim: '#757b85 / dark: #b8b8b9', desc: '매너온도 L1 텍스트' },
  { css: '--seed-color-manner-temp-l2-bg', prim: '#f8f4ec / dark: #332605', desc: '매너온도 L2 배경' },
  { css: '--seed-color-manner-temp-l2-text', prim: '#ab863f / dark: #f5db97', desc: '매너온도 L2 텍스트' },
  { css: '--seed-color-manner-temp-l3-bg', prim: '#fff5e5 / dark: #372b01', desc: '매너온도 L3 배경' },
  { css: '--seed-color-manner-temp-l3-text', prim: '#e08a00 / dark: #fdda65', desc: '매너온도 L3 텍스트' },
  { css: '--seed-color-manner-temp-l4-bg', prim: '#fff3e5 / dark: #372301', desc: '매너온도 L4 배경' },
  { css: '--seed-color-manner-temp-l4-text', prim: '#f57e00 / dark: #fbbe55', desc: '매너온도 L4 텍스트' },
  { css: '--seed-color-manner-temp-l5-bg', prim: '#fff1e5 / dark: #371f01', desc: '매너온도 L5 배경' },
  { css: '--seed-color-manner-temp-l5-text', prim: '#ff7300 / dark: #faac4b', desc: '매너온도 L5 텍스트' },
  { css: '--seed-color-manner-temp-l6-bg', prim: '#fff0e5 / dark: #351b03', desc: '매너온도 L6 배경' },
  { css: '--seed-color-manner-temp-l6-text', prim: '#ff6600 / dark: #fc9855', desc: '매너온도 L6 텍스트 (브랜드 기준)' },
  { css: '--seed-color-manner-temp-l7-bg', prim: '#ffefe5 / dark: #371701', desc: '매너온도 L7 배경' },
  { css: '--seed-color-manner-temp-l7-text', prim: '#ff5100 / dark: #f97a25', desc: '매너온도 L7 텍스트' },
  { css: '--seed-color-manner-temp-l8-bg', prim: '#ffeee5 / dark: #380f00', desc: '매너온도 L8 배경' },
  { css: '--seed-color-manner-temp-l8-text', prim: '#ff3300 / dark: #fe6a34', desc: '매너온도 L8 텍스트' },
  { css: '--seed-color-manner-temp-l9-bg', prim: '#fdeded / dark: #380500', desc: '매너온도 L9 배경' },
  { css: '--seed-color-manner-temp-l9-text', prim: '#e82c45 / dark: #fe6a5d', desc: '매너온도 L9 텍스트' },
  { css: '--seed-color-manner-temp-l10-bg', prim: '#ffebee / dark: #34040a', desc: '매너온도 L10 배경 (가장 높음)' },
  { css: '--seed-color-manner-temp-l10-text', prim: '#cb0123 / dark: #fb6f82', desc: '매너온도 L10 텍스트' },
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
  const total = fgRows.length + bgLayerRows.length + bgBrandRows.length + bgNeutralRows.length
    + bgStatusRows.length + bgEtcRows.length + strokeRows.length + bannerRows.length + mannerTempRows.length

  return (
    <Sec id="f-semantic">
      <h2>Semantic Color Tokens <span style={{ fontSize: 12, fontWeight: 500, color: '#9CA3AF' }}>@seed-design/css 전체 {total}개</span></h2>

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

      <h3>Manner Temp <span style={{ fontSize: 12, fontWeight: 500, color: '#9CA3AF' }}>매너온도 전용 색상 (l1~l10 × bg/text = 20개)</span></h3>
      <p style={{ fontSize: 12.5, color: '#6B7280' }}>
        매너온도 컴포넌트 전용 색상 토큰. L1(낮음)~L10(높음) 10단계로 구성되며 각 단계마다 배경(bg)과 텍스트(text) 색상을 제공합니다.
        라이트/다크 모드 모두 정의되어 있습니다.
      </p>
      <Table rows={mannerTempRows} />
    </Sec>
  )
}

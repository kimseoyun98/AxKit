import { Sec, TokenTable, Notice , ChipInfo} from '../components/UI'

const viewportMapping = [
  {
    device: 'Mobile',
    figmaFrame: '375px / 390px',
    bp: 'base',
    range: '0 - 767px',
    figmaGrid: '12 Columns (Stretch)',
    gutterToken: 'x3 (12px)',
    margin: '12px',
    codeProp: 'columns={{ base: 1 }} gap="x3"',
  },
  {
    device: 'Tablet',
    figmaFrame: '768px / 834px',
    bp: 'md',
    range: '768 - 1439px',
    figmaGrid: '12 Columns (Stretch)',
    gutterToken: 'x4 (16px)',
    margin: '24px',
    codeProp: 'columns={{ md: 2 }} gap="x4"',
  },
  {
    device: 'Desktop',
    figmaFrame: '1440px / 1920px',
    bp: 'xl',
    range: '1440px +',
    figmaGrid: '12 Columns (Stretch)',
    gutterToken: 'x4 (16px)',
    margin: '32px',
    codeProp: 'columns={{ xl: 4 }} gap="x4"',
  },
]

export function GridSection() {
  return (
    <Sec id="f-grid">
      <h2>Grid / Layout Tokens <ChipInfo>@seed-design/css 반응형 렌더링</ChipInfo></h2>
      <p>
        레이아웃은 제품의 콘텐츠를 구조화하고 일관된 사용자 경험을 제공하기 위한 시각적 뼈대입니다. SEED는
        다양한 화면 밀도와 디바이스 환경에 대응할 수 있도록 유연한 그리드 시스템과 중단점(Breakpoint)을 제공합니다.
      </p>

      <Notice>
        <strong>SEED 2.0 그리드는 CSS 고정값 대신 JSX 반응형 Prop과 1fr 비율로 작동합니다.</strong>{' '}
        Column/Gutter/Margin 숫자는 Figma 디자인 가이드라인이며, 코드에서는 JSX 반응형 Prop(<code>gap={`{{ base: "x3", md: "x4" }}`}</code>)이나 1fr 비율(<code>grid-template-columns: repeat(12, 1fr)</code>)을 활용하여 브라우저가 뷰포트 크기에 따라 유연하게 자동 계산하도록 설계되어 있습니다.
      </Notice>

      {/* Figma ➔ Code 매핑 사양표 */}
      <h3 style={{ marginTop: 28 }}>Figma Layout Grid ➔ React Code 사양표</h3>
      <p>디자이너의 피그마 프레임 규격과 개발자의 SEED Breakpoint &amp; React JSX 코드 매핑 사양입니다.</p>
      <TokenTable>
        <thead>
          <tr>
            <th>디바이스</th>
            <th>Figma Frame 너비</th>
            <th>SEED Breakpoint</th>
            <th>타겟 Viewport</th>
            <th>Figma Grid Type</th>
            <th>Gutter (스페이싱 토큰)</th>
            <th>Margin</th>
            <th>React Code Prop 예시</th>
          </tr>
        </thead>
        <tbody>
          {viewportMapping.map(r => (
            <tr key={r.device}>
              <td><strong>{r.device}</strong></td>
              <td><code>{r.figmaFrame}</code></td>
              <td><code>{r.bp}</code></td>
              <td>{r.range}</td>
              <td>{r.figmaGrid}</td>
              <td><code>{r.gutterToken}</code></td>
              <td>{r.margin}</td>
              <td><code>{r.codeProp}</code></td>
            </tr>
          ))}
        </tbody>
      </TokenTable>

      <h3 style={{ marginTop: 36 }}>Responsive Behavior</h3>
      <p>
        <strong>Fluid (가변형)</strong> — 중단점 사이 구간에서 컬럼 너비가 브라우저 너비에 따라 비율(%)로 변합니다.
        <br />
        <strong>Fixed &amp; Centered (고정 및 중앙 정렬)</strong> — 특정 중단점(예: max-width 1040px)에 도달하면
        너비가 더 늘어나지 않고 화면 중앙에 고정됩니다.
        <br />
        하나의 화면에 두 형태를 혼합해서 쓸 수 있습니다.
      </p>

      <h3>Column Span &amp; Offset</h3>
      <p>
        <strong>Column Span</strong> — 콘텐츠가 차지하는 컬럼 개수. 중요도에 따라 span 값을 조절해 시각적 위계를 부여합니다.
        <br />
        <strong>Column Offset</strong> — 콘텐츠 시작 전 비워두는 컬럼 개수. 콘텐츠를 의도적으로 중앙 배치하거나
        좌우 균형을 맞출 때 사용합니다.
      </p>

      <h3>Layout Regions</h3>
      <p>
        <strong>Header (GNB)</strong> — 서비스 전체를 관통하는 최상위 탐색 영역.
        <br />
        <strong>Side Navigation</strong> — 특정 서비스/대시보드 내 하위 메뉴 탐색. md(768px) 미만에서는 GNB 내부로 통합·숨김.
        <br />
        <strong>Main Content</strong> — 실제 사용자가 상호작용하는 핵심 콘텐츠 영역. 레이아웃 유형에 따라 그리드가 적용됩니다.
        <br />
        <strong>Aside</strong> — 우측에서 나타나는 보조 영역. 선택 항목의 상세 정보나 설정 등 부가 작업에 사용합니다.
      </p>
    </Sec>
  )
}

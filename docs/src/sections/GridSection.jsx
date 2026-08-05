import { Sec, TokenTable, Notice } from '../components/UI'

const densityRows = [
  { density: 'Low', gridType: 'Centered', column: '8', gutter: '24px', margin: '32px', maxWidth: '720px' },
  { density: 'Middle (base)', gridType: 'Centered', column: '12', gutter: '24px', margin: '32px', maxWidth: '1040px' },
  { density: 'High', gridType: 'Fluid', column: 'Full-width', gutter: '-', margin: '32px', maxWidth: '1040px (min)' },
]

const breakpointRows = [
  { bp: 'base', viewport: '0 - 479px', columns: 'base', gutter: '16px', margin: '12px' },
  { bp: 'sm', viewport: '480 - 767px', columns: 'sm', gutter: '16px', margin: '12px' },
  { bp: 'md', viewport: '768 - 1279px', columns: 'md', gutter: '32px', margin: '24px' },
  { bp: 'lg', viewport: '1280 - 1439px', columns: 'lg', gutter: '32px', margin: '24px' },
  { bp: 'xl', viewport: '1440px +', columns: 'xl', gutter: '32px', margin: '24px' },
]

export function GridSection() {
  return (
    <Sec id="f-grid">
      <h2>Grid / Layout Tokens</h2>
      <p>
        레이아웃은 제품의 콘텐츠를 구조화하고 일관된 사용자 경험을 제공하기 위한 시각적 뼈대입니다. SEED는
        다양한 화면 밀도와 디바이스 환경에 대응할 수 있도록 유연한 그리드 시스템과 중단점(Breakpoint)을 제공합니다.
      </p>
      <Notice>
        <strong>Column/Gutter/Margin 숫자는 <code>@seed-design/css</code>의 공식 CSS 토큰이 아닙니다.</strong>{' '}
        실제 컴파일된 CSS의 <code>--seed-grid-columns-*</code>는 값이 없는 빈 통로(<code>none</code>/<code>initial</code>)일
        뿐이고, 이 페이지의 표는 SEED가 문서로만 제공하는 권장 가이드라인입니다. Breakpoint 뷰포트
        기준값(0/480/768/1280/1440)만 패키지에 실제 상수로 존재합니다. 이롬넷 Figma의 Column(12)/Gutter
        변수는 이 가이드라인 숫자를 <strong>Figma의 Layout Grid Style 기능에 매핑하기 위해</strong> 직접
        만든 값이며, 코드에 그대로 대응하는 토큰이 아닙니다.
      </Notice>

      <h3>Layout Types</h3>
      <p>
        <strong>Dashboard Layout</strong> — 판매자 센터, 광고주 센터처럼 복잡한 데이터와 관리 기능이 강조되는 화면.
        <br />
        <strong>Content Layout</strong> — 이롬넷 홈페이지, 회사소개, 채용 페이지처럼 정보 전달이 목적인 서비스 페이지.
      </p>

      <h3>Dashboard Layout — Density</h3>
      <p>화면의 복잡도와 정보량에 따라 세 가지 밀도로 구분합니다.</p>
      <TokenTable>
        <thead>
          <tr>
            <th>Density</th>
            <th>Grid Type</th>
            <th>Column</th>
            <th>Gutter</th>
            <th>Margins</th>
            <th>Max-width</th>
          </tr>
        </thead>
        <tbody>
          {densityRows.map(r => (
            <tr key={r.density}>
              <td>{r.density}</td>
              <td>{r.gridType}</td>
              <td>{r.column}</td>
              <td>{r.gutter}</td>
              <td>{r.margin}</td>
              <td>{r.maxWidth}</td>
            </tr>
          ))}
        </tbody>
      </TokenTable>

      <h3>Content Layout</h3>
      <p>
        12컬럼을 사용하여 시스템 정합성을 유지합니다. 가독성을 위해 특정 중단점(lg)에서 중앙 정렬(Centered)되는
        것을 원칙으로 하며, max-width는 기본 1040px을 권장하되 커머스 검색 결과 등 넓은 탐색이 필요한 경우
        1280px까지 확장합니다.
      </p>

      <h3>Grid Anatomy</h3>
      <p>
        <strong>Columns</strong> — 콘텐츠가 배치되는 영역, 화면 너비에 따라 개수가 조절됩니다.
        <br />
        <strong>Gutters</strong> — 컬럼과 컬럼 사이의 간격. Dashboard 레이아웃은 일관되게 24px을 권장합니다.
        <br />
        <strong>Margins</strong> — 콘텐츠 영역과 화면 끝 사이의 간격. 기본 32px을 유지합니다.
      </p>
      <Notice>
        컬럼 폭 자체는 고정 px 값으로 정의하지 않습니다. 실제 SEED 코드는{' '}
        <code>grid-template-columns: repeat(12, minmax(0, 1fr))</code>처럼 <code>1fr</code> 단위를 써서
        margin/gutter를 제외한 나머지 공간을 브라우저가 자동으로 12등분하게 둡니다. 그래서 컬럼 하나의
        px 값이 정수로 딱 떨어지지 않는 게 정상입니다 (Figma Layout Grid의 <code>alignment: STRETCH</code>가
        동일한 동작이라 이롬넷 Figma에도 그대로 적용해뒀습니다).
        <br /><br />
        <strong>단, Margin/Gutter는 컬럼 폭과 다르게 "자동"이 아닙니다.</strong> SEED 패키지엔 breakpoint
        임계값(0/480/768/1280/1440)과 <code>--seed-box-margin-*</code> 같은 빈 통로만 있을 뿐, "768px
        넘으면 margin이 12→24px로 바뀐다"는 실제 전환 로직은 이걸 가져다 쓰는 앱이{' '}
        <code>@media (min-width: 768px) {'{ padding: 24px }'}</code>처럼 직접 작성해야 합니다. 즉 컬럼
        폭만 뷰포트에 따라 연속적으로 자동 계산되고, margin과 gutter는 breakpoint 경계에서 개발자가
        수동으로 값을 바꿔주는 구조입니다.
      </Notice>

      <h3>Responsive Behavior</h3>
      <p>
        <strong>Fluid (가변형)</strong> — 중단점 사이 구간에서 컬럼 너비가 브라우저 너비에 따라 비율(%)로 변합니다.
        <br />
        <strong>Fixed &amp; Centered (고정 및 중앙 정렬)</strong> — 특정 중단점(예: max-width 1040px)에 도달하면
        너비가 더 늘어나지 않고 화면 중앙에 고정됩니다.
        <br />
        하나의 화면에 두 형태를 혼합해서 쓸 수 있습니다.
      </p>

      <h3 id="f-breakpoint">Breakpoint</h3>
      <p>SEED는 Mobile First 원칙을 따릅니다 — 작은 화면에서 시작해 화면이 커짐에 따라 레이아웃이 확장됩니다.</p>
      <TokenTable>
        <thead>
          <tr>
            <th>Breakpoint</th>
            <th>Viewport</th>
            <th>Columns</th>
            <th>Gutters</th>
            <th>Margins</th>
          </tr>
        </thead>
        <tbody>
          {breakpointRows.map(r => (
            <tr key={r.bp}>
              <td>{r.bp}</td>
              <td>{r.viewport}</td>
              <td>{r.columns}</td>
              <td>{r.gutter}</td>
              <td>{r.margin}</td>
            </tr>
          ))}
        </tbody>
      </TokenTable>
      <Notice>사이드바(Sidebar)는 md(768px) 이상에서 기본 노출되며, 768px 미만에서는 Header 내의 메뉴로 통합됩니다.</Notice>

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

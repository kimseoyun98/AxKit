import { Sec, TokenTable, Notice } from '../components/UI'

// @seed-design/css에 실제 상수로 존재하는 것: Breakpoint 뷰포트 기준값만
const breakpointRows = [
  { bp: 'base', viewport: '0px',    cssVar: '--seed-breakpoint-base' },
  { bp: 'sm',   viewport: '480px',  cssVar: '--seed-breakpoint-sm' },
  { bp: 'md',   viewport: '768px',  cssVar: '--seed-breakpoint-md' },
  { bp: 'lg',   viewport: '1280px', cssVar: '--seed-breakpoint-lg' },
  { bp: 'xl',   viewport: '1440px', cssVar: '--seed-breakpoint-xl' },
]

export function GridSection() {
  return (
    <Sec id="f-grid">
      <h2>Breakpoint</h2>
      <p>
        SEED는 Mobile First 원칙을 따릅니다 — 작은 화면에서 시작해 화면이 커짐에 따라 레이아웃이 확장됩니다.
      </p>
      <Notice>
        <code>@seed-design/css</code>에 실제 상수로 존재하는 것은 <strong>Breakpoint 뷰포트 기준값 5개</strong>뿐입니다. Column 수, Gutter, Margin은 패키지에 토큰이 없으며 SEED가 문서로만 제공하는 가이드라인입니다.
      </Notice>
      <TokenTable>
        <thead>
          <tr>
            <th>Breakpoint</th>
            <th>Viewport</th>
            <th>CSS Variable</th>
          </tr>
        </thead>
        <tbody>
          {breakpointRows.map(r => (
            <tr key={r.bp}>
              <td><code>{r.bp}</code></td>
              <td><code>{r.viewport}</code></td>
              <td><code>{r.cssVar}</code></td>
            </tr>
          ))}
        </tbody>
      </TokenTable>

      <h3>Layout Regions</h3>
      <p>
        <strong>Header (GNB)</strong> — 서비스 전체를 관통하는 최상위 탐색 영역.
        <br />
        <strong>Side Navigation</strong> — 특정 서비스/대시보드 내 하위 메뉴 탐색. md(768px) 미만에서는 GNB 내부로 통합·숨김.
        <br />
        <strong>Main Content</strong> — 실제 사용자가 상호작용하는 핵심 콘텐츠 영역.
        <br />
        <strong>Aside</strong> — 우측에서 나타나는 보조 영역. 선택 항목의 상세 정보나 설정 등 부가 작업에 사용합니다.
      </p>
    </Sec>
  )
}

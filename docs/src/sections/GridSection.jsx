import { IconChevronDownLine } from '@karrotmarket/react-monochrome-icon';
import { useState, useEffect } from 'react';
import { Sec, TokenTable, Notice } from '../components/UI';

const officialBreakpoints = [
  { name: 'base', minWidth: '0px', desc: 'Mobile First 기본 (모든 화면)' },
  { name: 'sm', minWidth: '480px', desc: '대형 모바일 / 소형 태블릿' },
  { name: 'md', minWidth: '768px', desc: '태블릿 / 중형 화면 (GNB 통합 기준)' },
  { name: 'lg', minWidth: '1280px', desc: '소형 데스크톱 / 대형 태블릿' },
  { name: 'xl', minWidth: '1440px', desc: '대형 데스크톱' },
];

const layoutPrimitives = [
  {
    name: 'Box',
    role: '최하단 기본 레이아웃 블록',
    desc: '디자인 토큰(bg, px, py, borderRadius 등)을 JSX Prop으로 직접 바인딩하며 그래디언트 지원',
    example: '<Box bg="bg.neutralWeak" px="x3" py="x2" borderRadius="r2" />',
  },
  {
    name: 'Flex',
    role: 'CSS Flexbox 컨테이너',
    desc: 'Flexbox 레이아웃 (direction, align, justify, flexGrow, gap) 제어',
    example: '<Flex direction="row" gap="x2" align="center" flexGrow={1} />',
  },
  {
    name: 'Float',
    role: '고정 위치 배치 요소',
    desc: '상대 위치 부모 안에서 placement와 offsetX, offsetY로 플로팅 버튼/뱃지 고정',
    example: '<Float placement="bottom-end" offsetX="x4" offsetY="x4" />',
  },
  {
    name: 'Grid / GridItem',
    role: 'CSS Grid 기반 동적 레이아웃',
    desc: 'repeat(12, 1fr) 기반 columns, rows, autoFlow 및 GridItem(colSpan="full", asChild) 제어',
    example: '<Grid columns={3} gap="x2"><GridItem colSpan={2} /></Grid>',
  },
  {
    name: 'HStack',
    role: '가로 축 정렬 스택',
    desc: 'flex-direction: row 기반으로 자식 요소들을 가로로 배치 (gap 자동 설정)',
    example: '<HStack gap="x2" align="center"><Box /> <Box /></HStack>',
  },
  {
    name: 'VStack',
    role: '세로 축 정렬 스택',
    desc: 'flex-direction: column 기반으로 자식 요소들을 세로로 쌓음 (gap 자동 설정)',
    example: '<VStack gap="x3" width="full"><Box /> <Box /></VStack>',
  },
];

const viewportMapping = [
  {
    device: 'Mobile',
    figmaFrame: '375px / 390px',
    bp: 'base (0px+)',
    range: '0 - 479px',
    figmaGrid: '12 Columns (Stretch)',
    gutterToken: 'x3 (12px)',
    margin: '12px',
    codeProp: 'columns={{ base: 1 }} gap="x3"',
  },
  {
    device: 'Mobile Large',
    figmaFrame: '480px',
    bp: 'sm (480px+)',
    range: '480 - 767px',
    figmaGrid: '12 Columns (Stretch)',
    gutterToken: 'x3 (12px)',
    margin: '16px',
    codeProp: 'columns={{ sm: 2 }} gap="x3"',
  },
  {
    device: 'Tablet',
    figmaFrame: '768px / 834px',
    bp: 'md (768px+)',
    range: '768 - 1279px',
    figmaGrid: '12 Columns (Stretch)',
    gutterToken: 'x4 (16px)',
    margin: '24px',
    codeProp: 'columns={{ md: 2 }} gap="x4"',
  },
  {
    device: 'Desktop Small',
    figmaFrame: '1280px',
    bp: 'lg (1280px+)',
    range: '1280 - 1439px',
    figmaGrid: '12 Columns (Stretch)',
    gutterToken: 'x4 (16px)',
    margin: '28px',
    codeProp: 'columns={{ lg: 3 }} gap="x4"',
  },
  {
    device: 'Desktop Large',
    figmaFrame: '1440px / 1920px',
    bp: 'xl (1440px+)',
    range: '1440px +',
    figmaGrid: '12 Columns (Stretch)',
    gutterToken: 'x4 (16px)',
    margin: '32px',
    codeProp: 'columns={{ xl: 4 }} gap="x4"',
  },
];

export function GridSection() {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        try {
          const targetEl = document.querySelector(hash);
          if (targetEl && (targetEl.id === 'f-grid' || targetEl.closest('#f-grid'))) {
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
    <Sec id="f-grid">
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
        <span>Grid / Layout</span>
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
        SEED는 Mobile-First 반응형 시스템과 6대 코어 레이아웃 프리미티브(`Box`, `Flex`, `Float`, `Grid`, `HStack`, `VStack`)를 제공합니다.
      </p>
      {expanded && (
        <div style={{ marginTop: 16 }}>
          <Notice>
            <strong>SEED 2.0 반응형 시스템은 Mobile-First 기준의 반응형 객체 Prop으로 작동합니다.</strong>{' '}
            <code>Box</code>, <code>Flex</code>, <code>Grid</code>, <code>VStack</code>, <code>HStack</code> 등의 컴포넌트에서 <code>padding={`{{ base: "x3", md: "x4", xl: "x6" }}`}</code>와 같이 Breakpoint 객체를 전달하여 유연하게 반응형 레이아웃을 작성합니다.
          </Notice>

          {/* 1. SEED 오피셜 6대 Layout Primitives 표 */}
          <h3 style={{ marginTop: 28 }}>SEED 2.0 Core 6 Layout Primitives</h3>
          <p>SEED React에서 레이아웃을 구성하는 6가지 기초 컴포넌트 명세입니다.</p>
          <TokenTable>
            <thead>
              <tr>
                <th>컴포넌트</th>
                <th>역할 (Role)</th>
                <th>핵심 기능 및 설명</th>
                <th>React Code 사용 예시</th>
              </tr>
            </thead>
            <tbody>
              {layoutPrimitives.map(l => (
                <tr key={l.name}>
                  <td><code>{l.name}</code></td>
                  <td><strong>{l.role}</strong></td>
                  <td>{l.desc}</td>
                  <td><code>{l.example}</code></td>
                </tr>
              ))}
            </tbody>
          </TokenTable>

          {/* 2. SEED 오피셜 Breakpoint 규격표 */}
          <h3 style={{ marginTop: 36 }}>SEED 2.0 Official Breakpoints</h3>
          <p>SEED에서 정의하는 5대 표준 Breakpoint 규격입니다.</p>
          <TokenTable>
            <thead>
              <tr>
                <th>Breakpoint Name</th>
                <th>min-width</th>
                <th>타겟 디바이스 및 특징</th>
              </tr>
            </thead>
            <tbody>
              {officialBreakpoints.map(bp => (
                <tr key={bp.name}>
                  <td><code>{bp.name}</code></td>
                  <td><code>{bp.minWidth}</code></td>
                  <td>{bp.desc}</td>
                </tr>
              ))}
            </tbody>
          </TokenTable>

          {/* 3. Figma ➔ Code 매핑 사양표 */}
          <h3 style={{ marginTop: 36 }}>Figma Layout Grid ➔ React Code 매핑 사양표</h3>
          <p>디자이너의 피그마 프레임 규격과 개발자의 SEED Breakpoint &amp; React JSX 코드 매핑 사양입니다.</p>
          <TokenTable>
            <thead>
              <tr>
                <th>디바이스</th>
                <th>Figma Frame 너비</th>
                <th>SEED Breakpoint</th>
                <th>타겟 Viewport</th>
                <th>Figma Grid Type</th>
                <th>Gutter Token</th>
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

          {/* 4. Responsive Object Props & Hiding/Showing */}
          <h3 style={{ marginTop: 36 }}>Responsive Object Props &amp; Hiding/Showing</h3>
          <p>
            Box 기반 컴포넌트(`Box`, `Flex`, `Grid`, `VStack`, `HStack`)의 주요 반응형 속성 사용법입니다.
          </p>
          <ul style={{ marginLeft: 20, fontSize: 13.5, color: '#334155', lineHeight: 1.9 }}>
            <li>
              <strong>Responsive Object Props</strong> — <code>padding={`{{ base: "x4", md: "x6", xl: "x8" }}`}</code> 와 같이 객체 형태로 전달.
            </li>
            <li>
              <strong>Hiding Elements (`hideFrom`)</strong> — <code>hideFrom="md"</code> 속성으로 특정 Breakpoint 이상에서 요소를 숨김 (<code>display: none;</code>과 동일).
            </li>
            <li>
              <strong>Display Control</strong> — <code>display={`{{ base: "none", md: "block" }}`}</code> 로 디바이스별 노출 여부 직접 제어.
            </li>
            <li>
              <strong>Gradient Support (`Box`)</strong> — <code>backgroundGradient="highlightMagic"</code> 과 <code>backgroundGradientDirection="43deg" | "to bottom"</code> 속성 지원.
            </li>
            <li>
              <strong>Floating Anchor (`Float`)</strong> — <code>placement="top-start" | "bottom-end"</code> 및 <code>offsetX="x4"</code>, <code>offsetY="x4"</code> 로 플로팅 요소 배치.
            </li>
            <li>
              <strong>Grid Spanning &amp; Composition</strong> — <code>GridItem colSpan="full"</code>, <code>rowSpan={2}</code> 및 <code>asChild</code> 프로퍼티 합성 지원.
            </li>
          </ul>

          {/* 5. Responsive Hooks & SSR Provider */}
          <h3 style={{ marginTop: 28 }}>Responsive Hooks &amp; SSR Support</h3>
          <p>JavaScript 로직 내 반응형 조율이 필요한 경우 훅과 Provider를 제공합니다.</p>
          <ul style={{ marginLeft: 20, fontSize: 13.5, color: '#334155', lineHeight: 1.9 }}>
            <li>
              <code>useBreakpoint()</code> — 현재 속한 Breakpoint 이름 (<code>'base' | 'sm' | 'md' | 'lg' | 'xl'</code>) 반환.
            </li>
            <li>
              <code>useBreakpointValue(&#123; base: ..., lg: ... &#125;)</code> — Viewport에 맞는 값으로 동적 resolve.
            </li>
            <li>
              <code>&lt;BreakpointProvider defaultBreakpoint="md"&gt;</code> — SSR 등 Viewport 정보가 없을 때의 기본값 지정.
            </li>
          </ul>

          {/* 6. Layout Regions */}
          <h3 style={{ marginTop: 28 }}>Layout Regions</h3>
          <p>
            <strong>Header (GNB)</strong> — 서비스 전체를 관통하는 최상위 탐색 영역.
            <br />
            <strong>Side Navigation</strong> — 특정 서비스/대시보드 내 하위 메뉴 탐색. md(768px) 미만에서는 GNB 내부로 통합·숨김.
            <br />
            <strong>Main Content</strong> — 실제 사용자가 상호작용하는 핵심 콘텐츠 영역. 레이아웃 유형에 따라 그리드가 적용됩니다.
            <br />
            <strong>Aside</strong> — 우측에서 나타나는 보조 영역. 선택 항목의 상세 정보나 설정 등 부가 작업에 사용합니다.
          </p>
        </div>
      )}
    </Sec>
  );
}

import { IconChevronDownLine } from '@karrotmarket/react-monochrome-icon';
import { useState, useEffect } from 'react';
import { Sec, TokenTable, Notice, ChipInfo } from '../components/UI';

const officialBreakpoints = [
  { name: 'base', minWidth: '0px', desc: 'Mobile First 기본 (모든 화면)' },
  { name: 'sm', minWidth: '480px', desc: '대형 모바일 / 소형 태블릿' },
  { name: 'md', minWidth: '768px', desc: '태블릿 / 중형 화면 (GNB 통합 기준)' },
  { name: 'lg', minWidth: '1280px', desc: '소형 데스크톱 / 대형 태블릿' },
  { name: 'xl', minWidth: '1440px', desc: '대형 데스크톱' },
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
        <span>Grid & Layout Tokens</span>
        <ChipInfo>반응형</ChipInfo>
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
        SEED는 Mobile-First 반응형 시스템을 제공합니다. 특정 Breakpoint에 값을 지정하면 더 넓은 Viewport에도 동일한 상위 값이 자동 적용됩니다.
      </p>
      {expanded && (
        <div style={{ marginTop: 16 }}>

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
    
        </div>
      )}
</Sec>
  )
}

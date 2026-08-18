import { useState, useEffect } from 'react';
import { Sec } from '../components/UI';
import { IconChevronDownLine } from '@karrotmarket/react-monochrome-icon';

export function DesignTokenSection() {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        try {
          const targetEl = document.querySelector(hash);
          if (targetEl && (targetEl.id === 'f-design-token' || targetEl.closest('#f-design-token'))) {
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
    <Sec id="f-design-token">
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
        <span>Design Token — Overview</span>
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
        피그마 스타일 값과 React 코드 간의 수치를 1:1 동기화하는 오피셜 CSS 변수(<code>var(--seed-*)</code>) 시스템입니다.
      </p>

      {/* 접혀있는 세부 내용 영역 */}
      {expanded && (
        <div style={{ marginTop: 16 }}>
          <h3>2단계 계층 구조</h3>
          <p>
            <strong>Raw value</strong> — 어떤 디스플레이 장치에 그릴 수 있는 실제 값(<code>1px</code>,{' '}
            <code>#fff</code>, <code>"Noto Sans KR"</code> 등). 무한한 값 중 실제로 쓸 값을 제한하고 이름을
            부여하면 일관성·재사용성을 얻지만, 유연성·창의성은 제한됩니다. SEED는 이 균형을 위해 토큰을
            2단계로 계층화합니다.
          </p>
          <p>
            <strong>Scale Token(=이 문서의 Primitive)</strong> — Raw value Scale 하나에 이름을 부여한 것.
            전체 디자인에 사용되는 값을 유한하게 유지하고, 미리 정의한 단위로 출력장치 세부사항을 숨겨
            특정 플랫폼에 불가지론적인 디자인을 가능하게 합니다.
          </p>
          <p>
            <strong>Semantic Token</strong> — Scale Token의 조합으로 디자인 의도를 표현한
            단위. 실제 디자인·개발 과정의 주요 빌딩블록입니다. 뷰포트나 플랫폼 등 외부 환경에 맞게 Scale에
            적절한 값을 주입하는 것만으로, 스키마 변경 없이 유연하게 스킴을 재정의할 수 있습니다.
          </p>

          <h3>예시</h3>
          <p>
            <strong>색상</strong> — <code>fg.brand</code>/<code>bg.brand</code> 토큰은 모든 서비스에서
            배경과 텍스트에 동일한 브랜드 색상을 쓸 수 있게 합니다.
            <br />
            <strong>간격</strong> — 화면 가장자리와 콘텐츠 사이 간격을 나타내는 <code>global-gutter</code>{' '}
            토큰은 모든 서비스에서 동일한 간격을 쓸 수 있게 합니다.
          </p>
        </div>
      )}
    </Sec>
  );
}

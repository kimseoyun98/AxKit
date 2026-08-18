import { IconChevronDownLine } from '@karrotmarket/react-monochrome-icon';
import { useState, useEffect } from 'react';
import { Sec, TokenTable , ChipInfo} from '../components/UI'

export function StateSection() {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        try {
          const targetEl = document.querySelector(hash);
          if (targetEl) {
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
    <Sec id="f-state">
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
        <span>State Tokens</span>
        <ChipInfo>시맨틱</ChipInfo>
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
        UI 상태는 <strong>상호작용 상태(Interactive State)</strong>와 <strong>옵션 상태(Option State)</strong>
        두 유형으로 나뉩니다. 한 상태가 다른 상태를 덮어쓸 수도, 함께 적용될 수도 있습니다.
      </p>
      {expanded && (
        <div style={{ marginTop: 16 }}>
      <TokenTable>
        <thead>
          <tr><th>State</th><th>유형</th><th>정의</th></tr>
        </thead>
        <tbody>
          <tr><td>Enabled</td><td>기본</td><td>요소에 아무 상호작용도 하지 않았을 때의 기본 상태</td></tr>
          <tr><td>Pressed</td><td>상호작용</td><td>터치·펜 등으로 요소를 누르고 있는 상태</td></tr>
          <tr><td>Selected</td><td>옵션</td><td>요소가 선택/활성화된 상태. 보통 다른 상호작용 상태와 함께 표현됨</td></tr>
          <tr><td>Disabled</td><td>옵션</td><td>비활성화된 상태. 상호작용을 받지 않으며, 보통 다른 상태와 함께 표현되지 않음</td></tr>
        </tbody>
      </TokenTable>

      <h3>실제 색상 토큰 매핑</h3>
      <p>
        별도의 "state" 전용 색상 토큰 카테고리는 없습니다. State별로 실제 적용해야 할 토큰과 방식은
        아래 표를 따릅니다.
      </p>

      <TokenTable>
        <thead>
          <tr><th>State</th><th>실제 처리 방식</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Hover</td>
            <td>해당 요소의 <code>-solid</code> 토큰을 그대로 <code>-pressed</code> 버전으로 스왑 (예: <code>bg-brand-solid</code> → <code>bg-brand-solid-pressed</code>)</td>
          </tr>
          <tr>
            <td>Pressed</td>
            <td>Hover와 동일한 <code>-pressed</code> 토큰 재사용 + <code>--seed-timing-function-pressed-scale</code> (<code>cubic-bezier(0,0,.15,1)</code>)로 스케일 애니메이션</td>
          </tr>
          <tr>
            <td>Selected</td>
            <td><code>bg-transparent-selected</code> / <code>bg-transparent-selected-pressed</code> (선택+눌림 동시 표현)</td>
          </tr>
          <tr>
            <td>Disabled</td>
            <td>opacity 감소가 아니라 <code>fg-disabled</code>(gray-500) / <code>bg-disabled</code>(gray-200) 전용 색상 토큰</td>
          </tr>
          <tr>
            <td>Focus Ring</td>
            <td><code>--seed-color-stroke-focus-ring</code> (blue-600)</td>
          </tr>
        </tbody>
      </TokenTable>
    
        </div>
      )}
</Sec>
  )
}

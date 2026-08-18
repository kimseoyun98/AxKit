import { IconChevronDownLine } from '@karrotmarket/react-monochrome-icon';
import { useState } from 'react';
import { Sec, TokenTable, Notice } from '../components/UI'

export function InclusiveSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <Sec id="f-inclusive">
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
        <span>Inclusive Design</span>
        
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
        시각, 청각, 운동 능력, 인지 능력 등 다양한 능력과 상황을 가진 모든 사용자가 제품을 쉽게 접근하고
        사용할 수 있도록 하는 지침입니다.
      </p>
      {expanded && (
        <div style={{ marginTop: 16 }}>

      <h3>Visual Clarity — Color and Contrast</h3>
      <p>
        색상만으로 정보를 전달하지 않고 텍스트/아이콘 등 다른 시각 요소와 함께 제공합니다. 명도 대비는
        WCAG 대비비(4.5:1)가 아니라 <strong>APCA(Advanced Perceptual Contrast Algorithm)</strong> Lc 값을 기준으로 합니다.
      </p>
      <TokenTable>
        <thead>
          <tr><th>텍스트 유형</th><th>기준</th></tr>
        </thead>
        <tbody>
          <tr><td>가독성 텍스트 (2줄 이상 본문, 화면 제목, 헤드라인, 입력 필드, 툴팁)</td><td>최소 Lc 75, 권장 Lc 90 이상</td></tr>
          <tr><td>기타 텍스트 (16px 미만은 bold weight 필요)</td><td>최소 Lc 60 이상</td></tr>
          <tr><td>Placeholder / Disabled 텍스트</td><td>최소 Lc 30 이상</td></tr>
        </tbody>
      </TokenTable>

      <h3>Visual Clarity — Hierarchy and Layout</h3>
      <p>
        명확하고 간결한 콘텐츠 계층 구조로 중요한 정보가 쉽게 인식되도록 하고, 스크린 리더가 올바르게
        읽을 수 있도록 논리적이고 직관적인 콘텐츠 순서를 유지합니다.
      </p>

      <h3>Interaction and Navigation — Touch Area Size</h3>
      <TokenTable>
        <thead><tr><th>기준</th><th>값</th></tr></thead>
        <tbody>
          <tr><td>이상적인 터치 영역</td><td>44×44px 이상</td></tr>
          <tr><td>제약이 있을 때 최소 보장</td><td>24×24px 이상</td></tr>
        </tbody>
      </TokenTable>
      <p>아이콘 등 시각 요소가 작더라도 터치 가능 영역은 충분히 넓게 설정합니다.</p>

      <h3>Interaction and Navigation — Accessible Interaction / Navigation</h3>
      <p>
        핀치 줌·드래그 같은 복잡한 제스처는 단순 터치로도 수행 가능한 대체 방법을 제공하고, 모든
        상호작용은 VoiceOver/TalkBack 등 보조 기술로 접근 가능해야 합니다. 사용자가 현재 위치를
        명확히 알 수 있도록 명확한 라벨링과 직관적인 아이콘을 쓰고, 주요 기능은 쉽게 발견·접근 가능한
        위치에 배치합니다.
      </p>

      <h3>Content Accessibility</h3>
      <p>
        <strong>대체 텍스트</strong> — 이미지/아이콘 등 텍스트가 아닌 요소에는 기능과 맥락을 간결히
        설명하는 accessibility label을 제공하고, 장식용 요소는 스크린 리더에서 숨깁니다.
        <br />
        <strong>오류 처리</strong> — 오류 발생 시 시각적 피드백(예: 테두리 색 변경)과 함께
        <code>aria-live</code>로 보조 기술에 변경을 알립니다. 오류 메시지는 입력 필드 근처에 배치하고
        구체적인 해결 방법을 제시합니다.
      </p>

      <h3>Personalization and User Control</h3>
      <p>
        <strong>폰트 크기</strong> — 사용자의 폰트 크기 설정을 따르고, 뷰포트 변화에도 레이아웃이
        깨지지 않도록 반응형으로 간격을 조정합니다.
        <br />
        <strong>애니메이션</strong> — <code>prefers-reduced-motion</code> 옵션 지원, 2초 이상 애니메이션은
        지양하되 쓴다면 건너뛰기 옵션 제공, 광과민성 발작 예방을 위해 초당 3회 이상 점멸 금지.
        <br />
        <strong>미디어 자동재생</strong> — 기본 비활성화, 필요 시 음소거 상태로 시작, 3초 이상
        자동재생 오디오는 일시정지/중지/음량 조절 기능 제공.
        <br />
        <strong>언어 설정</strong> — 사용자가 선호 언어로 콘텐츠를 볼 수 있도록 언어 변경 옵션 제공.
      </p>

      <Notice>
        위 기준값은 SEED가 정의한 목표치입니다. 실제 화면에 적용된 색상 조합의 Lc 값과 컴포넌트 터치
        영역 실측치가 기준을 충족하는지는 이 문서의 범위가 아니며, 화면 단위로 별도 검증이 필요합니다.
      </Notice>
    
        </div>
      )}
</Sec>
  )
}

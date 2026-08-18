import { IconChevronDownLine } from '@karrotmarket/react-monochrome-icon';
import { useState, useEffect } from 'react';
import { Sec } from '../components/UI'

export function VoiceSection() {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        try {
          const targetEl = document.querySelector(hash);
          if (targetEl && (targetEl.id === 'f-voice' || targetEl.closest('#f-voice'))) {
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
    <Sec id="f-voice">
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
        <span>Voice and Tone</span>
        
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
      <p>이롬넷에서 일관되게 말하는 방법입니다.</p>
      {expanded && (
        <div style={{ marginTop: 16 }}>

      <h3>Role — Service Usability</h3>
      <ul style={{ marginLeft: 20, fontSize: 13.5, color: '#4B5563', lineHeight: 1.9 }}>
        <li>사용자의 행동을 이끌어 목적 달성을 도와요.</li>
        <li>언어, 문화 등과 관계없이 누구나 쉽게 사용할 수 있어요.</li>
        <li>사용자의 의사결정 과정을 즐겁게 만들어요.</li>
        <li>모든 사용자는 서비스 내에서 일관적인 경험을 해요.</li>
        <li>이롬넷을 신뢰할 수 있는 공간으로 만들어요.</li>
      </ul>

      <h3>Role — Brand Engagement</h3>
      <ul style={{ marginLeft: 20, fontSize: 13.5, color: '#4B5563', lineHeight: 1.9 }}>
        <li>브랜드의 가치를 전달하고 정서적 유대감을 형성해요.</li>
        <li>국경과 통화에 상관없이 안전하게 연결된다는 신뢰를 느낄 수 있게 도와요.</li>
        <li>사용자가 글로벌 비즈니스 네트워크의 일원임을 자각하게 돕고, 파트너·가맹점과의 연결을 알려 활발한 거래를 끌어내요.</li>
        <li>지금보다 더 이롬넷을 신뢰하게 만들어요.</li>
      </ul>

      <h3>Principle — 명확한, 이해하기 쉬운, 사려깊은</h3>
      <p>
        <strong>1. 명확하고 간결하게 말해요.</strong> 필수적인 정보를 전달해 의사결정을 돕고, 신뢰할 수
        있는 공간으로 만들어요.
        <br />
        <strong>2. 이해하기 쉽게 말해요.</strong> 누구나 쉽게 사용할 수 있게 해요.
        <br />
        <strong>3. 사려깊게 말해요.</strong> 사용자 입장에서 생각하고, 성별·나이·종교·혼인 여부·인종·장애
        등 다양성을 존중하며, 말에는 정보뿐 아니라 감정도 담겨있음을 알아요.
      </p>

      <h3>Voice Tone — 활기차고 친절한</h3>
      <p>
        이야기하듯 친근하게 말하고, 활기차고 자신감 있는 언어를 사용해요.
      </p>
    
        </div>
      )}
</Sec>
  )
}

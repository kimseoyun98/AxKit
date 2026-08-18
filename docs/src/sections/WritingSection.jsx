import { IconChevronDownLine } from '@karrotmarket/react-monochrome-icon';
import { useState, useEffect } from 'react';
import { Sec, TokenTable } from '../components/UI'

const DoDontTable = ({ rows }) => (
  <TokenTable>
    <thead><tr><th>✅ Do</th><th>❌ Don't</th></tr></thead>
    <tbody>
      {rows.map((r, i) => (
        <tr key={i}><td>{r.do}</td><td>{r.dont}</td></tr>
      ))}
    </tbody>
  </TokenTable>
)

export function WritingSection() {
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
    <Sec id="f-writing">
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
        <span>Writing</span>
        
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
      <p>이롬넷에서 일관되게 글쓰는 방법입니다.</p>
      {expanded && (
        <div style={{ marginTop: 16 }}>

      <h3>Familiar — 익숙한 단어 사용</h3>
      <p>기술적인 용어나 한자어는 지양해요. 에러 메시지에는 직접 해결할 수 있는 방법을 함께 알려주세요.</p>
      <DoDontTable rows={[
        { do: '상대방과 연결할 수 없어요.', dont: '상대방과 연결이 불가능합니다.' },
        { do: '가맹점 인증을 할 수 없는 지역이에요.', dont: '가맹점 인증 가능한 지역이 아니에요.' },
        { do: '죄송합니다. 일시적으로 서비스를 사용할 수 없어요. 잠시 후 다시 시도해주세요.', dont: '서버 에러 / unknown error 등 [기술용어]' },
      ]} />

      <h3>Honorifics — 존칭어 최소화</h3>
      <p>정말 꼭 필요할 때만 존칭어를 사용하세요.</p>
      <DoDontTable rows={[
        { do: '최대 2개의 결제 링크를 만들 수 있어요.', dont: '최대 2개의 결제 링크를 만드실 수 있어요. [존칭어]' },
        { do: '혹시 정기결제를 찾고 있나요?', dont: '혹시 정기결제를 찾고 계신가요? [존칭어]' },
      ]} />

      <h3>Numbers — 아라비아 숫자 사용</h3>
      <DoDontTable rows={[
        { do: '김대표님이 결제 요청 1건을 보냈어요.', dont: '김대표님이 결제 요청 한 건을 보냈어요. [숫자]' },
      ]} />

      <h3>Abbreviations — 축약어/은어/속어/유행어 지양</h3>
      <p>사용자들이 줄여 부르더라도(예: "정대") 우리는 정식 명칭으로 이야기해요.</p>
      <DoDontTable rows={[
        { do: '정산 대사는 매일 5회까지 할 수 있어요.', dont: '정대는 사용자마다 하루에 최대 5회까지 가능합니다. [축약어]' },
      ]} />

      <h3>Function Names — 기능의 이름보다 목적을 전달</h3>
      <DoDontTable rows={[
        { do: '김대표님이 박부장님의 결제 요청을 승인했어요.', dont: '김대표님이 박부장님의 결제 요청에 승인 버튼을 눌렀어요.' },
      ]} />

      <h3>Positive Sentences — 긍정문 사용</h3>
      <DoDontTable rows={[
        { do: '가맹점명은 한 달에 한 번만 변경할 수 있어요. [긍정]', dont: '가맹점명은 한 달에 한 번 이상 변경할 수 없어요. [부정]' },
      ]} />

      <h3>Active Sentences — 능동문 사용</h3>
      <DoDontTable rows={[
        { do: '잠깐만요! (김대표님에게만 보이는 메시지입니다.)', dont: '잠깐만요! (김대표님에게만 보여지는 메시지입니다.) [이중피동]' },
      ]} />
      <p>
        가이드보다는 좋은 문장이 먼저예요 — 능동문보다 피동문이 의미 전달이 더 잘 된다면 피동문을
        사용해요. 자동 발송 메시지나 사용자가 조심해야 하는 상황에서는 '~요' 대신 '~니다'로 무게를 실어요.
      </p>

      <h3>User Actions — 데이터 변화보다 사용자의 행위 표현</h3>
      <DoDontTable rows={[
        { do: '결제 확인서를 보냈어요.', dont: '결제 확인서 발송을 완료했어요.' },
        { do: '김대표님의 미승인 요청은 모두 2일 뒤에 자동 취소돼요.', dont: '김대표님이 등록하신 미승인 요청은 이틀 후에 자동 취소 처리돼요.' },
      ]} />

      <h3>Emotions — 진심을 담아 사려 깊게</h3>
      <DoDontTable rows={[
        { do: '결제로 연결하기 [기능의 목적]', dont: '결제하기 [기능의 이름]' },
        { do: '정산 확인을 깜박하지는 않으셨나요? 기한을 잘 지키는 신뢰할 수 있는 파트너가 되어보세요.', dont: '혹시 정산을 자꾸 잊는다면 정산 알림을 사용해보는 건 어때요?' },
      ]} />

      <h3>Focus on One Purpose — 하나의 목적에 집중</h3>
      <p>목적을 해치는 부가 설명은 최소화해요. 문장이 길어지면 하나의 내용만 담도록 분리해보세요.</p>

      <h3>Global Context — 사용자가 속한 시장/지역 이야기 담기</h3>
      <p>온보딩 안내 등에 사용자의 사업 지역이나 시장 이야기를 담으면 좋아요.</p>
      <DoDontTable rows={[
        { do: '지금 아시아 시장의 파트너사들과 정산 자동화를 시작해보세요.', dont: '—' },
      ]} />

      <h3>Exclamation Marks — 꼭 필요한 순간에만</h3>
      <p>반복적인 느낌표는 의미를 잃어요.</p>

      <h3>Spaces — 기능명·서비스명·상태값은 붙여쓰기</h3>
      <DoDontTable rows={[
        { do: '정산중', dont: '정산 중 [상태값 표기 시]' },
        { do: '정산 중일 때는 계좌를 변경할 수 없어요. [일반 서술]', dont: '정산중일 때는 계좌를 변경할 수 없어요.' },
      ]} />

      <h3>Periods — 평서문/명령문 끝에 사용</h3>
      <p>단, 아래는 마침표를 사용하지 않아요:</p>
      <ul style={{ marginLeft: 20, fontSize: 13.5, color: '#4B5563', lineHeight: 1.9 }}>
        <li>메인 타이틀 영역 문구</li>
        <li>큰 글씨(20pt 이상)로 들어가는 문구</li>
        <li>버튼, 메뉴, 라벨에 들어간 문구</li>
        <li>버튼에서 문장을 사용하고 긍정/부정 감탄사(네, 아니요)가 있다면 쉼표를 넣어요</li>
      </ul>
    
        </div>
      )}
</Sec>
  )
}

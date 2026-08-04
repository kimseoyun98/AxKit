import { Sec } from '../components/UI'

export function WritingSection() {
  return (
    <Sec id="f-writing">
      <h2>UX Writing</h2>
      
      <h3>CTA Rules</h3>
      <p>행동을 유도하는 명확한 동사를 사용합니다. (예: '확인', '저장', '삭제')</p>
      
      <h3>3-step Error Messages</h3>
      <ul>
        <li>1. 에러가 발생한 상황 설명</li>
        <li>2. 에러의 원인 설명</li>
        <li>3. 해결 방법 안내</li>
      </ul>
      
      <h3>Placeholder Rules</h3>
      <p>어떤 내용을 입력해야 하는지 예시와 함께 안내합니다.</p>
      
      <h3>Empty State</h3>
      <p>콘텐츠가 없을 때 사용자가 취해야 할 다음 행동을 안내합니다.</p>
      
      <h3>Notification / Toast</h3>
      <p>사용자의 행동에 대한 결과를 즉각적으로 간결하게 알려줍니다.</p>
    </Sec>
  )
}

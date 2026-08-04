import { Sec, TokenTable } from '../components/UI'

export function VoiceSection() {
  return (
    <Sec id="f-voice">
      <h2>Voice and Tone</h2>
      
      <h3>4 Principles</h3>
      <TokenTable>
        <thead><tr><th>Principle</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>Clear</td><td>명확하게 전달하기</td></tr>
          <tr><td>Concise</td><td>간결하게 쓰기</td></tr>
          <tr><td>Consistent</td><td>일관성 유지하기</td></tr>
          <tr><td>Conversational</td><td>대화하듯 친근하게</td></tr>
        </tbody>
      </TokenTable>

      <h3>Tone Spectrum</h3>
      <TokenTable>
        <thead><tr><th>Tone</th><th>Usage</th></tr></thead>
        <tbody>
          <tr><td>Friendly</td><td>환영, 온보딩</td></tr>
          <tr><td>Direct</td><td>에러, 경고, 작업 완료</td></tr>
          <tr><td>Encouraging</td><td>성공, 빈 화면 안내</td></tr>
        </tbody>
      </TokenTable>

      <h3>Forbidden Expressions</h3>
      <TokenTable>
        <thead><tr><th>Avoid</th><th>Use Instead</th></tr></thead>
        <tbody>
          <tr><td>~하시기 바랍니다</td><td>~해주세요</td></tr>
          <tr><td>실패했습니다</td><td>문제가 발생했어요</td></tr>
        </tbody>
      </TokenTable>
    </Sec>
  )
}

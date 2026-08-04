import { Sec, TokenTable } from '../components/UI'

export function I18nSection() {
  return (
    <Sec id="f-i18n">
      <h2>i18n Date Format</h2>
      <TokenTable>
        <thead>
          <tr>
            <th>Format</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Short</td><td>2024. 8. 5.</td></tr>
          <tr><td>Long</td><td>2024년 8월 5일</td></tr>
        </tbody>
      </TokenTable>
    </Sec>
  )
}

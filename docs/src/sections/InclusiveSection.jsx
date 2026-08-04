import { Sec, TokenTable } from '../components/UI'

export function InclusiveSection() {
  return (
    <Sec id="f-inclusive">
      <h2>Inclusive Design</h2>
      
      <h3>Accessibility</h3>
      <TokenTable>
        <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Min Contrast Ratio</td><td>4.5:1 (AA)</td></tr>
          <tr><td>Touch Target (Min)</td><td>44x44px</td></tr>
        </tbody>
      </TokenTable>
    </Sec>
  )
}

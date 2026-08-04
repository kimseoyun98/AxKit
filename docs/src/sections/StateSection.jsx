import { Sec, TokenTable, Notice } from '../components/UI'

export function StateSection() {
  return (
    <Sec id="f-state">
      <h2>State Tokens</h2>
      <Notice>These are code-only state tokens and are not available as Figma variables.</Notice>
      
      <TokenTable>
        <thead>
          <tr><th>State</th><th>CSS Custom Property / Description</th></tr>
        </thead>
        <tbody>
          <tr><td>Pressed</td><td><code>--seed-state-pressed-bg</code></td></tr>
          <tr><td>Alpha</td><td><code>--seed-state-alpha</code></td></tr>
          <tr><td>Disabled</td><td><code>--seed-state-disabled-opacity</code></td></tr>
          <tr><td>Focus Ring</td><td><code>--seed-color-stroke-focus-ring</code></td></tr>
          <tr><td>Motion</td><td>transition / animation definitions</td></tr>
        </tbody>
      </TokenTable>
    </Sec>
  )
}

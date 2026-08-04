import { Sec, TokenTable } from '../components/UI'

export function MotionSection() {
  const durRows = [
    { t: 'd1', val: '50ms' },
    { t: 'd2', val: '100ms' },
    { t: 'd3', val: '150ms' },
    { t: 'd4', val: '200ms' },
    { t: 'd5', val: '250ms' },
    { t: 'd6', val: '300ms' }
  ]
  const easeRows = ['enter', 'exit', 'easing']

  return (
    <Sec id="f-motion">
      <h2>Motion Tokens</h2>
      
      <h3>Duration</h3>
      <TokenTable>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          {durRows.map(r => <tr key={r.t}><td>{r.t}</td><td>{r.val}</td></tr>)}
        </tbody>
      </TokenTable>

      <h3>Timing Function</h3>
      <TokenTable>
        <thead><tr><th>Token</th></tr></thead>
        <tbody>
          {easeRows.map(r => <tr key={r}><td>{r}</td></tr>)}
        </tbody>
      </TokenTable>
    </Sec>
  )
}

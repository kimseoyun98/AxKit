import { Sec, TokenTable } from '../components/UI'

export function DimensionSection() {
  const dimRows = [
    { token: 'x0_5', val: '2px' },
    { token: 'x1', val: '4px' },
    { token: 'x2', val: '8px' },
    { token: 'x3', val: '12px' },
    { token: 'x4', val: '16px' },
    { token: 'x5', val: '20px' },
    { token: 'x6', val: '24px' },
    { token: 'x8', val: '32px' },
    { token: 'x11', val: '44px' },
    { token: 'x14', val: '56px' },
    { token: 'x16', val: '64px' }
  ]
  
  const radRows = [
    { token: 'r0_5', val: '2px' },
    { token: 'r1', val: '4px' },
    { token: 'r2', val: '8px' },
    { token: 'r3', val: '12px' },
    { token: 'r4', val: '16px' },
    { token: 'r5', val: '20px' },
    { token: 'full', val: '9999px' }
  ]
  
  const shadowRows = ['s1', 's2', 's3']
  const gradientRows = ['shimmer-neutral', 'glow-magic', 'highlight-magic']

  return (
    <Sec id="f-dimension">
      <h2>Dimensions, Radius, Shadows, Gradients</h2>
      
      <h3>Dimensions & Spacing</h3>
      <TokenTable>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          {dimRows.map(r => <tr key={r.token}><td>{r.token}</td><td>{r.val}</td></tr>)}
        </tbody>
      </TokenTable>

      <h3>Radius</h3>
      <TokenTable>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          {radRows.map(r => <tr key={r.token}><td>{r.token}</td><td>{r.val}</td></tr>)}
        </tbody>
      </TokenTable>

      <h3>Shadows</h3>
      <TokenTable>
        <thead><tr><th>Token</th></tr></thead>
        <tbody>
          {shadowRows.map(r => <tr key={r}><td>{r}</td></tr>)}
        </tbody>
      </TokenTable>

      <h3>Gradients</h3>
      <TokenTable>
        <thead><tr><th>Token</th></tr></thead>
        <tbody>
          {gradientRows.map(r => <tr key={r}><td>{r}</td></tr>)}
        </tbody>
      </TokenTable>
    </Sec>
  )
}

import { Sec, TokenTable } from '../components/UI'

export function GridSection() {
  const rows = [
    { dev: 'Mobile', col: 4, gut: '20px' },
    { dev: 'Tablet', col: 8, gut: '48px' },
    { dev: 'Desktop', col: 12, gut: '64px' }
  ]
  return (
    <Sec id="f-grid">
      <h2>Grid / Layout Tokens</h2>
      <TokenTable>
        <thead>
          <tr>
            <th>Device</th>
            <th>Columns</th>
            <th>Gutter</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.dev}>
              <td>{r.dev}</td>
              <td>{r.col}</td>
              <td>{r.gut}</td>
            </tr>
          ))}
        </tbody>
      </TokenTable>
    </Sec>
  )
}

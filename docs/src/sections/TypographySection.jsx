import { Sec, TokenTable } from '../components/UI'

export function TypographySection() {
  const fluidRows = Array.from({length: 16}, (_, i) => i + 1).map(i => ({
    var: `t${i}`, fs: `--seed-typography-t${i}-fontSize`, lh: `--seed-typography-t${i}-lineHeight`, mode: 'fluid'
  }))
  const staticRows = Array.from({length: 7}, (_, i) => i + 1).map(i => ({
    var: `t${i}`, fs: `--seed-typography-t${i}-fontSize`, lh: `--seed-typography-t${i}-lineHeight`, mode: 'static'
  }))

  const rows = [...fluidRows, ...staticRows].sort((a,b) => parseInt(a.var.replace('t','')) - parseInt(b.var.replace('t','')))

  return (
    <Sec id="f-typography">
      <h2>Typography Tokens</h2>
      <TokenTable>
        <thead>
          <tr>
            <th>Figma Text Style</th>
            <th>Font Size 변수</th>
            <th>Line Height 변수</th>
            <th>모드</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.var}</td>
              <td><code>{r.fs}</code></td>
              <td><code>{r.lh}</code></td>
              <td>{r.mode}</td>
            </tr>
          ))}
        </tbody>
      </TokenTable>
    </Sec>
  )
}

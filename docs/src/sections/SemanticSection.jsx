import { Sec, TokenTable } from '../components/UI'

export function SemanticSection() {
  const rows = [
    { var: 'fg/neutral', css: '--seed-color-fg-neutral', prim: 'gray-1000', desc: '기본 본문 텍스트' },
    { var: 'fg/neutral-muted', css: '--seed-color-fg-neutral-muted', prim: 'gray-700', desc: '보조 텍스트' },
    { var: 'fg/neutral-subtle', css: '--seed-color-fg-neutral-subtle', prim: 'gray-600', desc: '힌트 텍스트' },
    { var: 'fg/neutral-inverted', css: '--seed-color-fg-neutral-inverted', prim: 'gray-00 (#fff)', desc: '반전 배경 위 텍스트' },
    { var: 'fg/brand', css: '--seed-color-fg-brand', prim: 'carrot-600', desc: '브랜드 링크' },
    { var: 'fg/disabled', css: '--seed-color-fg-disabled', prim: 'gray-400', desc: '비활성 텍스트' },
    { var: 'fg/positive', css: '--seed-color-fg-positive', prim: 'green-700', desc: '성공 메시지' },
    { var: 'fg/critical', css: '--seed-color-fg-critical', prim: 'red-700', desc: '에러 메시지' },
    { var: 'fg/warning', css: '--seed-color-fg-warning', prim: 'yellow-700', desc: '경고 메시지' },
    { var: 'fg/informative', css: '--seed-color-fg-informative', prim: 'blue-700', desc: '정보 메시지' },
    { var: 'fg/magic', css: '--seed-color-fg-magic', prim: 'purple-600', desc: '매직 포인트' },
    { var: 'bg-layer/default', css: '--seed-color-bg-layer-default', prim: 'gray-00', desc: '기본 페이지 배경' },
    { var: 'bg-layer/fill', css: '--seed-color-bg-layer-fill', prim: 'gray-100', desc: '섹션 채우기' },
    { var: 'bg-layer/floating', css: '--seed-color-bg-layer-floating', prim: 'gray-00', desc: '카드/FAB' },
    { var: 'bg-brand/solid', css: '--seed-color-bg-brand-solid', prim: 'carrot-600', desc: 'Primary 버튼' },
    { var: 'bg-brand/solid-pressed', css: '--seed-color-bg-brand-solid-pressed', prim: 'carrot-700', desc: '눌림 상태' },
    { var: 'bg-neutral/solid', css: '--seed-color-bg-neutral-solid', prim: 'gray-1000', desc: '다크 버튼/스낵바' },
    { var: 'bg-neutral/weak', css: '--seed-color-bg-neutral-weak', prim: 'gray-100', desc: '연한 중성 배경' },
    { var: 'bg-positive/solid', css: '--seed-color-bg-positive-solid', prim: 'green-700', desc: '성공 배지' },
    { var: 'bg-critical/solid', css: '--seed-color-bg-critical-solid', prim: 'red-700', desc: '에러 배지' },
    { var: 'bg-warning/solid', css: '--seed-color-bg-warning-solid', prim: 'yellow-700', desc: '경고 배지' },
    { var: 'bg-informative/solid', css: '--seed-color-bg-informative-solid', prim: 'blue-700', desc: '정보 배지' },
    { var: 'bg/disabled', css: '--seed-color-bg-disabled', prim: 'gray-200', desc: '비활성 배경' },
    { var: 'bg/overlay', css: '--seed-color-bg-overlay', prim: 'rgba(0,0,0,.46)', desc: '딤 오버레이' },
    { var: 'stroke/neutral-subtle', css: '--seed-color-stroke-neutral-subtle', prim: 'rgba(0,0,0,.08)', desc: '카드 연한 선' },
    { var: 'stroke/neutral-solid', css: '--seed-color-stroke-neutral-solid', prim: 'gray-800', desc: '강한 선' },
    { var: 'stroke/brand-solid', css: '--seed-color-stroke-brand-solid', prim: 'carrot-600', desc: '브랜드 테두리' },
    { var: 'stroke/focus-ring', css: '--seed-color-stroke-focus-ring', prim: 'blue-600', desc: 'Focus Ring' },
    { var: 'stroke/disabled', css: '--seed-color-stroke-disabled', prim: 'gray-300', desc: '비활성 테두리' },
  ]
  return (
    <Sec id="f-semantic">
      <h2>Semantic Color Tokens</h2>
      <TokenTable>
        <thead>
          <tr>
            <th>Figma Variable</th>
            <th>CSS Custom Property</th>
            <th>Primitive</th>
            <th>용도</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.var}>
              <td>{r.var}</td>
              <td><code>{r.css}</code></td>
              <td>{r.prim}</td>
              <td>{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </TokenTable>
    </Sec>
  )
}

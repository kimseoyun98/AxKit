import { Sec, TokenTable } from '../components/UI'

export function MotionSection() {
  const durRows = [
    { t: 'd1', val: '50ms' },
    { t: 'd2', val: '100ms' },
    { t: 'd3', val: '150ms' },
    { t: 'd4', val: '200ms' },
    { t: 'd5', val: '250ms' },
    { t: 'd6', val: '300ms' },
    { t: 'color-transition', val: '150ms (= d3)', desc: '색상 전환 애니메이션' },
    { t: 'pressed-scale', val: '150ms (= d3)', desc: '눌림 스케일 애니메이션' },
  ]
  const scaleRows = [
    { t: 's95', preferred: '0.95', reduced: '1 (reduce-motion 시)', usage: '리스트 하이라이트, 선택되는 카드 등 강조 혁식' },
    { t: 's97', preferred: '0.97', reduced: '1 (reduce-motion 시)', usage: '일반 버튼 누름 스케일' },
    { t: 's98', preferred: '0.98', reduced: '1 (reduce-motion 시)', usage: '연한 누름 피드백' },
  ]
  const easeRows = [
    { t: 'linear', val: 'cubic-bezier(0, 0, 1, 1)', usage: '등속' },
    { t: 'easing', val: 'cubic-bezier(.35, 0, .35, 1)', usage: '버튼 클릭, 입력창 포커스 등 기능적인 마이크로 모션' },
    { t: 'enter', val: 'cubic-bezier(0, 0, .15, 1)', usage: '다이얼로그, 시트 등이 나타나는 매크로 모션' },
    { t: 'enter-expressive', val: 'cubic-bezier(.03, .4, .1, 1)', usage: 'enter 모션에서 특히 강조되어야 하는 움직임' },
    { t: 'exit', val: 'cubic-bezier(.35, 0, 1, 1)', usage: '다이얼로그, 시트 등이 사라지는 매크로 모션' },
    { t: 'exit-expressive', val: 'cubic-bezier(.35, 0, .95, .55)', usage: 'exit 모션에서 특히 강조되어야 하는 움직임' },
    { t: 'pressed-scale', val: 'cubic-bezier(0, 0, .15, 1)', usage: '눌림 상태 스케일 애니메이션' },
  ]

  return (
    <Sec id="f-motion">
      <h2>Motion Tokens</h2>
      <p>
        <strong>매크로 모션</strong> — 전체 레이아웃/페이지 전환 같은 큰 규모의 모션 (페이지 전환, 모달
        팝업, 슬라이드 메뉴). 0.2초를 초과합니다.
        <br />
        <strong>마이크로 모션</strong> — 버튼 클릭, 입력창 포커스, 스크롤 같은 작은 규모의 모션. 0.2초
        이하입니다.
      </p>

      <h3>Duration</h3>
      <TokenTable>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          {durRows.map(r => <tr key={r.t}><td>{r.t}</td><td>{r.val}</td></tr>)}
        </tbody>
      </TokenTable>

      <h3>Timing Function</h3>
      <TokenTable>
        <thead><tr><th>Token</th><th>Value</th><th>용도</th></tr></thead>
        <tbody>
          {easeRows.map(r => <tr key={r.t}><td>{r.t}</td><td><code>{r.val}</code></td><td>{r.usage}</td></tr>)}
        </tbody>
      </TokenTable>

      <h3>Scale Tokens</h3>
      <p style={{fontSize:12.5,color:'#6B7280'}}>
        누름 상태에서 요소를 축소하는 스케일 애니메이션에 사용합니다. 동작 감소(reduce-motion)
        설정 시 preferred 값 대신 reduced(1) 값을 사용합니다.
        CSS: <code>transform: scale(var(--seed-scale-s97))</code>
      </p>
      <TokenTable>
        <thead><tr><th>Token</th><th>preferred</th><th>reduced</th><th>용도</th></tr></thead>
        <tbody>
          {scaleRows.map(r => (
            <tr key={r.t}>
              <td>{r.t}</td>
              <td><strong>{r.preferred}</strong></td>
              <td>{r.reduced}</td>
              <td style={{fontSize:12}}>{r.usage}</td>
            </tr>
          ))}
        </tbody>
      </TokenTable>
    </Sec>
  )
}

import { Sec, TokenTable, Notice } from '../components/UI'

export function TypographySection() {
  // 실제 @seed-design/css: t1~t14 14단계, 각 단계마다 static px 값과 fluid(clamp) 값이 동시에 존재
  const rows = [
    { t: 't1', staticFs: 11, staticLh: 15, fluidRem: 0.6875 },
    { t: 't2', staticFs: 12, staticLh: 16, fluidRem: 0.75 },
    { t: 't3', staticFs: 13, staticLh: 18, fluidRem: 0.8125 },
    { t: 't4', staticFs: 14, staticLh: 19, fluidRem: 0.875 },
    { t: 't5', staticFs: 16, staticLh: 22, fluidRem: 1 },
    { t: 't6', staticFs: 18, staticLh: 24, fluidRem: 1.125 },
    { t: 't7', staticFs: 20, staticLh: 27, fluidRem: 1.25 },
    { t: 't8', staticFs: 22, staticLh: 30, fluidRem: 1.375 },
    { t: 't9', staticFs: 24, staticLh: 32, fluidRem: 1.5 },
    { t: 't10', staticFs: 26, staticLh: 35, fluidRem: 1.625 },
    { t: 't11', staticFs: 28, staticLh: 38, fluidRem: 1.75 },
    { t: 't12', staticFs: 32, staticLh: 42, fluidRem: 2 },
    { t: 't13', staticFs: 40, staticLh: 52, fluidRem: 2.5 },
    { t: 't14', staticFs: 48, staticLh: 60, fluidRem: 3 },
  ]

  const weightRows = [
    { token: '$font-weight.regular', val: '400', desc: '일반 본문' },
    { token: '$font-weight.medium', val: '500', desc: '중간 강조' },
    { token: '$font-weight.bold', val: '700', desc: '강한 강조 / 타이틀' },
  ]

  return (
    <Sec id="f-typography">
      <h2>Typography Tokens</h2>
      <p>
        SEED은 fluid/static을 별개 단계로 나누지 않고, <code>t1</code>~<code>t14</code> 14단계 각각에
        static px 값과 fluid(<code>clamp()</code> 기반, 뷰포트에 따라 0.8~1.5배 스케일) 값을 동시에 정의합니다.
      </p>
      <TokenTable>
        <thead>
          <tr>
            <th>Token</th>
            <th>Static Font Size</th>
            <th>Static Line Height</th>
            <th>Fluid 기준값 (rem)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.t}>
              <td>{r.t}</td>
              <td><code>{r.staticFs}px</code> <span style={{fontSize:11,color:'#9CA3AF'}}>({r.t}-static)</span></td>
              <td><code>{r.staticLh}px</code></td>
              <td><code>{r.fluidRem}rem</code></td>
            </tr>
          ))}
        </tbody>
      </TokenTable>

      <h3>Font Weight Tokens</h3>
      <p>세 가지 폰트 두께 토큰으로 명확한 시각적 대비와 계층 구조를 제공합니다.</p>
      <TokenTable>
        <thead><tr><th>Token</th><th>Value</th><th>용도</th></tr></thead>
        <tbody>
          {weightRows.map(r => (
            <tr key={r.token}>
              <td><code>{r.token}</code></td>
              <td><strong>{r.val}</strong></td>
              <td>{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </TokenTable>

      <h3>Font Stack (시스템 폰트)</h3>
      <p style={{fontSize:12.5,color:'#6B7280'}}>
        사용자의 디바이스 환경을 고려하여 시스템 폰트를 사용합니다. 다양한 국가와 문화권에서 일관된 UX와 가독성을 보장합니다.
      </p>
      <pre style={{background:'#F9FAFB',border:'1px solid #E5E7EB',borderRadius:8,padding:'12px 16px',fontSize:11.5,overflowX:'auto',lineHeight:1.6,margin:'8px 0 0'}}>
        {`font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo",
  "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";`}
      </pre>

      <Notice>
        <strong>t*-static 변종 토큰</strong> — 폰트 스케일링에 반응하지 않는 고정 px 값이 필요할 때는{' '}
        <code>$font-size.t4-static</code>(14px)처럼 <code>-static</code> 접미사 변종을 사용하세요.
        웹 접근성 설정 존중을 위해 기본적으로 rem 토큰 사용을 권장합니다.
      </Notice>

      <Notice>
        <strong>t9~t14의 breakpoint별 정적 매핑에 대해</strong> — 실제 개발 구현에서는 SEED 공식 방식인
        <code>clamp()</code> 기반 fluid 스케일링(뷰포트에 따라 매끄럽게 값이 변함)을 사용하는 것이 맞습니다.
        Figma의 t9~t14 값이 Desktop/Tablet/Mobile 3단계로 나뉘어 있는 것은, Figma가 정적 값만
        표현할 수 있어서 fluid 스케일을 각 breakpoint의 스냅샷으로 근사 매핑해둔 것일 뿐입니다 — 개발
        시에는 이 정적 값을 그대로 3단계로 옮기지 말고 SEED의 fluid clamp() 공식을 적용하세요.
      </Notice>
    </Sec>
  )
}

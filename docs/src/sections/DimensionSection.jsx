import { Sec, TokenTable } from '../components/UI'

export function DimensionSection() {
  const dimRows = [
    { token: 'x0_5', val: '2px' },
    { token: 'x1', val: '4px' },
    { token: 'x1_5', val: '6px' },
    { token: 'x2', val: '8px' },
    { token: 'x2_5', val: '10px' },
    { token: 'x3', val: '12px' },
    { token: 'x3_5', val: '14px' },
    { token: 'x4', val: '16px' },
    { token: 'x4_5', val: '18px' },
    { token: 'x5', val: '20px' },
    { token: 'x6', val: '24px' },
    { token: 'x7', val: '28px' },
    { token: 'x8', val: '32px' },
    { token: 'x9', val: '36px' },
    { token: 'x10', val: '40px' },
    { token: 'x12', val: '48px' },
    { token: 'x13', val: '52px' },
    { token: 'x14', val: '56px' },
    { token: 'x16', val: '64px' },
  ]

  const radRows = [
    { token: 'r0_5', val: '2px' },
    { token: 'r1', val: '4px' },
    { token: 'r1_5', val: '6px' },
    { token: 'r2', val: '8px' },
    { token: 'r2_5', val: '10px' },
    { token: 'r3', val: '12px' },
    { token: 'r3_5', val: '14px' },
    { token: 'r4', val: '16px' },
    { token: 'r5', val: '20px' },
    { token: 'r6', val: '24px' },
    { token: 'full', val: '9999px' },
  ]

  const semanticSpacingRows = [
    { token: 'spacing-x.between-chips', val: 'x2 (8px)' },
    { token: 'spacing-x.global-gutter', val: 'x4 (16px)' },
    { token: 'spacing-y.component-default', val: 'x3 (12px)' },
    { token: 'spacing-y.nav-to-title', val: 'x5 (20px)' },
    { token: 'spacing-y.screen-bottom', val: 'x14 (56px)' },
    { token: 'spacing-y.between-text', val: 'x1_5 (6px)' },
  ]

  const shadowRows = [
    { token: 's1', val: '0px 1px 4px 0px rgba(0,0,0,.078)' },
    { token: 's2', val: '0px 2px 10px 0px rgba(0,0,0,.102)' },
    { token: 's3', val: '0px 4px 16px 0px rgba(0,0,0,.122)' },
  ]
  // ⚠️ update-gradient-token 브랜치: shimmer-neutral → neutral-shimmer 로 리네이밍 예정
  const gradientRows = [
    { token: 'shimmer-neutral', val: '90deg, transparent 0%, rgba(255,255,255,.67) 46-54%, transparent 100%', dark: '90deg, transparent 0%, rgba(255,255,255,.10) 46-54%, transparent 100%' },
    { token: 'shimmer-magic', val: '90deg, transparent 0%, rgba(255,249,245,.80) 46-54%, transparent 100%', dark: '90deg, transparent 0%, rgba(255,249,245,.10) 46-54%, transparent 100%' },
    { token: 'glow-magic', val: '88deg, #fef6f7 0%, #fef0e7 80%, #f9f7f5 100%', dark: '88deg, #2d252d 0%, #3a312b 80%, #333232 100%' },
    { token: 'glow-magic-pressed', val: '88deg, #fbf0f2 0%, #ffe8db 80%, #f5f2ef 100%', dark: '88deg, #3e333e 0%, #51453e 80%, #434242 100%' },
    { token: 'highlight-magic', val: 'linear: #f60 20%, #d25aca 100%', dark: '(same)' },
    { token: 'highlight-magic-pressed', val: 'linear: #e14f00 20%, #ae58bf 100%', dark: '#ff9e65 20%, #e89bee 100%' },
  ]

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

      <h3>Semantic Spacing</h3>
      <p>
        <strong>Horizontal</strong> — <code>global-gutter</code>는 화면 가장자리와 콘텐츠 사이 간격, <code>between-chips</code>는 칩 사이 간격.
        <br />
        <strong>Vertical</strong> — <code>nav-to-title</code>는 네비게이션 바와 타이틀 간격, <code>component-default</code>는 컴포넌트 기본 내부/간 간격,{' '}
        <code>screen-bottom</code>은 화면 하단 여백, <code>between-text</code>는 텍스트 줄 사이 간격.
      </p>
      <TokenTable>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          {semanticSpacingRows.map(r => <tr key={r.token}><td>{r.token}</td><td>{r.val}</td></tr>)}
        </tbody>
      </TokenTable>

      <h3 id="f-radius">Radius</h3>
      <p>컴포넌트/콘텐츠 모서리의 둥글기. 부드럽고 현대적인 느낌을 주고, 다양한 화면·컨텍스트에서 시각적 일관성을 유지합니다.</p>
      <TokenTable>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          {radRows.map(r => <tr key={r.token}><td>{r.token}</td><td>{r.val}</td></tr>)}
        </tbody>
      </TokenTable>

      <h3 id="f-shadow">Shadows</h3>
      <TokenTable>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          {shadowRows.map(r => <tr key={r.token}><td>{r.token}</td><td><code>{r.val}</code></td></tr>)}
        </tbody>
      </TokenTable>

      <h3 id="f-gradient">Gradients</h3>
      <p>배경과 아이콘 등에서 입체감이나 AI 기능을 표현할 때 사용하는 색상 토큰입니다. 라이트/다크 모드 각각 다른 값이 적용됩니다.</p>
      <TokenTable>
        <thead><tr><th>Token</th><th>Light</th><th>Dark</th></tr></thead>
        <tbody>
          {gradientRows.map(r => <tr key={r.token}><td>{r.token}</td><td><code style={{fontSize:10.5}}>{r.val}</code></td><td><code style={{fontSize:10.5,color:'#9CA3AF'}}>{r.dark}</code></td></tr>)}
        </tbody>
      </TokenTable>
    </Sec>
  )
}

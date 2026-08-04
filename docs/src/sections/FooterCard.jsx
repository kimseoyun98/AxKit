import { CompCard } from '../components/UI'

export function FooterCard() {
  return (
    <div className="comp-card span2">
      <div className="comp-canvas" style={{ height:'auto', minHeight:200, alignItems:'stretch', padding:0, borderRadius:16, overflow:'hidden', flexDirection:'column' }}>
        {/* 콘텐츠 영역 mock */}
        <div style={{ flex:1, background:'var(--seed-color-bg-layer-default,#fff)', padding:'20px 24px', borderBottom:'1px solid rgba(0,0,0,.06)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
            <div style={{ width:24, height:24, borderRadius:5, background:'#FF6600', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12 }}>🥕</div>
            <span style={{ fontSize:14, fontWeight:700, color:'var(--seed-color-fg-neutral)' }}>당근마켓</span>
          </div>
          <p style={{ fontSize:12, color:'var(--seed-color-fg-neutral-muted)', lineHeight:1.6, margin:0 }}>대한민국 어디서나 가깝고 따뜻한 거래</p>
        </div>
        {/* Footer */}
        <div style={{ background:'var(--seed-color-bg-layer-fill,#F5F5F5)', padding:'16px 24px' }}>
          {/* size_large links */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:'4px 16px', marginBottom:12, paddingBottom:12, borderBottom:'1px solid rgba(0,0,0,.08)' }}>
            {['회사 소개','채용','광고 문의','이용 약관'].map(l => (
              <a key={l} className="seed-footer__linkText seed-footer__linkText--size_large"
                style={{ fontSize:14, fontWeight:500, color:'var(--seed-color-fg-neutral)', textDecoration:'none', cursor:'pointer' }}>{l}</a>
            ))}
            <a className="seed-footer__linkText seed-footer__linkText--size_large"
              style={{ fontSize:14, fontWeight:700, color:'var(--seed-color-fg-neutral)', textDecoration:'none', cursor:'pointer' }}><strong>개인정보 처리방침</strong></a>
          </div>
          {/* size_medium links */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:'3px 12px', marginBottom:10 }}>
            {['당근마켓','당근 알바','당근 부동산','당근 광고'].map(l => (
              <a key={l} className="seed-footer__linkText seed-footer__linkText--size_medium"
                style={{ fontSize:13, fontWeight:500, color:'var(--seed-color-fg-neutral-muted)', textDecoration:'none', cursor:'pointer' }}>{l}</a>
            ))}
          </div>
          {/* 법인 정보 */}
          <p style={{ fontSize:11, color:'#9E9E9E', lineHeight:1.7, margin:0 }}>
            주식회사 당근마켓 | 대표이사: 김재현, 황도연<br/>
            사업자등록번호: 375-87-00088 | 통신판매업신고: 2015-서울강남-03971<br/>
            서울특별시 강남구 테헤란로 131 (역삼동)<br/>
            © 2015-2026 Karrot Inc. All rights reserved.
          </p>
        </div>
      </div>
      <div className="comp-name">Footer</div>
      <div className="comp-slug">ui:footer · seed-footer__linkText--size_large · size_medium</div>
    </div>
  )
}

import { CompCard } from '../components/UI'
const iconAdd = '/icons/icon_add_regular.svg'
const iconHeartFill = '/icons/icon_heart_fill.svg'
const iconIosShare = '/icons/icon_ios_share_regular.svg'
const iconWrite = '/icons/icon_write_regular.svg'
const iconSearch = '/icons/icon_search_regular.svg'
const iconClose = '/icons/icon_close_regular.svg'
const iconCheck = '/icons/icon_check_regular.svg'
const iconChevronRight = '/icons/icon_chevron_right_regular.svg'
const iconDropDown = '/icons/icon_arrow_drop_down_regular.svg'
const iconDropUp = '/icons/icon_arrow_drop_up_regular.svg'
const iconInfoFill = '/icons/icon_info_fill.svg'
const iconWarningFill = '/icons/icon_warning_fill.svg'
const iconNotification = '/icons/icon_notification_regular.svg'
const iconChatting = '/icons/icon_chatting_regular.svg'

const Ic = ({ src, size=18 }) => <img src={src} width={size} height={size} alt="" aria-hidden />

export function ComponentGallery() {
  return (
    <section id="showcase">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize:19, fontWeight:700, marginBottom:8 }}>Components Gallery</h2>
        <p style={{ fontSize:13.5, color:'#4B5563' }}>
          <code>packages/css/recipes/*.css</code> 실제 BEM 클래스명 그대로 사용. 색상은 <code>@seed-design/css/all.css</code> CSS 변수로 자동 바인딩됩니다.
        </p>
      </div>
      <div className="gallery">
        {/* Action Button — 올바른 조합 클래스: size_medium-layout_withText */}
        <CompCard name="Action Button" slug="ui:action-button">
          <div style={{ display:'flex', flexDirection:'column', gap:10, alignItems:'center' }}>
            <button className="seed-action-button seed-action-button--variant_brandSolid seed-action-button--size_medium-layout_withText">Brand Solid</button>
            <button className="seed-action-button seed-action-button--variant_neutralOutline seed-action-button--size_medium-layout_withText">Neutral Outline</button>
            <button className="seed-action-button seed-action-button--variant_ghost seed-action-button--size_medium-layout_withText">Ghost</button>
            <button className="seed-action-button seed-action-button--variant_brandSolid seed-action-button--size_small-layout_withText" disabled>Disabled</button>
          </div>
        </CompCard>

        {/* Toggle Button */}
        <CompCard name="Toggle Button" slug="ui:toggle-button">
          <div style={{ display:'flex', flexDirection:'column', gap:10, alignItems:'center' }}>
            <div style={{ display:'flex', gap:8 }}>
              <button className="seed-toggle-button seed-toggle-button--variant_brandSolid seed-toggle-button--size_small"
                style={{ display:'inline-flex', alignItems:'center', gap:5 }}>
                <Ic src={iconHeartFill} size={16} /> 24
              </button>
              <button className="seed-toggle-button seed-toggle-button--variant_neutralWeak seed-toggle-button--size_small"
                style={{ display:'inline-flex', alignItems:'center', gap:5 }}>
                <Ic src={iconIosShare} size={16} /> 공유
              </button>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <button className="seed-toggle-button seed-toggle-button--variant_brandSolid seed-toggle-button--size_small" aria-pressed="true"
                style={{ display:'inline-flex', alignItems:'center', gap:5 }}>
                <Ic src={iconHeartFill} size={16} /> 눌림
              </button>
              <button className="seed-toggle-button seed-toggle-button--variant_brandSolid seed-toggle-button--size_small" disabled>비활성</button>
            </div>
          </div>
        </CompCard>

        {/* Switch — seed-switchmark__root 실제 클래스 */}
        <CompCard name="Switch" slug="ui:switch">
          <div style={{ display:'flex', flexDirection:'column', gap:16, alignItems:'flex-start', paddingLeft:8 }}>
            <label style={{ display:'inline-flex', alignItems:'center', gap:10, cursor:'pointer' }}>
              <input type="checkbox" defaultChecked
                className="seed-switchmark__root seed-switchmark__root--tone_brand"
                style={{ width:51, height:31, appearance:'none', WebkitAppearance:'none' }} />
              <span style={{ fontSize:14, fontWeight:500 }}>ON</span>
            </label>
            <label style={{ display:'inline-flex', alignItems:'center', gap:10, cursor:'pointer' }}>
              <input type="checkbox"
                className="seed-switchmark__root seed-switchmark__root--tone_brand"
                style={{ width:51, height:31, appearance:'none', WebkitAppearance:'none' }} />
              <span style={{ fontSize:14, fontWeight:500 }}>OFF</span>
            </label>
            <label style={{ display:'inline-flex', alignItems:'center', gap:10, cursor:'not-allowed' }}>
              <input type="checkbox" disabled
                className="seed-switchmark__root seed-switchmark__root--tone_brand"
                style={{ width:51, height:31, appearance:'none', WebkitAppearance:'none' }} />
              <span style={{ fontSize:14, fontWeight:500, color:'var(--seed-color-fg-disabled)' }}>Disabled</span>
            </label>
          </div>
        </CompCard>

        {/* Checkbox */}
        <CompCard name="Checkbox" slug="ui:checkbox">
          <div style={{ display:'flex', flexDirection:'column', gap:14, alignItems:'flex-start', paddingLeft:8 }}>
            <label style={{ display:'inline-flex', alignItems:'center', gap:8, cursor:'pointer' }}>
              <input type="checkbox" defaultChecked
                className="seed-checkbox__control seed-checkbox__control--size_medium"
                style={{ width:20, height:20, appearance:'none', WebkitAppearance:'none', borderRadius:4, border:'1.5px solid var(--seed-color-bg-brand-solid)', background:'var(--seed-color-bg-brand-solid)', flexShrink:0, cursor:'pointer' }} />
              <span className="seed-checkbox__label seed-checkbox__label--size_medium" style={{ fontSize:14 }}>선택됨</span>
            </label>
            <label style={{ display:'inline-flex', alignItems:'center', gap:8, cursor:'pointer' }}>
              <input type="checkbox"
                className="seed-checkbox__control seed-checkbox__control--size_medium"
                style={{ width:20, height:20, appearance:'none', WebkitAppearance:'none', borderRadius:4, border:'1.5px solid rgba(0,0,0,.2)', background:'#fff', flexShrink:0, cursor:'pointer' }} />
              <span className="seed-checkbox__label seed-checkbox__label--size_medium" style={{ fontSize:14 }}>미선택</span>
            </label>
            <label style={{ display:'inline-flex', alignItems:'center', gap:8, cursor:'not-allowed', opacity:.5 }}>
              <input type="checkbox" disabled
                className="seed-checkbox__control seed-checkbox__control--size_medium"
                style={{ width:20, height:20, appearance:'none', WebkitAppearance:'none', borderRadius:4, border:'1.5px solid rgba(0,0,0,.15)', background:'#F5F5F5', flexShrink:0 }} />
              <span style={{ fontSize:14, color:'var(--seed-color-fg-disabled)' }}>비활성</span>
            </label>
          </div>
        </CompCard>

        {/* Avatar */}
        <CompCard name="Avatar" slug="ui:avatar">
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            {[32,48,64].map(s => (
              <span key={s} style={{ width:s, height:s, borderRadius:'50%', background:'#FFE0CB', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:s*0.5, overflow:'hidden', flexShrink:0 }}>🥕</span>
            ))}
          </div>
        </CompCard>

        {/* Badge */}
        <CompCard name="Badge" slug="ui:badge">
          <div style={{ display:'flex', flexWrap:'wrap', gap:8, justifyContent:'center' }}>
            {[
              { label:'Brand', bg:'var(--seed-color-bg-brand-solid)', color:'#fff' },
              { label:'Critical', bg:'#C62828', color:'#fff' },
              { label:'Positive', bg:'#388E3C', color:'#fff' },
              { label:'Neutral', bg:'#F5F5F5', color:'#1a1c20', border:'1px solid rgba(0,0,0,.1)' },
              { label:'Info', bg:'#1565C0', color:'#fff' },
              { label:'Warning', bg:'#F9A825', color:'#fff' },
            ].map(b => (
              <span key={b.label} style={{ background:b.bg, color:b.color, fontSize:11, fontWeight:700, padding:'3px 9px', borderRadius:4, border:b.border }}>{b.label}</span>
            ))}
          </div>
        </CompCard>

        {/* Chip */}
        <CompCard name="Chip" slug="ui:chip">
          <div style={{ display:'flex', flexWrap:'wrap', gap:8, justifyContent:'center' }}>
            <label className="seed-chip__root seed-chip__root--variant_solid seed-chip__root--size_small">
              <input type="radio" defaultChecked style={{ display:'none' }} />
              <span className="seed-chip__label">선택됨</span>
            </label>
            <label className="seed-chip__root seed-chip__root--variant_outlineStrong seed-chip__root--size_small">
              <input type="radio" style={{ display:'none' }} />
              <span className="seed-chip__label">옵션 B</span>
            </label>
            <label className="seed-chip__root seed-chip__root--variant_outlineWeak seed-chip__root--size_small">
              <input type="radio" style={{ display:'none' }} />
              <span className="seed-chip__label">옵션 C</span>
            </label>
          </div>
        </CompCard>

        {/* Action Chip / Control Chip */}
        <CompCard name="Action Chip" slug="ui:action-chip">
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, justifyContent:'center' }}>
            <button style={{ background:'var(--seed-color-bg-neutral-solid)', color:'#fff', padding:'7px 14px', borderRadius:'9999px', border:'none', fontSize:13, fontWeight:600, cursor:'pointer' }}>전체</button>
            <button style={{ background:'var(--seed-color-bg-neutral-weak)', color:'var(--seed-color-fg-neutral)', padding:'7px 14px', borderRadius:'9999px', border:'1.5px solid rgba(0,0,0,.12)', fontSize:13, fontWeight:500, cursor:'pointer' }}>의류</button>
            <button style={{ background:'var(--seed-color-bg-neutral-weak)', color:'var(--seed-color-fg-neutral)', padding:'7px 14px', borderRadius:'9999px', border:'1.5px solid rgba(0,0,0,.12)', fontSize:13, fontWeight:500, cursor:'pointer' }}>가전</button>
          </div>
        </CompCard>

        {/* Callout */}
        <CompCard name="Callout" slug="ui:callout">
          <div style={{ display:'flex', flexDirection:'column', gap:8, width:'100%' }}>
            <div style={{ background:'#EFF6FF', borderRadius:10, padding:'11px 14px', display:'flex', gap:8, alignItems:'flex-start' }}>
              <Ic src={iconInfoFill} size={14} />
              <span style={{ fontSize:13, color:'#1D4ED8', lineHeight:1.5 }}>인라인 정보 안내 메시지입니다.</span>
            </div>
            <div style={{ background:'#FFF1F2', borderRadius:10, padding:'11px 14px', display:'flex', gap:8, alignItems:'flex-start' }}>
              <Ic src={iconWarningFill} size={14} />
              <span style={{ fontSize:13, color:'#C62828', lineHeight:1.5 }}>에러 callout 메시지입니다.</span>
            </div>
          </div>
        </CompCard>

        {/* Dialog */}
        <CompCard name="Dialog" slug="ui:dialog">
          <div style={{ background:'#fff', borderRadius:16, padding:'22px 20px 16px', boxShadow:'0 8px 24px rgba(0,0,0,.18)', width:230 }}>
            <p style={{ fontSize:16, fontWeight:700, color:'var(--seed-color-fg-neutral)', marginBottom:8 }}>정말 삭제할까요?</p>
            <p style={{ fontSize:13, color:'#616161', marginBottom:18, lineHeight:1.5 }}>삭제한 항목은 복구할 수 없어요.</p>
            <div style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
              <button style={{ padding:'9px 14px', border:'none', background:'var(--seed-color-bg-neutral-weak)', borderRadius:8, fontSize:13, fontWeight:600, cursor:'pointer', color:'var(--seed-color-fg-neutral)' }}>취소</button>
              <button style={{ padding:'9px 14px', border:'none', background:'#C62828', borderRadius:8, fontSize:13, fontWeight:700, cursor:'pointer', color:'#fff' }}>삭제</button>
            </div>
          </div>
        </CompCard>

        {/* Snackbar */}
        <CompCard name="Snackbar" slug="ui:snackbar">
          <div style={{ display:'flex', flexDirection:'column', gap:10, width:'100%' }}>
            <div style={{ background:'var(--seed-color-bg-neutral-solid)', color:'#fff', padding:'13px 16px', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
              <span style={{ fontSize:13.5, fontWeight:500 }}>저장이 완료되었습니다.</span>
              <span style={{ color:'#60A5FA', fontWeight:700, fontSize:13, whiteSpace:'nowrap', cursor:'pointer' }}>실행취소</span>
            </div>
            <div style={{ background:'var(--seed-color-bg-neutral-solid)', color:'#fff', padding:'13px 16px', borderRadius:12, display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ color:'#4ADE80', flexShrink:0 }}>✓</span>
              <span style={{ fontSize:13.5, fontWeight:500 }}>게시글이 업로드되었어요.</span>
            </div>
          </div>
        </CompCard>

        {/* FAB */}
        <CompCard name="FAB" slug="ui:fab">
          <div style={{ display:'flex', gap:12, alignItems:'center' }}>
            <button className="seed-fab" style={{ '--seed-icon-size':'22px', '--seed-icon-color':'var(--seed-color-fg-neutral)' }}>
              <img src={iconAdd} width={22} height={22} alt="" />
            </button>
            <button style={{ background:'var(--seed-color-bg-neutral-solid)', color:'#fff', padding:'12px 20px', borderRadius:'9999px', border:'none', fontSize:14, fontWeight:700, cursor:'pointer', boxShadow:'0 4px 12px rgba(0,0,0,.2)', display:'inline-flex', alignItems:'center', gap:8 }}>
              <Ic src={iconWrite} size={18} /> 글 쓰기
            </button>
          </div>
        </CompCard>

        {/* Tabs */}
        <CompCard name="Tabs" slug="ui:tabs">
          <div style={{ width:'100%' }}>
            <div style={{ display:'flex', borderBottom:'1.5px solid rgba(0,0,0,.08)' }}>
              {['탭 1','탭 2','탭 3'].map((t,i) => (
                <button key={t} style={{ flex:1, padding:'12px 0', fontSize:13, fontWeight:i===0?700:500, color:i===0?'var(--seed-color-fg-brand)':'#9E9E9E', border:'none', borderBottom:i===0?'2px solid var(--seed-color-bg-brand-solid)':'none', background:'transparent', marginBottom:i===0?-1.5:0, cursor:'pointer' }}>{t}</button>
              ))}
            </div>
            <div style={{ padding:'14px 0', fontSize:13, color:'var(--seed-color-fg-neutral)' }}>탭 1 콘텐츠 영역</div>
          </div>
        </CompCard>

        {/* Segmented Control */}
        <CompCard name="Segmented Control" slug="ui:segmented-control">
          <div style={{ display:'inline-flex', background:'rgba(0,0,0,.06)', borderRadius:10, padding:3, gap:2 }}>
            <span style={{ background:'#fff', padding:'7px 18px', borderRadius:8, fontSize:13, fontWeight:700, boxShadow:'0 1px 3px rgba(0,0,0,.1)', cursor:'pointer', color:'var(--seed-color-fg-neutral)' }}>선택됨</span>
            <span style={{ padding:'7px 18px', fontSize:13, fontWeight:500, color:'#616161', cursor:'pointer' }}>옵션 B</span>
            <span style={{ padding:'7px 18px', fontSize:13, fontWeight:500, color:'#616161', cursor:'pointer' }}>옵션 C</span>
          </div>
        </CompCard>

        {/* Slider */}
        <CompCard name="Slider" slug="ui:slider">
          <div style={{ width:200, display:'flex', flexDirection:'column', gap:12 }}>
            <div style={{ position:'relative', height:20, display:'flex', alignItems:'center' }}>
              <div style={{ width:'100%', height:4, background:'rgba(0,0,0,.1)', borderRadius:'9999px', position:'relative' }}>
                <div style={{ width:'65%', height:'100%', background:'var(--seed-color-bg-brand-solid)', borderRadius:'9999px' }} />
              </div>
              <div style={{ position:'absolute', left:'65%', transform:'translateX(-50%)', width:20, height:20, borderRadius:'50%', background:'#fff', border:'2px solid var(--seed-color-bg-brand-solid)', boxShadow:'0 2px 6px rgba(0,0,0,.2)' }} />
            </div>
            <input type="range" min={0} max={100} defaultValue={65} style={{ width:'100%', accentColor:'var(--seed-color-bg-brand-solid)' }} />
          </div>
        </CompCard>

        {/* Quantity Picker */}
        <CompCard name="Quantity Picker" slug="ui:quantity-picker">
          <div style={{ display:'inline-flex', alignItems:'center', border:'1px solid rgba(0,0,0,.12)', borderRadius:10, overflow:'hidden', background:'#fff' }}>
            <button style={{ padding:'10px 18px', border:'none', background:'transparent', cursor:'pointer', fontSize:20, fontWeight:500, color:'var(--seed-color-fg-neutral)' }}>−</button>
            <div style={{ width:1, height:24, background:'rgba(0,0,0,.08)' }} />
            <span style={{ padding:'10px 20px', fontSize:15, fontWeight:700, color:'var(--seed-color-fg-neutral)' }}>1</span>
            <div style={{ width:1, height:24, background:'rgba(0,0,0,.08)' }} />
            <button style={{ padding:'10px 18px', border:'none', background:'transparent', cursor:'pointer', fontSize:20, fontWeight:500, color:'var(--seed-color-fg-neutral)' }}>+</button>
          </div>
        </CompCard>

        {/* Skeleton */}
        <CompCard name="Skeleton" slug="ui:skeleton">
          <div style={{ display:'flex', flexDirection:'column', gap:10, width:220 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:42, height:42, borderRadius:'50%', background:'linear-gradient(90deg,#EBEBEB 25%,#F5F5F5 50%,#EBEBEB 75%)', backgroundSize:'200% 100%', animation:'shimmer 1.5s infinite', flexShrink:0 }} />
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:7 }}>
                <div style={{ height:13, background:'linear-gradient(90deg,#EBEBEB 25%,#F5F5F5 50%,#EBEBEB 75%)', backgroundSize:'200% 100%', borderRadius:8, animation:'shimmer 1.5s infinite' }} />
                <div style={{ height:11, width:'60%', background:'linear-gradient(90deg,#EBEBEB 25%,#F5F5F5 50%,#EBEBEB 75%)', backgroundSize:'200% 100%', borderRadius:8, animation:'shimmer 1.5s infinite' }} />
              </div>
            </div>
            <div style={{ height:80, background:'linear-gradient(90deg,#EBEBEB 25%,#F5F5F5 50%,#EBEBEB 75%)', backgroundSize:'200% 100%', borderRadius:8, animation:'shimmer 1.5s infinite' }} />
          </div>
        </CompCard>

        {/* Progress Circle */}
        <CompCard name="Progress Circle" slug="ui:progress-circle">
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            <svg width={56} height={56} viewBox="0 0 56 56">
              <circle cx={28} cy={28} r={24} fill="none" stroke="rgba(0,0,0,.08)" strokeWidth={4}/>
              <circle cx={28} cy={28} r={24} fill="none" stroke="var(--seed-color-bg-brand-solid)" strokeWidth={4} strokeDasharray="103 148" strokeLinecap="round" transform="rotate(-90 28 28)"/>
              <text x={28} y={32} textAnchor="middle" fontSize={12} fontWeight={700} fill="#1a1c20">70%</text>
            </svg>
            <svg width={36} height={36} viewBox="0 0 36 36">
              <circle cx={18} cy={18} r={15} fill="none" stroke="rgba(0,0,0,.08)" strokeWidth={3}/>
              <circle cx={18} cy={18} r={15} fill="none" stroke="#388E3C" strokeWidth={3} strokeDasharray="62 95" strokeLinecap="round" transform="rotate(-90 18 18)"/>
            </svg>
          </div>
        </CompCard>

        {/* Accordion */}
        <CompCard name="Accordion" slug="ui:accordion">
          <div style={{ width:'100%' }}>
            <div style={{ borderBottom:'1px solid rgba(0,0,0,.08)' }}>
              <button style={{ padding:'13px 4px', display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%', background:'transparent', border:'none', cursor:'pointer' }}>
                <span style={{ fontSize:14, fontWeight:600, color:'var(--seed-color-fg-neutral)' }}>자주 묻는 질문 1</span>
                <Ic src={iconDropUp} size={18} />
              </button>
              <div style={{ padding:'0 4px 12px', fontSize:13, color:'#616161', lineHeight:1.6 }}>열린 아코디언 내용입니다.</div>
            </div>
            <div>
              <button style={{ padding:'13px 4px', display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%', background:'transparent', border:'none', cursor:'pointer' }}>
                <span style={{ fontSize:14, fontWeight:600, color:'var(--seed-color-fg-neutral)' }}>자주 묻는 질문 2</span>
                <Ic src={iconDropDown} size={18} />
              </button>
            </div>
          </div>
        </CompCard>

        {/* List Item */}
        <CompCard name="List Item" slug="ui:list-item">
          <div style={{ width:'100%' }}>
            {[{emoji:'🥕',title:'당근마켓 디자인팀',sub:'Seed Design System'},{emoji:'🔍',title:'axpublish v2.0',sub:'CLI 도구'}].map((item,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'11px 4px', borderBottom:i===0?'1px solid rgba(0,0,0,.06)':'none' }}>
                <div style={{ width:40, height:40, background:'#FFE0CB', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:20 }}>{item.emoji}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:14, fontWeight:600, color:'var(--seed-color-fg-neutral)' }}>{item.title}</div>
                  <div style={{ fontSize:12, color:'#616161', marginTop:2 }}>{item.sub}</div>
                </div>
                <Ic src={iconChevronRight} size={14} />
              </div>
            ))}
          </div>
        </CompCard>

        {/* Text Input */}
        <CompCard name="Text Input" slug="ui:text-input">
          <div style={{ display:'flex', flexDirection:'column', gap:10, width:'100%' }}>
            <div style={{ border:'1.5px solid var(--seed-color-bg-brand-solid)', borderRadius:8, padding:'11px 14px', background:'#fff', display:'flex', alignItems:'center', gap:8 }}>
              <Ic src={iconSearch} size={16} />
              <input defaultValue="입력 중..." style={{ border:'none', outline:'none', fontSize:14, color:'var(--seed-color-fg-neutral)', width:'100%', fontFamily:'inherit', background:'transparent' }} />
            </div>
            <div style={{ border:'1.5px solid rgba(0,0,0,.14)', borderRadius:8, padding:'11px 14px', background:'#fff' }}>
              <input placeholder="플레이스홀더" style={{ border:'none', outline:'none', fontSize:14, color:'#9E9E9E', width:'100%', fontFamily:'inherit', background:'transparent' }} />
            </div>
            <div style={{ border:'1.5px solid #C62828', borderRadius:8, padding:'11px 14px', background:'#FFF1F2', display:'flex', flexDirection:'column', gap:4 }}>
              <input defaultValue="잘못된 입력값" style={{ border:'none', outline:'none', fontSize:14, color:'var(--seed-color-fg-neutral)', width:'100%', fontFamily:'inherit', background:'transparent' }} />
              <span style={{ fontSize:11.5, color:'#C62828' }}>올바른 형식을 입력해주세요</span>
            </div>
          </div>
        </CompCard>

        {/* Inline Banner */}
        <CompCard name="Inline Banner" slug="ui:inline-banner">
          <div style={{ display:'flex', flexDirection:'column', gap:8, width:'100%' }}>
            <div style={{ background:'#FFFBEB', border:'1px solid #FDE68A', borderRadius:10, padding:'11px 14px', display:'flex', gap:8, alignItems:'flex-start' }}>
              <Ic src={iconWarningFill} size={14} />
              <div>
                <p style={{ fontSize:12.5, fontWeight:700, color:'#92400E', marginBottom:3 }}>업데이트 안내</p>
                <p style={{ fontSize:12, color:'#78350F', lineHeight:1.5, margin:0 }}>새 버전의 기능을 확인해보세요.</p>
              </div>
            </div>
            <div style={{ background:'#EFF6FF', border:'1px solid #BFDBFE', borderRadius:10, padding:'11px 14px', display:'flex', gap:8 }}>
              <Ic src={iconInfoFill} size={14} />
              <p style={{ fontSize:12, color:'#1D4ED8', lineHeight:1.5, margin:0 }}>인라인 정보 배너입니다.</p>
            </div>
          </div>
        </CompCard>

      </div>
    </section>
  )
}

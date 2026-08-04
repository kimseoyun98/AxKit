import { CompCard } from '../components/UI'

const iconHome = '/icons/icon_home_fill.svg'
const iconMarket = '/icons/icon_market_regular.svg'
const iconChatting = '/icons/icon_chatting_regular.svg'
const iconNotification = '/icons/icon_notification_regular.svg'
const iconProfile = '/icons/icon_my_profile_regular.svg'

export function SideNavSection() {
  return (
    <div className="comp-card span2">
      <div className="comp-canvas" style={{ minHeight: 400, alignItems:'stretch', padding:0, borderRadius:16, overflow:'hidden', display:'flex', flexDirection:'row' }}>
        <nav className="seed-side-navigation__root seed-side-navigation__root--tone_neutral" style={{ width: 220, borderRight: '1px solid rgba(0,0,0,.08)' }}>
          <div className="seed-side-navigation__header" style={{ padding: '20px', fontSize: 18, fontWeight: 700 }}>
            App
          </div>
          <div className="seed-side-navigation__group">
            <div className="seed-side-navigation__groupLabel" style={{ padding: '8px 20px', fontSize: 12, color: 'var(--seed-color-fg-neutral-muted)' }}>메뉴</div>
            <button className="seed-side-navigation-menu-item__root" data-current="true" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 12, width: '100%', background: 'var(--seed-color-bg-neutral-weak)', border: 'none', textAlign: 'left', cursor: 'pointer' }}>
              <img src={iconHome} width={20} height={20} className="seed-side-navigation-menu-item__prefixIcon" alt="" />
              <span className="seed-side-navigation-menu-item__label" style={{ fontSize: 14, fontWeight: 600 }}>홈</span>
            </button>
            <button className="seed-side-navigation-menu-item__root" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 12, width: '100%', background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer' }}>
              <img src={iconMarket} width={20} height={20} className="seed-side-navigation-menu-item__prefixIcon" alt="" />
              <span className="seed-side-navigation-menu-item__label" style={{ fontSize: 14 }}>마켓</span>
            </button>
            <button className="seed-side-navigation-menu-item__root" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 12, width: '100%', background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer' }}>
              <img src={iconChatting} width={20} height={20} className="seed-side-navigation-menu-item__prefixIcon" alt="" />
              <span className="seed-side-navigation-menu-item__label" style={{ fontSize: 14 }}>채팅</span>
            </button>
            <button className="seed-side-navigation-menu-item__root" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 12, width: '100%', background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer' }}>
              <img src={iconNotification} width={20} height={20} className="seed-side-navigation-menu-item__prefixIcon" alt="" />
              <span className="seed-side-navigation-menu-item__label" style={{ fontSize: 14 }}>알림</span>
            </button>
            <button className="seed-side-navigation-menu-item__root" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 12, width: '100%', background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer' }}>
              <img src={iconProfile} width={20} height={20} className="seed-side-navigation-menu-item__prefixIcon" alt="" />
              <span className="seed-side-navigation-menu-item__label" style={{ fontSize: 14 }}>나의 당근</span>
            </button>
          </div>
          <div className="seed-side-navigation__footer" style={{ marginTop: 'auto', padding: '20px', fontSize: 12, color: 'var(--seed-color-fg-neutral-muted)' }}>
            Footer
          </div>
        </nav>
        <div className="seed-side-navigation-inset" style={{ flex: 1, background: 'var(--seed-color-bg-layer-default)', padding: '24px' }}>
          <h3 style={{ margin: 0, fontSize: 16 }}>콘텐츠 영역</h3>
          <p style={{ fontSize: 14, color: 'var(--seed-color-fg-neutral-muted)', marginTop: 8 }}>사이드 네비게이션과 인셋 영역 테스트입니다.</p>
        </div>
      </div>
      <div className="comp-name">Side Navigation</div>
      <div className="comp-slug">ui:side-navigation</div>
    </div>
  )
}

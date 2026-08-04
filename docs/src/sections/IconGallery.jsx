import { Sec, ChipInfo } from '../components/UI'

const iconAdd = '/icons/icon_add_regular.svg'
const iconAddFill = '/icons/icon_add_fill.svg'
const iconHome = '/icons/icon_home_regular.svg'
const iconHomeFill = '/icons/icon_home_fill.svg'
const iconSearch = '/icons/icon_search_regular.svg'
const iconNotification = '/icons/icon_notification_regular.svg'
const iconHeart = '/icons/icon_heart_regular.svg'
const iconHeartFill = '/icons/icon_heart_fill.svg'
const iconClose = '/icons/icon_close_regular.svg'
const iconCheck = '/icons/icon_check_regular.svg'
const iconChevronRight = '/icons/icon_chevron_right_regular.svg'
const iconChevronLeft = '/icons/icon_chevron_left_regular.svg'
const iconDropDown = '/icons/icon_arrow_drop_down_regular.svg'
const iconDropUp = '/icons/icon_arrow_drop_up_regular.svg'
const iconIosShare = '/icons/icon_ios_share_regular.svg'
const iconWrite = '/icons/icon_write_regular.svg'
const iconWriteFill = '/icons/icon_write_fill.svg'
const iconMarket = '/icons/icon_market_regular.svg'
const iconChatting = '/icons/icon_chatting_regular.svg'
const iconMyProfile = '/icons/icon_my_profile_regular.svg'
const iconMyProfileFill = '/icons/icon_my_profile_fill.svg'
const iconInfo = '/icons/icon_info_regular.svg'
const iconWarning = '/icons/icon_warning_regular.svg'
const iconStar = '/icons/icon_star_regular.svg'
const iconStarFill = '/icons/icon_star_fill.svg'
const iconLocation = '/icons/icon_location_regular.svg'
const iconCamera = '/icons/icon_camera_regular.svg'
const iconBookmark = '/icons/icon_bookmark_regular.svg'
const iconDelete = '/icons/icon_delete_regular.svg'
const iconMore = '/icons/icon_more_regular.svg'
const iconSetting = '/icons/icon_setting_regular.svg'
const iconFilter = '/icons/icon_filter_regular.svg'

const ICONS = [
  { url: iconAdd, name: 'add_regular' },
  { url: iconAddFill, name: 'add_fill' },
  { url: iconHome, name: 'home_regular' },
  { url: iconHomeFill, name: 'home_fill' },
  { url: iconSearch, name: 'search_regular' },
  { url: iconNotification, name: 'notification_regular' },
  { url: iconHeart, name: 'heart_regular' },
  { url: iconHeartFill, name: 'heart_fill' },
  { url: iconClose, name: 'close_regular' },
  { url: iconCheck, name: 'check_regular' },
  { url: iconChevronRight, name: 'chevron_right_regular' },
  { url: iconChevronLeft, name: 'chevron_left_regular' },
  { url: iconDropDown, name: 'arrow_drop_down_regular' },
  { url: iconDropUp, name: 'arrow_drop_up_regular' },
  { url: iconIosShare, name: 'ios_share_regular' },
  { url: iconWrite, name: 'write_regular' },
  { url: iconWriteFill, name: 'write_fill' },
  { url: iconMarket, name: 'market_regular' },
  { url: iconChatting, name: 'chatting_regular' },
  { url: iconMyProfile, name: 'my_profile_regular' },
  { url: iconMyProfileFill, name: 'my_profile_fill' },
  { url: iconInfo, name: 'info_regular' },
  { url: iconWarning, name: 'warning_regular' },
  { url: iconStar, name: 'star_regular' },
  { url: iconStarFill, name: 'star_fill' },
  { url: iconLocation, name: 'location_regular' },
  { url: iconCamera, name: 'camera_regular' },
  { url: iconBookmark, name: 'bookmark_regular' },
  { url: iconDelete, name: 'delete_regular' },
  { url: iconMore, name: 'more_regular' },
  { url: iconSetting, name: 'setting_regular' },
  { url: iconFilter, name: 'filter_regular' }
]

export function IconGallery() {
  return (
    <Sec id="icons">
      <h2>Icon Pack <ChipInfo>@seed-design/icon v0.6.2 · 588개</ChipInfo></h2>
      <div className="icon-grid">
        {ICONS.map(ic => (
          <div className="icon-item" key={ic.name}>
            <img src={ic.url} width={24} height={24} alt={ic.name} />
            <span>{ic.name}</span>
          </div>
        ))}
      </div>
    </Sec>
  )
}

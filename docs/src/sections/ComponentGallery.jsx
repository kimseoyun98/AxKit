import { useState } from 'react'
import { CompCard } from '../components/UI'
const iconAdd = '/icons/icon_add_regular.svg'
const iconHeartFill = '/icons/icon_heart_fill.svg'
const iconIosShare = '/icons/icon_ios_share_regular.svg'
const iconCheckFill = '/icons/icon_check_fill.svg'

const Ic = ({ src, size=18 }) => <img src={src} width={size} height={size} alt="" aria-hidden />

// 실제 SEED 상태 클래스(:checked, [data-checked])는 라이브러리 내부에서 JS로 여러 형제 요소에
// 동시에 얹어주는 값이라, 정적 defaultChecked만으로는 썸/아이콘 등 분리된 요소가 클릭에 반응하지
// 않는다. 데모가 실제로 동작하도록 각 컴포넌트에 맞는 최소한의 React state로 이를 재현한다.
function SwitchDemo({ label, initial = false, disabled = false }) {
  const [checked, setChecked] = useState(initial)
  return (
    <label style={{ display:'inline-flex', alignItems:'center', gap:10, cursor: disabled ? 'not-allowed' : 'pointer' }}>
      <span style={{ position:'relative', display:'inline-block', width:38, height:24, flexShrink:0, opacity: disabled ? .38 : 1 }}>
        <input type="checkbox" checked={checked} disabled={disabled}
          data-checked={checked ? 'true' : undefined}
          onChange={() => setChecked(v => !v)}
          className="seed-switchmark__root seed-switchmark__root--tone_brand seed-switchmark__root--size_24"
          style={{ position:'absolute', inset:0, width:38, height:24, margin:0, appearance:'none', WebkitAppearance:'none', cursor: disabled ? 'not-allowed' : 'pointer' }} />
        <span aria-hidden data-checked={checked ? 'true' : undefined}
          className="seed-switchmark__thumb seed-switchmark__thumb--tone_brand seed-switchmark__thumb--size_24"
          style={{ position:'absolute', top:2, left:2, width:20, height:20, pointerEvents:'none' }} />
      </span>
      <span style={{ fontSize:14, fontWeight:500, color: disabled ? 'var(--seed-color-fg-disabled)' : undefined }}>{label}</span>
    </label>
  )
}

function CheckboxDemo({ label, initial = false, disabled = false }) {
  const [checked, setChecked] = useState(initial)
  return (
    <label className="seed-checkbox__root seed-checkbox__root--size_medium" style={{ cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? .5 : 1 }}>
      <span style={{ position:'relative', display:'inline-block', width:20, height:20, flexShrink:0 }}>
        <input type="checkbox" checked={checked} disabled={disabled}
          data-checked={checked ? 'true' : undefined}
          onChange={() => setChecked(v => !v)}
          className="seed-checkmark__root seed-checkmark__root--variant_square seed-checkmark__root--variant_square-tone_brand seed-checkmark__root--size_medium"
          style={{ position:'absolute', inset:0, width:20, height:20, margin:0, appearance:'none', WebkitAppearance:'none', cursor: disabled ? 'not-allowed' : 'pointer' }} />
        {checked && (
          <img src={iconCheckFill} alt="" aria-hidden
            style={{ position:'absolute', inset:0, margin:'auto', width:12, height:12, pointerEvents:'none', filter:'brightness(0) invert(1)' }} />
        )}
      </span>
      <span className="seed-checkbox__label seed-checkbox__label--size_medium" style={{ fontSize:14, color: disabled ? 'var(--seed-color-fg-disabled)' : undefined }}>{label}</span>
    </label>
  )
}

function ChipGroupDemo() {
  const [selected, setSelected] = useState('a')
  const options = [
    { key:'a', variant:'solid', label:'선택됨' },
    { key:'b', variant:'outlineStrong', label:'옵션 B' },
    { key:'c', variant:'outlineWeak', label:'옵션 C' },
  ]
  return (
    <div style={{ display:'flex', flexWrap:'wrap', gap:8, justifyContent:'center' }}>
      {options.map(o => {
        const checked = selected === o.key
        return (
          <label key={o.key} data-checked={checked ? 'true' : undefined}
            className={`seed-chip__root seed-chip__root--variant_${o.variant} seed-chip__root--size_small`}>
            <input type="radio" name="chip-demo" checked={checked} onChange={() => setSelected(o.key)} style={{ display:'none' }} />
            <span data-checked={checked ? 'true' : undefined} className={`seed-chip__label seed-chip__label--variant_${o.variant}`}>{o.label}</span>
          </label>
        )
      })}
    </div>
  )
}

export function ComponentGallery() {
  return (
    <section id="showcase">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize:19, fontWeight:700, marginBottom:8 }}>Components Gallery</h2>
        <p style={{ fontSize:13.5, color:'#4B5563' }}>
          <code>packages/css/recipes/*.css</code> 실제 BEM 클래스명과 실제 DOM 구조를 그대로 재현할 수 있는
          컴포넌트만 수록합니다. 이 목록에 없는 컴포넌트도 SEED 패키지에는 전부 존재하니, 코드에서는{' '}
          <code>@seed-design/css/recipes/*.css</code>를 그대로 import해서 사용하면 됩니다.
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

        {/* Switch — 실제 구조: seed-switchmark__root(트랙) + seed-switchmark__thumb(손잡이) 두 요소 필요.
            SEED는 data-checked를 라이브러리 내부 state machine이 두 요소에 동시에 얹어주므로,
            클릭 시 실제로 썸이 움직이도록 React state로 동일하게 재현 */}
        <CompCard name="Switch" slug="ui:switch">
          <div style={{ display:'flex', flexDirection:'column', gap:16, alignItems:'flex-start', paddingLeft:8 }}>
            <SwitchDemo label="ON" initial />
            <SwitchDemo label="OFF" />
            <SwitchDemo label="Disabled" disabled />
          </div>
        </CompCard>

        {/* Checkbox — 실제 구조: seed-checkbox__root(라벨 wrapper) 안에 seed-checkmark__root(네모박스, variant_square) */}
        <CompCard name="Checkbox" slug="ui:checkbox">
          <div style={{ display:'flex', flexDirection:'column', gap:14, alignItems:'flex-start', paddingLeft:8 }}>
            <CheckboxDemo label="선택됨" initial />
            <CheckboxDemo label="미선택" />
            <CheckboxDemo label="비활성" disabled />
          </div>
        </CompCard>

        {/* Chip — radio 그룹. seed-chip__root/__label 모두 [data-checked]로 상태를 받는 구조라 실제
            선택 전환이 되도록 React state로 그룹핑 */}
        <CompCard name="Chip" slug="ui:chip">
          <ChipGroupDemo />
        </CompCard>

        {/* FAB — 실제 클래스: seed-fab (44×44 원형, 크기/배경/그림자 전부 클래스에서 옴) */}
        <CompCard name="FAB" slug="ui:fab">
          <button className="seed-fab">
            <img src={iconAdd} width={22} height={22} alt="" />
          </button>
        </CompCard>

        {/* Skeleton — 실제 클래스: seed-skeleton + radius/tone 변형, 크기는 --seed-box-width-base/--seed-box-height-base로 지정 */}
        <CompCard name="Skeleton" slug="ui:skeleton">
          <div style={{ display:'flex', flexDirection:'column', gap:10, width:220 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <span className="seed-skeleton seed-skeleton--radius_full seed-skeleton--tone_neutral"
                style={{ '--seed-box-width-base':'42px', '--seed-box-height-base':'42px', flexShrink:0 }} />
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:7 }}>
                <span className="seed-skeleton seed-skeleton--radius_8 seed-skeleton--tone_neutral"
                  style={{ '--seed-box-width-base':'100%', '--seed-box-height-base':'13px' }} />
                <span className="seed-skeleton seed-skeleton--radius_8 seed-skeleton--tone_neutral"
                  style={{ '--seed-box-width-base':'60%', '--seed-box-height-base':'11px' }} />
              </div>
            </div>
            <span className="seed-skeleton seed-skeleton--radius_8 seed-skeleton--tone_neutral"
              style={{ '--seed-box-width-base':'100%', '--seed-box-height-base':'80px' }} />
          </div>
        </CompCard>

      </div>
    </section>
  )
}

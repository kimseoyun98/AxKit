import { useState } from 'react'
import { CompCard } from '../components/UI'
const iconAdd = '/icons/icon_add_regular.svg'
const iconHeartFill = '/icons/icon_heart_fill.svg'
const iconIosShare = '/icons/icon_ios_share_regular.svg'
const iconCheckFill = '/icons/icon_check_fill.svg'
const iconChevronDown = '/icons/icon_chevron_down_regular.svg'

const Ic = ({ src, size = 18 }) => <img src={src} width={size} height={size} alt="" aria-hidden />

/* ── 인터랙티브 데모 헬퍼 ──────────────────────────────────── */
function SwitchDemo({ label, initial = false, disabled = false }) {
  const [checked, setChecked] = useState(initial)
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer' }}>
      <span style={{ position: 'relative', display: 'inline-block', width: 38, height: 24, flexShrink: 0, opacity: disabled ? .38 : 1 }}>
        <input type="checkbox" checked={checked} disabled={disabled}
          data-checked={checked ? 'true' : undefined}
          onChange={() => setChecked(v => !v)}
          className="seed-switchmark__root seed-switchmark__root--tone_brand seed-switchmark__root--size_24"
          style={{ position: 'absolute', inset: 0, width: 38, height: 24, margin: 0, appearance: 'none', WebkitAppearance: 'none', cursor: disabled ? 'not-allowed' : 'pointer' }} />
        <span aria-hidden data-checked={checked ? 'true' : undefined}
          className="seed-switchmark__thumb seed-switchmark__thumb--tone_brand seed-switchmark__thumb--size_24"
          style={{ position: 'absolute', top: 2, left: 2, width: 20, height: 20, pointerEvents: 'none' }} />
      </span>
      <span style={{ fontSize: 14, fontWeight: 500, color: disabled ? 'var(--seed-color-fg-disabled)' : undefined }}>{label}</span>
    </label>
  )
}

function CheckboxDemo({ label, initial = false, disabled = false }) {
  const [checked, setChecked] = useState(initial)
  return (
    <label className="seed-checkbox__root seed-checkbox__root--size_medium" style={{ cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? .5 : 1 }}>
      <span style={{ position: 'relative', display: 'inline-block', width: 20, height: 20, flexShrink: 0 }}>
        <input type="checkbox" checked={checked} disabled={disabled}
          data-checked={checked ? 'true' : undefined}
          onChange={() => setChecked(v => !v)}
          className="seed-checkmark__root seed-checkmark__root--variant_square seed-checkmark__root--variant_square-tone_brand seed-checkmark__root--size_medium"
          style={{ position: 'absolute', inset: 0, width: 20, height: 20, margin: 0, appearance: 'none', WebkitAppearance: 'none', cursor: disabled ? 'not-allowed' : 'pointer' }} />
        {checked && (
          <img src={iconCheckFill} alt="" aria-hidden
            style={{ position: 'absolute', inset: 0, margin: 'auto', width: 12, height: 12, pointerEvents: 'none', filter: 'brightness(0) invert(1)' }} />
        )}
      </span>
      <span className="seed-checkbox__label seed-checkbox__label--size_medium" style={{ fontSize: 14, color: disabled ? 'var(--seed-color-fg-disabled)' : undefined }}>{label}</span>
    </label>
  )
}

function ChipGroupDemo() {
  const [selected, setSelected] = useState('a')
  const options = [
    { key: 'a', variant: 'solid', label: '선택됨' },
    { key: 'b', variant: 'outlineStrong', label: '옵션 B' },
    { key: 'c', variant: 'outlineWeak', label: '옵션 C' },
  ]
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
      {options.map(o => {
        const checked = selected === o.key
        return (
          <label key={o.key} data-checked={checked ? 'true' : undefined}
            className={`seed-chip__root seed-chip__root--variant_${o.variant} seed-chip__root--size_small`}>
            <input type="radio" name="chip-demo" checked={checked} onChange={() => setSelected(o.key)} style={{ display: 'none' }} />
            <span data-checked={checked ? 'true' : undefined} className={`seed-chip__label seed-chip__label--variant_${o.variant}`}>{o.label}</span>
          </label>
        )
      })}
    </div>
  )
}

function SegmentedControlDemo() {
  const [idx, setIdx] = useState(0)
  const items = ['전체', '판매중', '거래완료']
  return (
    <div className="seed-segmented-control__root" style={{ '--segment-count': 3, width: '100%' }}>
      <div className="seed-segmented-control__indicator" style={{ '--segment-index': idx }} />
      {items.map((label, i) => (
        <button key={i} className="seed-segmented-control__item"
          data-checked={i === idx ? 'true' : undefined}
          onClick={() => setIdx(i)}>
          {label}
        </button>
      ))}
    </div>
  )
}

function AccordionDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="seed-accordion__root" style={{ width: '100%' }}>
      <div className="seed-accordion__item seed-accordion__item--variant_inline">
        <div className="seed-accordion__header">
          <button className="seed-accordion__trigger" onClick={() => setOpen(v => !v)}
            style={{ paddingBlock: 14 }} data-open={open ? '' : undefined}>
            <div className="seed-accordion__body">
              <span className="seed-accordion__title" style={{ fontSize: 14 }}>자주 묻는 질문</span>
            </div>
            <span className="seed-accordion__suffixIcon" data-open={open ? '' : undefined}>
              <Ic src={iconChevronDown} size={18} />
            </span>
          </button>
        </div>
        <div className="seed-accordion__content" data-open={open ? '' : undefined}
          style={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0, overflow: 'hidden', transition: 'all 0.25s', padding: open ? '8px 16px 14px' : '0 16px' }}>
          <span style={{ fontSize: 13, color: 'var(--seed-color-fg-neutral-subtle)' }}>여기에 답변 내용이 들어옵니다.</span>
        </div>
      </div>
    </div>
  )
}

function RadioDemo() {
  const [val, setVal] = useState('a')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
      {[{ v: 'a', l: '옵션 A' }, { v: 'b', l: '옵션 B' }, { v: 'c', l: '옵션 C (비활성)', d: true }].map(o => (
        <label key={o.v} className="seed-radio__root seed-radio__root--size_medium"
          style={{ cursor: o.d ? 'not-allowed' : 'pointer', opacity: o.d ? .5 : 1 }}>
          <span style={{ position: 'relative', display: 'inline-block', width: 20, height: 20, flexShrink: 0 }}>
            <input type="radio" name="radio-demo" value={o.v} checked={val === o.v} disabled={o.d}
              onChange={() => setVal(o.v)}
              className="seed-radiomark__root seed-radiomark__root--tone_brand seed-radiomark__root--size_medium"
              style={{ position: 'absolute', inset: 0, width: 20, height: 20, margin: 0, appearance: 'none', WebkitAppearance: 'none' }} />
            {val === o.v && !o.d && (
              <span style={{ position: 'absolute', inset: 0, margin: 'auto', width: 8, height: 8, background: 'var(--seed-color-bg-brand-solid)', borderRadius: '50%', pointerEvents: 'none' }} />
            )}
          </span>
          <span className="seed-radio__label seed-radio__label--size_medium" style={{ fontSize: 14 }}>{o.l}</span>
        </label>
      ))}
    </div>
  )
}

function QuantityPickerDemo() {
  const [count, setCount] = useState(1)
  return (
    <div className="seed-quantity-picker__root seed-quantity-picker__root--size_medium" style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--seed-color-stroke-neutral)', borderRadius: 8 }}>
      <button className="seed-quantity-picker__decrementButton seed-quantity-picker__decrementButton--size_medium"
        onClick={() => setCount(v => Math.max(0, v - 1))}
        style={{ width: 40, height: 40, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 18, color: 'var(--seed-color-fg-neutral)' }}>−</button>
      <span className="seed-quantity-picker__valueDisplay seed-quantity-picker__valueDisplay--size_medium"
        style={{ width: 36, textAlign: 'center', fontSize: 15, fontWeight: 700 }}>{count}</span>
      <button className="seed-quantity-picker__incrementButton seed-quantity-picker__incrementButton--size_medium"
        onClick={() => setCount(v => v + 1)}
        style={{ width: 40, height: 40, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 18, color: 'var(--seed-color-fg-neutral)' }}>+</button>
    </div>
  )
}

/* ── 갤러리 ────────────────────────────────────────────────── */

const COMPONENTS = [
  /* 1. Action Button */
  {
    name: "Action Button",
    slug: "ui:action-button",
    demo: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
            <button className="seed-action-button seed-action-button--variant_brandSolid seed-action-button--size_medium-layout_withText">Brand Solid</button>
            <button className="seed-action-button seed-action-button--variant_neutralOutline seed-action-button--size_medium-layout_withText">Neutral Outline</button>
            <button className="seed-action-button seed-action-button--variant_ghost seed-action-button--size_medium-layout_withText">Ghost</button>
            <button className="seed-action-button seed-action-button--variant_brandSolid seed-action-button--size_small-layout_withText" disabled>Disabled</button>
          </div>
    ),
  },
  /* 2. Toggle Button */
  {
    name: "Toggle Button",
    slug: "ui:toggle-button",
    demo: (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            <button className="seed-toggle-button seed-toggle-button--variant_brandSolid seed-toggle-button--size_small"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <Ic src={iconHeartFill} size={16} /> 좋아요
            </button>
            <button className="seed-toggle-button seed-toggle-button--variant_neutralWeak seed-toggle-button--size_small"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <Ic src={iconIosShare} size={16} /> 공유
            </button>
            <button className="seed-toggle-button seed-toggle-button--variant_brandSolid seed-toggle-button--size_small" aria-pressed="true"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              눌림
            </button>
            <button className="seed-toggle-button seed-toggle-button--variant_brandSolid seed-toggle-button--size_small" disabled>비활성</button>
          </div>
    ),
  },
  /* 3. Floating Action Button */
  {
    name: "Floating Action Button",
    slug: "ui:floating-action-button",
    demo: (
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <button className="seed-fab" title="FAB 원형">
              <Ic src={iconAdd} size={22} />
            </button>
            <button className="seed-extended-fab seed-extended-fab--size_medium"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '0 20px', height: 48, background: 'var(--seed-color-bg-brand-solid)', color: '#fff', border: 'none', borderRadius: 999, fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
              <Ic src={iconAdd} size={18} /> 글쓰기
            </button>
          </div>
    ),
  },
  /* 4. Contextual Floating Button */
  {
    name: "Contextual Floating Button",
    slug: "ui:contextual-floating-button",
    demo: (
      <button className="seed-contextual-floating-button seed-contextual-floating-button--variant_brand seed-contextual-floating-button--size_medium"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '0 18px', height: 44, background: 'var(--seed-color-bg-brand-solid)', color: '#fff', border: 'none', borderRadius: 999, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
            <Ic src={iconAdd} size={16} /> 새 글
          </button>
    ),
  },
  /* 5. Reaction Button */
  {
    name: "Reaction Button",
    slug: "ui:reaction-button",
    demo: (
      <div style={{ display: 'flex', gap: 8 }}>
            <button className="seed-reaction-button seed-reaction-button--variant_outline seed-reaction-button--size_medium"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '0 14px', height: 36, background: 'transparent', border: '1.5px solid var(--seed-color-stroke-neutral)', borderRadius: 999, cursor: 'pointer', fontSize: 14, color: 'var(--seed-color-fg-neutral)' }}>
              <Ic src={iconHeartFill} size={16} /> 42
            </button>
            <button className="seed-reaction-button seed-reaction-button--variant_brandSolid seed-reaction-button--size_medium"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '0 14px', height: 36, background: 'var(--seed-color-bg-brand-solid)', border: 'none', borderRadius: 999, cursor: 'pointer', fontSize: 14, color: '#fff', fontWeight: 700 }}>
              <Ic src={iconHeartFill} size={16} /> 눌림
            </button>
          </div>
    ),
  },
  /* 6. Input Button */
  {
    name: "Input Button",
    slug: "ui:input-button",
    demo: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button className="seed-input-button seed-input-button--size_medium seed-input-button--variant_outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '0 14px', height: 40, border: '1.5px solid var(--seed-color-stroke-field)', borderRadius: 8, background: 'transparent', cursor: 'pointer', fontSize: 14, color: 'var(--seed-color-fg-neutral)' }}>
              지역 선택
            </button>
          </div>
    ),
  },
  /* 7. Switch */
  {
    name: "Switch",
    slug: "ui:switch",
    demo: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start', paddingLeft: 8 }}>
            <SwitchDemo label="ON" initial />
            <SwitchDemo label="OFF" />
            <SwitchDemo label="Disabled" disabled />
          </div>
    ),
  },
  /* 8. Checkbox */
  {
    name: "Checkbox",
    slug: "ui:checkbox",
    demo: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start', paddingLeft: 8 }}>
            <CheckboxDemo label="선택됨" initial />
            <CheckboxDemo label="미선택" />
            <CheckboxDemo label="비활성" disabled />
          </div>
    ),
  },
  /* 9. Radio */
  {
    name: "Radio",
    slug: "ui:radio",
    demo: (
      <RadioDemo />
    ),
  },
  /* 10. Chip */
  {
    name: "Chip",
    slug: "ui:chip",
    demo: (
      <ChipGroupDemo />
    ),
  },
  /* 11. Action Chip */
  {
    name: "Action Chip",
    slug: "ui:action-chip",
    demo: (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="seed-action-chip seed-action-chip--size_medium-layout_withText"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '0 14px', height: 36, border: '1.5px solid var(--seed-color-stroke-neutral)', borderRadius: 999, background: 'transparent', cursor: 'pointer', fontSize: 14, color: 'var(--seed-color-fg-neutral)', fontWeight: 600 }}>
              <Ic src={iconAdd} size={15} /> 필터
            </button>
            <button className="seed-action-chip seed-action-chip--size_small-layout_withText"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '0 10px', height: 28, border: '1.5px solid var(--seed-color-stroke-neutral)', borderRadius: 999, background: 'transparent', cursor: 'pointer', fontSize: 12, color: 'var(--seed-color-fg-neutral)', fontWeight: 600 }}>
              Small
            </button>
          </div>
    ),
  },
  /* 12. Control Chip */
  {
    name: "Control Chip",
    slug: "ui:control-chip",
    demo: (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['전체', '의류', '전자기기'].map((l, i) => (
              <button key={l} className="seed-control-chip seed-control-chip--size_medium-layout_withText"
                style={{ display: 'inline-flex', alignItems: 'center', padding: '0 14px', height: 36, border: `1.5px solid ${i === 0 ? 'var(--seed-color-stroke-brand)' : 'var(--seed-color-stroke-neutral)'}`, borderRadius: 999, background: i === 0 ? 'var(--seed-color-bg-brand-weak)' : 'transparent', cursor: 'pointer', fontSize: 14, color: i === 0 ? 'var(--seed-color-fg-brand)' : 'var(--seed-color-fg-neutral)', fontWeight: 600 }}>
                {l}
              </button>
            ))}
          </div>
    ),
  },
  /* 13. Segmented Control */
  {
    name: "Segmented Control",
    slug: "ui:segmented-control",
    demo: (
      <SegmentedControlDemo />
    ),
  },
  /* 14. Text Input */
  {
    name: "Text Input",
    slug: "ui:text-input",
    demo: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
            <div className="seed-text-input__root seed-text-input__root--variant_outline"
              style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--seed-color-stroke-field)', borderRadius: 8, padding: '0 12px', height: 44, gap: 8 }}>
              <input className="seed-text-input__input" placeholder="기본 입력" style={{ border: 'none', outline: 'none', flex: 1, fontSize: 14, background: 'transparent', color: 'var(--seed-color-fg-neutral)' }} />
            </div>
            <div className="seed-text-input__root seed-text-input__root--variant_outline" data-invalid=""
              style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--seed-color-stroke-critical)', borderRadius: 8, padding: '0 12px', height: 44, gap: 8 }}>
              <input className="seed-text-input__input" placeholder="오류 상태" defaultValue="잘못된 값" style={{ border: 'none', outline: 'none', flex: 1, fontSize: 14, background: 'transparent', color: 'var(--seed-color-fg-neutral)' }} />
            </div>
          </div>
    ),
  },
  /* 15. Quantity Picker */
  {
    name: "Quantity Picker",
    slug: "ui:quantity-picker",
    demo: (
      <QuantityPickerDemo />
    ),
  },
  /* 16. Slider */
  {
    name: "Slider",
    slug: "ui:slider",
    demo: (
      <div style={{ width: '100%', padding: '0 8px' }}>
            <div className="seed-slider__root"
              style={{ position: 'relative', height: 4, background: 'var(--seed-color-bg-neutral-weak)', borderRadius: 2, margin: '16px 0' }}>
              <div style={{ position: 'absolute', left: 0, width: '60%', height: '100%', background: 'var(--seed-color-bg-brand-solid)', borderRadius: 2 }} />
              <div className="seed-slider__thumb"
                style={{ position: 'absolute', left: '60%', top: '50%', transform: 'translate(-50%,-50%)', width: 20, height: 20, background: '#fff', border: '2px solid var(--seed-color-bg-brand-solid)', borderRadius: '50%', boxShadow: '0 1px 4px rgba(0,0,0,.15)' }} />
            </div>
          </div>
    ),
  },
  /* 17. Select */
  {
    name: "Select",
    slug: "ui:select",
    demo: (
      <div style={{ position: 'relative', width: '100%' }}>
            <div className="seed-select-trigger seed-select-trigger--size_medium"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1.5px solid var(--seed-color-stroke-field)', borderRadius: 8, padding: '0 12px', height: 44, cursor: 'pointer', fontSize: 14, color: 'var(--seed-color-fg-neutral)', background: 'var(--seed-color-bg-layer-default)' }}>
              <span>옵션 선택</span>
              <Ic src={iconChevronDown} size={18} />
            </div>
          </div>
    ),
  },
  /* 18. Select Box */
  {
    name: "Select Box",
    slug: "ui:select-box",
    demo: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
            {['기본 옵션', '선택된 옵션', '비활성 옵션'].map((l, i) => (
              <div key={l} className="seed-select-box"
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', border: `1.5px solid ${i === 1 ? 'var(--seed-color-stroke-brand)' : 'var(--seed-color-stroke-neutral)'}`, borderRadius: 8, background: i === 1 ? 'var(--seed-color-bg-brand-weak)' : 'transparent', cursor: 'pointer', opacity: i === 2 ? 0.5 : 1 }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${i === 1 ? 'var(--seed-color-bg-brand-solid)' : 'var(--seed-color-stroke-neutral)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {i === 1 && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--seed-color-bg-brand-solid)' }} />}
                </div>
                <span style={{ fontSize: 14, color: 'var(--seed-color-fg-neutral)', fontWeight: i === 1 ? 600 : 400 }}>{l}</span>
              </div>
            ))}
          </div>
    ),
  },
  /* 19. Attachment Input */
  {
    name: "Attachment Input",
    slug: "ui:attachment-input",
    demo: (
      <div className="seed-attachment-input"
            style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div className="seed-attachment-input-trigger"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 6, width: 80, height: 80, border: '1.5px dashed var(--seed-color-stroke-neutral)', borderRadius: 12, cursor: 'pointer', color: 'var(--seed-color-fg-neutral-subtle)' }}>
              <Ic src={iconAdd} size={22} />
              <span style={{ fontSize: 11 }}>사진 추가</span>
            </div>
          </div>
    ),
  },
  /* 20. Field / Field Label */
  {
    name: "Field / Field Label",
    slug: "ui:field",
    demo: (
      <div className="seed-field" style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
            <label className="seed-field-label seed-field-label--size_medium"
              style={{ fontSize: 13, fontWeight: 600, color: 'var(--seed-color-fg-neutral)' }}>
              라벨 <span style={{ color: 'var(--seed-color-fg-critical)' }}>*</span>
            </label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--seed-color-stroke-field)', borderRadius: 8, padding: '0 12px', height: 44 }}>
              <input placeholder="입력하세요" style={{ border: 'none', outline: 'none', flex: 1, fontSize: 14, background: 'transparent' }} />
            </div>
            <span style={{ fontSize: 12, color: 'var(--seed-color-fg-neutral-subtle)' }}>도움말 텍스트</span>
          </div>
    ),
  },
  /* 21. Tabs */
  {
    name: "Tabs",
    slug: "ui:tabs",
    demo: (
      <div style={{ width: '100%' }}>
            <div className="seed-tabs__list" style={{ display: 'flex', borderBottom: '1px solid var(--seed-color-stroke-neutral)', position: 'relative' }}>
              {['홈', '중고거래', '동네생활'].map((t, i) => (
                <button key={t} className={`seed-tabs__trigger seed-tabs__trigger--size_medium`}
                  aria-selected={i === 0 ? 'true' : 'false'}
                  data-selected={i === 0 ? '' : undefined}
                  style={{ flex: 1, padding: '12px 8px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 14, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? 'var(--seed-color-fg-neutral)' : 'var(--seed-color-fg-neutral-subtle)', borderBottom: i === 0 ? '2px solid var(--seed-color-fg-neutral)' : '2px solid transparent' }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
    ),
  },
  /* 22. Chip Tabs */
  {
    name: "Chip Tabs",
    slug: "ui:chip-tabs",
    demo: (
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 }}>
            {['전체', '전자기기', '의류', '가구', '도서'].map((t, i) => (
              <button key={t} className="seed-chip-tabs__trigger"
                data-selected={i === 0 ? '' : undefined}
                style={{ flexShrink: 0, padding: '6px 16px', border: `1.5px solid ${i === 0 ? 'var(--seed-color-stroke-brand)' : 'var(--seed-color-stroke-neutral)'}`, borderRadius: 999, background: i === 0 ? 'var(--seed-color-bg-brand-weak)' : 'transparent', cursor: 'pointer', fontSize: 13, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? 'var(--seed-color-fg-brand)' : 'var(--seed-color-fg-neutral)' }}>
                {t}
              </button>
            ))}
          </div>
    ),
  },
  /* 23. App Bar */
  {
    name: "App Bar",
    slug: "ui:app-bar",
    demo: (
      <div className="seed-app-bar__root"
            style={{ display: 'flex', alignItems: 'center', width: '100%', height: 56, padding: '0 16px', gap: 8, background: 'var(--seed-color-bg-layer-default)', borderBottom: '1px solid var(--seed-color-stroke-neutral)' }}>
            <span style={{ fontSize: 17, fontWeight: 700, flex: 1, color: 'var(--seed-color-fg-neutral)' }}>서비스명</span>
            <button style={{ padding: 8, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Ic src={iconIosShare} size={22} />
            </button>
          </div>
    ),
  },
  /* 24. Side Navigation */
  {
    name: "Side Navigation",
    slug: "ui:side-navigation",
    demo: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
            {[{ l: '홈', active: true }, { l: '거래내역' }, { l: '설정' }].map(item => (
              <div key={item.l} className={`seed-side-navigation-menu-item__root`}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, background: item.active ? 'var(--seed-color-bg-neutral-weak)' : 'transparent', cursor: 'pointer', fontSize: 14, fontWeight: item.active ? 700 : 500, color: item.active ? 'var(--seed-color-fg-neutral)' : 'var(--seed-color-fg-neutral-subtle)' }}>
                {item.l}
              </div>
            ))}
          </div>
    ),
  },
  /* 25. Footer */
  {
    name: "Footer",
    slug: "ui:footer",
    demo: (
      <div className="seed-footer__root"
            style={{ width: '100%', padding: '14px 16px', borderTop: '1px solid var(--seed-color-stroke-neutral)', background: 'var(--seed-color-bg-layer-default)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--seed-color-fg-neutral-subtle)' }}>© 2025 서비스</span>
            <div style={{ display: 'flex', gap: 12 }}>
              {['이용약관', '개인정보'].map(l => (
                <span key={l} style={{ fontSize: 12, color: 'var(--seed-color-fg-neutral-subtle)', cursor: 'pointer', textDecoration: 'underline' }}>{l}</span>
              ))}
            </div>
          </div>
    ),
  },
  /* 26. Dialog */
  {
    name: "Dialog",
    slug: "ui:dialog",
    demo: (
      <div className="seed-dialog__root"
            style={{ border: '1px solid var(--seed-color-stroke-neutral)', borderRadius: 16, padding: 20, background: 'var(--seed-color-bg-layer-default)', width: '100%', boxShadow: '0 4px 20px rgba(0,0,0,.08)' }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: 'var(--seed-color-fg-neutral)' }}>정말 삭제할까요?</div>
            <div style={{ fontSize: 14, color: 'var(--seed-color-fg-neutral-subtle)', marginBottom: 16 }}>삭제한 게시글은 복구할 수 없습니다.</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="seed-action-button seed-action-button--variant_neutralOutline seed-action-button--size_medium-layout_withText" style={{ flex: 1 }}>취소</button>
              <button className="seed-action-button seed-action-button--variant_brandSolid seed-action-button--size_medium-layout_withText" style={{ flex: 1 }}>삭제</button>
            </div>
          </div>
    ),
  },
  /* 27. Bottom Sheet */
  {
    name: "Bottom Sheet",
    slug: "ui:bottom-sheet",
    demo: (
      <div className="seed-bottom-sheet__root"
            style={{ border: '1px solid var(--seed-color-stroke-neutral)', borderRadius: '16px 16px 0 0', padding: '12px 20px 20px', background: 'var(--seed-color-bg-layer-default)', width: '100%' }}>
            <div className="seed-bottom-sheet-handle__root"
              style={{ width: 36, height: 4, background: 'var(--seed-color-bg-neutral-muted)', borderRadius: 2, margin: '0 auto 16px' }} />
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12, color: 'var(--seed-color-fg-neutral)' }}>옵션 선택</div>
            {['수정하기', '공유하기', '신고하기'].map(l => (
              <div key={l} style={{ padding: '13px 0', borderBottom: '1px solid var(--seed-color-stroke-neutral)', fontSize: 15, color: 'var(--seed-color-fg-neutral)', cursor: 'pointer' }}>{l}</div>
            ))}
          </div>
    ),
  },
  /* 28. Action Sheet */
  {
    name: "Action Sheet",
    slug: "ui:action-sheet",
    demo: (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
            {['사진 찍기', '앨범에서 선택', '취소'].map((l, i) => (
              <div key={l} className="seed-action-sheet-item__root"
                style={{ padding: '14px 16px', background: i === 2 ? 'var(--seed-color-bg-neutral-weak)' : 'var(--seed-color-bg-layer-default)', borderRadius: i === 0 ? '12px 12px 0 0' : i === 1 ? '0 0 12px 12px' : 12, border: '1px solid var(--seed-color-stroke-neutral)', fontSize: 15, fontWeight: i === 2 ? 700 : 500, color: i === 2 ? 'var(--seed-color-fg-brand)' : 'var(--seed-color-fg-neutral)', cursor: 'pointer', textAlign: 'center', marginTop: i === 2 ? 8 : 0 }}>
                {l}
              </div>
            ))}
          </div>
    ),
  },
  /* 29. Menu */
  {
    name: "Menu",
    slug: "ui:menu",
    demo: (
      <div className="seed-menu__root"
            style={{ border: '1px solid var(--seed-color-stroke-neutral)', borderRadius: 12, overflow: 'hidden', background: 'var(--seed-color-bg-layer-default)', boxShadow: '0 4px 16px rgba(0,0,0,.08)', width: '100%' }}>
            {['수정', '공유', '삭제'].map((l, i) => (
              <div key={l} className="seed-menu-item__root"
                style={{ padding: '12px 16px', fontSize: 14, color: i === 2 ? 'var(--seed-color-fg-critical)' : 'var(--seed-color-fg-neutral)', cursor: 'pointer', borderBottom: i < 2 ? '1px solid var(--seed-color-stroke-neutral)' : 'none' }}>
                {l}
              </div>
            ))}
          </div>
    ),
  },
  /* 30. Snackbar */
  {
    name: "Snackbar",
    slug: "ui:snackbar",
    demo: (
      <div className="seed-snackbar__root" data-open=""
            style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', background: 'var(--seed-color-bg-neutral-inverted)', borderRadius: 12, gap: 10, width: '100%', animation: 'none' }}>
            <span className="seed-snackbar__message" style={{ flex: 1, fontSize: 14, color: 'var(--seed-color-fg-neutral-inverted)' }}>게시글을 삭제했습니다.</span>
            <button className="seed-snackbar__actionButton" style={{ border: 'none', background: 'transparent', color: 'var(--seed-color-fg-brand)', fontWeight: 700, fontSize: 14, cursor: 'pointer', flexShrink: 0 }}>실행 취소</button>
          </div>
    ),
  },
  /* 31. Help Bubble */
  {
    name: "Help Bubble",
    slug: "ui:help-bubble",
    demo: (
      <div style={{ position: 'relative', display: 'inline-block', marginTop: 8 }}>
            <div className="seed-help-bubble__root"
              style={{ position: 'absolute', bottom: '110%', left: '50%', transform: 'translateX(-50%)', background: 'var(--seed-color-bg-neutral-inverted)', color: 'var(--seed-color-fg-neutral-inverted)', padding: '8px 12px', borderRadius: 8, fontSize: 13, whiteSpace: 'nowrap', boxShadow: '0 2px 12px rgba(0,0,0,.12)' }}>
              툴팁 내용입니다.
              <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid var(--seed-color-bg-neutral-inverted)' }} />
            </div>
            <button className="seed-action-button seed-action-button--variant_neutralOutline seed-action-button--size_small-layout_withText">도움말</button>
          </div>
    ),
  },
  /* 32. Side Panel */
  {
    name: "Side Panel",
    slug: "ui:side-panel",
    demo: (
      <div style={{ display: 'flex', width: '100%', gap: 0, height: 120, border: '1px solid var(--seed-color-stroke-neutral)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ flex: 1, background: 'var(--seed-color-bg-layer-default)', padding: 12, fontSize: 13 }}>메인 콘텐츠</div>
            <div className="seed-side-panel__root" style={{ width: 100, background: 'var(--seed-color-bg-neutral-weak)', borderLeft: '1px solid var(--seed-color-stroke-neutral)', padding: 12, fontSize: 12, color: 'var(--seed-color-fg-neutral-subtle)' }}>사이드 패널</div>
          </div>
    ),
  },
  /* 33. Content Dialog */
  {
    name: "Content Dialog",
    slug: "ui:content-dialog",
    demo: (
      <div className="seed-content-dialog__root"
            style={{ border: '1px solid var(--seed-color-stroke-neutral)', borderRadius: 16, overflow: 'hidden', width: '100%', background: 'var(--seed-color-bg-layer-default)' }}>
            <div style={{ aspectRatio: '16/9', background: 'var(--seed-color-bg-neutral-weak)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'var(--seed-color-fg-neutral-subtle)' }}>이미지 영역</div>
            <div style={{ padding: '14px 16px' }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>다이얼로그 제목</div>
              <div style={{ fontSize: 13, color: 'var(--seed-color-fg-neutral-subtle)' }}>콘텐츠 설명이 들어갑니다.</div>
            </div>
          </div>
    ),
  },
  /* 34. Callout */
  {
    name: "Callout",
    slug: "ui:callout",
    demo: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
            {[
              { tone: 'informative', label: '안내', color: 'var(--seed-color-bg-informative-weak)' },
              { tone: 'positive', label: '성공', color: 'var(--seed-color-bg-positive-weak)' },
              { tone: 'critical', label: '오류', color: 'var(--seed-color-bg-critical-weak)' },
            ].map(c => (
              <div key={c.tone} className={`seed-callout__root seed-callout__root--tone_${c.tone}`}
                style={{ padding: '10px 14px', borderRadius: 10, background: c.color, fontSize: 13 }}>
                <span className={`seed-callout__title seed-callout__title--tone_${c.tone}`}
                  style={{ fontWeight: 700 }}>{c.label}:</span>{' '}
                <span className={`seed-callout__description seed-callout__description--tone_${c.tone}`}
                  style={{ color: 'var(--seed-color-fg-neutral)' }}>내용이 들어갑니다.</span>
              </div>
            ))}
          </div>
    ),
  },
  /* 35. Inline Banner */
  {
    name: "Inline Banner",
    slug: "ui:inline-banner",
    demo: (
      <div className="seed-inline-banner__root seed-inline-banner__root--variant_neutralWeak"
            style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px', borderRadius: 10, background: 'var(--seed-color-bg-neutral-weak)', width: '100%' }}>
            <div className="seed-inline-banner__content" style={{ flex: 1 }}>
              <span className="seed-inline-banner__title" style={{ fontWeight: 700, fontSize: 13 }}>안내 배너 제목</span>
              <span className="seed-inline-banner__description" style={{ fontSize: 13, color: 'var(--seed-color-fg-neutral-subtle)' }}>배너 설명이 여기에 들어갑니다.</span>
            </div>
          </div>
    ),
  },
  /* 36. Page Banner */
  {
    name: "Page Banner",
    slug: "ui:page-banner",
    demo: (
      <div className="seed-page-banner__root"
            style={{ width: '100%', padding: '14px 16px', background: 'var(--seed-color-bg-brand-weak)', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--seed-color-fg-brand)', marginBottom: 3 }}>배너 제목</div>
              <div style={{ fontSize: 12, color: 'var(--seed-color-fg-neutral-subtle)' }}>설명 텍스트</div>
            </div>
            <button className="seed-action-button seed-action-button--variant_brandSolid seed-action-button--size_small-layout_withText">시작</button>
          </div>
    ),
  },
  /* 37. Badge */
  {
    name: "Badge",
    slug: "ui:badge",
    demo: (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {[
              { tone: 'brand', variant: 'solid', label: '브랜드' },
              { tone: 'neutral', variant: 'weak', label: '기본' },
              { tone: 'positive', variant: 'weak', label: '성공' },
              { tone: 'critical', variant: 'solid', label: '오류' },
              { tone: 'informative', variant: 'outline', label: '정보' },
            ].map(b => (
              <span key={b.label} className={`seed-badge__root seed-badge__root--size_medium seed-badge__root--tone_${b.tone}-variant_${b.variant}`}
                style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 999, fontSize: 12, fontWeight: 700, background: b.variant === 'solid' ? 'var(--seed-color-bg-' + (b.tone === 'brand' ? 'brand' : b.tone) + '-solid)' : b.variant === 'weak' ? 'var(--seed-color-bg-' + b.tone + '-weak)' : 'transparent', border: b.variant === 'outline' ? '1.5px solid var(--seed-color-stroke-' + b.tone + ')' : 'none', color: b.variant === 'solid' ? '#fff' : 'var(--seed-color-fg-' + b.tone + ')' }}>
                {b.label}
              </span>
            ))}
          </div>
    ),
  },
  /* 38. Notification Badge */
  {
    name: "Notification Badge",
    slug: "ui:notification-badge",
    demo: (
      <div style={{ position: 'relative', display: 'inline-block', padding: 16 }}>
            <button style={{ width: 44, height: 44, border: '1.5px solid var(--seed-color-stroke-neutral)', borderRadius: 12, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ic src={iconIosShare} size={22} />
            </button>
            <span className="seed-notification-badge__root"
              style={{ position: 'absolute', top: 10, right: 10, minWidth: 18, height: 18, background: 'var(--seed-color-bg-critical-solid)', borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', padding: '0 5px', border: '2px solid var(--seed-color-bg-layer-default)' }}>3</span>
          </div>
    ),
  },
  /* 39. Progress Circle */
  {
    name: "Progress Circle",
    slug: "ui:progress-circle",
    demo: (
      <div style={{ display: 'flex', gap: 16 }}>
            {[{ tone: 'brand', val: 65 }, { tone: 'neutral', val: 30 }].map(p => (
              <svg key={p.tone} className={`seed-progress-circle__root seed-progress-circle__root--tone_${p.tone} seed-progress-circle__root--size_40`}
                width={40} height={40} viewBox="0 0 40 40">
                <circle className="seed-progress-circle__track" cx={20} cy={20} r={16} fill="none" strokeWidth={5}
                  stroke={p.tone === 'brand' ? 'var(--seed-color-palette-carrot-200)' : 'var(--seed-color-palette-gray-200)'} />
                <circle className="seed-progress-circle__range" cx={20} cy={20} r={16} fill="none" strokeWidth={5} strokeLinecap="round"
                  stroke={p.tone === 'brand' ? 'var(--seed-color-bg-brand-solid)' : 'var(--seed-color-palette-gray-500)'}
                  strokeDasharray={`${p.val} ${100 - p.val}`} strokeDashoffset={25}
                  transform="rotate(-90 20 20)" />
              </svg>
            ))}
          </div>
    ),
  },
  /* 40. Pull to Refresh */
  {
    name: "Pull to Refresh",
    slug: "ui:pull-to-refresh",
    demo: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12 }}>
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" className="seed-pull-to-refresh__indicator"
              style={{ animation: 'spin 1s linear infinite' }}>
              <circle cx={12} cy={12} r={9} stroke="var(--seed-color-bg-brand-solid)" strokeWidth={2.5} strokeLinecap="round" strokeDasharray="40 20" />
            </svg>
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>
    ),
  },
  /* 41. Scroll Fog */
  {
    name: "Scroll Fog",
    slug: "ui:scroll-fog",
    demo: (
      <div className="seed-scroll-fog" style={{ position: 'relative', width: '100%', height: 80, overflow: 'hidden' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 4px' }}>
              {[1, 2, 3, 4].map(i => <div key={i} style={{ height: 16, background: 'var(--seed-color-bg-neutral-weak)', borderRadius: 4 }} />)}
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 40, background: 'linear-gradient(to bottom, transparent, var(--seed-color-bg-layer-default))' }} />
          </div>
    ),
  },
  /* 42. Avatar */
  {
    name: "Avatar",
    slug: "ui:avatar",
    demo: (
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {[48, 36, 28].map(s => (
              <div key={s} className="seed-avatar__root"
                style={{ width: s, height: s, borderRadius: '50%', background: 'var(--seed-color-bg-brand-weak)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: s * 0.4, fontWeight: 700, color: 'var(--seed-color-fg-brand)', flexShrink: 0 }}>
                김
              </div>
            ))}
          </div>
    ),
  },
  /* 43. Avatar Stack */
  {
    name: "Avatar Stack",
    slug: "ui:avatar-stack",
    demo: (
      <div className="seed-avatar-stack__root" style={{ display: 'flex' }}>
            {['#FF7E3C', '#3CAF77', '#3C78FF', '#9B3CFF'].map((c, i) => (
              <div key={i}
                style={{ width: 36, height: 36, borderRadius: '50%', background: c, border: '2px solid var(--seed-color-bg-layer-default)', marginLeft: i === 0 ? 0 : -10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0, zIndex: 4 - i }}>
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
    ),
  },
  /* 44. Image Frame */
  {
    name: "Image Frame",
    slug: "ui:image-frame",
    demo: (
      <div className="seed-image-frame__root seed-image-frame__root--radius_8"
            style={{ position: 'relative', width: 120, height: 120, borderRadius: 12, overflow: 'hidden', background: 'var(--seed-color-bg-neutral-weak)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'var(--seed-color-fg-neutral-subtle)' }}>
            이미지
          </div>
    ),
  },
  /* 45. Skeleton */
  {
    name: "Skeleton",
    slug: "ui:skeleton",
    demo: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 220 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="seed-skeleton seed-skeleton--radius_full seed-skeleton--tone_neutral"
                style={{ '--seed-box-width-base': '42px', '--seed-box-height-base': '42px', flexShrink: 0 }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
                <span className="seed-skeleton seed-skeleton--radius_8 seed-skeleton--tone_neutral"
                  style={{ '--seed-box-width-base': '100%', '--seed-box-height-base': '13px' }} />
                <span className="seed-skeleton seed-skeleton--radius_8 seed-skeleton--tone_neutral"
                  style={{ '--seed-box-width-base': '60%', '--seed-box-height-base': '11px' }} />
              </div>
            </div>
            <span className="seed-skeleton seed-skeleton--radius_8 seed-skeleton--tone_neutral"
              style={{ '--seed-box-width-base': '100%', '--seed-box-height-base': '80px' }} />
          </div>
    ),
  },
  /* 46. List Item */
  {
    name: "List Item",
    slug: "ui:list-item",
    demo: (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            {['첫 번째 항목', '두 번째 항목', '세 번째 항목'].map((l, i) => (
              <div key={l} className="seed-list-item__root"
                style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: i < 2 ? '1px solid var(--seed-color-stroke-neutral)' : 'none', cursor: 'pointer' }}>
                <div className="seed-list-item__content" style={{ flex: 1 }}>
                  <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--seed-color-fg-neutral)' }}>{l}</span>
                </div>
                <span className="seed-list-item__suffix" style={{ fontSize: 13, color: 'var(--seed-color-fg-neutral-subtle)' }}>›</span>
              </div>
            ))}
          </div>
    ),
  },
  /* 47. List Header */
  {
    name: "List Header",
    slug: "ui:list-header",
    demo: (
      <div style={{ width: '100%' }}>
            <div className="seed-list-header__root"
              style={{ padding: '8px 16px', fontSize: 12, fontWeight: 700, color: 'var(--seed-color-fg-neutral-subtle)', background: 'var(--seed-color-bg-neutral-weak)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              카테고리
            </div>
            <div style={{ padding: '12px 16px', fontSize: 14, borderBottom: '1px solid var(--seed-color-stroke-neutral)' }}>항목 1</div>
            <div style={{ padding: '12px 16px', fontSize: 14 }}>항목 2</div>
          </div>
    ),
  },
  /* 48. Accordion */
  {
    name: "Accordion",
    slug: "ui:accordion",
    demo: (
      <AccordionDemo />
    ),
  },
  /* 49. Tag Group */
  {
    name: "Tag Group",
    slug: "ui:tag-group",
    demo: (
      <div className="seed-tag-group__root" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['React', 'TypeScript', 'CSS', 'Figma'].map(tag => (
              <span key={tag} className="seed-tag-group-item__root"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', border: '1.5px solid var(--seed-color-stroke-neutral)', borderRadius: 999, fontSize: 12, fontWeight: 600, color: 'var(--seed-color-fg-neutral)', cursor: 'pointer' }}>
                {tag}
                <span style={{ fontSize: 14, lineHeight: 1, color: 'var(--seed-color-fg-neutral-subtle)' }}>×</span>
              </span>
            ))}
          </div>
    ),
  },
  /* 50. Text */
  {
    name: "Text",
    slug: "ui:text",
    demo: (
      <div className="seed-text__root" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 'var(--seed-font-size-t9)', fontWeight: 'var(--seed-font-weight-bold)', color: 'var(--seed-color-fg-neutral)' }}>제목 텍스트 (t9)</span>
            <span style={{ fontSize: 'var(--seed-font-size-t5)', fontWeight: 'var(--seed-font-weight-medium)', color: 'var(--seed-color-fg-neutral)' }}>본문 텍스트 (t5)</span>
            <span style={{ fontSize: 'var(--seed-font-size-t3)', fontWeight: 'var(--seed-font-weight-regular)', color: 'var(--seed-color-fg-neutral-subtle)' }}>캡션 텍스트 (t3)</span>
          </div>
    ),
  },
  /* 51. Link Content */
  {
    name: "Link Content",
    slug: "ui:link-content",
    demo: (
      <a className="seed-link-content__root"
            style={{ display: 'flex', gap: 12, padding: 12, border: '1px solid var(--seed-color-stroke-neutral)', borderRadius: 12, textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
            <div style={{ width: 56, height: 56, borderRadius: 8, background: 'var(--seed-color-bg-neutral-weak)', flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--seed-color-fg-neutral)' }}>링크 제목</div>
              <div style={{ fontSize: 12, color: 'var(--seed-color-fg-neutral-subtle)' }}>example.com</div>
            </div>
          </a>
    ),
  },
  /* 52. Article */
  {
    name: "Article",
    slug: "ui:article",
    demo: (
      <div className="seed-article__root"
            style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', padding: '12px 0' }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--seed-color-fg-neutral)' }}>게시글 제목</h3>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--seed-color-fg-neutral-subtle)', lineHeight: 1.6 }}>게시글 내용이 여기에 들어갑니다. 두 줄 이상이면 말줄임으로 처리됩니다.</p>
            <span style={{ fontSize: 12, color: 'var(--seed-color-fg-neutral-subtle)' }}>3분 전 · 판교동</span>
          </div>
    ),
  },
  /* 53. Aspect Ratio */
  {
    name: "Aspect Ratio",
    slug: "ui:aspect-ratio",
    demo: (
      <div className="seed-aspect-ratio__root" style={{ width: '100%', aspectRatio: '16/9', background: 'var(--seed-color-bg-neutral-weak)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--seed-color-fg-neutral-subtle)', fontSize: 12 }}>
            16 : 9
          </div>
    ),
  },
  /* 54. Layout */
  {
    name: "Layout",
    slug: "ui:layout",
    demo: (
      <div className="seed-layout__root" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, width: '100%' }}>
            {['col 1', 'col 2', 'col 3', 'col 4', 'col 5', 'col 6'].map(c => (
              <div key={c} style={{ background: 'var(--seed-color-bg-brand-weak)', borderRadius: 6, padding: '8px 4px', textAlign: 'center', fontSize: 11, fontWeight: 600, color: 'var(--seed-color-fg-brand)' }}>{c}</div>
            ))}
          </div>
    ),
  },
  /* 55. Manner Temp */
  {
    name: "Manner Temp",
    slug: "ui:manner-temp",
    demo: (<div>구현 x</div>),
  },
  /* 56. Identity Placeholder */
  {
    name: "Identity Placeholder",
    slug: "ui:identity-placeholder",
    demo: (
      <div className="seed-identity-placeholder__root"
            style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, var(--seed-color-bg-brand-weak), var(--seed-color-bg-informative-weak))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, color: 'var(--seed-color-fg-brand)' }}>
            🌱
          </div>
    ),
  },
  /* 57. Content Placeholder */
  {
    name: "Content Placeholder",
    slug: "ui:content-placeholder",
    demo: (
      <div className="seed-content-placeholder__root"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '16px 0' }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--seed-color-bg-neutral-weak)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>📭</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--seed-color-fg-neutral)', marginBottom: 4 }}>내용이 없어요</div>
              <div style={{ fontSize: 13, color: 'var(--seed-color-fg-neutral-subtle)' }}>첫 번째 게시글을 작성해보세요.</div>
            </div>
          </div>
    ),
  },
  /* 58. App Screen */
  {
    name: "App Screen",
    slug: "ui:app-screen",
    demo: (
      <div className="seed-app-screen__root"
            style={{ width: '100%', height: 140, border: '1px solid var(--seed-color-stroke-neutral)', borderRadius: 12, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ height: 44, background: 'var(--seed-color-bg-layer-default)', borderBottom: '1px solid var(--seed-color-stroke-neutral)', display: 'flex', alignItems: 'center', padding: '0 16px', fontWeight: 700, fontSize: 14 }}>헤더</div>
            <div style={{ flex: 1, background: 'var(--seed-color-bg-layer-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'var(--seed-color-fg-neutral-subtle)' }}>콘텐츠 영역</div>
          </div>
    ),
  },
  /* 59. Accordion */
  {
    name: "Accordion",
    slug: "ui:accordion",
    demo: (
      <div className="seed-accordion__root" style={{ width: 320 }}>
        <div className="seed-accordion__item">
          <h3 className="seed-accordion__header">
            <button className="seed-accordion__trigger" style={{ height: 56 }}>
              <span className="seed-accordion__title">아코디언 타이틀</span>
              <span className="seed-accordion__prefix" style={{ marginLeft: "auto" }}>
                ▼
              </span>
            </button>
          </h3>
          <div className="seed-accordion__body" style={{ padding: "0 16px 16px" }}>
            아코디언 콘텐츠 내용입니다.
          </div>
        </div>
      </div>
    ),
  },
  /* 60. Action Button */
  {
    name: "Action Button",
    slug: "ui:action-button",
    demo: (
      <button className="seed-action-button seed-action-button--size_medium seed-action-button--variant_brand-solid">
        액션 버튼
      </button>
    ),
  },
  /* 61. Action Sheet */
  {
    name: "Action Sheet",
    slug: "ui:action-sheet",
    demo: (
      <div className="seed-action-sheet__root" style={{ width: 320, padding: 16, backgroundColor: "var(--seed-color-bg-layer-default)", borderRadius: 16 }}>
        <button className="seed-action-sheet-item seed-action-sheet-item--tone_neutral" style={{ width: "100%", padding: "16px", textAlign: "left", borderRadius: 8 }}>
          액션 시트 아이템 1
        </button>
        <button className="seed-action-sheet-item seed-action-sheet-item--tone_critical" style={{ width: "100%", padding: "16px", textAlign: "left", borderRadius: 8, color: "var(--seed-color-fg-critical)" }}>
          액션 시트 아이템 2
        </button>
      </div>
    ),
  },
  /* 62. Alert Dialog */
  {
    name: "Alert Dialog",
    slug: "ui:alert-dialog",
    demo: (
      <div className="seed-dialog" style={{ width: 320, padding: 24, borderRadius: 16, backgroundColor: "var(--seed-color-bg-layer-default)", boxShadow: "var(--seed-elevation-z4)" }}>
        <h2 className="seed-dialog__title" style={{ margin: "0 0 8px 0", fontSize: 18, fontWeight: "bold" }}>다이얼로그 타이틀</h2>
        <p className="seed-dialog__description" style={{ margin: "0 0 24px 0", color: "var(--seed-color-fg-neutral-muted)" }}>다이얼로그 설명글입니다.</p>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button className="seed-action-button seed-action-button--size_medium seed-action-button--variant_neutral-weak">취소</button>
          <button className="seed-action-button seed-action-button--size_medium seed-action-button--variant_brand-solid">확인</button>
        </div>
      </div>
    ),
  },
  /* 63. Bottom Navigation */
  {
    name: "Bottom Navigation",
    slug: "ui:bottom-navigation",
    demo: (
      <div style={{ width: 320, height: 56, display: "flex", backgroundColor: "var(--seed-color-bg-layer-default)", borderTop: "1px solid var(--seed-color-stroke-neutral-weak)" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
          <div style={{ width: 24, height: 24, backgroundColor: "var(--seed-color-fg-brand)", borderRadius: "50%" }}></div>
          <span style={{ fontSize: 10, color: "var(--seed-color-fg-brand)" }}>홈</span>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
          <div style={{ width: 24, height: 24, backgroundColor: "var(--seed-color-fg-neutral-muted)", borderRadius: "50%" }}></div>
          <span style={{ fontSize: 10, color: "var(--seed-color-fg-neutral-muted)" }}>마이</span>
        </div>
      </div>
    ),
  },
  /* 64. Date Picker */
  {
    name: "Date Picker",
    slug: "ui:date-picker",
    demo: (
      <div style={{ width: 320, padding: 16, backgroundColor: "var(--seed-color-bg-layer-default)", borderRadius: 16, boxShadow: "var(--seed-elevation-z3)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <span style={{ fontWeight: "bold" }}>2026년 8월</span>
          <div style={{ display: "flex", gap: 16 }}>
            <span>&lt;</span>
            <span>&gt;</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8, textAlign: "center" }}>
          {["일", "월", "화", "수", "목", "금", "토"].map(d => <div key={d} style={{ fontSize: 12, color: "var(--seed-color-fg-neutral-muted)" }}>{d}</div>)}
          {[...Array(31)].map((_, i) => (
            <div key={i} style={{ width: 32, height: 32, lineHeight: "32px", borderRadius: "50%", backgroundColor: i === 11 ? "var(--seed-color-bg-brand-solid)" : "transparent", color: i === 11 ? "var(--seed-color-fg-inverse)" : "var(--seed-color-fg-neutral)" }}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  /* 65. Divider */
  {
    name: "Divider",
    slug: "ui:divider",
    demo: (
      <div style={{ width: 320, padding: 24, backgroundColor: "var(--seed-color-bg-layer-default)" }}>
        <div>콘텐츠 위쪽</div>
        <hr style={{ margin: "16px 0", border: "none", borderTop: "1px solid var(--seed-color-stroke-neutral-weak)" }} />
        <div>콘텐츠 아래쪽</div>
      </div>
    ),
  },
  /* 66. Error State */
  {
    name: "Error State",
    slug: "ui:error-state",
    demo: (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 320, height: 240, gap: 16, backgroundColor: "var(--seed-color-bg-layer-default)" }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "var(--seed-color-bg-neutral-weak)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>!</div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>오류가 발생했습니다</div>
          <div style={{ color: "var(--seed-color-fg-neutral-muted)", fontSize: 14 }}>잠시 후 다시 시도해주세요.</div>
        </div>
        <button className="seed-action-button seed-action-button--size_small seed-action-button--variant_brand-solid">다시 시도</button>
      </div>
    ),
  },
  /* 67. List */
  {
    name: "List",
    slug: "ui:list",
    demo: (
      <div style={{ width: 320, backgroundColor: "var(--seed-color-bg-layer-default)", borderRadius: 12, overflow: "hidden", border: "1px solid var(--seed-color-stroke-neutral-weak)" }}>
        <div className="seed-list-header">리스트 헤더</div>
        <div className="seed-list-item">
          <div className="seed-list-item__content">리스트 아이템 1</div>
        </div>
        <div className="seed-list-item">
          <div className="seed-list-item__content">리스트 아이템 2</div>
        </div>
      </div>
    ),
  },
  /* 68. Menu Sheet */
  {
    name: "Menu Sheet",
    slug: "ui:menu-sheet",
    demo: (
      <div className="seed-menu-sheet__root" style={{ width: 320, padding: 16, backgroundColor: "var(--seed-color-bg-layer-default)", borderRadius: "16px 16px 0 0" }}>
        <div className="seed-menu-sheet-item" style={{ padding: 16, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 24, height: 24, backgroundColor: "var(--seed-color-bg-neutral-weak)", borderRadius: 4 }}></div>
          <span>메뉴 시트 아이템 1</span>
        </div>
        <div className="seed-menu-sheet-item" style={{ padding: 16, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 24, height: 24, backgroundColor: "var(--seed-color-bg-neutral-weak)", borderRadius: 4 }}></div>
          <span>메뉴 시트 아이템 2</span>
        </div>
      </div>
    ),
  },
  /* 69. Progress Board */
  {
    name: "Progress Board",
    slug: "ui:progress-board",
    demo: (
      <div style={{ width: 320, padding: 24, backgroundColor: "var(--seed-color-bg-layer-default)", borderRadius: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontWeight: "bold" }}>진행 상태</span>
          <span style={{ color: "var(--seed-color-fg-brand)" }}>3/4</span>
        </div>
        <div style={{ height: 8, backgroundColor: "var(--seed-color-bg-neutral-weak)", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ width: "75%", height: "100%", backgroundColor: "var(--seed-color-bg-brand-solid)" }}></div>
        </div>
      </div>
    ),
  },
  /* 70. Result Section */
  {
    name: "Result Section",
    slug: "ui:result-section",
    demo: (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 320, padding: 32, backgroundColor: "var(--seed-color-bg-layer-default)" }}>
        <div style={{ width: 64, height: 64, backgroundColor: "var(--seed-color-bg-brand-solid)", borderRadius: "50%", marginBottom: 16 }}></div>
        <h2 style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8, margin: 0 }}>완료되었습니다</h2>
        <p style={{ color: "var(--seed-color-fg-neutral-muted)", fontSize: 14, textAlign: "center", margin: 0 }}>
          모든 처리가 성공적으로 완료되었습니다.
        </p>
      </div>
    ),
  },
  /* 71. Segmented Control */
  {
    name: "Segmented Control",
    slug: "ui:segmented-control",
    demo: (
      <div className="seed-segmented-control" style={{ width: 320 }}>
        <label className="seed-segmented-control__item">
          <input type="radio" name="seg" className="seed-segmented-control__input" defaultChecked />
          <span className="seed-segmented-control__label">옵션 1</span>
        </label>
        <label className="seed-segmented-control__item">
          <input type="radio" name="seg" className="seed-segmented-control__input" />
          <span className="seed-segmented-control__label">옵션 2</span>
        </label>
      </div>
    ),
  },
  /* 72. Select Box */
  {
    name: "Select Box",
    slug: "ui:select-box",
    demo: (
      <div className="seed-select-box" style={{ width: 320 }}>
        <div className="seed-select-box__content">
          <span className="seed-select-box__value">선택 항목</span>
        </div>
        <span className="seed-select-box__icon">▼</span>
      </div>
    ),
  },
  /* 73. Side Navigation */
  {
    name: "Side Navigation",
    slug: "ui:side-navigation",
    demo: (
      <nav className="seed-side-navigation" style={{ width: 240, height: 400, backgroundColor: "var(--seed-color-bg-layer-default)" }}>
        <a href="#" className="seed-side-navigation-menu-item seed-side-navigation-menu-item--active">
          <div className="seed-side-navigation-menu-item__content">메뉴 1</div>
        </a>
        <a href="#" className="seed-side-navigation-menu-item">
          <div className="seed-side-navigation-menu-item__content">메뉴 2</div>
        </a>
        <a href="#" className="seed-side-navigation-menu-item">
          <div className="seed-side-navigation-menu-item__content">메뉴 3</div>
        </a>
      </nav>
    ),
  },
  /* 74. Side Panel */
  {
    name: "Side Panel",
    slug: "ui:side-panel",
    demo: (
      <div className="seed-side-panel__root" style={{ width: 280, height: 400, backgroundColor: "var(--seed-color-bg-layer-default)", boxShadow: "var(--seed-elevation-z4)" }}>
        <div style={{ padding: 16, borderBottom: "1px solid var(--seed-color-stroke-neutral-weak)", fontWeight: "bold" }}>패널 타이틀</div>
        <div style={{ padding: 16 }}>패널 콘텐츠 영역입니다.</div>
      </div>
    ),
  },
  /* 75. Slider */
  {
    name: "Slider",
    slug: "ui:slider",
    demo: (
      <div className="seed-slider__root" style={{ width: 320, padding: 16 }}>
        <div className="seed-slider__track" style={{ height: 4, backgroundColor: "var(--seed-color-bg-neutral-weak)", borderRadius: 2, position: "relative" }}>
          <div className="seed-slider__range" style={{ width: "50%", height: "100%", backgroundColor: "var(--seed-color-bg-brand-solid)", borderRadius: 2 }}></div>
          <div className="seed-slider__thumb" style={{ width: 24, height: 24, backgroundColor: "var(--seed-color-palette-static-white)", borderRadius: "50%", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", boxShadow: "var(--seed-elevation-z2)" }}></div>
        </div>
      </div>
    ),
  },
  /* 76. Switch */
  {
    name: "Switch",
    slug: "ui:switch",
    demo: (
      <label className="seed-switch">
        <input type="checkbox" className="seed-switch__input" defaultChecked />
        <span className="seed-switch__control">
          <span className="seed-switch__thumb"></span>
        </span>
      </label>
    ),
  },
  /* 77. Time Picker */
  {
    name: "Time Picker",
    slug: "ui:time-picker",
    demo: (
      <div style={{ width: 320, padding: 24, backgroundColor: "var(--seed-color-bg-layer-default)", borderRadius: 16, display: "flex", justifyContent: "center", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
          <div style={{ color: "var(--seed-color-fg-neutral-muted)" }}>AM</div>
          <div style={{ fontSize: 24, fontWeight: "bold" }}>09</div>
          <div style={{ color: "var(--seed-color-fg-neutral-muted)" }}>10</div>
        </div>
        <div style={{ fontSize: 24, fontWeight: "bold", marginTop: 24 }}>:</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
          <div style={{ color: "var(--seed-color-fg-neutral-muted)" }}>29</div>
          <div style={{ fontSize: 24, fontWeight: "bold" }}>30</div>
          <div style={{ color: "var(--seed-color-fg-neutral-muted)" }}>31</div>
        </div>
      </div>
    ),
  },
  /* 78. Top Navigation */
  {
    name: "Top Navigation",
    slug: "ui:top-navigation",
    demo: (
      <div style={{ width: 320, height: 56, display: "flex", alignItems: "center", padding: "0 16px", backgroundColor: "var(--seed-color-bg-layer-default)", borderBottom: "1px solid var(--seed-color-stroke-neutral-weak)" }}>
        <span style={{ fontSize: 24, marginRight: 16 }}>←</span>
        <span style={{ fontWeight: "bold", flex: 1 }}>타이틀</span>
        <span style={{ fontSize: 24 }}>⚙</span>
      </div>
    ),
  }
];


export function ComponentGallery() {
  const [cur, setCur] = useState(0)
  const total = COMPONENTS.length
  
  const go = (idx) => {
    if(idx < 0) idx = 0
    if(idx >= total) idx = total - 1
    setCur(idx)
  }

  return (
    <section className="comp-gallery-container">
      <div className="comp-carousel-viewport">
        <div className="comp-carousel-track" style={{ transform: `translateX(-${cur * 100}%)` }}>
          {COMPONENTS.map((c) => (
            <div key={c.name} className="comp-carousel-slide">
              {c.demo}
            </div>
          ))}
        </div>
      </div>

      <div className="comp-info-bar">
        <div>
          <div className="comp-name">{COMPONENTS[cur].name}</div>
          <div className="comp-slug">{COMPONENTS[cur].slug}</div>
        </div>
        <div className="comp-arrows">
          <button className="comp-arrow-btn" onClick={() => go(cur - 1)} disabled={cur === 0}>‹</button>
          <button className="comp-arrow-btn" onClick={() => go(cur + 1)} disabled={cur === total - 1}>›</button>
        </div>
      </div>

      <div className="comp-dots">
        {COMPONENTS.map((_, i) => (
          <button key={i} className={`comp-dot${i === cur ? ' active' : ''}`}
            onClick={() => go(i)} aria-label={COMPONENTS[i].name} />
        ))}
      </div>
    </section>
  )
}

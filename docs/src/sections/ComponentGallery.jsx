/**
 * [컴포넌트 갤러리 재구축 진행 상황]
 * - 2026-08-12: 기존 구현을 전량 삭제하고 재구축 시작.
 * - 방식: 컴포넌트마다 (1) https://seed-design.io/llms/components/{name}.txt 스펙과
 *   (2) daangn/seed-design 공식 레포(로컬 clone: ../reference/seed-design, dev 브랜치 = 저장소 기본(HEAD) 브랜치)의
 *   packages/css/recipes/{name}.css(실제 BEM 클래스) + docs/registry/react/ui/{name}.tsx(실제 사용 구조)를
 *   직접 대조해서 하나씩 구현 → 검수 → 다음 컴포넌트 순으로 진행.
 * - 규칙: 실제 SEED 컴포넌트/클래스만 사용한다. 자체 스타일링·하드코딩(임의 SVG, 커스텀 keyframe,
 *   커스텀 px 값 등)으로 SEED에 없는 걸 흉내내지 않는다. 데모에 필요한 하위 컴포넌트가 아직
 *   갤러리에 없으면 그 부분은 비워두고, 해당 컴포넌트를 구현한 뒤 다시 채운다.
 *   (예: Action Button의 loading state는 ProgressCircle 컴포넌트 구현 후 추가)
 * - 완료: Accordion, Action Button (loading state 제외), Alert Dialog, Attachment Field (loading backdrop 제외)
 * - 다음: (검수 후 결정)
 */

import { useState, useRef, useEffect } from 'react'
import {
  IconExpandMoreRegular,
  IconDeliveryRegular,
  IconAddRegular,
  IconChevronRightRegular,
  IconHeartRegular,
  IconCameraFill,
  IconFileFill,
  IconCloseFill,
  IconRetryFill,
} from "@seed-design/icon"

// Alert Dialog의 6가지 Layout 변형(공식 문서 기준: Single / Neutral / Neutral(Overflow) /
// Critical / Critical(Overflow) / NonePreferred). 출처:
// - Single/Neutral/Critical: docs/examples/react/alert-dialog/{single,neutral,critical}.tsx
// - Overflow 2종: docs/examples/react/alert-dialog/wrap.tsx — 실제로 라벨을 길게 써서
//   ResponsivePair(flexWrap:wrap-reverse)가 진짜로 줄바꿈되게 함(폭을 강제로 계산해 흉내내지 않음).
// - NonePreferred: docs/examples/react/alert-dialog/nonpreferred.tsx — VStack(세로 stretch) +
//   위 neutralSolid 버튼 / 아래 ghost 텍스트 버튼(color: fg.neutralMuted, bold).
const ALERT_DIALOG_LAYOUTS = [
  {
    key: 'single', label: 'Single',
    title: 'Title은 작성을 권장해요', desc: '본문 내용을 입력해주세요.',
    kind: 'pair', buttons: [{ variant: 'neutralSolid', label: '라벨' }],
  },
  {
    key: 'neutral', label: 'Neutral',
    title: 'Title은 작성을 권장해요', desc: '본문 내용을 입력해주세요.',
    kind: 'pair', buttons: [{ variant: 'neutralWeak', label: '라벨' }, { variant: 'neutralSolid', label: '라벨' }],
  },
  {
    key: 'neutralOverflow', label: 'Neutral (Overflow)',
    title: 'Title은 작성을 권장해요', desc: '본문 내용을 입력해주세요.',
    kind: 'pair', buttons: [{ variant: 'neutralWeak', label: '취소할래요' }, { variant: 'neutralSolid', label: '네 확인했어요 진행할게요' }],
  },
  {
    key: 'critical', label: 'Critical',
    title: '삭제하시겠어요?', desc: '삭제한 게시글은 복구할 수 없어요.',
    kind: 'pair', buttons: [{ variant: 'neutralWeak', label: '취소' }, { variant: 'criticalSolid', label: '삭제' }],
  },
  {
    key: 'criticalOverflow', label: 'Critical (Overflow)',
    title: '삭제하시겠어요?', desc: '삭제한 게시글은 복구할 수 없어요.',
    kind: 'pair', buttons: [{ variant: 'neutralWeak', label: '취소할래요' }, { variant: 'criticalSolid', label: '네 삭제할게요 진행할게요' }],
  },
  {
    key: 'nonePreferred', label: 'NonePreferred',
    title: 'Title은 작성을 권장해요', desc: '본문 내용을 입력해주세요.',
    kind: 'stack', buttons: [{ variant: 'neutralSolid', label: '라벨' }, { variant: 'ghost', label: '라벨', muted: true }],
  },
]

function AlertDialogDemo() {
  const [layoutKey, setLayoutKey] = useState('critical')
  const layout = ALERT_DIALOG_LAYOUTS.find((l) => l.key === layoutKey)

  return (
    <>
      <div style={{
        position: 'absolute', top: 12, left: 12, right: 12, zIndex: 20,
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 6,
      }}>
        {ALERT_DIALOG_LAYOUTS.map((l) => (
          <button
            key={l.key}
            type="button"
            className={`comp-nav-btn comp-nav-btn--overlay${l.key === layoutKey ? ' active' : ''}`}
            onClick={() => setLayoutKey(l.key)}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className="seed-dialog__positioner">
        <div className="seed-dialog__backdrop" />
        <div className="seed-dialog__content" data-state="open">
          <div className="seed-dialog__header">
            <h2 className="seed-dialog__title" data-anatomy="Title">{layout.title}</h2>
            <p className="seed-dialog__description" data-anatomy="Description">{layout.desc}</p>
          </div>
          <div className="seed-dialog__footer" data-anatomy="Footer">
            {layout.kind === 'stack' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--seed-dimension-x4)', alignItems: 'stretch' }}>
                {layout.buttons.map((b, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`seed-action-button seed-action-button--variant_${b.variant} seed-action-button--size_medium seed-action-button--size_medium-layout_withText seed-action-button--layout_withText`}
                    style={b.muted ? { color: 'var(--seed-color-fg-neutral-muted)', fontWeight: 'var(--seed-font-weight-bold)' } : undefined}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap-reverse', gap: 'var(--seed-dimension-x2)' }}>
                {layout.buttons.map((b, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`seed-action-button seed-action-button--variant_${b.variant} seed-action-button--size_medium seed-action-button--size_medium-layout_withText seed-action-button--layout_withText`}
                    style={{
                      '--seed-box-flex-grow': 1,
                      '--seed-box-min-width': `calc(${100 / layout.buttons.length}% - var(--seed-dimension-x2) / ${layout.buttons.length})`,
                    }}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

function AccordionDemo() {
  const [variant, setVariant] = useState('inline')

  return (
    <>
      <div style={{
        position: 'absolute', top: 12, left: 12, right: 12, zIndex: 20,
        display: 'flex', justifyContent: 'center', gap: 6,
      }}>
        {['inline', 'separated'].map((v) => (
          <button
            key={v}
            type="button"
            className={`comp-nav-btn comp-nav-btn--overlay${v === variant ? ' active' : ''}`}
            onClick={() => setVariant(v)}
          >
            Variant: {v}
          </button>
        ))}
      </div>

      <div
        className={`seed-accordion__root${variant === 'separated' ? ' seed-accordion__root--variant_separated-size_medium' : ''}`}
        style={{ width: '100%', maxWidth: 320 }}
      >
        {[
          {
            title: '배송 방법',
            prefix: <IconDeliveryRegular style={{ width: 'var(--seed-icon-size)', height: 'var(--seed-icon-size)' }} />,
            open: false,
          },
          {
            title: '반품/교환은 어떻게 하나요?',
            description: '구매 후 7일 이내에 신청할 수 있어요.',
            open: true,
            content: '상품 상세페이지의 [반품/교환 신청] 버튼을 눌러 접수해주세요.',
          },
          {
            title: '고객센터 문의',
            open: false,
            disabled: true,
          },
        ].map(({ title, description, prefix, open, disabled, content }, i) => (
          <div key={i} className={`seed-accordion__item seed-accordion__item--variant_${variant}`}>
            <h3 className="seed-accordion__header">
              <button
                type="button"
                className={`seed-accordion__trigger seed-accordion__trigger--variant_${variant} seed-accordion__trigger--size_medium`}
                data-state={open ? 'open' : 'closed'}
                disabled={disabled}
              >
                {prefix && (
                  <span className="seed-accordion__prefix seed-accordion__prefix--size_medium" data-disabled={disabled ? '' : undefined} data-anatomy={i === 0 ? 'Prefix' : undefined}>
                    {prefix}
                  </span>
                )}
                <span className="seed-accordion__body">
                  <span className="seed-accordion__title seed-accordion__title--size_medium" data-disabled={disabled ? '' : undefined} data-anatomy={i === 0 ? 'Title' : undefined}>{title}</span>
                  {description && (
                    <span className="seed-accordion__description seed-accordion__description--size_medium" data-disabled={disabled ? '' : undefined} data-anatomy="Description">
                      {description}
                    </span>
                  )}
                </span>
                <span
                  className="seed-accordion__suffixIcon seed-accordion__suffixIcon--size_medium"
                  data-state={open ? 'open' : 'closed'}
                  data-disabled={disabled ? '' : undefined}
                  data-anatomy={i === 0 ? 'Chevron Icon' : undefined}
                >
                  <IconExpandMoreRegular style={{ width: 'var(--seed-suffix-icon-size, var(--seed-dimension-x5))', height: 'var(--seed-suffix-icon-size, var(--seed-dimension-x5))' }} />
                </span>
              </button>
            </h3>
            <div
              data-anatomy={open ? 'Content Panel' : undefined}
              className="seed-accordion__content"
              data-state={open ? 'open' : 'closed'}
              style={open ? { height: 'auto', opacity: 1 } : undefined}
            >
              <div style={{ paddingInline: 'var(--seed-dimension-spacing-x-global-gutter)', paddingTop: 'var(--seed-dimension-x2)', paddingBottom: 'var(--seed-dimension-x5)' }}>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--seed-color-fg-neutral-subtle)' }}>
                  {content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

const COMPONENTS = [
  {
    name: 'Accordion',
    slug: 'ui:accordion',
    // 출처 대조: packages/css/recipes/accordion.css (seed-accordion__* BEM) +
    // docs/registry/react/ui/accordion.tsx (Header > Trigger > Prefix/Body(Title+Description)/SuffixIcon, Content)
    demo: <AccordionDemo />,
  },

  {
    name: 'Action Button',
    slug: 'ui:action-button',
    // 출처 대조: packages/css/recipes/action-button.css (.seed-action-button + --variant_*/--size_*/--layout_* BEM) +
    // docs/registry/react/ui/action-button.tsx (SeedActionButton, loading prop → LoadingIndicator로 children 감쌈) +
    // docs/examples/react/action-button/*.tsx (PrefixIcon/Icon 사용법, icon-only는 layout="iconOnly" + aria-label 필수)
    demo: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', alignItems: 'center' }}>
        {/* variant 7종 — size medium, text only */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
          {[
            ['neutralSolid', '기본'],
            ['brandSolid', '채팅하기'],
            ['neutralWeak', '더보기'],
            ['brandOutline', '단골 맺기'],
            ['neutralOutline', '공유'],
            ['criticalSolid', '삭제'],
            ['ghost', '취소'],
          ].map(([variant, label], vi) => (
            <button
              key={variant}
              type="button"
              className={`seed-action-button seed-action-button--variant_${variant} seed-action-button--size_small seed-action-button--size_small-layout_withText seed-action-button--layout_withText`}
            >
              {vi === 0 ? <span data-anatomy="Label">{label}</span> : label}
            </button>
          ))}
        </div>

        {/* layout: prefix / suffix / icon only, size medium */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
          <button
            type="button"
            className="seed-action-button seed-action-button--variant_brandSolid seed-action-button--size_medium seed-action-button--size_medium-layout_withText seed-action-button--layout_withText"
          >
            <span data-anatomy="Prefix Icon" style={{ display: 'inline-flex' }}>
              <IconAddRegular style={{ width: 'var(--seed-prefix-icon-size)', height: 'var(--seed-prefix-icon-size)', color: 'var(--seed-prefix-icon-color)' }} />
            </span>
            글쓰기
          </button>
          <button
            type="button"
            className="seed-action-button seed-action-button--variant_neutralWeak seed-action-button--size_medium seed-action-button--size_medium-layout_withText seed-action-button--layout_withText"
          >
            더보기
            <span data-anatomy="Suffix Icon" style={{ display: 'inline-flex' }}>
              <IconChevronRightRegular style={{ width: 'var(--seed-suffix-icon-size)', height: 'var(--seed-suffix-icon-size)', color: 'var(--seed-suffix-icon-color)' }} />
            </span>
          </button>
          <button
            type="button"
            aria-label="관심"
            className="seed-action-button seed-action-button--variant_neutralOutline seed-action-button--size_medium seed-action-button--size_medium-layout_iconOnly seed-action-button--layout_iconOnly"
          >
            <IconHeartRegular style={{ width: 'var(--seed-icon-size)', height: 'var(--seed-icon-size)', color: 'var(--seed-icon-color)' }} />
          </button>
        </div>

        {/* size: xsmall(pill) ↔ large, state: disabled / loading */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', alignItems: 'center' }}>
          <button
            type="button"
            className="seed-action-button seed-action-button--variant_neutralWeak seed-action-button--size_xsmall seed-action-button--size_xsmall-layout_withText seed-action-button--layout_withText"
          >
            필터
          </button>
          <button
            type="button"
            className="seed-action-button seed-action-button--variant_brandSolid seed-action-button--size_large seed-action-button--size_large-layout_withText seed-action-button--layout_withText"
          >
            구매하기
          </button>
          <button
            type="button"
            disabled
            className="seed-action-button seed-action-button--variant_neutralSolid seed-action-button--size_small seed-action-button--size_small-layout_withText seed-action-button--layout_withText"
          >
            비활성
          </button>
          {/* loading state: ProgressCircle 컴포넌트 구현 후 추가 예정 */}
        </div>
      </div>
    ),
  },

  {
    name: 'Alert Dialog',
    slug: 'ui:alert-dialog',
    // 출처 대조: Alert Dialog는 자체 recipe css가 없고 Dialog를 그대로 재사용함
    // (docs/registry/react/ui/alert-dialog.tsx: Dialog.Root role="alertdialog" 래핑).
    // packages/css/recipes/dialog.css의 .seed-dialog__positioner/backdrop/content/header/title/description/footer 클래스 그대로 사용.
    // Footer 버튼은 이미 구현한 seed-action-button 재사용.
    // 버튼 배치는 ResponsivePair(packages/react/src/components/ResponsivePair/ResponsivePair.tsx)를 그대로 재현 —
    // 별도 BEM 클래스가 없는 순수 레이아웃 유틸이라 flexWrap + seed-action-button이 원래 읽는
    // --seed-box-min-width/--seed-box-flex-grow 변수를 동일하게 사용해 재현.
    // position 조정 없음: .seed-dialog__positioner/backdrop는 원래 클래스 그대로(position: fixed) 사용.
    // .comp-carousel-slide(docs.css)에 transform: translateZ(0)을 줘서, CSS 스펙상 position:fixed
    // 자손의 containing block이 뷰포트가 아니라 자기 슬라이드로 스코프되게 함(시각적 영향 없는 no-op
    // transform) — 그 결과 별도 override 없이도 "전체 화면을 덮는" 진짜 fixed 동작이 자기 슬라이드
    // 안에서만 자연스럽게 재현됨.
    // Layout 속성 6종(Single/Neutral/Neutral Overflow/Critical/Critical Overflow/NonePreferred)은
    // 카드 상단 토글로 전환 — AlertDialogDemo 컴포넌트 정의 참고.
    demo: <AlertDialogDemo />,
  },

  {
    name: 'Attachment Field',
    slug: 'ui:attachment-field',
    // 출처 대조:
    // - packages/css/recipes/attachment-input.css (.seed-attachment-input__root/dropzone/container/itemGroup)
    // - packages/css/recipes/attachment-input-trigger.css (.seed-attachment-input-trigger__root/icon/itemCountArea/itemCount/maxItemCount)
    // - packages/css/recipes/attachment-input-item.css (.seed-attachment-input-item__root/image/thumbnail/metadata/
    //   name/size/backdrop/actionButton/removeButton/badge, --type_image vs --type_general 두 variant)
    // - docs/registry/react/ui/attachment-field.tsx: Trigger는 camera(이미지)/paperclip(파일) 아이콘 +
    //   itemCount, Item은 Image/Thumbnail + Metadata(Name+Size) + Backdrop(loading/error) + RemoveButton으로 합성.
    //   실제 아이콘(IconCameraFill 등)은 @karrotmarket/react-monochrome-icon 소속이라 미설치 —
    //   @seed-design/icon에 동일하게 있는 IconCameraFill은 그대로, 나머지(파일=IconFileFill,
    //   삭제=IconCloseFill, 재시도=IconRetryFill)는 의미가 같은 걸로 대체.
    // Loading backdrop(ProgressCircle 필요)은 아직 구현 안 함 — 규칙대로 비워둠, Error backdrop은
    // ActionButton 없이 실제 __actionButton 클래스로 재현 가능해서 포함.
    demo: (
      <div className="seed-attachment-input__root" style={{ width: '100%', maxWidth: 320, marginInline: 0 }}>
        {/* 실제 구조: Container가 Trigger + ItemGroup을 함께 감싸는 가로 스크롤 행 하나다
            (docs/registry/react/ui/attachment-field.tsx의 AttachmentInput 컴포넌트 참고).
            처음엔 이 container 클래스를 아이템 목록 <ul>에 잘못 붙이고 Trigger를 바깥 별도
            블록으로 분리했었음 — 실제 구조와 달라서 바로잡음. */}
        <div className="seed-attachment-input__container" style={{ marginInline: 0, paddingInline: 0 }}>
          <button
            type="button"
            className="seed-attachment-input-trigger__root"
            aria-label="파일 선택"
            data-anatomy="Trigger"
          >
            <IconCameraFill className="seed-attachment-input-trigger__icon" />
            <span className="seed-attachment-input-trigger__itemCountArea">
              <span className="seed-attachment-input-trigger__itemCount">2</span>
              <span className="seed-attachment-input-trigger__maxItemCount">/5</span>
            </span>
          </button>

          <ul className="seed-attachment-input__itemGroup">
          <li className="seed-attachment-input-item__root seed-attachment-input-item__root--type_image">
            <svg className="seed-attachment-input-item__image" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" data-anatomy="Thumbnail">
              <rect width="48" height="48" fill="var(--seed-color-bg-neutral-weak)" />
              <circle cx="18" cy="19" r="4" stroke="var(--seed-color-fg-neutral-subtle)" strokeWidth="2.5" />
              <path d="M6 34l10-9 8 7 6-6 12 10" stroke="var(--seed-color-fg-neutral-subtle)" strokeWidth="2.5" strokeLinejoin="round" />
            </svg>
            <div className="seed-attachment-input-item__badge seed-attachment-input-item__badge--type_image" data-anatomy="Preview Badge">
              <span className="seed-attachment-input-item__badgeLabel seed-attachment-input-item__badgeLabel--type_image">대표</span>
            </div>
            <button
              type="button"
              className="seed-attachment-input-item__removeButton"
              aria-label="파일 제거"
              data-anatomy="Remove Button"
            >
              <IconCloseFill style={{ width: 'var(--seed-icon-size)', height: 'var(--seed-icon-size)', color: 'var(--seed-icon-color)' }} />
            </button>
          </li>

          <li className="seed-attachment-input-item__root seed-attachment-input-item__root--type_image">
            <svg className="seed-attachment-input-item__image" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" fill="var(--seed-color-bg-neutral-weak)" />
            </svg>
            <div className="seed-attachment-input-item__backdrop seed-attachment-input-item__backdrop--type_image" data-anatomy="Error Backdrop">
              <button type="button" className="seed-attachment-input-item__actionButton seed-attachment-input-item__actionButton--type_image">
                <IconRetryFill style={{ width: 'var(--seed-icon-size)', height: 'var(--seed-icon-size)', color: 'var(--seed-icon-color)' }} />
                재시도
              </button>
            </div>
            <button
              type="button"
              className="seed-attachment-input-item__removeButton"
              aria-label="파일 제거"
            >
              <IconCloseFill style={{ width: 'var(--seed-icon-size)', height: 'var(--seed-icon-size)', color: 'var(--seed-icon-color)' }} />
            </button>
          </li>

          <li className="seed-attachment-input-item__root seed-attachment-input-item__root--type_general">
            <div className="seed-attachment-input-item__thumbnail seed-attachment-input-item__thumbnail--type_general" data-anatomy="Thumbnail (File)">
              <IconFileFill style={{ width: 'var(--seed-icon-size)', height: 'var(--seed-icon-size)', color: 'var(--seed-icon-color)' }} />
            </div>
            <div className="seed-attachment-input-item__metadata seed-attachment-input-item__metadata--type_general" data-anatomy="Metadata">
              <span className="seed-attachment-input-item__name seed-attachment-input-item__name--type_general">포트폴리오.pdf</span>
              <span className="seed-attachment-input-item__size seed-attachment-input-item__size--type_general">1.2MB</span>
            </div>
            <button
              type="button"
              className="seed-attachment-input-item__removeButton"
              aria-label="파일 제거"
            >
              <IconCloseFill style={{ width: 'var(--seed-icon-size)', height: 'var(--seed-icon-size)', color: 'var(--seed-icon-color)' }} />
            </button>
          </li>
          </ul>
        </div>
      </div>
    ),
  },
];

export function ComponentGallery() {
  const [cur, setCur] = useState(0)
  const [showAnatomy, setShowAnatomy] = useState(false)
  const wrapRef = useRef(null)
  const navRef = useRef(null)
  const total = COMPONENTS.length

  const go = (idx) => {
    if (idx < 0) idx = 0
    if (idx >= total) idx = total - 1
    setCur(idx)
  }

  useEffect(() => {
    if (wrapRef.current) {
      wrapRef.current.scrollTo({
        left: cur * wrapRef.current.clientWidth,
        behavior: 'smooth',
      })
    }
    if (navRef.current) {
      const activeBtn = navRef.current.children[cur]
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  }, [cur])

  return (
    <section className="comp-gallery-container" id="showcase">
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 19, fontWeight: 700, marginBottom: 6 }}>Components Gallery</h2>
        <p style={{ fontSize: 13.5, color: '#4B5563' }}>
          <code>@seed-design/css/recipes/*.css</code> 실제 클래스 구조 재현. 처음부터 전면 검수 예정.
        </p>
        <button
          type="button"
          className={`comp-nav-btn${showAnatomy ? ' active' : ''}`}
          onClick={() => setShowAnatomy((v) => !v)}
          style={{ marginTop: 8 }}
        >
          {showAnatomy ? '✓ ' : ''}Anatomy 라벨 보기
        </button>
      </div>

      {/* 토글 네비 */}
      <div className="comp-nav" ref={navRef}>
        {COMPONENTS.map((c, i) => (
          <button
            key={c.name}
            className={`comp-nav-btn${i === cur ? ' active' : ''}`}
            onClick={() => go(i)}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* 캐러셀 */}
      <div className="comp-carousel-wrap" data-show-anatomy={showAnatomy ? '' : undefined}>
        <div className="comp-carousel-track" style={{ transform: `translateX(-${cur * 100}%)` }}>
          {COMPONENTS.map((c) => (
            <div key={c.name} className="comp-carousel-slide">
              {c.demo}
            </div>
          ))}
        </div>
      </div>

      {/* 하단 정보 바 */}
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

      {/* dot 인디케이터 */}
      <div className="comp-dots">
        {COMPONENTS.map((_, i) => (
          <button
            key={i}
            className={`comp-dot${i === cur ? ' active' : ''}`}
            onClick={() => go(i)}
            aria-label={COMPONENTS[i].name}
          />
        ))}
      </div>
    </section>
  )
}

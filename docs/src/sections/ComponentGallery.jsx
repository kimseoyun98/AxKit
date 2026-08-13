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
 * - 완료: Accordion, Action Button (loading state 제외), Alert Dialog, Attachment Field (loading backdrop 제외), Avatar
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
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', maxWidth: 360, margin: '0 auto' }}>
      {ALERT_DIALOG_LAYOUTS.map((layout, lIdx) => (
        <div key={layout.key} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--seed-color-fg-neutral-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Layout: {layout.label}
          </div>
          <div className="seed-dialog__content" data-state="open" style={{ width: '100%', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)' }}>
            <div className="seed-dialog__header">
              <h2 className="seed-dialog__title" data-anatomy={lIdx === 0 ? "Title" : undefined}>{layout.title}</h2>
              {layout.desc && <p className="seed-dialog__description" data-anatomy={lIdx === 0 ? "Description" : undefined}>{layout.desc}</p>}
            </div>
            <div className="seed-dialog__footer" data-anatomy={lIdx === 0 ? "Footer" : undefined}>
              {layout.kind === 'stack' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--seed-dimension-x2)', alignItems: 'stretch' }}>
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
      ))}
    </div>
  )
}

function IdentityPlaceholderSVG({ size = 48, identity = "person" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect width="48" height="48" rx="24" fill="var(--seed-color-bg-neutral-weak)" />
      {identity === "person" ? (
        <path d="M24 14C20.6863 14 18 16.6863 18 20C18 23.3137 20.6863 26 24 26C27.3137 26 30 23.3137 30 20C30 16.6863 27.3137 14 24 14ZM14 34C14 29.5817 18.4772 26 24 26C29.5228 26 34 29.5817 34 34V35H14V34Z" fill="var(--seed-color-fg-neutral-muted)" />
      ) : (
        <path d="M16 16H32V34H16V16ZM20 20H24V24H20V20ZM20 26H24V30H20V26ZM26 20H28V24H26V20ZM26 26H28V30H26V26Z" fill="var(--seed-color-fg-neutral-muted)" />
      )}
    </svg>
  );
}

function AvatarDemo() {
  const sampleImg = "https://avatars.githubusercontent.com/u/54893898?v=4";

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, width: '100%', alignItems: 'center' }}>
      {/* 1. Sizes */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: '100%' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--seed-color-fg-neutral-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Sizes (24px ~ 96px)
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'center' }}>
          {['24', '36', '48', '64', '80', '96'].map((sz) => (
            <div key={sz} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div className={`seed-avatar__root seed-avatar__root--size_${sz} seed-avatar__root--badgeMask_none`} data-anatomy={sz === '64' ? 'Image Area' : undefined}>
                <img className="seed-avatar__image" src={sampleImg} alt={`Avatar ${sz}`} />
              </div>
              <span style={{ fontSize: 11, color: 'var(--seed-color-fg-neutral-muted)' }}>{sz}px</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Badge & Mask */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: '100%' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--seed-color-fg-neutral-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Badge & Mask (Circle, Flower, Shield)
        </div>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div className="seed-avatar__root seed-avatar__root--size_64 seed-avatar__root--badgeMask_circle" data-anatomy="Circle Badge">
              <img className="seed-avatar__image" src={sampleImg} alt="Avatar" />
              <div className="seed-avatar__badge seed-avatar__badge--size_64 seed-avatar__badge--badgeMask_circle">
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: 'var(--seed-color-palette-green-600)' }} />
              </div>
            </div>
            <span style={{ fontSize: 12, color: 'var(--seed-color-fg-neutral-subtle)' }}>Circle Badge</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div className="seed-avatar__root seed-avatar__root--size_64 seed-avatar__root--badgeMask_flower" data-anatomy="Flower Badge">
              <img className="seed-avatar__image" src={sampleImg} alt="Avatar" />
              <div className="seed-avatar__badge seed-avatar__badge--size_64">
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C10.9 2 9.9 2.6 9.4 3.5C8.4 3.1 7.2 3.4 6.5 4.2C5.8 5 5.5 6.2 5.9 7.2C5 7.7 4.4 8.7 4.4 9.8C4.4 10.9 5 11.9 5.9 12.4C5.5 13.4 5.8 14.6 6.5 15.4C7.2 16.2 8.4 16.5 9.4 16.1C9.9 17 10.9 17.6 12 17.6C13.1 17.6 14.1 17 14.6 16.1C15.6 16.5 16.8 16.2 17.5 15.4C18.2 14.6 18.5 13.4 18.1 12.4C19 11.9 19.6 10.9 19.6 9.8C19.6 8.7 19 7.7 18.1 7.2C18.5 6.2 18.2 5 17.5 4.2C16.8 3.4 15.6 3.1 14.6 3.5C14.1 2.6 13.1 2 12 2Z" fill="var(--seed-color-palette-green-600)" />
                  <path d="M9.5 9.8L11 11.3L14.5 7.8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <span style={{ fontSize: 12, color: 'var(--seed-color-fg-neutral-subtle)' }}>Flower Badge</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div className="seed-avatar__root seed-avatar__root--size_64 seed-avatar__root--badgeMask_shield" data-anatomy="Shield Badge">
              <img className="seed-avatar__image" src={sampleImg} alt="Avatar" />
              <div className="seed-avatar__badge seed-avatar__badge--size_64">
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L4 5V11C4 16.5 7.4 21.6 12 23C16.6 21.6 20 16.5 20 11V5L12 2Z" fill="var(--seed-color-palette-blue-600)" />
                  <path d="M9.5 11.5L11 13L14.5 9.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <span style={{ fontSize: 12, color: 'var(--seed-color-fg-neutral-subtle)' }}>Shield Badge</span>
          </div>
        </div>
      </div>

      {/* 3. Avatar Stack */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: '100%' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--seed-color-fg-neutral-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Avatar Stack
        </div>
        <div className="seed-avatar-stack__root" data-anatomy="Avatar Stack">
          {[0, 1, 2, 3].map((idx) => (
            <div key={idx} className="seed-avatar-stack__item seed-avatar-stack__item--size_48">
              <div className="seed-avatar__root seed-avatar__root--size_48 seed-avatar__root--badgeMask_none">
                <img className="seed-avatar__image" src={sampleImg} alt={`User ${idx}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Fallback */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: '100%' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--seed-color-fg-neutral-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Fallback Placeholders
        </div>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div className="seed-avatar__root seed-avatar__root--size_64 seed-avatar__root--badgeMask_none" data-anatomy="Fallback (Person)">
              <div className="seed-avatar__fallback">
                <IdentityPlaceholderSVG size={64} identity="person" />
              </div>
            </div>
            <span style={{ fontSize: 12, color: 'var(--seed-color-fg-neutral-subtle)' }}>Person</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div className="seed-avatar__root seed-avatar__root--size_64 seed-avatar__root--badgeMask_none" data-anatomy="Fallback (Business)">
              <div className="seed-avatar__fallback">
                <IdentityPlaceholderSVG size={64} identity="business" />
              </div>
            </div>
            <span style={{ fontSize: 12, color: 'var(--seed-color-fg-neutral-subtle)' }}>Business</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccordionDemo() {
  const [inlineOpenMap, setInlineOpenMap] = useState({ 1: true });
  const [separatedOpenMap, setSeparatedOpenMap] = useState({ 1: true });

  const toggleInline = (idx) => {
    setInlineOpenMap((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleSeparated = (idx) => {
    setSeparatedOpenMap((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const items = [
    {
      title: '배송 방법 안내',
      prefix: <IconDeliveryRegular style={{ width: 'var(--seed-icon-size)', height: 'var(--seed-icon-size)' }} />,
      content: '기본 배송은 당일 발송되며 1~2일 내에 안전하게 도착해요.',
    },
    {
      title: '반품/교환은 어떻게 하나요?',
      description: '구매 후 7일 이내에 신청할 수 있어요.',
      prefix: <IconDeliveryRegular style={{ width: 'var(--seed-icon-size)', height: 'var(--seed-icon-size)' }} />,
      content: '상품 상세페이지의 [반품/교환 신청] 버튼을 눌러 접수해주세요.',
    },
    {
      title: '고객센터 문의하기 (비활성)',
      prefix: <IconDeliveryRegular style={{ width: 'var(--seed-icon-size)', height: 'var(--seed-icon-size)' }} />,
      disabled: true,
      content: '고객센터 운영시간은 평일 09:00 ~ 18:00 입니다.',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', maxWidth: 360, margin: '0 auto' }}>
      {/* 1. Inline Variant */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--seed-color-fg-neutral-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Variant: Inline (클릭하여 열고 닫기)
        </div>
        <div className="seed-accordion__root" style={{ width: '100%' }}>
          {items.map(({ title, description, prefix, disabled, content }, i) => {
            const isOpen = !!inlineOpenMap[i];
            return (
              <div key={i} className="seed-accordion__item seed-accordion__item--variant_inline">
                <h3 className="seed-accordion__header">
                  <button
                    type="button"
                    className="seed-accordion__trigger seed-accordion__trigger--variant_inline seed-accordion__trigger--size_medium"
                    data-state={isOpen ? 'open' : 'closed'}
                    disabled={disabled}
                    onClick={() => !disabled && toggleInline(i)}
                  >
                    {prefix && (
                      <span className="seed-accordion__prefix seed-accordion__prefix--size_medium" data-disabled={disabled ? '' : undefined} data-anatomy={i === 0 ? 'Prefix' : undefined}>
                        {typeof prefix === 'function' ? prefix(disabled) : prefix}
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
                      data-state={isOpen ? 'open' : 'closed'}
                      data-disabled={disabled ? '' : undefined}
                      data-anatomy={i === 0 ? 'Chevron Icon' : undefined}
                    >
                      <IconExpandMoreRegular style={{ width: 18, height: 18, transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    </span>
                  </button>
                </h3>
                <div
                  data-anatomy={isOpen ? 'Content Panel' : undefined}
                  className="seed-accordion__content"
                  data-state={isOpen ? 'open' : 'closed'}
                  style={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0, overflow: 'hidden' }}
                >
                  <div style={{ paddingInline: 'var(--seed-dimension-spacing-x-global-gutter)', paddingTop: 'var(--seed-dimension-x2)', paddingBottom: 'var(--seed-dimension-x3)' }}>
                    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--seed-color-fg-neutral-subtle)' }}>
                      {content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Separated Variant */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--seed-color-fg-neutral-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Variant: Separated (클릭하여 열고 닫기)
        </div>
        <div className="seed-accordion__root seed-accordion__root--variant_separated-size_medium" style={{ width: '100%' }}>
          {items.map(({ title, description, prefix, disabled, content }, i) => {
            const isOpen = !!separatedOpenMap[i];
            return (
              <div key={i} className="seed-accordion__item seed-accordion__item--variant_separated">
                <h3 className="seed-accordion__header">
                  <button
                    type="button"
                    className="seed-accordion__trigger seed-accordion__trigger--variant_separated seed-accordion__trigger--size_medium"
                    data-state={isOpen ? 'open' : 'closed'}
                    disabled={disabled}
                    onClick={() => !disabled && toggleSeparated(i)}
                  >
                    {prefix && (
                      <span className="seed-accordion__prefix seed-accordion__prefix--size_medium" data-disabled={disabled ? '' : undefined}>
                        {typeof prefix === 'function' ? prefix(disabled) : prefix}
                      </span>
                    )}
                    <span className="seed-accordion__body">
                      <span className="seed-accordion__title seed-accordion__title--size_medium" data-disabled={disabled ? '' : undefined}>{title}</span>
                      {description && (
                        <span className="seed-accordion__description seed-accordion__description--size_medium" data-disabled={disabled ? '' : undefined}>{description}</span>
                      )}
                    </span>
                    <span
                      className="seed-accordion__suffixIcon seed-accordion__suffixIcon--size_medium"
                      data-state={isOpen ? 'open' : 'closed'}
                      data-disabled={disabled ? '' : undefined}
                    >
                      <IconExpandMoreRegular style={{ width: 18, height: 18, transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    </span>
                  </button>
                </h3>
                <div
                  className="seed-accordion__content"
                  data-state={isOpen ? 'open' : 'closed'}
                  style={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0, overflow: 'hidden' }}
                >
                  <div style={{ paddingInline: 'var(--seed-dimension-spacing-x-global-gutter)', paddingTop: 'var(--seed-dimension-x2)', paddingBottom: 'var(--seed-dimension-x3)' }}>
                    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--seed-color-fg-neutral-subtle)' }}>
                      {content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ButtonProgressCircleSVG({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ animation: 'seed-spin 0.8s linear infinite' }}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" />
      <path d="M12 3C16.9706 3 21 7.02944 21 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function ActionButtonDemo() {
  const stateVariants = [
    { key: 'neutralSolid', label: 'Neutral Solid' },
    { key: 'brandSolid', label: 'Brand Solid' },
    { key: 'criticalSolid', label: 'Critical Solid' },
    { key: 'neutralWeak', label: 'Neutral Weak' },
    { key: 'brandOutline', label: 'Brand Outline' },
    { key: 'neutralOutline', label: 'Neutral Outline' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, width: '100%', maxWidth: 520, margin: '0 auto' }}>
      {/* 1. Hierarchy & State Matrix (User Image Request) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--seed-color-fg-neutral-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>
          Hierarchy & States (Enabled / Loading / Disabled)
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, width: '100%', textAlign: 'center', fontSize: 11, fontWeight: 700, color: 'var(--seed-color-fg-neutral-subtle)' }}>
          <span>Enabled</span>
          <span>Loading</span>
          <span>Disabled</span>
        </div>

        {stateVariants.map(({ key }) => (
          <div key={key} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, width: '100%', alignItems: 'center' }}>
            <button
              type="button"
              className={`seed-action-button seed-action-button--variant_${key} seed-action-button--size_medium seed-action-button--size_medium-layout_withText seed-action-button--layout_withText`}
              style={{ width: '100%' }}
            >
              Enabled
            </button>

            <button
              type="button"
              data-loading=""
              className={`seed-action-button seed-action-button--variant_${key} seed-action-button--size_medium seed-action-button--size_medium-layout_withText seed-action-button--layout_withText`}
              style={{ width: '100%' }}
            >
              <ButtonProgressCircleSVG size={18} />
            </button>

            <button
              type="button"
              disabled
              className={`seed-action-button seed-action-button--variant_${key} seed-action-button--size_medium seed-action-button--size_medium-layout_withText seed-action-button--layout_withText`}
              style={{ width: '100%' }}
            >
              Disabled
            </button>
          </div>
        ))}
      </div>

      {/* 2. Sizes & Layouts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', alignItems: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--seed-color-fg-neutral-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Sizes & Layouts (Prefix / Suffix / Icon-Only)
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
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
          <button
            type="button"
            className="seed-action-button seed-action-button--variant_neutralWeak seed-action-button--size_xsmall seed-action-button--size_xsmall-layout_withText seed-action-button--layout_withText"
          >
            필터 (XSmall)
          </button>
          <button
            type="button"
            className="seed-action-button seed-action-button--variant_brandSolid seed-action-button--size_large seed-action-button--size_large-layout_withText seed-action-button--layout_withText"
          >
            구매하기 (Large)
          </button>
        </div>
      </div>
    </div>
  );
}

const COMPONENTS = [
  {
    name: 'Accordion',
    slug: 'ui:accordion',
    demo: <AccordionDemo />,
  },

  {
    name: 'Action Button',
    slug: 'ui:action-button',
    // 출처 대조: packages/css/recipes/action-button.css (.seed-action-button + --variant_*/--size_*/--layout_* BEM) +
    // docs/registry/react/ui/action-button.tsx (SeedActionButton, loading prop → LoadingIndicator로 children 감쌈) +
    // 위계 매트릭스: neutralSolid, brandSolid, criticalSolid, neutralWeak, brandOutline, neutralOutline 6종 x 4가지 State (Enabled, Pressed, Loading, Disabled)
    demo: <ActionButtonDemo />,
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
    demo: <AttachmentFieldDemo />,
  },

  {
    name: 'Avatar',
    slug: 'ui:avatar',
    demo: <AvatarDemo />,
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

      {/* 상단 정보 바 (컴포넌트 이름/슬러그, dot 인디케이터, 이전/다음 화살표) */}
      <div className="comp-info-bar" style={{ marginTop: 14, marginBottom: 14 }}>
        <div>
          <div className="comp-name">{COMPONENTS[cur].name}</div>
          <div className="comp-slug">{COMPONENTS[cur].slug}</div>
        </div>
        <div className="comp-dots" style={{ marginTop: 0 }}>
          {COMPONENTS.map((_, i) => (
            <button
              key={i}
              className={`comp-dot${i === cur ? ' active' : ''}`}
              onClick={() => go(i)}
              aria-label={COMPONENTS[i].name}
            />
          ))}
        </div>
        <div className="comp-arrows">
          <button className="comp-arrow-btn" onClick={() => go(cur - 1)} disabled={cur === 0}>‹</button>
          <button className="comp-arrow-btn" onClick={() => go(cur + 1)} disabled={cur === total - 1}>›</button>
        </div>
      </div>

      {/* 캐러셀 */}
      <div className="comp-carousel-wrap" data-show-anatomy={showAnatomy ? '' : undefined}>
        <div className="comp-carousel-track" style={{ transform: `translateX(-${cur * 100}%)` }}>
          {COMPONENTS.map((c, i) => (
            <div key={c.name} className={`comp-carousel-slide${i === cur ? ' active' : ''}`}>
              {c.demo}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

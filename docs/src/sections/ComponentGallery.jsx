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
 * - 완료: Accordion, Action Button (loading state 제외), Alert Dialog
 * - 다음: (검수 후 결정)
 */

import { useState, useRef, useEffect } from 'react'
import {
  IconExpandMoreRegular,
  IconDeliveryRegular,
  IconAddRegular,
  IconChevronRightRegular,
  IconHeartRegular,
} from "@seed-design/icon"

const COMPONENTS = [
  {
    name: 'Accordion',
    slug: 'ui:accordion',
    // 출처 대조: packages/css/recipes/accordion.css (seed-accordion__* BEM) +
    // docs/registry/react/ui/accordion.tsx (Header > Trigger > Prefix/Body(Title+Description)/SuffixIcon, Content)
    demo: (
      <div className="seed-accordion__root" style={{ width: '100%', maxWidth: 320 }}>
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
          <div key={i} className="seed-accordion__item seed-accordion__item--variant_inline">
            <h3 className="seed-accordion__header">
              <button
                type="button"
                className="seed-accordion__trigger seed-accordion__trigger--variant_inline seed-accordion__trigger--size_medium"
                data-state={open ? 'open' : 'closed'}
                disabled={disabled}
              >
                {prefix && (
                  <span className="seed-accordion__prefix seed-accordion__prefix--size_medium">
                    {prefix}
                  </span>
                )}
                <span className="seed-accordion__body">
                  <span className="seed-accordion__title seed-accordion__title--size_medium">{title}</span>
                  {description && (
                    <span className="seed-accordion__description seed-accordion__description--size_medium">
                      {description}
                    </span>
                  )}
                </span>
                <span
                  className="seed-accordion__suffixIcon seed-accordion__suffixIcon--size_medium"
                  data-state={open ? 'open' : 'closed'}
                >
                  <IconExpandMoreRegular />
                </span>
              </button>
            </h3>
            <div
              className="seed-accordion__content"
              data-state={open ? 'open' : 'closed'}
              style={open ? { height: 'auto', opacity: 1 } : undefined}
            >
              <div style={{ padding: 'var(--seed-dimension-x4)', paddingTop: 0 }}>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: 'var(--seed-color-fg-neutral-subtle)' }}>
                  {content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
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
          ].map(([variant, label]) => (
            <button
              key={variant}
              type="button"
              className={`seed-action-button seed-action-button--variant_${variant} seed-action-button--size_small seed-action-button--size_small-layout_withText seed-action-button--layout_withText`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* layout: prefix / suffix / icon only, size medium */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
          <button
            type="button"
            className="seed-action-button seed-action-button--variant_brandSolid seed-action-button--size_medium seed-action-button--size_medium-layout_withText seed-action-button--layout_withText"
          >
            <IconAddRegular style={{ width: 'var(--seed-prefix-icon-size)', height: 'var(--seed-prefix-icon-size)', color: 'var(--seed-prefix-icon-color)' }} />
            글쓰기
          </button>
          <button
            type="button"
            className="seed-action-button seed-action-button--variant_neutralWeak seed-action-button--size_medium seed-action-button--size_medium-layout_withText seed-action-button--layout_withText"
          >
            더보기
            <IconChevronRightRegular style={{ width: 'var(--seed-suffix-icon-size)', height: 'var(--seed-suffix-icon-size)', color: 'var(--seed-suffix-icon-color)' }} />
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
    // Footer 버튼은 이미 구현한 seed-action-button 재사용 (docs/examples/react/alert-dialog/critical.tsx: 확인 버튼만 criticalSolid).
    // 버튼 배치는 ResponsivePair(packages/react/src/components/ResponsivePair/ResponsivePair.tsx)를 그대로 재현 —
    // 별도 BEM 클래스가 없는 순수 레이아웃 유틸이라 flexWrap + seed-action-button이 원래 읽는
    // --seed-box-min-width/--seed-box-flex-grow 변수를 동일하게 사용해 재현.
    // position 조정 없음: .seed-dialog__positioner/backdrop는 원래 클래스 그대로(position: fixed) 사용.
    // 캐러셀 상위(.comp-carousel-track)에 항상 transform이 걸려 있어서, CSS 스펙상 position:fixed 자손의
    // containing block이 뷰포트가 아니라 그 transform 조상으로 바뀐다 — 그 결과 별도 override 없이도
    // "전체 화면(=카드 슬라이드 전체)을 덮는" 진짜 fixed 동작이 카드 안에서 자연스럽게 재현됨.
    demo: (
      <>
        <div className="seed-dialog__positioner">
          <div className="seed-dialog__backdrop" />
          <div className="seed-dialog__content" data-state="open">
            <div className="seed-dialog__header">
              <h2 className="seed-dialog__title">삭제하시겠어요?</h2>
              <p className="seed-dialog__description">삭제한 게시글은 복구할 수 없어요.</p>
            </div>
            <div className="seed-dialog__footer">
              <div style={{ display: 'flex', flexWrap: 'wrap-reverse', gap: 'var(--seed-dimension-x2)' }}>
                <button
                  type="button"
                  className="seed-action-button seed-action-button--variant_neutralWeak seed-action-button--size_medium seed-action-button--size_medium-layout_withText seed-action-button--layout_withText"
                  style={{ flexGrow: 'var(--seed-box-flex-grow)', minWidth: 'calc(50% - var(--seed-dimension-x2) / 2)' }}
                >
                  취소
                </button>
                <button
                  type="button"
                  className="seed-action-button seed-action-button--variant_criticalSolid seed-action-button--size_medium seed-action-button--size_medium-layout_withText seed-action-button--layout_withText"
                  style={{ flexGrow: 'var(--seed-box-flex-grow)', minWidth: 'calc(50% - var(--seed-dimension-x2) / 2)' }}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

export function ComponentGallery() {
  const [cur, setCur] = useState(0)
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
      <div className="comp-carousel-wrap">
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

import { useState, useRef, useEffect } from 'react'

const COMPONENTS = [
  /* 1. Badge ─────────────────────────────────────────────
     root: seed-badge__root
     size: --size_medium | --size_large
     tone+variant: --tone_{tone}-variant_{variant}
     tones: neutral | brand | informative | positive | warning | critical
     variants: weak | solid | outline
     label: seed-badge__label
  ────────────────────────────────────────────────────── */
  {
    name: 'Badge',
    slug: 'ui:badge',
    demo: (
      <div style={{ display:'flex', flexWrap:'wrap', gap:8, justifyContent:'center' }}>
        {[
          ['brand',       'solid'],
          ['brand',       'weak'],
          ['brand',       'outline'],
          ['neutral',     'solid'],
          ['neutral',     'weak'],
          ['neutral',     'outline'],
          ['informative', 'weak'],
          ['positive',    'weak'],
          ['warning',     'weak'],
          ['critical',    'solid'],
          ['critical',    'weak'],
        ].map(([tone, variant]) => (
          <span key={`${tone}-${variant}`}
            className={`seed-badge__root seed-badge__root--size_medium seed-badge__root--tone_${tone}-variant_${variant}`}>
            <span className="seed-badge__label">{tone} · {variant}</span>
          </span>
        ))}
        <span className="seed-badge__root seed-badge__root--size_large seed-badge__root--tone_brand-variant_solid">
          <span className="seed-badge__label">large</span>
        </span>
      </div>
    ),
  },

  /* 2. Callout ────────────────────────────────────────────
     root: seed-callout__root  (div | button | a)
     tone: --tone_neutral | informative | positive | warning | critical | magic
     slots: seed-callout__content > seed-callout__title + seed-callout__description
     tone modifier: root / title / description 모두 --tone_* 붙임
     (size 수식어 없음)
  ────────────────────────────────────────────────────── */
  {
    name: 'Callout',
    slug: 'ui:callout',
    demo: (
      <div style={{ display:'flex', flexDirection:'column', gap:8, width:'100%' }}>
        {[
          { tone:'neutral',     title:'안내',  desc:'중립적인 정보를 전달합니다.' },
          { tone:'informative', title:'정보',  desc:'참고할 정보를 전달합니다.' },
          { tone:'positive',    title:'성공',  desc:'작업이 완료됐습니다.' },
          { tone:'warning',     title:'주의',  desc:'진행 전에 확인이 필요합니다.' },
          { tone:'critical',    title:'오류',  desc:'문제가 발생했습니다.' },
          { tone:'magic',       title:'Magic', desc:'그라디언트 배경의 특별한 강조입니다.' },
        ].map(({ tone, title, desc }) => (
          <div key={tone} className={`seed-callout__root seed-callout__root--tone_${tone}`}>
            <div className="seed-callout__content">
              <span className={`seed-callout__title seed-callout__title--tone_${tone}`}>{title}</span>
              <span className={`seed-callout__description seed-callout__description--tone_${tone}`}>{desc}</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },

  /* 3. Content Placeholder ────────────────────────────────
     root: seed-content-placeholder__root  (width/height 100% → 부모가 크기 결정)
     asset: seed-content-placeholder__asset  (SVG or img, height 50%)
     (variant/tone 없음 — 배경은 gray-200 고정)
  ────────────────────────────────────────────────────── */
  {
    name: 'Content Placeholder',
    slug: 'ui:content-placeholder',
    demo: (
      <div className="seed-content-placeholder__root"
        style={{ width:240, height:160, borderRadius:16 }}>
        {/* asset 슬롯: SVG 아이콘 자리 — 실제로는 이미지/SVG를 넣음 */}
        <svg className="seed-content-placeholder__asset"
          viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="10" width="36" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="2.5"/>
          <circle cx="18" cy="20" r="4" fill="none" stroke="currentColor" strokeWidth="2.5"/>
          <path d="M6 32l10-8 8 6 6-5 12 9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
        </svg>
      </div>
    ),
  },

  /* 4. Identity Placeholder ───────────────────────────────
     root: seed-identity-placeholder__root  (width/height 100% → 부모가 크기 결정)
     image: seed-identity-placeholder__image  (실제 아바타 이미지 자리)
     (variant/tone/size 없음 — 배경 gray-500 고정)
  ────────────────────────────────────────────────────── */
  {
    name: 'Identity Placeholder',
    slug: 'ui:identity-placeholder',
    demo: (
      <div style={{ display:'flex', gap:16, alignItems:'center' }}>
        {/* 원형 아바타 */}
        <div className="seed-identity-placeholder__root"
          style={{ width:64, height:64, borderRadius:'50%', overflow:'hidden' }}>
          <svg className="seed-identity-placeholder__image"
            viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="26" r="12" fill="rgba(255,255,255,0.8)"/>
            <ellipse cx="32" cy="54" rx="20" ry="14" fill="rgba(255,255,255,0.8)"/>
          </svg>
        </div>
        {/* 사각형 */}
        <div className="seed-identity-placeholder__root"
          style={{ width:64, height:64, borderRadius:12, overflow:'hidden' }}>
          <svg className="seed-identity-placeholder__image"
            viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="26" r="12" fill="rgba(255,255,255,0.8)"/>
            <ellipse cx="32" cy="54" rx="20" ry="14" fill="rgba(255,255,255,0.8)"/>
          </svg>
        </div>
      </div>
    ),
  },

  /* 5. Inline Banner ──────────────────────────────────────
     root: seed-inline-banner__root + --variant_{variant}
     variants: neutralWeak | positiveWeak | informativeWeak | warningWeak | warningSolid | criticalWeak | criticalSolid | magicWeak
     slots: seed-inline-banner__content > seed-inline-banner__title + seed-inline-banner__description
            + seed-inline-banner__link (선택)  + seed-inline-banner__closeButton (선택)
     tone modifier: title / description / link 도 --variant_* 붙임
  ────────────────────────────────────────────────────── */
  {
    name: 'Inline Banner',
    slug: 'ui:inline-banner',
    demo: (
      <div style={{ display:'flex', flexDirection:'column', gap:8, width:'100%' }}>
        {[
          { v:'neutralWeak',     title:'안내', desc:'중립 배너입니다.' },
          { v:'informativeWeak', title:'정보', desc:'참고할 내용이 있습니다.' },
          { v:'positiveWeak',    title:'성공', desc:'완료됐습니다.' },
          { v:'warningWeak',     title:'주의', desc:'확인이 필요합니다.' },
          { v:'criticalWeak',    title:'오류', desc:'문제가 발생했습니다.' },
        ].map(({ v, title, desc }) => (
          <div key={v} className={`seed-inline-banner__root seed-inline-banner__root--variant_${v}`}>
            <div className="seed-inline-banner__content">
              <span className={`seed-inline-banner__title seed-inline-banner__title--variant_${v}`}>{title}</span>
              <span className={`seed-inline-banner__description seed-inline-banner__description--variant_${v}`}>{desc}</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },

  /* 6. Notification Badge ─────────────────────────────────
     root: seed-notification-badge  (BEM 없음, 단일 클래스)
     size: --size_small (점) | --size_large (숫자)
     (tone/variant 없음 — 배경 brand-solid 고정)
  ────────────────────────────────────────────────────── */
  {
    name: 'Notification Badge',
    slug: 'ui:notification-badge',
    demo: (
      <div style={{ display:'flex', gap:40, alignItems:'center' }}>
        {/* size_small — 점 형태 */}
        <div style={{ position:'relative', display:'inline-block' }}>
          <div style={{ width:48, height:48, borderRadius:14,
            border:'1.5px solid var(--seed-color-stroke-neutral)',
            background:'var(--seed-color-bg-layer-default)',
            display:'flex', alignItems:'center', justifyContent:'center' }}>
            <img src="/icons/icon_notification_fill.svg" width={24} height={24} alt="" />
          </div>
          <span className="seed-notification-badge seed-notification-badge--size_small"
            style={{ position:'absolute', top:8, right:8 }} />
        </div>
        {/* size_large — 숫자 형태 */}
        <div style={{ position:'relative', display:'inline-block' }}>
          <div style={{ width:48, height:48, borderRadius:14,
            border:'1.5px solid var(--seed-color-stroke-neutral)',
            background:'var(--seed-color-bg-layer-default)',
            display:'flex', alignItems:'center', justifyContent:'center' }}>
            <img src="/icons/icon_chatting_fill.svg" width={24} height={24} alt="" />
          </div>
          <span className="seed-notification-badge seed-notification-badge--size_large"
            style={{ position:'absolute', top:2, right:2,
              border:'2px solid var(--seed-color-bg-layer-default)' }}>
            12
          </span>
        </div>
      </div>
    ),
  },

  /* 7. Page Banner ────────────────────────────────────────
     root: seed-page-banner__root + --tone_{tone}-variant_{variant}
     tones: neutral | informative | positive | warning | critical | magic
     variants: weak | solid
     slots: seed-page-banner__content > seed-page-banner__body
               > seed-page-banner__title + seed-page-banner__description
             + seed-page-banner__button (CTA)
     tone+variant modifier: root / title / description / button 모두 붙임
  ────────────────────────────────────────────────────── */
  {
    name: 'Page Banner',
    slug: 'ui:page-banner',
    demo: (
      <div style={{ display:'flex', flexDirection:'column', gap:8, width:'100%' }}>
        {[
          { tone:'neutral',     variant:'weak',  title:'안내 배너',  desc:'중립 배경입니다.' },
          { tone:'informative', variant:'weak',  title:'정보 배너',  desc:'참고 내용입니다.' },
          { tone:'positive',    variant:'weak',  title:'성공 배너',  desc:'완료됐습니다.' },
          { tone:'warning',     variant:'solid', title:'주의 배너',  desc:'확인이 필요합니다.' },
          { tone:'critical',    variant:'solid', title:'오류 배너',  desc:'문제 발생.' },
          { tone:'magic',       variant:'weak',  title:'Magic 배너', desc:'그라디언트 강조입니다.' },
        ].map(({ tone, variant, title, desc }) => (
          <div key={`${tone}-${variant}`}
            className={`seed-page-banner__root seed-page-banner__root--tone_${tone}-variant_${variant}`}>
            <div className="seed-page-banner__content">
              <div className="seed-page-banner__body">
                <span className={`seed-page-banner__title seed-page-banner__title--tone_${tone}-variant_${variant}`}>{title}</span>
                <span className={`seed-page-banner__description seed-page-banner__description--tone_${tone}-variant_${variant}`}>{desc}</span>
              </div>
              <button className={`seed-page-banner__button seed-page-banner__button--tone_${tone}-variant_${variant}`}>
                자세히
              </button>
            </div>
          </div>
        ))}
      </div>
    ),
  },

  /* 8. Skeleton ───────────────────────────────────────────
     root: seed-skeleton  (단일 클래스, BEM 없음)
     radius: --radius_0 | --radius_8 | --radius_16 | --radius_full
     tone:   --tone_neutral | --tone_magic
     크기:   CSS 변수 --seed-box-width-base / --seed-box-height-base 로 지정
     (::after pseudo 로 shimmer 애니메이션)
  ────────────────────────────────────────────────────── */
  {
    name: 'Skeleton',
    slug: 'ui:skeleton',
    demo: (
      <div style={{ display:'flex', flexDirection:'column', gap:14, width:260 }}>
        {/* 카드 형태 */}
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <span className="seed-skeleton seed-skeleton--radius_full seed-skeleton--tone_neutral"
            style={{ '--seed-box-width-base':'48px', '--seed-box-height-base':'48px', flexShrink:0 }} />
          <div style={{ flex:1, display:'flex', flexDirection:'column', gap:8 }}>
            <span className="seed-skeleton seed-skeleton--radius_8 seed-skeleton--tone_neutral"
              style={{ '--seed-box-width-base':'100%', '--seed-box-height-base':'14px' }} />
            <span className="seed-skeleton seed-skeleton--radius_8 seed-skeleton--tone_neutral"
              style={{ '--seed-box-width-base':'65%', '--seed-box-height-base':'12px' }} />
          </div>
        </div>
        <span className="seed-skeleton seed-skeleton--radius_16 seed-skeleton--tone_neutral"
          style={{ '--seed-box-width-base':'100%', '--seed-box-height-base':'100px' }} />
        {/* magic tone */}
        <span className="seed-skeleton seed-skeleton--radius_8 seed-skeleton--tone_magic"
          style={{ '--seed-box-width-base':'100%', '--seed-box-height-base':'14px' }} />
      </div>
    ),
  },

  /* 9. Text ───────────────────────────────────────────────
     root: seed-text  (단일 클래스, BEM 없음)
     textStyle: --textStyle_{scale}{Static?}{Weight}
       scale: t1~t14  /  Static: 없으면 fluid, Static이면 고정
       weight: Regular | Medium | Bold
     color:    CSS 변수 직접 지정 (color 토큰 없음)
     maxLines: --maxLines_none | --maxLines_single | --maxLines_multi
     textDecorationLine: --textDecorationLine_none | line-through | underline
  ────────────────────────────────────────────────────── */
  {
    name: 'Text',
    slug: 'ui:text',
    demo: (
      <div style={{ display:'flex', flexDirection:'column', gap:10, width:'100%',
        color:'var(--seed-color-fg-neutral)' }}>
        {[
          { style:'t9StaticBold',    label:'t9 · Bold (제목)' },
          { style:'t7StaticBold',    label:'t7 · Bold (소제목)' },
          { style:'t5StaticMedium',  label:'t5 · Medium (본문)' },
          { style:'t4StaticRegular', label:'t4 · Regular (본문 작은)' },
          { style:'t3StaticRegular', label:'t3 · Regular (캡션)' },
          { style:'t2StaticMedium',  label:'t2 · Medium (레이블)' },
          { style:'t1StaticRegular', label:'t1 · Regular (최소)' },
        ].map(({ style, label }) => (
          <span key={style} className={`seed-text seed-text--textStyle_${style}`}>{label}</span>
        ))}
        {/* maxLines */}
        <span className="seed-text seed-text--textStyle_t4StaticRegular seed-text--maxLines_single"
          style={{ maxWidth:240, color:'var(--seed-color-fg-neutral-subtle)' }}>
          말줄임 single — 이 텍스트는 너무 길어서 한 줄을 넘어가면 ...으로 잘립니다.
        </span>
      </div>
    ),
  },

  /* 10. Article ───────────────────────────────────────────
     root: seed-article  (단일 클래스, BEM 없음)
     기능: word-break / overflow-wrap / line-break 제어
     (variant/tone/size 없음)
  ────────────────────────────────────────────────────── */
  {
    name: 'Article',
    slug: 'ui:article',
    demo: (
      <div className="seed-article"
        style={{ maxWidth:360, color:'var(--seed-color-fg-neutral)',
          fontSize:'var(--seed-font-size-t4)', lineHeight:'var(--seed-line-height-t4)' }}>
        <p style={{ marginBottom:8, fontWeight:'var(--seed-font-weight-bold)' }}>
          Article 컴포넌트
        </p>
        <p>
          word-break · overflow-wrap · line-break를 제어해 한국어 환경에서도
          올바른 줄바꿈을 보장합니다. <code>:lang(ko)</code> 에서는
          <code>word-break: keep-all</code>이 자동 적용됩니다.
        </p>
      </div>
    ),
  },

  /* 11. Aspect Ratio ──────────────────────────────────────
     root: seed-aspect-ratio  (단일 클래스, BEM 없음, position:relative 필요)
     비율: CSS 변수 --seed-aspect-ratio-padding 으로 지정
       기본값 75% = 4:3  /  56.25% = 16:9  /  100% = 1:1
     자식 요소는 position:absolute inset:0 으로 자동 채워짐
  ────────────────────────────────────────────────────── */
  {
    name: 'Aspect Ratio',
    slug: 'ui:aspect-ratio',
    demo: (
      <div style={{ display:'flex', gap:16, alignItems:'flex-start', width:'100%' }}>
        {[
          { label:'1:1',  padding:'100%',    w:120 },
          { label:'4:3',  padding:'75%',     w:160 },
          { label:'16:9', padding:'56.25%',  w:200 },
        ].map(({ label, padding, w }) => (
          <div key={label} style={{ width:w }}>
            <div className="seed-aspect-ratio"
              style={{ position:'relative', '--seed-aspect-ratio-padding': padding,
                borderRadius:8, overflow:'hidden',
                background:'var(--seed-color-palette-gray-200)' }}>
              <span style={{ color:'var(--seed-color-fg-neutral-subtle)',
                fontSize:'var(--seed-font-size-t3)' }}>{label}</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },

  /* 12. Avatar ────────────────────────────────────────────
     root: seed-avatar__root + --size_{size} + --badgeMask_{badgeMask}
     sizes: 20 | 24 | 36 | 42 | 48 | 56 | 64 | 80 | 96 | 108
     badgeMask: none | circle | flower | shield
     slots: seed-avatar__image (img/실제 이미지)
            seed-avatar__fallback (이미지 로드 실패 시)
            seed-avatar__badge (뱃지 슬롯)
     image, fallback 모두 --size_* 수식어 붙임
  ────────────────────────────────────────────────────── */
  {
    name: 'Avatar',
    slug: 'ui:avatar',
    demo: (
      <div style={{ display:'flex', gap:20, alignItems:'center', flexWrap:'wrap' }}>
        {[20, 36, 48, 64, 80].map(size => (
          <div key={size} className={`seed-avatar__root seed-avatar__root--size_${size} seed-avatar__root--badgeMask_none`}>
            {/* fallback — 이미지 없을 때 Identity Placeholder로 표현 */}
            <div className={`seed-avatar__fallback seed-avatar__fallback--size_${size}`}
              style={{ width:`${size}px`, height:`${size}px`, borderRadius:'50%', overflow:'hidden',
                background:'var(--seed-color-palette-gray-500)' }}>
              <svg viewBox="0 0 64 64" fill="none" style={{ width:'100%', height:'100%' }}>
                <circle cx="32" cy="26" r="12" fill="rgba(255,255,255,0.8)"/>
                <ellipse cx="32" cy="54" rx="20" ry="14" fill="rgba(255,255,255,0.8)"/>
              </svg>
            </div>
          </div>
        ))}
      </div>
    ),
  },

  /* 13. Avatar Stack ──────────────────────────────────────
     root: seed-avatar-stack__root
     item: seed-avatar-stack__item + --size_{size}
     sizes: 20 | 24 | 36 | 42 | 48 | 56 | 64 | 80 | 96 | 108
     겹침: :not(:first-child) margin-left 음수로 자동 처리
     테두리: box-shadow inset + clip-path inset
  ────────────────────────────────────────────────────── */
  {
    name: 'Avatar Stack',
    slug: 'ui:avatar-stack',
    demo: (
      <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
        {[36, 48].map(size => (
          <div key={size} className="seed-avatar-stack__root">
            {[1,2,3,4].map(i => (
              <div key={i}
                className={`seed-avatar-stack__item seed-avatar-stack__item--size_${size}`}
                style={{ width:size, height:size, borderRadius:'50%', overflow:'hidden',
                  background:`hsl(${i*60} 40% 60%)`, flexShrink:0 }}>
                <svg viewBox="0 0 64 64" fill="none" style={{ width:'100%', height:'100%' }}>
                  <circle cx="32" cy="26" r="12" fill="rgba(255,255,255,0.8)"/>
                  <ellipse cx="32" cy="54" rx="20" ry="14" fill="rgba(255,255,255,0.8)"/>
                </svg>
              </div>
            ))}
          </div>
        ))}
      </div>
    ),
  },

  /* 14. Image Frame ───────────────────────────────────────
     root: seed-image-frame__root + --stroke_{stroke}
     stroke: true | false  → true면 ::after inset box-shadow 테두리
     slots: seed-image-frame__content (img, data-loading-state='loaded' 시 표시)
            seed-image-frame__fallback (로드 전/실패 시, data-loading-state='loaded' 시 hide)
     크기·둥글기: 부모가 결정 (border-radius: inherit)
  ────────────────────────────────────────────────────── */
  {
    name: 'Image Frame',
    slug: 'ui:image-frame',
    demo: (
      <div style={{ display:'flex', gap:16, alignItems:'center' }}>
        {/* stroke: false */}
        <div style={{ width:120, height:120, borderRadius:12 }}>
          <div className="seed-image-frame__root seed-image-frame__root--stroke_false">
            <div className="seed-image-frame__fallback"
              style={{ background:'var(--seed-color-palette-gray-200)',
                display:'flex', alignItems:'center', justifyContent:'center',
                width:120, height:120, borderRadius:12 }}>
              <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                <rect x="6" y="10" width="36" height="28" rx="4" fill="none"
                  stroke="var(--seed-color-palette-gray-400)" strokeWidth="2.5"/>
                <circle cx="18" cy="20" r="4" fill="none"
                  stroke="var(--seed-color-palette-gray-400)" strokeWidth="2.5"/>
                <path d="M6 32l10-8 8 6 6-5 12 9" fill="none"
                  stroke="var(--seed-color-palette-gray-400)" strokeWidth="2.5" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <span style={{ fontSize:11, color:'var(--seed-color-fg-neutral-subtle)',
            display:'block', textAlign:'center', marginTop:4 }}>stroke: false</span>
        </div>
        {/* stroke: true */}
        <div style={{ width:120, height:120, borderRadius:12 }}>
          <div className="seed-image-frame__root seed-image-frame__root--stroke_true">
            <div className="seed-image-frame__fallback"
              style={{ background:'var(--seed-color-palette-gray-200)',
                display:'flex', alignItems:'center', justifyContent:'center',
                width:120, height:120, borderRadius:12 }}>
              <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                <rect x="6" y="10" width="36" height="28" rx="4" fill="none"
                  stroke="var(--seed-color-palette-gray-400)" strokeWidth="2.5"/>
                <circle cx="18" cy="20" r="4" fill="none"
                  stroke="var(--seed-color-palette-gray-400)" strokeWidth="2.5"/>
                <path d="M6 32l10-8 8 6 6-5 12 9" fill="none"
                  stroke="var(--seed-color-palette-gray-400)" strokeWidth="2.5" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <span style={{ fontSize:11, color:'var(--seed-color-fg-neutral-subtle)',
            display:'block', textAlign:'center', marginTop:4 }}>stroke: true</span>
        </div>
      </div>
    ),
  },

  /* 15. Link Content ──────────────────────────────────────
     root: seed-link-content (단일 클래스, BEM 없음)
     size: --size_t4 | --size_t5 | --size_t6
     weight: --weight_regular | --weight_bold
     color: CSS 변수 --seed-box-color 로 지정
  ────────────────────────────────────────────────────── */
  {
    name: 'Link Content',
    slug: 'ui:link-content',
    demo: (
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {[
          { size:'t6', weight:'bold',    label:'t6 · Bold 링크' },
          { size:'t5', weight:'regular', label:'t5 · Regular 링크' },
          { size:'t4', weight:'bold',    label:'t4 · Bold 링크' },
        ].map(({ size, weight, label }) => (
          <a key={`${size}-${weight}`} href="#"
            className={`seed-link-content seed-link-content--size_${size} seed-link-content--weight_${weight}`}
            style={{ '--seed-box-color': 'var(--seed-color-fg-brand)' }}
            onClick={e => e.preventDefault()}>
            {label}
          </a>
        ))}
      </div>
    ),
  },

  /* 16. List Header ───────────────────────────────────────
     root: seed-list-header + --variant_{variant}
     variants: mediumWeak (회색 중간) | boldSolid (진한 검정)
     (size 없음, padding은 global gutter 토큰 사용)
  ────────────────────────────────────────────────────── */
  {
    name: 'List Header',
    slug: 'ui:list-header',
    demo: (
      <div style={{ display:'flex', flexDirection:'column', gap:8, width:'100%' }}>
        <div className="seed-list-header seed-list-header--variant_mediumWeak">
          mediumWeak 헤더
        </div>
        <div className="seed-list-header seed-list-header--variant_boldSolid">
          boldSolid 헤더
        </div>
      </div>
    ),
  },

  /* 17. Manner Temp ───────────────────────────────────────
     root: seed-manner-temp + --level_{level}
     levels: l1~l10  (낮을수록 차가운 색, 높을수록 따뜻한 색)
     CSS 변수: --seed-color-manner-temp-{level}-text
     (suffix icon 슬롯 있음 — 온도계 아이콘 자리)
  ────────────────────────────────────────────────────── */
  {
    name: 'Manner Temp',
    slug: 'ui:manner-temp',
    demo: (
      <div style={{ display:'flex', flexWrap:'wrap', gap:'8px 16px' }}>
        {[
          { level:'l1',  temp:'23.5°C' },
          { level:'l3',  temp:'36.5°C' },
          { level:'l5',  temp:'45.0°C' },
          { level:'l7',  temp:'55.5°C' },
          { level:'l9',  temp:'68.0°C' },
          { level:'l10', temp:'79.9°C' },
        ].map(({ level, temp }) => (
          <span key={level} className={`seed-manner-temp seed-manner-temp--level_${level}`}>
            {temp}
          </span>
        ))}
      </div>
    ),
  },

  /* 18. Tag Group ─────────────────────────────────────────
     root: seed-tag-group__root + --size_{size}-truncate_{truncate}
     separator: seed-tag-group__separator + --size_{size} + --truncate_{truncate}
     item: seed-tag-group-item__root + seed-tag-group-item__label + --size_* --tone_* --weight_*
     sizes: t2 | t3 | t4
     truncate: true (ellipsis) | false (wrap)
     tones: neutralSubtle | neutral | brand
  ────────────────────────────────────────────────────── */
  {
    name: 'Tag Group',
    slug: 'ui:tag-group',
    demo: (
      <div style={{ display:'flex', flexDirection:'column', gap:16, width:'100%' }}>
        {/* t4, truncate false */}
        <div className="seed-tag-group__root seed-tag-group__root--size_t4-truncate_false">
          {[
            { tone:'brand',         label:'브랜드' },
            { tone:'neutral',       label:'중립' },
            { tone:'neutralSubtle', label:'연한 중립' },
          ].map(({ tone, label }, i, arr) => (
            <>
              <span key={tone}
                className={`seed-tag-group-item__root seed-tag-group-item__root--size_t4 seed-tag-group-item__root--tone_${tone}`}>
                <span className={`seed-tag-group-item__label seed-tag-group-item__label--size_t4 seed-tag-group-item__label--tone_${tone} seed-tag-group-item__label--weight_regular`}>
                  {label}
                </span>
              </span>
              {i < arr.length - 1 && (
                <span className="seed-tag-group__separator seed-tag-group__separator--size_t4 seed-tag-group__separator--truncate_false">
                  {' · '}
                </span>
              )}
            </>
          ))}
        </div>
        {/* t3, truncate true (말줄임) */}
        <div className="seed-tag-group__root seed-tag-group__root--size_t3-truncate_true"
          style={{ maxWidth:200 }}>
          <span className="seed-tag-group-item__root seed-tag-group-item__root--size_t3 seed-tag-group-item__root--tone_neutral">
            <span className="seed-tag-group-item__label seed-tag-group-item__label--size_t3 seed-tag-group-item__label--tone_neutral seed-tag-group-item__label--weight_regular">
              너무 긴 태그 텍스트는 말줄임 처리됩니다
            </span>
          </span>
        </div>
      </div>
    ),
  },
]

/* ── 캐러셀 갤러리 ──────────────────────────────────────── */
export function ComponentGallery() {
  const [cur, setCur] = useState(0)
  const navRef  = useRef(null)
  const wrapRef = useRef(null)
  const total   = COMPONENTS.length

  const go = (idx) => {
    const next = Math.max(0, Math.min(total - 1, idx))
    setCur(next)
    // wrap이 flex 컨테이너 — scrollLeft로 정확히 이동
    if (wrapRef.current) {
      wrapRef.current.scrollLeft = next * wrapRef.current.clientWidth
    }
  }

  useEffect(() => {
    navRef.current?.children[cur]
      ?.scrollIntoView({ behavior:'smooth', block:'nearest', inline:'center' })
  }, [cur])

  return (
    <section id="showcase">
      <div style={{ marginBottom:16 }}>
        <h2 style={{ fontSize:19, fontWeight:700, marginBottom:6 }}>Components Gallery</h2>
        <p style={{ fontSize:13.5, color:'#4B5563' }}>
          <code>@seed-design/css/recipes/*.css</code> 실제 클래스 구조 재현.
          List Item까지 검수 완료.
        </p>
      </div>

      {/* 토글 네비 */}
      <div className="comp-nav" ref={navRef}>
        {COMPONENTS.map((c, i) => (
          <button key={c.name}
            className={`comp-nav-btn${i === cur ? ' active' : ''}`}
            onClick={() => go(i)}>
            {c.name}
          </button>
        ))}
      </div>

      {/* 캐러셀 — wrap이 flex 컨테이너, overflow-x:hidden + scrollLeft로 슬라이드 이동 */}
      <div className="comp-carousel-wrap" ref={wrapRef}>
        {COMPONENTS.map((c) => (
          <div key={c.name} className="comp-carousel-slide">
            {c.demo}
          </div>
        ))}
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
          <button key={i} className={`comp-dot${i === cur ? ' active' : ''}`}
            onClick={() => go(i)} aria-label={COMPONENTS[i].name} />
        ))}
      </div>
    </section>
  )
}

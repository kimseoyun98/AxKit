import { useState, useRef, useEffect } from 'react'
import {
  IconCheckFill,
  IconSearchRegular,
  IconArticleRegular,
  IconChevronRightRegular,
  IconCloseRegular,
  IconReviewStarFill,
  IconArrowDownwardRegular,
  IconAddRegular,
  IconSubtractionRegular,
  IconArrowDropDownRegular,
} from "@seed-design/icon"

const COMPONENTS = [
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

  {
    name: 'Content Placeholder',
    slug: 'ui:content-placeholder',
    demo: (
      <div className="seed-content-placeholder__root"
        style={{ width:240, height:160, borderRadius:16 }}>
        {/* asset 슬롯: SVG 아이콘 자리 — 실제로는 이미지/SVG를 넣음 */}
        <svg className="seed-content-placeholder__asset"
          viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="10" width="36" height="28" rx="4" stroke="currentColor" strokeWidth="2.5"/>
          <circle cx="18" cy="20" r="4" stroke="currentColor" strokeWidth="2.5"/>
          <path d="M6 32l10-8 8 6 6-5 12 9" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
        </svg>
      </div>
    ),
  },

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

  {
    name: "Inline Banner",
    slug: "ui:inline-banner",
    demo: (
      <div className="seed-inline-banner__root seed-inline-banner__root--variant_neutralWeak" style={{ width: "100%" }}>
        <IconArticleRegular 
          style={{ 
            width: "var(--seed-prefix-icon-size)", 
            height: "var(--seed-prefix-icon-size)", 
            color: "var(--seed-prefix-icon-color)", 
            marginRight: "var(--seed-prefix-icon-margin-right)", 
            marginTop: "var(--seed-prefix-icon-margin-top)",
            flexShrink: 0
          }} 
        />
        <div className="seed-inline-banner__content">
          <span className="seed-inline-banner__title seed-inline-banner__title--variant_neutralWeak">공지사항</span>
          <span className="seed-inline-banner__description seed-inline-banner__description--variant_neutralWeak">새로운 기능이 추가되었습니다.</span>
        </div>
        <button className="seed-inline-banner__link seed-inline-banner__link--variant_neutralWeak">바로가기</button>
        <button className="seed-inline-banner__closeButton">
          <IconCloseRegular 
            style={{ 
              width: "var(--seed-suffix-icon-size)", 
              height: "var(--seed-suffix-icon-size)", 
              color: "var(--seed-suffix-icon-color)", 
              marginLeft: "var(--seed-suffix-icon-margin-left)", 
              alignSelf: "var(--seed-suffix-icon-align-self)",
              flexShrink: 0
            }} 
          />
        </button>
      </div>
    ),
  },

  {
    name: 'Notification Badge',
    slug: 'ui:notification-badge',
    demo: (
      <div style={{ display:'flex', gap:32, alignItems:'center' }}>
        {/* size_small — 점 형태 */}
        <div style={{ position:'relative', display:'inline-block' }}>
          <div style={{ width:44, height:44, borderRadius:12,
            border:'1.5px solid var(--seed-color-stroke-neutral)',
            background:'var(--seed-color-bg-layer-default)',
            display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontSize:20 }}>🔔</span>
          </div>
          <span className="seed-notification-badge seed-notification-badge--size_small"
            style={{ position:'absolute', top:6, right:6 }} />
        </div>
        {/* size_large — 숫자 형태 */}
        <div style={{ position:'relative', display:'inline-block' }}>
          <div style={{ width:44, height:44, borderRadius:12,
            border:'1.5px solid var(--seed-color-stroke-neutral)',
            background:'var(--seed-color-bg-layer-default)',
            display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontSize:20 }}>✉️</span>
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
            <span style={{ fontSize:10, color:'var(--seed-color-fg-neutral-subtle)',
              display:'block', textAlign:'center', marginTop:4 }}>{size}</span>
          </div>
        ))}
      </div>
    ),
  },

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

  /* Manner Temp */
  {
    name: "Manner Temp",
    slug: "ui:manner-temp",
    demo: (<div>구현 x</div>),
  },

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

  {
    name: 'App Bar',
    slug: 'ui:app-bar',
    demo: (
      <div style={{ display:'flex', flexDirection:'column', gap:10, width:'100%' }}>
        {[
          { theme:'cupertino', tone:'layer',       h:44, bg:'var(--seed-color-bg-layer-default)', iconClr:'var(--seed-color-fg-neutral)' },
          { theme:'cupertino', tone:'transparent',  h:44, bg:'transparent',                        iconClr:'var(--seed-color-fg-neutral)' },
          { theme:'android',   tone:'layer',       h:56, bg:'var(--seed-color-bg-layer-default)', iconClr:'var(--seed-color-fg-neutral)' },
        ].map(({ theme, tone, h, bg, iconClr }) => (
          <div key={`${theme}-${tone}`}
            className={`seed-app-bar__root seed-app-bar__root--theme_${theme} seed-app-bar__root--tone_${tone}`}
            style={{ display:'flex', alignItems:'center', height:h, padding:'0 16px',
              borderRadius:8, border:'1px solid var(--seed-color-stroke-neutral-subtle)',
              background: bg, position:'relative' }}>
            {/* left: iconButton */}
            <div className={`seed-app-bar__left seed-app-bar__left--theme_${theme}`}>
              <button className={`seed-app-bar__iconButton seed-app-bar__iconButton--theme_${theme}`}
                style={{ width:44, height:44, display:'flex', alignItems:'center', justifyContent:'center',
                  border:'none', background:'transparent', cursor:'pointer' }}>
                <img src="/icons/icon_chevron_left_regular.svg" width={24} height={24} alt="back"
                  style={{ color:iconClr }} />
              </button>
            </div>
            {/* center: title */}
            <span style={{ position:'absolute', left:'50%', transform:'translateX(-50%)',
              fontSize:16, fontWeight:700, color:'var(--seed-color-fg-neutral)' }}>
              {theme} · {tone}
            </span>
            {/* right: iconButton */}
            <div className={`seed-app-bar__right seed-app-bar__right--theme_${theme}`}
              style={{ marginLeft:'auto' }}>
              <button className={`seed-app-bar__iconButton seed-app-bar__iconButton--theme_${theme}`}
                style={{ width:44, height:44, display:'flex', alignItems:'center', justifyContent:'center',
                  border:'none', background:'transparent', cursor:'pointer' }}>
                <img src="/icons/icon_more_vertical_regular.svg" width={24} height={24} alt="more" />
              </button>
            </div>
          </div>
        ))}
      </div>
    ),
  },

  {
    name: 'Attachment Input',
    slug: 'ui:attachment-input',
    demo: (
      <div style={{ display:'flex', flexDirection:'column', gap:12, width:'100%' }}>
        <div className="seed-attachment-input" style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {/* 트리거 버튼 */}
          <button className="seed-attachment-input-trigger seed-attachment-input-trigger--variant_outlined seed-attachment-input-trigger--size_medium"
            style={{ width:80, height:80, borderRadius:12, display:'flex', flexDirection:'column',
              alignItems:'center', justifyContent:'center', gap:4,
              border:'1.5px dashed var(--seed-color-stroke-neutral)',
              background:'var(--seed-color-bg-layer-default)', cursor:'pointer' }}>
            <span style={{ fontSize:20, color:'var(--seed-color-fg-neutral-subtle)' }}>+</span>
            <span style={{ fontSize:11, color:'var(--seed-color-fg-neutral-subtle)' }}>추가</span>
          </button>
          {/* 업로드 아이템 */}
          {[1,2].map(i => (
            <div key={i} className="seed-attachment-input-item seed-attachment-input-item--size_medium"
              style={{ width:80, height:80, borderRadius:12, overflow:'hidden', position:'relative',
                background:'var(--seed-color-palette-gray-300)' }}>
              <svg viewBox="0 0 64 64" fill="none" style={{ width:'100%', height:'100%' }}>
                <rect width="64" height="64" fill={`hsl(${i*40+180} 30% 70%)`}/>
                <circle cx="32" cy="26" r="10" fill="rgba(255,255,255,0.7)"/>
                <ellipse cx="32" cy="52" rx="18" ry="12" fill="rgba(255,255,255,0.7)"/>
              </svg>
              <button style={{ position:'absolute', top:4, right:4, width:18, height:18,
                borderRadius:'50%', background:'rgba(0,0,0,0.5)', color:'#fff',
                fontSize:10, display:'flex', alignItems:'center', justifyContent:'center',
                border:'none', cursor:'pointer' }}>×</button>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  {
    name: 'Bottom Sheet',
    slug: 'ui:bottom-sheet',
    demo: (
      <div className="seed-bottom-sheet__positioner" style={{ position: 'relative', width: 320, height: 240, overflow: 'hidden', border: '1px solid var(--seed-color-stroke-neutral-subtle)', borderRadius: 8, zIndex: 0 }}>
        <div className="seed-bottom-sheet__backdrop" style={{ position: 'absolute' }} />
        <div className="seed-bottom-sheet__content" style={{ position: 'absolute', top: 40 }}>
          <div className="seed-bottom-sheet-handle__root">
            <div className="seed-bottom-sheet-handle__touchArea" />
          </div>
          <div className="seed-bottom-sheet__header seed-bottom-sheet__header--headerAlign_center">
            <span className="seed-bottom-sheet__title seed-bottom-sheet__title--headerAlign_center">Bottom Sheet</span>
          </div>
          <div className="seed-bottom-sheet__body" style={{ padding: 16 }}>
            본문 내용
          </div>
        </div>
      </div>
    ),
  },

  {
    name: 'Checkbox',
    slug: 'ui:checkbox',
    demo: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <label className="seed-checkbox__root seed-checkbox__root--size_medium">
          <input type="checkbox" style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} defaultChecked />
          <div className="seed-checkmark__root seed-checkmark__root--size_medium seed-checkmark__root--variant_square seed-checkmark__root--variant_square-tone_brand" data-checked="">
            <img src="/icons/icon_check_regular.svg" className="seed-checkmark__icon seed-checkmark__icon--variant_square seed-checkmark__icon--variant_square-tone_brand seed-checkmark__icon--size_medium-variant_square" alt="check" />
          </div>
          <span className="seed-checkbox__label seed-checkbox__label--size_medium seed-checkbox__label--weight_regular">
            동의합니다 (Brand)
          </span>
        </label>
        
        <label className="seed-checkbox__root seed-checkbox__root--size_medium">
          <input type="checkbox" style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} defaultChecked />
          <div className="seed-checkmark__root seed-checkmark__root--size_medium seed-checkmark__root--variant_square seed-checkmark__root--variant_square-tone_neutral" data-checked="">
            <img src="/icons/icon_check_regular.svg" className="seed-checkmark__icon seed-checkmark__icon--variant_square seed-checkmark__icon--variant_square-tone_neutral seed-checkmark__icon--size_medium-variant_square" alt="check" />
          </div>
          <span className="seed-checkbox__label seed-checkbox__label--size_medium seed-checkbox__label--weight_regular">
            동의합니다 (Neutral)
          </span>
        </label>
      </div>
    ),
  },

  {
    name: "Chip",
    slug: "ui:chip",
    demo: (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Solid Variants */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button className="seed-chip__root seed-chip__root--size_medium seed-chip__root--variant_solid seed-chip__root--size_medium-layout_withText">
            <span className="seed-chip__label seed-chip__label--size_medium seed-chip__label--variant_solid">
              Solid Chip
            </span>
          </button>
          <button className="seed-chip__root seed-chip__root--size_medium seed-chip__root--variant_solid seed-chip__root--size_medium-layout_withText">
            <span className="seed-chip__prefixIcon seed-chip__prefixIcon--size_medium seed-chip__prefixIcon--variant_solid">
              <IconSearchRegular />
            </span>
            <span className="seed-chip__label seed-chip__label--size_medium seed-chip__label--variant_solid">
              Prefix Icon
            </span>
          </button>
        </div>
        {/* Outline Strong Variants */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button className="seed-chip__root seed-chip__root--size_medium seed-chip__root--variant_outlineStrong seed-chip__root--size_medium-layout_withText">
            <span className="seed-chip__label seed-chip__label--size_medium seed-chip__label--variant_outlineStrong">
              Outline Strong
            </span>
          </button>
          <button className="seed-chip__root seed-chip__root--size_medium seed-chip__root--variant_outlineStrong seed-chip__root--size_medium-layout_withText">
            <span className="seed-chip__label seed-chip__label--size_medium seed-chip__label--variant_outlineStrong">
              Suffix Icon
            </span>
            <span className="seed-chip__suffixIcon seed-chip__suffixIcon--size_medium seed-chip__suffixIcon--variant_outlineStrong">
              <IconCloseRegular />
            </span>
          </button>
        </div>
      </div>
    ),
  },

  {
    name: 'Chip Tabs',
    slug: 'ui:chip-tabs',
    demo: (
      <div style={{ width:'100%' }}>
        <div className="seed-chip-tabs__root">
          <div className="seed-chip-tabs__list" style={{ display:'flex', gap:6, padding:'0 4px', marginBottom:16 }}>
            {['전체','인기','신상품','할인','리뷰'].map((tab, i) => (
              <button key={tab}
                className={`seed-chip-tabs__trigger seed-chip-tabs__trigger--size_medium seed-chip-tabs__trigger--variant_outlined`}
                data-selected={i === 0 ? '' : undefined}
                style={{ padding:'6px 14px', borderRadius:999, border:'1px solid', whiteSpace:'nowrap',
                  borderColor: i===0 ? 'var(--seed-color-palette-carrot-500)' : 'var(--seed-color-stroke-neutral)',
                  background: i===0 ? 'var(--seed-color-palette-carrot-500)' : 'transparent',
                  color: i===0 ? '#fff' : 'var(--seed-color-fg-neutral)',
                  fontSize:13, fontWeight:500, cursor:'pointer' }}>
                {tab}
              </button>
            ))}
          </div>
          <div className="seed-chip-tabs__content" data-selected=""
            style={{ fontSize:14, color:'var(--seed-color-fg-neutral-subtle)', padding:'8px 4px' }}>
            전체 탭 콘텐츠 영역
          </div>
        </div>
      </div>
    ),
  },

  {
    name: 'Content Dialog',
    slug: 'ui:content-dialog',
    demo: (
      <div style={{ width:'100%', maxWidth:320, margin:'0 auto' }}>
        <div className="seed-content-dialog__content"
          data-state="open" data-open=""
          style={{ background:'var(--seed-color-bg-layer-floating)',
            borderRadius:16, padding:24, boxShadow:'var(--seed-shadow-s4)',
            animation:'none' }}>
          <div className="seed-content-dialog__header" style={{ marginBottom:12 }}>
            <p className="seed-content-dialog__title"
              style={{ fontSize:17, fontWeight:700, color:'var(--seed-color-fg-neutral)', marginBottom:6 }}>
              다이얼로그 타이틀
            </p>
            <p className="seed-content-dialog__description"
              style={{ fontSize:14, color:'var(--seed-color-fg-neutral-subtle)', lineHeight:1.5 }}>
              사용자에게 전달할 내용을 여기에 작성합니다.
            </p>
          </div>
          <div className="seed-content-dialog__footer"
            style={{ display:'flex', gap:8, justifyContent:'flex-end', marginTop:20 }}>
            <button style={{ padding:'8px 16px', borderRadius:8, border:'1px solid var(--seed-color-stroke-neutral)',
              background:'transparent', fontSize:14, cursor:'pointer', color:'var(--seed-color-fg-neutral)' }}>
              취소
            </button>
            <button style={{ padding:'8px 16px', borderRadius:8, border:'none',
              background:'var(--seed-color-palette-carrot-500)', color:'#fff',
              fontSize:14, fontWeight:600, cursor:'pointer' }}>
              확인
            </button>
          </div>
        </div>
      </div>
    ),
  },

  {
    name: 'Contextual Floating Button',
    slug: 'ui:contextual-floating-button',
    demo: (
      <div style={{ display:'flex', gap:16, flexWrap:'wrap', alignItems:'center' }}>
        {[
          { variant:'solid',    label:'solid' },
          { variant:'outlined', label:'outlined' },
        ].map(({ variant, label }) => (
          <button key={variant}
            className={`seed-contextual-floating-button seed-contextual-floating-button--variant_${variant} seed-contextual-floating-button--size_medium`}
            style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'10px 18px',
              borderRadius:999, fontWeight:500, fontSize:14,
              border: variant==='outlined' ? '1px solid var(--seed-color-stroke-neutral)' : 'none',
              background: variant==='solid' ? 'var(--seed-color-bg-neutral-inverted)' : 'var(--seed-color-bg-layer-default)',
              color: variant==='solid' ? 'var(--seed-color-fg-neutral-inverted)' : 'var(--seed-color-fg-neutral)',
              boxShadow:'var(--seed-shadow-s3)', cursor:'pointer' }}>
            <img src="/icons/icon_add_regular.svg" width={16} height={16} alt="" style={{ filter: variant==='solid' ? 'invert(1)' : 'none' }} />
            {label}
          </button>
        ))}
      </div>
    ),
  },

  {
    name: 'Control Chip',
    slug: 'ui:control-chip',
    demo: (
      <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
        {[
          { label:'미선택', checked:false },
          { label:'선택됨', checked:true  },
          { label:'필터',   checked:true  },
          { label:'비활성', checked:false, disabled:true },
        ].map(({ label, checked, disabled }) => (
          <button key={label}
            className="seed-control-chip seed-control-chip--size_medium"
            data-checked={checked ? '' : undefined}
            disabled={disabled}
            style={{ display:'inline-flex', alignItems:'center', padding:'7px 14px',
              borderRadius:999, fontSize:14, fontWeight: checked ? 700 : 500,
              border:'none', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1,
              boxShadow: checked ? 'none' : 'inset 0 0 0 1px var(--seed-color-stroke-neutral-muted)',
              background: checked ? 'var(--seed-color-bg-neutral-solid-muted)' : 'transparent',
              color: checked ? 'var(--seed-color-palette-static-white)' : 'var(--seed-color-fg-neutral)' }}>
            {label}
          </button>
        ))}
      </div>
    ),
  },

  {
    name: 'Dialog',
    slug: 'ui:dialog',
    demo: (
      <div style={{ width:'100%', maxWidth:300, margin:'0 auto' }}>
        <div className="seed-dialog__content"
          data-state="open" data-open=""
          style={{ background:'var(--seed-color-bg-layer-floating)',
            borderRadius:16, padding:'24px 20px', boxShadow:'var(--seed-shadow-s4)',
            animation:'none', textAlign:'center' }}>
          <p className="seed-dialog__title"
            style={{ fontSize:17, fontWeight:700, marginBottom:8, color:'var(--seed-color-fg-neutral)' }}>
            정말 삭제하시겠어요?
          </p>
          <p className="seed-dialog__description"
            style={{ fontSize:14, color:'var(--seed-color-fg-neutral-subtle)', lineHeight:1.5, marginBottom:20 }}>
            삭제한 데이터는 복구할 수 없어요.
          </p>
          <div className="seed-dialog__footer" style={{ display:'flex', gap:8 }}>
            <button style={{ flex:1, padding:'12px', borderRadius:10,
              border:'1px solid var(--seed-color-stroke-neutral)', background:'transparent',
              fontSize:15, fontWeight:500, cursor:'pointer', color:'var(--seed-color-fg-neutral)' }}>
              취소
            </button>
            <button style={{ flex:1, padding:'12px', borderRadius:10, border:'none',
              background:'var(--seed-color-palette-red-500)', color:'#fff',
              fontSize:15, fontWeight:700, cursor:'pointer' }}>
              삭제
            </button>
          </div>
        </div>
      </div>
    ),
  },

  {
    name: "Extended Action Sheet",
    slug: "ui:extended-action-sheet",
    demo: (
      <div className="seed-extended-action-sheet__positioner" style={{ position: "relative", zIndex: 1, width: 320, height: 280, overflow: "hidden", border: "1px solid var(--seed-color-stroke-neutral-subtle)", margin: "0 auto" }}>
        <div className="seed-extended-action-sheet__backdrop" data-open style={{ position: "absolute", inset: 0 }} />
        <div className="seed-extended-action-sheet__content" data-open style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <div className="seed-extended-action-sheet__header">
            <span className="seed-extended-action-sheet__title">공유하기</span>
          </div>
          <div className="seed-extended-action-sheet__list">
            <div className="seed-extended-action-sheet__group">
              <button className="seed-extended-action-sheet-item seed-extended-action-sheet-item--tone_neutral" style={{ border: "none", cursor: "pointer", width: "100%", textAlign: "left", margin: 0 }}>
                <IconArticleRegular style={{ width: "var(--seed-prefix-icon-size)", height: "var(--seed-prefix-icon-size)", color: "var(--seed-prefix-icon-color)", flexShrink: 0 }} />
                <span style={{ display: "inline-flex", alignItems: "center" }}>링크 복사</span>
              </button>
              <button className="seed-extended-action-sheet-item seed-extended-action-sheet-item--tone_critical" style={{ border: "none", cursor: "pointer", width: "100%", textAlign: "left", margin: 0 }}>
                <IconArticleRegular style={{ width: "var(--seed-prefix-icon-size)", height: "var(--seed-prefix-icon-size)", color: "var(--seed-prefix-icon-color)", flexShrink: 0 }} />
                <span style={{ display: "inline-flex", alignItems: "center" }}>삭제하기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  {
    name: 'Extended FAB',
    slug: 'ui:extended-fab',
    demo: (
      <div style={{ display:'flex', gap:12, flexWrap:'wrap', alignItems:'center' }}>
        {[
          { variant:'solid',    bg:'var(--seed-color-palette-carrot-500)', color:'#fff' },
          { variant:'outlined', bg:'var(--seed-color-bg-layer-default)',   color:'var(--seed-color-fg-neutral)' },
        ].map(({ variant, bg, color }) => (
          <button key={variant}
            className={`seed-extended-fab seed-extended-fab--variant_${variant} seed-extended-fab--size_medium`}
            style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 20px',
              borderRadius:999, border: variant==='outlined' ? '1px solid var(--seed-color-stroke-neutral)' : 'none',
              background:bg, color, fontWeight:700, fontSize:15,
              boxShadow:'var(--seed-shadow-s3)', cursor:'pointer' }}>
            <span>+</span>
            <span>글쓰기</span>
          </button>
        ))}
      </div>
    ),
  },

  {
    name: 'FAB',
    slug: 'ui:fab',
    demo: (
      <div style={{ display:'flex', gap:16, alignItems:'center' }}>
        {[
          { size:'small',  px:40 },
          { size:'medium', px:52 },
          { size:'large',  px:64 },
        ].map(({ size, px }) => (
          <button key={size}
            className={`seed-fab seed-fab--variant_solid seed-fab--size_${size}`}
            style={{ width:px, height:px, borderRadius:'50%', display:'flex',
              alignItems:'center', justifyContent:'center', border:'none',
              background:'var(--seed-color-palette-carrot-500)',
              boxShadow:'var(--seed-shadow-s3)', cursor:'pointer',
              fontSize: px*0.35, color:'#fff', fontWeight:700 }}>
            +
          </button>
        ))}
        <button
          className="seed-fab seed-fab--variant_outlined seed-fab--size_medium"
          style={{ width:52, height:52, borderRadius:'50%', display:'flex',
            alignItems:'center', justifyContent:'center',
            border:'1px solid var(--seed-color-stroke-neutral)',
            background:'var(--seed-color-bg-layer-default)',
            boxShadow:'var(--seed-shadow-s3)', cursor:'pointer',
            fontSize:20, color:'var(--seed-color-fg-neutral)', fontWeight:700 }}>
          +
        </button>
      </div>
    ),
  },

  {
    name: "Field",
    slug: "ui:field",
    demo: (
      <div className="seed-field__root" style={{ width: 320, margin: "0 auto" }}>
        <div className="seed-field__header">
           <label className="seed-field-label__root seed-field-label__root--weight_bold">
             이름
             <span className="seed-field-label__indicatorText">*</span>
           </label>
        </div>
        <div className="seed-text-input__root seed-text-input__root--variant_outline-size_medium">
           <input className="seed-text-input__value seed-text-input__value--variant_outline-size_medium" placeholder="입력하세요" />
        </div>
        <div className="seed-field__footer">
          <span className="seed-field__description" style={{ display: "inline-flex", alignItems: "flex-start" }}>
            <IconArticleRegular style={{ width: "var(--seed-prefix-icon-size)", height: "var(--seed-prefix-icon-size)", color: "var(--seed-prefix-icon-color)", marginRight: "var(--seed-prefix-icon-margin-right)", marginTop: "var(--seed-prefix-icon-margin-top)", flexShrink: 0 }} />
            <span>설명을 입력해주세요.</span>
          </span>
          <span className="seed-field__characterCountArea">
            <span className="seed-field__characterCount">0</span>
            <span className="seed-field__maxCharacterCount">/100</span>
          </span>
        </div>
      </div>
    ),
  },

  {
    name: 'Floating Action Button',
    slug: 'ui:floating-action-button',
    demo: (
      <div style={{ display:'flex', gap:16, alignItems:'center' }}>
        {[
          { size:'small',  px:40 },
          { size:'medium', px:52 },
          { size:'large',  px:64 },
        ].map(({ size, px }) => (
          <button key={size}
            className={`seed-floating-action-button seed-floating-action-button--variant_solid seed-floating-action-button--size_${size}`}
            style={{ width:px, height:px, borderRadius:'50%', display:'flex',
              alignItems:'center', justifyContent:'center', border:'none',
              background:'var(--seed-color-palette-carrot-500)',
              boxShadow:'var(--seed-shadow-s3)', cursor:'pointer' }}>
            <img src="/icons/icon_add_regular.svg" width={px*0.38} height={px*0.38} alt=""
              style={{ filter:'invert(1)' }} />
          </button>
        ))}
      </div>
    ),
  },

  {
    name: 'Footer',
    slug: 'ui:footer',
    demo: (
      <div className="seed-footer__root"
        style={{ display:'flex', flexWrap:'wrap', gap:'8px 16px', padding:'12px 0',
          borderTop:'1px solid var(--seed-color-stroke-neutral-subtle)' }}>
        {['이용약관','개인정보처리방침','위치기반서비스 이용약관','고객센터'].map(link => (
          <a key={link} href="#" onClick={e=>e.preventDefault()}
            className="seed-footer__linkText seed-footer__linkText--size_medium"
            style={{ fontSize:12, color:'var(--seed-color-fg-neutral-muted)',
              textDecoration:'none' }}>
            {link}
          </a>
        ))}
        <p style={{ width:'100%', fontSize:11, color:'var(--seed-color-fg-neutral-muted)', marginTop:4 }}>
          © 2025 Karrot. All rights reserved.
        </p>
      </div>
    ),
  },

  {
    name: "Help Bubble",
    slug: "ui:help-bubble",
    demo: (
      <div className="seed-help-bubble__positioner" style={{ position: "relative", padding: 24, margin: "0 auto" }}>
        <div className="seed-help-bubble__content" data-open style={{ position: "relative" }}>
          <div className="seed-help-bubble__arrow" style={{ position: "absolute", top: -12, left: 24 }}>
             <svg className="seed-help-bubble__arrowTip" viewBox="0 0 12 8"><polygon points="6,0 12,8 0,8" /></svg>
          </div>
          <div className="seed-help-bubble__body">
            <span className="seed-help-bubble__title" style={{ display: "inline-flex", alignItems: "center" }}>새로운 기능 안내</span>
            <span className="seed-help-bubble__description" style={{ display: "inline-flex", alignItems: "center" }}>도움말 말풍선의 내용이 여기에 들어갑니다.</span>
          </div>
          <button className="seed-help-bubble__closeButton">
            <IconCloseRegular style={{ width: "var(--seed-icon-size)", height: "var(--seed-icon-size)", color: "var(--seed-icon-color)", flexShrink: 0 }} />
          </button>
        </div>
      </div>
    ),
  },

  {
    name: 'Input Button',
    slug: 'ui:input-button',
    demo: (
      <div style={{ display:'flex', flexDirection:'column', gap:10, width:'100%' }}>
        {[
          { variant:'outlined', value:'placeholder 상태', hasValue:false },
          { variant:'outlined', value:'서울시 강남구', hasValue:true },
          { variant:'filled',   value:'서울시 마포구', hasValue:true },
        ].map(({ variant, value, hasValue }) => (
          <div key={`${variant}-${hasValue}`}
            className={`seed-input-button__root seed-input-button__root--variant_${variant} seed-input-button__root--size_medium`}
            style={{ position:'relative', display:'flex', alignItems:'center',
              padding:'11px 14px', borderRadius:8, fontSize:14,
              border: variant==='outlined' ? '1px solid var(--seed-color-stroke-neutral)' : 'none',
              background: variant==='filled' ? 'var(--seed-color-bg-layer-subtle)' : 'var(--seed-color-bg-layer-default)' }}>
            <span className="seed-input-button__value"
              style={{ flex:1, color: hasValue ? 'var(--seed-color-fg-neutral)' : 'var(--seed-color-fg-neutral-subtle)' }}>
              {value}
            </span>
            <img src="/icons/icon_chevron_down_regular.svg" width={16} height={16} alt="" />
          </div>
        ))}
      </div>
    ),
  },

  {
    name: 'Layout',
    slug: 'ui:layout',
    demo: (
      <div style={{ display:'flex', flexDirection:'column', gap:10, width:'100%' }}>
        {[
          { density:'low',    maxW:'720px',  color:'var(--seed-color-palette-blue-200)' },
          { density:'medium', maxW:'1040px', color:'var(--seed-color-palette-green-200)' },
          { density:'high',   maxW:'100%',   color:'var(--seed-color-palette-carrot-200)' },
        ].map(({ density, maxW, color }) => (
          <div key={density} style={{ display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ fontSize:12, color:'var(--seed-color-fg-neutral-subtle)', width:60, flexShrink:0 }}>{density}</span>
            <div style={{ flex:1, height:32, borderRadius:6, position:'relative',
              background:'var(--seed-color-palette-gray-100)',
              border:'1px solid var(--seed-color-stroke-neutral-subtle)' }}>
              <div className={`seed-layout__content seed-layout__content--density_${density}`}
                style={{ height:'100%', background:color, borderRadius:4,
                  display:'flex', alignItems:'center', justifyContent:'center', maxWidth:maxW }}>
                <span style={{ fontSize:11, color:'var(--seed-color-fg-neutral)' }}>max: {maxW}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },

  {
    name: 'List Item',
    slug: 'ui:list-item',
    demo: (
      <div style={{ display:'flex', flexDirection:'column', width:'100%',
        borderRadius:12, overflow:'hidden', border:'1px solid var(--seed-color-stroke-neutral-subtle)' }}>
        {[
          { title:'기본 리스트 아이템', desc:'설명 텍스트가 들어갑니다', hasPrefix:true },
          { title:'접두 아이콘 없음',   desc:'설명 텍스트',             hasPrefix:false },
          { title:'긴 타이틀의 아이템', desc:'여러 줄 설명도 가능합니다', hasPrefix:true },
        ].map(({ title, desc, hasPrefix }, i) => (
          <div key={i}
            className="seed-list-item__root"
            style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 16px',
              background:'var(--seed-color-bg-layer-default)',
              borderBottom: i < 2 ? '1px solid var(--seed-color-stroke-neutral-subtle)' : 'none' }}>
            {hasPrefix && (
              <div className="seed-list-item__prefix"
                style={{ width:40, height:40, borderRadius:10, background:'var(--seed-color-palette-gray-200)',
                  display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <img src="/icons/icon_image_regular.svg" width={20} height={20} alt="" />
              </div>
            )}
            <div style={{ flex:1, minWidth:0 }}>
              <p className="seed-list-item__title"
                style={{ fontSize:15, fontWeight:500, color:'var(--seed-color-fg-neutral)',
                  overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                {title}
              </p>
              <p className="seed-list-item__description"
                style={{ fontSize:13, color:'var(--seed-color-fg-neutral-subtle)', marginTop:2 }}>
                {desc}
              </p>
            </div>
            <span className="seed-list-item__suffix" style={{ color:'var(--seed-color-fg-neutral-subtle)', fontSize:18 }}>›</span>
          </div>
        ))}
      </div>
    ),
  },

  {
    name: 'Menu',
    slug: 'ui:menu',
    demo: (
      <div style={{ display:'flex', gap:20, alignItems:'flex-start' }}>
        <button style={{ padding:'8px 16px', borderRadius:8, fontSize:14,
          border:'1px solid var(--seed-color-stroke-neutral)',
          background:'var(--seed-color-bg-layer-default)', cursor:'pointer',
          color:'var(--seed-color-fg-neutral)' }}>
          메뉴 열기 ▾
        </button>
        <div className="seed-menu__content"
          data-state="open" data-open=""
          style={{ background:'var(--seed-color-bg-layer-floating)', borderRadius:12,
            boxShadow:'var(--seed-shadow-s3)', overflow:'hidden',
            minWidth:160, animation:'none' }}>
          {['수정','복사','공유','삭제'].map((item, i) => (
            <button key={item}
              className="seed-menu-item"
              style={{ display:'flex', width:'100%', alignItems:'center', gap:10,
                padding:'12px 16px', border:'none', background:'transparent',
                cursor:'pointer', fontSize:14, textAlign:'left',
                color: item==='삭제' ? 'var(--seed-color-palette-red-500)' : 'var(--seed-color-fg-neutral)',
                borderBottom: i < 3 ? '1px solid var(--seed-color-stroke-neutral-subtle)' : 'none' }}>
              {item}
            </button>
          ))}
        </div>
      </div>
    ),
  },

  {
    name: 'Menu Sheet',
    slug: 'ui:menu-sheet',
    demo: (
      <div style={{ width:'100%', maxWidth:360, margin:'0 auto' }}>
        <div className="seed-menu-sheet__content"
          style={{ background:'var(--seed-color-bg-layer-floating)',
            borderTopLeftRadius:24, borderTopRightRadius:24,
            padding:'20px 0 28px', boxShadow:'var(--seed-shadow-s4)', animation:'none' }}>
          <div style={{ width:36, height:4, borderRadius:2, background:'var(--seed-color-palette-gray-400)',
            margin:'0 auto 12px' }} />
          <p style={{ fontSize:16, fontWeight:700, padding:'4px 20px 12px',
            color:'var(--seed-color-fg-neutral)' }}>내보내기</p>
          {['카카오톡으로 공유','링크 복사','Instagram 스토리','더 보기'].map((item, i) => (
            <button key={item}
              className="seed-menu-sheet-item"
              style={{ display:'flex', width:'100%', alignItems:'center', gap:14,
                padding:'14px 20px', border:'none', background:'transparent',
                cursor:'pointer', fontSize:15, color:'var(--seed-color-fg-neutral)',
                borderTop: i > 0 ? '1px solid var(--seed-color-stroke-neutral-subtle)' : 'none' }}>
              {item}
            </button>
          ))}
        </div>
      </div>
    ),
  },

  {
    name: 'Progress Circle',
    slug: 'ui:progress-circle',
    demo: (
      <div style={{ display:'flex', gap:20, alignItems:'center', flexWrap:'wrap' }}>
        {[
          { size:32, stroke:3, progress:30, tone:'var(--seed-color-palette-carrot-500)' },
          { size:48, stroke:4, progress:60, tone:'var(--seed-color-palette-blue-500)' },
          { size:64, stroke:5, progress:80, tone:'var(--seed-color-palette-green-500)' },
          { size:80, stroke:6, progress:100, tone:'var(--seed-color-palette-carrot-500)' },
        ].map(({ size, stroke, progress, tone }) => {
          const r = (size - stroke*2) / 2
          const circ = 2 * Math.PI * r
          return (
            <div key={size} className="seed-progress-circle__root"
              style={{ width:size, height:size }}>
              <svg width={size} height={size} style={{ transform:'rotate(-90deg)' }}>
                <circle cx={size/2} cy={size/2} r={r} fill="none"
                  stroke="var(--seed-color-palette-gray-200)" strokeWidth={stroke}/>
                <circle cx={size/2} cy={size/2} r={r} fill="none"
                  stroke={tone} strokeWidth={stroke}
                  strokeDasharray={circ}
                  strokeDashoffset={circ * (1 - progress/100)}
                  strokeLinecap="round"/>
              </svg>
            </div>
          )
        })}
      </div>
    ),
  },

  {
    name: 'Quantity Picker',
    slug: 'ui:quantity-picker',
    demo: (
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        {['small','medium','large'].map(size => {
          const h = size==='small' ? 32 : size==='large' ? 48 : 40
          const fs = size==='small' ? 13 : size==='large' ? 17 : 15
          return (
            <div key={size}
              className={`seed-quantity-picker__root seed-quantity-picker__root--size_${size} seed-quantity-picker__root--variant_outlined`}
              style={{ display:'inline-flex', alignItems:'center', borderRadius:999,
                border:'1px solid var(--seed-color-stroke-neutral)', overflow:'hidden' }}>
              <button className="seed-quantity-picker__decrementButton"
                style={{ width:h, height:h, display:'flex', alignItems:'center', justifyContent:'center',
                  border:'none', background:'transparent', cursor:'pointer',
                  fontSize:fs+4, color:'var(--seed-color-fg-neutral)' }}>−</button>
              <span className="seed-quantity-picker__value"
                style={{ minWidth:40, textAlign:'center', fontSize:fs, fontWeight:700,
                  color:'var(--seed-color-fg-neutral)' }}>3</span>
              <button className="seed-quantity-picker__incrementButton"
                style={{ width:h, height:h, display:'flex', alignItems:'center', justifyContent:'center',
                  border:'none', background:'transparent', cursor:'pointer',
                  fontSize:fs+4, color:'var(--seed-color-palette-carrot-500)' }}>+</button>
            </div>
          )
        })}
      </div>
    ),
  },

  {
    name: 'Radio',
    slug: 'ui:radio',
    demo: (
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {[
          { label:'옵션 A', checked:true,  disabled:false },
          { label:'옵션 B', checked:false, disabled:false },
          { label:'비활성', checked:false, disabled:true  },
        ].map(({ label, checked, disabled }) => (
          <label key={label}
            className={`seed-radio__root seed-radio__root--size_medium`}
            style={{ display:'flex', alignItems:'center', gap:10,
              cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}>
            <div className={`seed-radiomark seed-radiomark--size_medium${checked ? ' seed-radiomark--checked' : ''}`}
              style={{ width:20, height:20, borderRadius:'50%', flexShrink:0,
                border: checked ? '6px solid var(--seed-color-palette-carrot-500)' : '1.5px solid var(--seed-color-stroke-neutral)',
                background:'var(--seed-color-bg-layer-default)', boxSizing:'border-box' }} />
            <span className="seed-radio__label"
              style={{ fontSize:15, color:'var(--seed-color-fg-neutral)' }}>
              {label}
            </span>
          </label>
        ))}
      </div>
    ),
  },

  {
    name: 'Reaction Button',
    slug: 'ui:reaction-button',
    demo: (
      <div style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'center' }}>
        {[
          { emoji:'👍', count:128, selected:true  },
          { emoji:'❤️', count:42,  selected:false },
          { emoji:'😂', count:7,   selected:false },
          { emoji:'😮', count:23,  selected:false },
        ].map(({ emoji, count, selected }) => (
          <button key={emoji}
            className={`seed-reaction-button__root seed-reaction-button__root--size_medium seed-reaction-button__root--variant_outlined`}
            data-selected={selected ? '' : undefined}
            style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'6px 12px',
              borderRadius:999, border:'1px solid',
              borderColor: selected ? 'var(--seed-color-palette-carrot-500)' : 'var(--seed-color-stroke-neutral)',
              background: selected ? 'var(--seed-color-palette-carrot-50)' : 'var(--seed-color-bg-layer-default)',
              cursor:'pointer', fontSize:13, fontWeight:500 }}>
            <span className="seed-reaction-button__icon">{emoji}</span>
            <span className="seed-reaction-button__count"
              style={{ color: selected ? 'var(--seed-color-palette-carrot-500)' : 'var(--seed-color-fg-neutral)' }}>
              {count}
            </span>
          </button>
        ))}
      </div>
    ),
  },

  {
    name: 'Scroll Fog',
    slug: 'ui:scroll-fog',
    demo: (
      <div style={{ width:'100%', position:'relative' }}>
        <div className="seed-scroll-fog"
          style={{ height:200, overflow:'auto', padding:16,
            '--scroll-fog-size-top':'32px', '--scroll-fog-size-bottom':'32px',
            '--scrollable-top':1, '--scrollable-bottom':1,
            background:'var(--seed-color-bg-layer-default)',
            borderRadius:12, border:'1px solid var(--seed-color-stroke-neutral-subtle)' }}>
          {Array.from({length:12}, (_,i) => (
            <p key={i} style={{ padding:'8px 0', borderBottom:'1px solid var(--seed-color-stroke-neutral-subtle)',
              fontSize:14, color:'var(--seed-color-fg-neutral)' }}>
              스크롤 아이템 {i+1}
            </p>
          ))}
        </div>
        <p style={{ fontSize:11, color:'var(--seed-color-fg-neutral-subtle)', marginTop:6 }}>
          상하 fog 마스크 적용 (--scroll-fog-size: 32px)
        </p>
      </div>
    ),
  },

  {
    name: 'Segmented Control',
    slug: 'ui:segmented-control',
    demo: (
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {['small','medium'].map(size => (
          <div key={size}
            className={`seed-segmented-control__root seed-segmented-control__root--size_${size}`}
            style={{ display:'inline-flex', background:'var(--seed-color-palette-gray-100)',
              borderRadius:10, padding:3, gap:2 }}>
            {['전체','구매','판매'].map((tab, i) => (
              <button key={tab}
                className="seed-segmented-control__item"
                data-selected={i===0 ? '' : undefined}
                style={{ padding: size==='medium' ? '7px 18px' : '5px 14px',
                  borderRadius:8, border:'none', cursor:'pointer', fontSize: size==='medium' ? 14 : 12,
                  fontWeight: i===0 ? 700 : 500,
                  background: i===0 ? 'var(--seed-color-bg-layer-default)' : 'transparent',
                  color: i===0 ? 'var(--seed-color-fg-neutral)' : 'var(--seed-color-fg-neutral-subtle)',
                  boxShadow: i===0 ? 'var(--seed-shadow-s1)' : 'none' }}>
                <span className="seed-segmented-control__label">{tab}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    ),
  },

  {
    name: 'Select',
    slug: 'ui:select',
    demo: (
      <div style={{ display:'flex', flexDirection:'column', gap:10, width:'100%' }}>
        {['outlined','filled'].map(variant => (
          <div key={variant}
            className="seed-select"
            style={{ position:'relative', display:'flex', alignItems:'center' }}>
            <select
              className="seed-select-trigger"
              style={{ width:'100%', appearance:'none', padding:'11px 36px 11px 14px',
                borderRadius:8, fontSize:14, fontWeight:400,
                border: variant==='outlined' ? '1px solid var(--seed-color-stroke-neutral)' : 'none',
                background: variant==='filled' ? 'var(--seed-color-bg-layer-subtle)' : 'var(--seed-color-bg-layer-default)',
                color:'var(--seed-color-fg-neutral)', cursor:'pointer', outline:'none' }}>
              <option>서울</option>
              <option>경기</option>
              <option>인천</option>
            </select>
            <img src="/icons/icon_chevron_down_regular.svg" width={16} height={16} alt=""
              style={{ position:'absolute', right:12, pointerEvents:'none' }} />
          </div>
        ))}
      </div>
    ),
  },

  {
    name: 'Select Box',
    slug: 'ui:select-box',
    demo: (
      <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
        {[
          { label:'카드결제',   desc:'즉시 결제',   selected:true  },
          { label:'계좌이체',   desc:'실시간 이체',  selected:false },
          { label:'무통장입금', desc:'3일 내 입금',  selected:false },
        ].map(({ label, desc, selected }) => (
          <button key={label}
            className={`seed-select-box__root seed-select-box__root--size_medium seed-select-box__root--layout_vertical`}
            data-checked={selected ? '' : undefined}
            style={{ display:'flex', flexDirection:'column', alignItems:'flex-start',
              padding:'14px 16px', borderRadius:12, border:'1.5px solid',
              borderColor: selected ? 'var(--seed-color-palette-carrot-500)' : 'var(--seed-color-stroke-neutral)',
              background: selected ? 'var(--seed-color-palette-carrot-50)' : 'var(--seed-color-bg-layer-default)',
              cursor:'pointer', minWidth:100 }}>
            <span className="seed-select-box__label"
              style={{ fontSize:14, fontWeight:700,
                color: selected ? 'var(--seed-color-palette-carrot-600)' : 'var(--seed-color-fg-neutral)' }}>
              {label}
            </span>
            <span className="seed-select-box__description"
              style={{ fontSize:12, color:'var(--seed-color-fg-neutral-subtle)', marginTop:2 }}>
              {desc}
            </span>
          </button>
        ))}
      </div>
    ),
  },

  {
    name: 'Side Navigation',
    slug: 'ui:side-navigation',
    demo: (
      <div style={{ display:'flex', gap:16 }}>
        {['expanded','collapsed'].map(state => (
          <div key={state}
            className="seed-side-navigation__root seed-side-navigation__root--tone_transparent"
            data-side-navigation-state={state}
            style={{ width: state==='expanded' ? 180 : 52, height:200,
              background:'var(--seed-color-bg-layer-default)',
              borderRadius:12, border:'1px solid var(--seed-color-stroke-neutral-subtle)',
              display:'flex', flexDirection:'column', overflow:'hidden',
              transition:'width 200ms', padding:8, gap:4 }}>
            {['홈','탐색','채팅','프로필'].map((item, i) => (
              <div key={item}
                style={{ display:'flex', alignItems:'center', gap:10, padding:'8px',
                  borderRadius:8,
                  background: i===0 ? 'var(--seed-color-bg-layer-default-selected)' : 'transparent',
                  cursor:'pointer' }}>
                <div style={{ width:22, height:22, borderRadius:6, flexShrink:0,
                  background:'var(--seed-color-palette-gray-300)' }} />
                {state==='expanded' && (
                  <span style={{ fontSize:13, fontWeight: i===0 ? 700 : 400, whiteSpace:'nowrap',
                    color: i===0 ? 'var(--seed-color-fg-neutral)' : 'var(--seed-color-fg-neutral-subtle)' }}>
                    {item}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    ),
  },

  {
    name: 'Slider',
    slug: 'ui:slider',
    demo: (
      <div style={{ display:'flex', flexDirection:'column', gap:20, width:'100%' }}>
        {[
          { size:'small',  progress:30, h:4 },
          { size:'medium', progress:60, h:6 },
          { size:'large',  progress:80, h:8 },
        ].map(({ size, progress, h }) => (
          <div key={size} className={`seed-slider__root seed-slider__root--size_${size}`}
            style={{ display:'flex', flexDirection:'column', gap:4 }}>
            <div className="seed-slider__control" style={{ position:'relative', height:26, display:'flex', alignItems:'center' }}>
              <div className="seed-slider__track"
                style={{ position:'relative', flexGrow:1, height:h,
                  background:'var(--seed-color-palette-gray-300)', borderRadius:999, overflow:'hidden' }}>
                <div className="seed-slider__range"
                  style={{ position:'absolute', left:0, top:0, bottom:0, width:`${progress}%`,
                    background:'var(--seed-color-palette-carrot-500)', borderRadius:999 }} />
              </div>
              <div className="seed-slider__thumb"
                style={{ position:'absolute', left:`${progress}%`, transform:'translateX(-50%)',
                  width: h*3, height:h*3, borderRadius:'50%', background:'#fff',
                  boxShadow:'var(--seed-shadow-s2)', border:'1px solid var(--seed-color-stroke-neutral)' }} />
            </div>
            <span style={{ fontSize:11, color:'var(--seed-color-fg-neutral-subtle)' }}>{size} · {progress}%</span>
          </div>
        ))}
      </div>
    ),
  },

  {
    name: 'Snackbar',
    slug: 'ui:snackbar',
    demo: (
      <div style={{ display:'flex', flexDirection:'column', gap:10, width:'100%' }}>
        {[
          { msg:'파일이 저장됐어요',        action:'확인' },
          { msg:'메시지를 전송했어요',       action:null   },
          { msg:'삭제됐어요. 되돌릴 수 없어요', action:'실행취소' },
        ].map(({ msg, action }) => (
          <div key={msg}
            className="seed-snackbar__root"
            data-open=""
            style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
              background:'var(--seed-color-bg-neutral-inverted)', borderRadius:10,
              padding:'12px 16px', animation:'none', gap:8 }}>
            <span className="seed-snackbar__message"
              style={{ fontSize:14, color:'var(--seed-color-fg-neutral-inverted)', flex:1 }}>
              {msg}
            </span>
            {action && (
              <button className="seed-snackbar__action"
                style={{ fontSize:14, fontWeight:700, color:'var(--seed-color-palette-carrot-400)',
                  background:'none', border:'none', cursor:'pointer', whiteSpace:'nowrap' }}>
                {action}
              </button>
            )}
          </div>
        ))}
      </div>
    ),
  },

  {
    name: 'Switch',
    slug: 'ui:switch',
    demo: (
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        {[
          { size:16, on:false, label:'small · off' },
          { size:20, on:true,  label:'medium · on' },
          { size:24, on:true,  label:'large · on'  },
          { size:20, on:false, label:'disabled',    disabled:true },
        ].map(({ size, on, label, disabled }) => {
          const trackW = size * 2
          const trackH = size
          const knobSz = size - 4
          return (
            <label key={label}
              className={`seed-switch__root seed-switch__root--size_${size}`}
              style={{ display:'inline-flex', alignItems:'center', gap:10,
                cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1 }}>
              <span className="seed-switch__label"
                style={{ fontSize:14, color:'var(--seed-color-fg-neutral)' }}>{label}</span>
              <div style={{ width:trackW, height:trackH, borderRadius:999, position:'relative',
                background: on ? 'var(--seed-color-palette-carrot-500)' : 'var(--seed-color-palette-gray-400)',
                transition:'background 0.2s', flexShrink:0 }}>
                <div style={{ position:'absolute', top:(trackH-knobSz)/2,
                  left: on ? trackW-knobSz-(trackH-knobSz)/2 : (trackH-knobSz)/2,
                  width:knobSz, height:knobSz, borderRadius:'50%', background:'#fff',
                  boxShadow:'0 1px 3px rgba(0,0,0,0.3)', transition:'left 0.2s' }} />
              </div>
            </label>
          )
        })}
      </div>
    ),
  },

  {
    name: 'Tabs',
    slug: 'ui:tabs',
    demo: (
      <div style={{ width:'100%' }}>
        <div className="seed-tabs__root">
          <div className="seed-tabs__list"
            style={{ display:'flex', borderBottom:'1px solid var(--seed-color-stroke-neutral-muted)',
              background:'var(--seed-color-bg-layer-default)', marginBottom:16 }}>
            {['판매중','예약중','거래완료'].map((tab, i) => (
              <button key={tab}
                className="seed-tabs__trigger seed-tabs__trigger--size_medium seed-tabs__trigger--variant_underlined"
                data-selected={i===0 ? '' : undefined}
                style={{ flex:1, padding:'13px 8px', border:'none', background:'transparent',
                  fontSize:14, fontWeight: i===0 ? 700 : 500, cursor:'pointer',
                  color: i===0 ? 'var(--seed-color-fg-neutral)' : 'var(--seed-color-fg-neutral-subtle)',
                  borderBottom: i===0 ? '2px solid var(--seed-color-fg-neutral)' : '2px solid transparent' }}>
                {tab}
              </button>
            ))}
          </div>
          <div className="seed-tabs__content" data-selected=""
            style={{ fontSize:14, color:'var(--seed-color-fg-neutral-subtle)', padding:'0 4px' }}>
            판매중 탭 콘텐츠 영역
          </div>
        </div>
      </div>
    ),
  },

  {
    name: 'Text Input',
    slug: 'ui:text-input',
    demo: (
      <div style={{ display:'flex', flexDirection:'column', gap:10, width:'100%' }}>
        {[
          { variant:'outlined',   ph:'outlined 입력창' },
          { variant:'underlined', ph:'underlined 입력창' },
          { variant:'filled',     ph:'filled 입력창' },
        ].map(({ variant, ph }) => (
          <div key={variant}
            className={`seed-text-input__root seed-text-input__root--size_medium seed-text-input__root--variant_${variant}`}
            style={{ display:'flex', alignItems:'center', padding:'10px 14px',
              borderRadius: variant==='underlined' ? 0 : 8, fontSize:14,
              border: variant==='outlined' ? '1px solid var(--seed-color-stroke-neutral)' : 'none',
              borderBottom: variant==='underlined' ? '1px solid var(--seed-color-stroke-neutral)' : undefined,
              background: variant==='filled' ? 'var(--seed-color-bg-layer-subtle)' : 'var(--seed-color-bg-layer-default)' }}>
            <input className="seed-text-input__value"
              placeholder={ph}
              style={{ flex:1, border:'none', background:'transparent', fontSize:14,
                color:'var(--seed-color-fg-neutral)', outline:'none',
                fontFamily:'inherit' }}
              readOnly />
          </div>
        ))}
      </div>
    ),
  },

  {
    name: 'Toggle Button',
    slug: 'ui:toggle-button',
    demo: (
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        <div style={{ display:'flex', gap:8 }}>
          {[
            { label:'좋아요', pressed:true  },
            { label:'저장',   pressed:false },
            { label:'공유',   pressed:false },
          ].map(({ label, pressed }) => (
            <button key={label}
              className={`seed-toggle-button seed-toggle-button--size_medium seed-toggle-button--variant_outlined`}
              data-pressed={pressed ? '' : undefined}
              style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'8px 16px',
                borderRadius:8, border:'1px solid',
                borderColor: pressed ? 'var(--seed-color-palette-carrot-500)' : 'var(--seed-color-stroke-neutral)',
                background: pressed ? 'var(--seed-color-palette-carrot-50)' : 'transparent',
                color: pressed ? 'var(--seed-color-palette-carrot-600)' : 'var(--seed-color-fg-neutral)',
                fontSize:14, fontWeight:700, cursor:'pointer' }}>
              {label}
            </button>
          ))}
        </div>
        <div style={{ display:'flex', gap:6 }}>
          {['xsmall','small','medium','large'].map((size, i) => (
            <button key={size}
              className={`seed-toggle-button seed-toggle-button--size_${size} seed-toggle-button--variant_ghost`}
              data-pressed={i===0 ? '' : undefined}
              style={{ padding: size==='xsmall' ? '4px 10px' : size==='small' ? '6px 12px' : size==='large' ? '12px 20px' : '8px 16px',
                borderRadius:8, border:'none',
                background: i===0 ? 'var(--seed-color-bg-neutral-inverted)' : 'var(--seed-color-bg-transparent)',
                color: i===0 ? 'var(--seed-color-fg-neutral-inverted)' : 'var(--seed-color-fg-neutral)',
                fontSize: size==='xsmall' ? 11 : size==='small' ? 13 : size==='large' ? 17 : 15,
                fontWeight:700, cursor:'pointer' }}>
              {size}
            </button>
          ))}
        </div>
      </div>
    ),
  },

  {
    name: "Action Chip",
    slug: "ui:action-chip",
    demo: (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button className="seed-action-chip seed-action-chip--size_medium seed-action-chip--layout_withText">
          <IconSearchRegular width="var(--seed-prefix-icon-size)" height="var(--seed-prefix-icon-size)" style={{ color: "var(--seed-prefix-icon-color)" }} />
          Action Chip
        </button>
        <button className="seed-action-chip seed-action-chip--size_medium seed-action-chip--layout_withText" disabled>
          <IconSearchRegular width="var(--seed-prefix-icon-size)" height="var(--seed-prefix-icon-size)" style={{ color: "var(--seed-prefix-icon-color)" }} />
          Disabled
        </button>
      </div>
    ),
  }
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
          <code>@seed-design/css/recipes/*.css</code> 실제 클래스 구조 재현. List Item까지 검수 완료.
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

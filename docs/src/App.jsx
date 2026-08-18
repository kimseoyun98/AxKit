import { useState, useEffect } from 'react'
import { IconChevronDownLine } from '@karrotmarket/react-monochrome-icon'
import { DesignTokenSection } from './sections/DesignTokenSection'
import { ColorSection } from './sections/ColorSection'
import { SemanticSection } from './sections/SemanticSection'
import { ElevationSection } from './sections/ElevationSection'
import { TypographySection } from './sections/TypographySection'
import { DimensionSection } from './sections/DimensionSection'
import { MotionSection } from './sections/MotionSection'
import { GridSection } from './sections/GridSection'
import { InclusiveSection } from './sections/InclusiveSection'
import { I18nSection } from './sections/I18nSection'
import { StateSection } from './sections/StateSection'
import { VoiceSection } from './sections/VoiceSection'
import { WritingSection } from './sections/WritingSection'
import { IconGallery } from './sections/IconGallery'
import { ComponentGallery } from './sections/ComponentGallery'

const NAV = [
  { sec: 'Overview', links: [{ href: '#overview', label: '개요' }] },
  {
    sec: 'Foundations',
    links: [
      { href: '#f-design-token', label: 'Design Token' },
      { href: '#f-color', label: 'Color Primitives (94)' },
      { href: '#f-semantic', label: 'Semantic Color (84)' },
      { href: '#f-elevation', label: 'Elevation' },
      { href: '#f-typography', label: 'Typography (t1–t14)' },
      { href: '#f-dimension', label: 'Dimensions & Radius' },
      { href: '#f-motion', label: 'Motion' },
      { href: '#f-grid', label: 'Grid / Layout' },
      { href: '#f-inclusive', label: 'Inclusive Design' },
      { href: '#f-international', label: 'International (i18n)' },
      { href: '#f-state', label: 'State Tokens' },
      { href: '#f-voice', label: 'Voice and Tone' },
      { href: '#f-writing', label: 'Writing' },
    ],
  },
  {
    sec: 'Assets',
    links: [
      { href: '#icons', label: 'Icon Pack · Monochrome (588)' },
    ],
  },
  {
    sec: 'Components',
    links: [
      { href: '#showcase', label: 'Component Gallery' },
    ],
  },
]

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [overviewExpanded, setOverviewExpanded] = useState(false);

  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        try {
          const targetEl = document.querySelector(hash);
          if (targetEl && (targetEl.id === 'overview' || targetEl.closest('#overview'))) {
            setOverviewExpanded(true);
          }
        } catch (e) {}
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleCopyLLMsTxt = async () => {
    try {
      const res = await fetch('/llms.txt');
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      alert('llms.txt 복사 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      {/* Mobile GNB Header (< 768px) */}
      <div className="mobile-gnb">
        <span className="logo">AxKit UI v2</span>
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          title={mobileOpen ? "닫기" : "메뉴 열기"}
          aria-label={mobileOpen ? "닫기" : "메뉴 열기"}
        >
          {mobileOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div className="mobile-backdrop" onClick={() => setMobileOpen(false)} />
      )}

      {/* Side Navigation Sidebar */}
      <aside className={mobileOpen ? 'mobile-open' : ''}>
        <div className="sidebar-header">
          <span className="logo">AxKit UI v2</span>
          <button
            type="button"
            className="icon-btn-ghost sidebar-close-btn"
            onClick={() => setMobileOpen(false)}
            title="닫기"
            aria-label="닫기"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        {NAV.map(group => (
          <div key={group.sec}>
            <div className="nav-sec">{group.sec}</div>
            {group.links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="nav-link"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
        ))}
      </aside>

      <main>
        <header style={{ marginBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, paddingBottom: 28, borderBottom: '1px solid #F1F5F9' }}>
          <div>
            <h1>AxKit UI v2.0 · SEED Engine</h1>
            <p style={{ fontSize: 14.5, color: '#64748B', marginTop: 4 }}>
              <code>@seed-design/css</code> npm import · 모노크롬 아이콘 588개 · SEED 2.0 CLI UI 컴포넌트 & 디자인 토큰 갤러리
            </p>
          </div>
          <button
            type="button"
            className={`icon-btn-ghost ${copied ? 'copied' : ''}`}
            onClick={handleCopyLLMsTxt}
            title={copied ? "복사 완료!" : "llms.txt AI 프롬프트 복사"}
            aria-label="llms.txt AI 프롬프트 복사"
            style={{ flexShrink: 0 }}
          >
            {copied ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            )}
          </button>
        </header>

        {/* Overview */}
        <div className="sec" id="overview">
          <h2
            onClick={() => setOverviewExpanded(!overviewExpanded)}
            style={{
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              userSelect: 'none',
            }}
          >
            <span>Overview</span>
            <IconChevronDownLine
              style={{
                width: 16,
                height: 16,
                color: 'var(--seed-color-fg-neutral-subtle, #94A3B8)',
                transform: overviewExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
                flexShrink: 0,
              }}
            />
          </h2>
          <p>
            이롬넷이 채택한 Seed Design System의 Foundation 토큰 전수 + 공식 아이콘팩(모노크롬 588개) + UI 컴포넌트 갤러리.
          </p>
          {overviewExpanded && (
            <div style={{ marginTop: 16 }}>
              <p style={{ margin: 0 }}>
                컴포넌트는 <code>npx @seed-design/cli add ui:*</code>로 설치된 공식 SEED React UI 컴포넌트와{' '}
                <code>@seed-design/css/vars</code>의 100% 시맨틱 디자인 토큰(<code>var(--seed-*)</code>)을 사용합니다.
              </p>
              <div style={{ display: 'flex', gap: 12, marginTop: 18, flexWrap: 'wrap' }}>
                {[
                  ['@seed-design/css', 'npm install @seed-design/css'],
                  ['@seed-design/react', 'npm install @seed-design/react'],
                  ['@seed-design/icon', 'npm install @seed-design/icon'],
                  ['@seed-design/cli', 'npx @seed-design/cli add ui:*'],
                ].map(([label, cmd]) => (
                  <div key={label} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, padding: '12px 16px' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 4 }}>{label}</div>
                    <code style={{ fontSize: 11.5 }}>{cmd}</code>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Foundations */}
        <DesignTokenSection />
        <ColorSection />
        <SemanticSection />
        <ElevationSection />
        <TypographySection />
        <DimensionSection />
        <MotionSection />
        <GridSection />
        <InclusiveSection />
        <I18nSection />
        <StateSection />
        <VoiceSection />
        <WritingSection />

        {/* Icons */}
        <IconGallery />

        {/* Components */}
        <div className="sec">
          <ComponentGallery />
        </div>
      </main>
    </>
  )
}

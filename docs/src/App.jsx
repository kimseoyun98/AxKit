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
      { href: '#f-dimension', label: 'Dimension / Spacing' },
      { href: '#f-radius', label: 'Radius' },
      { href: '#f-shadow', label: 'Shadow' },
      { href: '#f-gradient', label: 'Gradient' },
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
  return (
    <>
      <aside>
        <span className="logo">axpublish v2</span>
        {NAV.map(group => (
          <div key={group.sec}>
            <div className="nav-sec">{group.sec}</div>
            {group.links.map(l => (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}
          </div>
        ))}
      </aside>

      <main>
        <header style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
          <div>
            <h1>axpublish v2.0 · Seed Design</h1>
            <p style={{ fontSize: 14, color: '#6B7280' }}>
              <code>@seed-design/css</code> npm import · 모노크롬 아이콘 588개 · 공식 BEM 클래스 컴포넌트 갤러리
            </p>
          </div>
          <a
            href="https://github.com/kimseoyun98/axpublish-init"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#111827', color: '#fff', fontSize: 13, fontWeight: 700,
              padding: '10px 16px', borderRadius: 9999, textDecoration: 'none', whiteSpace: 'nowrap',
            }}
          >
            ↓ 템플릿 다운로드 (GitHub)
          </a>
        </header>

        {/* Overview */}
        <div className="sec" id="overview">
          <h2>Overview</h2>
          <p>
            Seed Design System의 Foundation 토큰 전수 + 공식 아이콘팩(모노크롬 588개) + UI 컴포넌트 갤러리.
            <br />
            컴포넌트는 <code>@seed-design/css</code>를 npm으로 정식 임포트하여{' '}
            <code>packages/css/recipes/*.css</code>의 실제 BEM 클래스명을 사용합니다.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 14, flexWrap: 'wrap' }}>
            {[
              ['@seed-design/css', 'npm install @seed-design/css'],
              ['@seed-design/icon', 'npm install @seed-design/icon'],
            ].map(([label, cmd]) => (
              <div key={label} style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 10, padding: '10px 14px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 4 }}>{label}</div>
                <code style={{ fontSize: 11 }}>{cmd}</code>
              </div>
            ))}
          </div>
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

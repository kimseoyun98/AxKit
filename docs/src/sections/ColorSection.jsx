import { IconChevronDownLine } from '@karrotmarket/react-monochrome-icon';
import { useState, useEffect } from 'react';
import { Sec } from '../components/UI'

const STEPS = ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000']

function huePalette(hue, hexes) {
  return STEPS.map((step, i) => ({ name: `${hue}-${step}`, hex: hexes[i] }))
}

export function ColorSection() {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        try {
          const targetEl = document.querySelector(hash);
          if (targetEl && (targetEl.id === 'f-color' || targetEl.closest('#f-color'))) {
            setExpanded(true);
          }
        } catch (e) {}
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);
  const carrot = huePalette('carrot', ['#FFF2EC', '#FFE8DB', '#FFD5C0', '#FFB999', '#FF9364', '#FF6600', '#E14D00', '#B93901', '#862B00', '#471601'])
  const gray = [
    { name: 'gray-00', hex: '#FFFFFF', border: true },
    ...huePalette('gray', ['#F7F8F9', '#F3F4F5', '#EEEFF1', '#DCDEE3', '#D1D3D8', '#B0B3BA', '#868B94', '#555D6D', '#2A3038', '#1A1C20']),
  ]
  const blue = huePalette('blue', ['#EFF6FF', '#E2EDFC', '#CBDFFA', '#AACEFD', '#85B8FD', '#5E98FE', '#217CF9', '#135FCD', '#0B4596', '#032451'])
  const red = huePalette('red', ['#FDF0F0', '#FDE7E7', '#FED4D2', '#FEB7B3', '#FE928D', '#FC6A66', '#FA342C', '#CA1D13', '#921708', '#4A1209'])
  const green = huePalette('green', ['#EDFAF6', '#D9F6E9', '#B9E9D2', '#7DDCB3', '#42C593', '#10AB7D', '#079171', '#00745F', '#075445', '#0A2B24'])
  const yellow = huePalette('yellow', ['#FFF7DE', '#FDEFB9', '#FBDC65', '#E9C647', '#D4AB28', '#C49725', '#9B7821', '#755B22', '#4F3E1F', '#2C2512'])
  const purple = huePalette('purple', ['#F5F3FE', '#EFEAFE', '#E1D8FF', '#D0C0FF', '#B8A1FF', '#9F84FB', '#8969EA', '#6D50CB', '#50379B', '#29175D'])
  const staticBlack = [
    { name: 'static-black', hex: '#000000' },
    { name: 'black-alpha-100', hex: '#00000007' },
    { name: 'black-alpha-200', hex: '#0000000C' },
    { name: 'black-alpha-300', hex: '#00000010' },
    { name: 'black-alpha-400', hex: '#00000021' },
    { name: 'black-alpha-500', hex: '#0000002C' },
    { name: 'black-alpha-600', hex: '#0000004C' },
    { name: 'black-alpha-700', hex: '#00000074' },
    { name: 'black-alpha-800', hex: '#000000A2' },
    { name: 'black-alpha-900', hex: '#000000D0' },
    { name: 'black-alpha-1000', hex: '#000000E3' },
  ]
  const staticWhite = [
    { name: 'static-white', hex: '#FFFFFF', border: true },
    { name: 'white-alpha-50', hex: '#FFFFFF0D', border: true },
    { name: 'white-alpha-100', hex: '#FFFFFF17', border: true },
    { name: 'white-alpha-200', hex: '#FFFFFF20', border: true },
    { name: 'white-alpha-300', hex: '#FFFFFF2E', border: true },
    { name: 'white-alpha-400', hex: '#FFFFFF3D', border: true },
    { name: 'white-alpha-500', hex: '#FFFFFF60', border: true },
    { name: 'white-alpha-600', hex: '#FFFFFF8B', border: true },
    { name: 'white-alpha-700', hex: '#FFFFFFB3', border: true },
    { name: 'white-alpha-800', hex: '#FFFFFFDE', border: true },
    { name: 'white-alpha-900', hex: '#FFFFFFEA', border: true },
    { name: 'white-alpha-1000', hex: '#FFFFFFF4', border: true },
  ]
  const total = carrot.length + gray.length + blue.length + red.length + green.length + yellow.length + purple.length + staticBlack.length + staticWhite.length
  const Swatch = ({ items }) => (
    <div className="pal-row">
      {items.map(s => (
        <div className="sw" key={s.name}>
          <div className="sw-color" style={{ background: s.hex, border: s.border ? '1px solid #eee' : undefined }} />
          <div className="sw-name">{s.name}</div>
          <div className="sw-hex">{s.hex}</div>
        </div>
      ))}
    </div>
  )
  return (
    <Sec id="f-color">
      <h2
        onClick={() => setExpanded(!expanded)}
        style={{
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          userSelect: 'none',
        }}
      >
        <span>Color Primitives (94)</span>
        <IconChevronDownLine
          style={{
            width: 16,
            height: 16,
            color: 'var(--seed-color-fg-neutral-subtle, #94A3B8)',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            flexShrink: 0,
          }}
        />
      </h2>
      <p>
        팔레트 색상은 역할 기반 색상(Semantic Color)으로 표현하기 어려운 예외적인 경우에 사용합니다.
        적응형 팔레트로 구성되어 있어, 특정 화면 모드(라이트/다크)를 기준으로 디자인하더라도 다른 모드에서도
        충분히 인지하기 쉬운 명도가 자동으로 배정됩니다.
      </p>
      {expanded && (
        <div style={{ marginTop: 16 }}>
      <div className="pal-group"><div className="pal-label">Carrot</div><Swatch items={carrot} /></div>
      <div className="pal-group"><div className="pal-label">Gray</div><Swatch items={gray} /></div>
      <div className="pal-group"><div className="pal-label">Blue</div><Swatch items={blue} /></div>
      <div className="pal-group"><div className="pal-label">Red</div><Swatch items={red} /></div>
      <div className="pal-group"><div className="pal-label">Green</div><Swatch items={green} /></div>
      <div className="pal-group"><div className="pal-label">Yellow</div><Swatch items={yellow} /></div>
      <div className="pal-group"><div className="pal-label">Purple</div><Swatch items={purple} /></div>
      <div className="pal-group"><div className="pal-label">Static Black</div><Swatch items={staticBlack} /></div>
      <div className="pal-group"><div className="pal-label">Static White</div><Swatch items={staticWhite} /></div>
    
        </div>
      )}
</Sec>
  )
}

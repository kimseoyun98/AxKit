import { Sec, ChipInfo } from '../components/UI'

export function ColorSection() {
  const carrot = [
    { name: 'carrot-50', hex: '#FFF3EB' },
    { name: 'carrot-100', hex: '#FFE0CB' },
    { name: 'carrot-200', hex: '#FFBB94' },
    { name: 'carrot-300', hex: '#FF9564' },
    { name: 'carrot-400', hex: '#FF7540' },
    { name: 'carrot-500', hex: '#FF6600' },
    { name: 'carrot-600', hex: '#F06000' },
    { name: 'carrot-700', hex: '#C24E00' },
    { name: 'carrot-800', hex: '#943C00' },
    { name: 'carrot-900', hex: '#662A00' },
  ]
  const gray = [
    { name: 'gray-00', hex: '#FFFFFF', border: true },
    { name: 'gray-100', hex: '#F5F5F5' },
    { name: 'gray-200', hex: '#EBEBEB' },
    { name: 'gray-300', hex: '#D9D9D9' },
    { name: 'gray-400', hex: '#C2C2C2' },
    { name: 'gray-500', hex: '#9E9E9E' },
    { name: 'gray-600', hex: '#757575' },
    { name: 'gray-700', hex: '#616161' },
    { name: 'gray-800', hex: '#424242' },
    { name: 'gray-900', hex: '#212121' },
    { name: 'gray-1000', hex: '#1A1C20' },
  ]
  const others = [
    { name: 'blue-500', hex: '#2196F3' },
    { name: 'blue-700', hex: '#1565C0' },
    { name: 'green-500', hex: '#4CAF50' },
    { name: 'green-700', hex: '#388E3C' },
    { name: 'red-500', hex: '#EF5350' },
    { name: 'red-700', hex: '#C62828' },
    { name: 'yellow-400', hex: '#FFCA28' },
    { name: 'yellow-700', hex: '#F9A825' },
    { name: 'pink-600', hex: '#E91E63' },
    { name: 'purple-500', hex: '#9C27B0' },
    { name: 'teal-500', hex: '#009688' },
  ]
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
      <h2>Color — Primitive Palette <ChipInfo>94 swatches</ChipInfo></h2>
      <div className="pal-group"><div className="pal-label">Carrot</div><Swatch items={carrot} /></div>
      <div className="pal-group"><div className="pal-label">Gray</div><Swatch items={gray} /></div>
      <div className="pal-group"><div className="pal-label">Blue · Green · Red · Yellow · Pink · Purple · Teal</div><Swatch items={others} /></div>
    </Sec>
  )
}

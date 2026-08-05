export function SeedIcon({ src, size = 20, style, className }) {
  return (
    <img
      src={src}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
      className={className}
    />
  )
}

export function TokenTable({ children }) {
  return (
    <div className="tbl">
      <table>{children}</table>
    </div>
  )
}

export function Sec({ id, children, style }) {
  return <div className="sec" id={id} style={style}>{children}</div>
}

export function ChipInfo({ children }) {
  return <span className="chip-info">{children}</span>
}

export function Notice({ children }) {
  return (
    <div className="notice">
      <span style={{ fontSize: 20, flexShrink: 0 }}>💡</span>
      <div>{children}</div>
    </div>
  )
}

export function CompCard({ name, slug, children, span2 }) {
  return (
    <div className={`comp-card${span2 ? ' span2' : ''}`}>
      <div className="comp-canvas">{children}</div>
      <div className="comp-name">{name}</div>
      <div className="comp-slug">{slug}</div>
    </div>
  )
}

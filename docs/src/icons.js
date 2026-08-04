// Re-export icon SVGs as URL strings for use in <img> tags
// @seed-design/icon provides SVG files under /svg/*.svg

const base = new URL('/node_modules/@seed-design/icon/svg/', import.meta.url)

// Vite: ?url suffix imports SVG as URL string
// We dynamically build icon URLs from the package path

export function iconUrl(name) {
  return `/node_modules/@seed-design/icon/svg/${name}.svg`
}

// Named icon imports (the ones we use in docs)

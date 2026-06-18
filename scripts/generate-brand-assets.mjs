import { Buffer } from 'node:buffer'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const sharp = require(process.env.SHARP_MODULE_PATH || 'sharp')

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = resolve(root, 'public')
const sourceMark = resolve(publicDir, 'favicon.svg')
const sourceLogo = resolve(publicDir, 'logo-rebit-studio.svg')

await mkdir(publicDir, { recursive: true })

await sharp(sourceMark).resize(180, 180).png().toFile(resolve(publicDir, 'apple-touch-icon.png'))
await sharp(sourceMark).resize(512, 512).png().toFile(resolve(publicDir, 'logo-rebit-mark-512.png'))
await sharp(sourceLogo).resize(900, 170).png().toFile(resolve(publicDir, 'logo-rebit-studio.png'))

const faviconSizes = [16, 24, 32, 48, 64, 128, 256]
const faviconPngs = await Promise.all(
  faviconSizes.map((size) => sharp(sourceMark).resize(size, size).png().toBuffer()),
)

await writeFile(resolve(publicDir, 'favicon.ico'), createIco(faviconSizes, faviconPngs))

const logoSvg = await readFile(sourceLogo, 'utf8')
const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString('base64')}`
// Изометрический «стек модулей» — фирменная графика нового дизайна (как в hero).
const ogColors = { slate: '#1E293B', muted: '#475569', sand: '#E9DCC6', orange: '#F97316' }

const shade = (hex, factor) => {
  const value = Number.parseInt(hex.slice(1), 16)
  const channel = (shift) => Math.round(((value >> shift) & 255) * factor)
  return `#${((1 << 24) + (channel(16) << 16) + (channel(8) << 8) + channel(0)).toString(16).slice(1)}`
}

const iso = { ux: [56, 28], uy: [-56, 28], uz: [0, -66], origin: [916, 312] }
const project = (gx, gy, gz) => [
  iso.origin[0] + gx * iso.ux[0] + gy * iso.uy[0] + gz * iso.uz[0],
  iso.origin[1] + gx * iso.ux[1] + gy * iso.uy[1] + gz * iso.uz[1],
]
const face = (points, fill) =>
  `<polygon points="${points.map((point) => `${point[0].toFixed(1)},${point[1].toFixed(1)}`).join(' ')}" fill="${fill}"/>`
const cube = (gx, gy, level, color) => {
  const top = [
    project(gx, gy, level + 1),
    project(gx + 1, gy, level + 1),
    project(gx + 1, gy + 1, level + 1),
    project(gx, gy + 1, level + 1),
  ]
  const right = [
    project(gx + 1, gy, level),
    project(gx + 1, gy + 1, level),
    project(gx + 1, gy + 1, level + 1),
    project(gx + 1, gy, level + 1),
  ]
  const left = [
    project(gx, gy + 1, level),
    project(gx + 1, gy + 1, level),
    project(gx + 1, gy + 1, level + 1),
    project(gx, gy + 1, level + 1),
  ]
  return face(left, shade(color, 0.6)) + face(right, shade(color, 0.82)) + face(top, color)
}

// Порядок отрисовки: сзади вперёд.
const isoStack = [
  cube(0, 0, 0, ogColors.slate),
  cube(0, 1, 0, ogColors.muted),
  cube(1, 0, 0, ogColors.sand),
  cube(0, 0, 1, ogColors.orange),
  cube(1, 1, 0, ogColors.sand),
].join('')

const ogSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="34" height="34" patternUnits="userSpaceOnUse">
      <path d="M34 0H0v34" fill="none" stroke="#1E293B" stroke-opacity=".05" stroke-width="1"/>
    </pattern>
    <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
      <circle cx="2.5" cy="2.5" r="2" fill="#475569" fill-opacity=".26"/>
    </pattern>
    <radialGradient id="sand" cx="0.84" cy="0.16" r="0.5">
      <stop offset="0" stop-color="#E9DCC6" stop-opacity=".7"/>
      <stop offset="1" stop-color="#E9DCC6" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="#FAF8F5"/>
  <rect width="1200" height="630" fill="url(#sand)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>

  <g>
    <rect x="720" y="92" width="400" height="446" rx="12" fill="#FFFFFF" fill-opacity=".62" stroke="#1E293B" stroke-opacity=".08"/>
    <rect x="752" y="124" width="336" height="382" fill="url(#dots)" opacity=".55"/>
    <text x="742" y="348" font-family="Georgia, Cambria, 'Times New Roman', serif" font-size="120" font-weight="700" fill="#F97316" fill-opacity=".9">[</text>
    <text x="1098" y="348" font-family="Georgia, Cambria, 'Times New Roman', serif" font-size="120" font-weight="700" fill="#F97316" fill-opacity=".9" text-anchor="end">]</text>
    <ellipse cx="916" cy="452" rx="150" ry="32" fill="#1E293B" opacity=".07"/>
    ${isoStack}
  </g>

  <image href="${logoDataUri}" x="80" y="74" width="520" height="98"/>

  <text x="84" y="300" fill="#1E293B" font-family="Georgia, Cambria, 'Times New Roman', serif" font-size="56" font-weight="800">Сайты под ключ,</text>
  <text x="84" y="366" fill="#1E293B" font-family="Georgia, Cambria, 'Times New Roman', serif" font-size="56" font-weight="800">магазины и Bitrix</text>

  <text x="86" y="424" fill="#475569" font-family="Inter, Roboto, Arial, sans-serif" font-size="26">PHP · 1С-Битрикс · Vue · интеграции · аудит</text>

  <text x="86" y="500" fill="#F97316" font-family="Inter, Roboto, Arial, sans-serif" font-size="25" font-weight="700">rebit-pro.ru</text>
</svg>`

await sharp(Buffer.from(ogSvg)).png().toFile(resolve(publicDir, 'og-image.png'))

function createIco(sizes, images) {
  const headerSize = 6
  const directorySize = 16 * images.length
  let offset = headerSize + directorySize
  const header = Buffer.alloc(headerSize)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(images.length, 4)

  const entries = images.map((image, index) => {
    const size = sizes[index]
    const entry = Buffer.alloc(16)
    entry.writeUInt8(size >= 256 ? 0 : size, 0)
    entry.writeUInt8(size >= 256 ? 0 : size, 1)
    entry.writeUInt8(0, 2)
    entry.writeUInt8(0, 3)
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(32, 6)
    entry.writeUInt32LE(image.length, 8)
    entry.writeUInt32LE(offset, 12)
    offset += image.length
    return entry
  })

  return Buffer.concat([header, ...entries, ...images])
}

import { Buffer } from 'node:buffer'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// Социальные изображения ReBit Studio из одной фирменной композиции:
//   • og-image.png      1200×630  — Open Graph / Telegram link preview
//   • telegram-card.png  640×360  — компактная карточка 16:9
//   • telegram-avatar.png 512×512 — аватар бота/канала (Telegram кропит в круг)
// Песочный фон, сетка, изометрический «стек модулей» и скобки [ ] (ReBit).
// Рендер SVG → PNG через sharp.
const require = createRequire(import.meta.url)
const sharp = require(process.env.SHARP_MODULE_PATH || 'sharp')

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = resolve(root, 'public')
const sourceLogo = resolve(publicDir, 'logo-rebit-studio.svg')

await mkdir(publicDir, { recursive: true })

const logoSvg = await readFile(sourceLogo, 'utf8')
const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString('base64')}`

const colors = { slate: '#1E293B', muted: '#475569', sand: '#E9DCC6', orange: '#F97316' }
const serif = "'DejaVu Serif', Georgia, 'Times New Roman', serif"
const sans = "'DejaVu Sans', Inter, Arial, sans-serif"

const shade = (hex, factor) => {
  const value = Number.parseInt(hex.slice(1), 16)
  const channel = (shift) => Math.round(((value >> shift) & 255) * factor)
  return `#${((1 << 24) + (channel(16) << 16) + (channel(8) << 8) + channel(0)).toString(16).slice(1)}`
}

// Изометрическая проекция «стека модулей».
const iso = { ux: [30, 15], uy: [-30, 15], uz: [0, -36], origin: [500, 196] }
const project = (gx, gy, gz) => [
  iso.origin[0] + gx * iso.ux[0] + gy * iso.uy[0] + gz * iso.uz[0],
  iso.origin[1] + gx * iso.ux[1] + gy * iso.uy[1] + gz * iso.uz[1],
]
const face = (points, fill) =>
  `<polygon points="${points.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')}" fill="${fill}"/>`
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

const isoStack = [
  cube(0, 0, 0, colors.slate),
  cube(0, 1, 0, colors.muted),
  cube(1, 0, 0, colors.sand),
  cube(0, 0, 1, colors.orange),
  cube(1, 1, 0, colors.sand),
].join('')

// Общие defs и тело композиции в системе координат 640×360.
// Тело переиспользуется для OG (масштабируется), карточка рендерит его 1:1.
const cardDefs = `
  <pattern id="grid" width="26" height="26" patternUnits="userSpaceOnUse">
    <path d="M26 0H0v26" fill="none" stroke="#1E293B" stroke-opacity=".05" stroke-width="1"/>
  </pattern>
  <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
    <circle cx="2" cy="2" r="1.6" fill="#475569" fill-opacity=".24"/>
  </pattern>
  <radialGradient id="sand" cx="0.86" cy="0.14" r="0.6">
    <stop offset="0" stop-color="#E9DCC6" stop-opacity=".75"/>
    <stop offset="1" stop-color="#E9DCC6" stop-opacity="0"/>
  </radialGradient>`

const cardBody = `
  <rect width="640" height="360" fill="#FAF8F5"/>
  <rect width="640" height="360" fill="url(#sand)"/>
  <rect width="640" height="360" fill="url(#grid)"/>

  <g>
    <rect x="388" y="44" width="224" height="272" rx="14" fill="#FFFFFF" fill-opacity=".64" stroke="#1E293B" stroke-opacity=".09"/>
    <rect x="408" y="64" width="184" height="232" fill="url(#dots)" opacity=".5"/>
    <text x="398" y="222" font-family="${serif}" font-size="92" font-weight="700" fill="#F97316" fill-opacity=".9">[</text>
    <text x="604" y="222" font-family="${serif}" font-size="92" font-weight="700" fill="#F97316" fill-opacity=".9" text-anchor="end">]</text>
    <ellipse cx="500" cy="280" rx="92" ry="18" fill="#1E293B" opacity=".07"/>
    ${isoStack}
  </g>

  <image href="${logoDataUri}" x="44" y="46" width="244" height="46"/>

  <text x="46" y="170" fill="#1E293B" font-family="${serif}" font-size="31" font-weight="800">Сайты под ключ,</text>
  <text x="46" y="208" fill="#1E293B" font-family="${serif}" font-size="31" font-weight="800">магазины и Bitrix</text>

  <rect x="48" y="226" width="58" height="4" rx="2" fill="#F97316"/>

  <text x="48" y="266" fill="#475569" font-family="${sans}" font-size="15.5">PHP · 1С-Битрикс · Vue · интеграции · аудит</text>

  <text x="48" y="316" fill="#F97316" font-family="${sans}" font-size="17" font-weight="700">rebit-pro.ru</text>`

// 640×360 — карточка 1:1.
const cardSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
  <defs>${cardDefs}</defs>
  ${cardBody}
</svg>`

// 1200×630 — OG: та же композиция, масштаб ×1.75 по высоте, центр по ширине
// (песочные поля по бокам ~40px — на бренд-фоне незаметно).
const ogSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>${cardDefs}</defs>
  <rect width="1200" height="630" fill="#FAF8F5"/>
  <g transform="translate(40,0) scale(1.75)">${cardBody}</g>
</svg>`

// 512×512 — аватар: фирменный знак [ + bit-точки + R по центру.
const mark = `
  <path fill="${colors.orange}" d="M18 24h23v11H30v58h11v11H18z"/>
  <rect width="15" height="15" x="48" y="16" fill="${colors.slate}" rx="2"/>
  <rect width="15" height="15" x="48" y="48" fill="${colors.muted}" rx="2"/>
  <rect width="15" height="15" x="48" y="80" fill="${colors.slate}" rx="2"/>
  <path fill="${colors.slate}" d="M68 29h22c22 0 38 15 38 36 0 15-8 27-21 33l21 21h-21L82 96h-1v23H68V29Zm13 13v41h10c14 0 23-8 23-20 0-13-9-21-23-21H81Z"/>
  <path fill="#FAF8F5" d="M82 47h9c11 0 18 6 18 16 0 9-7 15-18 15h-9V47Z" opacity=".96"/>
`
const avatarSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <pattern id="agrid" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M32 0H0v32" fill="none" stroke="#1E293B" stroke-opacity=".05" stroke-width="1"/>
    </pattern>
    <radialGradient id="aglow" cx="0.5" cy="0.42" r="0.62">
      <stop offset="0" stop-color="#FFFFFF" stop-opacity=".7"/>
      <stop offset="0.6" stop-color="#E9DCC6" stop-opacity=".35"/>
      <stop offset="1" stop-color="#E9DCC6" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" fill="#FAF8F5"/>
  <rect width="512" height="512" fill="url(#agrid)"/>
  <circle cx="256" cy="256" r="250" fill="url(#aglow)"/>
  <circle cx="256" cy="256" r="244" fill="none" stroke="${colors.orange}" stroke-opacity=".16" stroke-width="6"/>
  <g transform="translate(37,53.5) scale(3.0)">${mark}</g>
</svg>`

const targets = [
  { name: 'og-image', svg: ogSvg },
  { name: 'telegram-card', svg: cardSvg },
  { name: 'telegram-avatar', svg: avatarSvg },
]

for (const { name, svg } of targets) {
  await writeFile(resolve(publicDir, `${name}.svg`), svg)
  await sharp(Buffer.from(svg)).png().toFile(resolve(publicDir, `${name}.png`))
  const meta = await sharp(resolve(publicDir, `${name}.png`)).metadata()
  console.log(`${name}.png ${meta.width}x${meta.height} written`)
}

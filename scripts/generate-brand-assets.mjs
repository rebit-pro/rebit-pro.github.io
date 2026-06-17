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
const ogSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FAF8F5"/>
  <path d="M0 0h1200v630H0z" fill="url(#grid)" opacity=".55"/>
  <defs>
    <pattern id="grid" width="34" height="34" patternUnits="userSpaceOnUse">
      <path d="M34 0H0v34" fill="none" stroke="#1E293B" stroke-opacity=".055" stroke-width="1"/>
    </pattern>
  </defs>
  <rect x="742" y="92" width="260" height="260" fill="#E9DCC6" opacity=".56"/>
  <rect x="826" y="176" width="156" height="156" fill="#FFFFFF" opacity=".74"/>
  <rect x="878" y="228" width="104" height="104" fill="#475569" opacity=".22"/>
  <rect x="930" y="280" width="52" height="52" fill="#F97316"/>
  <image href="${logoDataUri}" x="84" y="72" width="760" height="170"/>
  <text x="95" y="324" fill="#1E293B" font-family="Georgia, Cambria, 'Times New Roman', serif" font-size="58" font-weight="700">
    Чёткие решения.
  </text>
  <text x="95" y="392" fill="#1E293B" font-family="Georgia, Cambria, 'Times New Roman', serif" font-size="58" font-weight="700">
    Человеческий подход.
  </text>
  <text x="98" y="465" fill="#475569" font-family="Inter, Roboto, Arial, sans-serif" font-size="28">
    Разработка, поддержка и развитие цифровых продуктов.
  </text>
  <text x="98" y="522" fill="#F97316" font-family="Inter, Roboto, Arial, sans-serif" font-size="24" font-weight="700">
    rebit-pro.ru
  </text>
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

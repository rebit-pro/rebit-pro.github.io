import { Buffer } from 'node:buffer'
import { mkdir, writeFile } from 'node:fs/promises'
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

// og-image.png (Open Graph / Telegram preview) генерируется из единой
// социальной композиции в scripts/generate-telegram-image.mjs
// (вместе с telegram-card.png и telegram-avatar.png).

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

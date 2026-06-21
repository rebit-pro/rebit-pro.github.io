// Генерация растровых иконок из public/favicon.svg.
// Запуск: node scripts/gen-icons.mjs  (нужен установленный sharp).
import sharp from 'sharp'
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const svg = await readFile(resolve(root, 'public/favicon.svg'))

// Растеризуем SVG с запасом по плотности, затем уменьшаем — так края остаются чёткими.
const png = (size) => sharp(svg, { density: 512 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer()

// apple-touch — непрозрачный оранжевый квадрат (фон уже в SVG на весь холст).
await writeFile(resolve(root, 'public/apple-touch-icon.png'), await png(180))

// favicon.ico — мультиразмерный контейнер с PNG внутри (поддерживается браузерами и Яндексом).
const sizes = [16, 32, 48, 64]
const images = await Promise.all(sizes.map((size) => png(size)))

const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0) // reserved
header.writeUInt16LE(1, 2) // type: icon
header.writeUInt16LE(sizes.length, 4) // image count

const directory = Buffer.alloc(16 * sizes.length)
let offset = header.length + directory.length

images.forEach((buffer, index) => {
  const entry = index * 16
  const size = sizes[index]
  directory.writeUInt8(size >= 256 ? 0 : size, entry + 0) // width
  directory.writeUInt8(size >= 256 ? 0 : size, entry + 1) // height
  directory.writeUInt8(0, entry + 2) // palette colors
  directory.writeUInt8(0, entry + 3) // reserved
  directory.writeUInt16LE(1, entry + 4) // color planes
  directory.writeUInt16LE(32, entry + 6) // bits per pixel
  directory.writeUInt32LE(buffer.length, entry + 8) // image size
  directory.writeUInt32LE(offset, entry + 12) // image offset
  offset += buffer.length
})

await writeFile(resolve(root, 'public/favicon.ico'), Buffer.concat([header, directory, ...images]))

console.log('icons generated:', { ico_sizes: sizes, apple_touch: 180 })

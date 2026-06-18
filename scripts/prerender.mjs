import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = resolve(root, 'dist')
const serverEntry = resolve(distDir, 'server', 'entry-server.js')
const template = await readFile(resolve(distDir, 'index.html'), 'utf8')
const { prerenderPaths, render } = await import(pathToFileURL(serverEntry).href)

for (const path of prerenderPaths) {
  const { html, title, description, canonical, head } = await render(path)
  const page = injectHtml(template, { html, title, description, canonical, head })
  const target = path === '/' ? resolve(distDir, 'index.html') : resolve(distDir, trimSlashes(path), 'index.html')

  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, page)
}

function injectHtml(templateHtml, page) {
  return templateHtml
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(page.title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escapeAttribute(page.description)}" />`,
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
      `<link rel="canonical" href="${escapeAttribute(page.canonical)}" />`,
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:title" content="${escapeAttribute(page.title)}" />`,
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${escapeAttribute(page.description)}" />`,
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:url" content="${escapeAttribute(page.canonical)}" />`,
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:title" content="${escapeAttribute(page.title)}" />`,
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:description" content="${escapeAttribute(page.description)}" />`,
    )
    .replace('<div id="app"></div>', `<div id="app">${page.html}</div>`)
    .replace('</head>', `${page.head ?? ''}</head>`)
}

function trimSlashes(path) {
  return path.replace(/^\/+|\/+$/g, '')
}

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('"', '&quot;')
}


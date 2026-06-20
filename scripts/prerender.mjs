import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = resolve(root, 'dist')
const serverEntry = resolve(distDir, 'server', 'entry-server.js')
const template = await readFile(resolve(distDir, 'index.html'), 'utf8')
const { prerenderPaths, render } = await import(pathToFileURL(serverEntry).href)

// Домен берём из CNAME, чтобы sitemap и деплой не расходились.
const cname = (await readFile(resolve(distDir, 'CNAME'), 'utf8').catch(() => 'rebit-pro.ru')).trim()
const siteOrigin = `https://${cname}`

for (const path of prerenderPaths) {
  const { html, title, description, canonical, head } = await render(path)
  const page = injectHtml(template, { html, title, description, canonical, head })
  const target = path === '/' ? resolve(distDir, 'index.html') : resolve(distDir, trimSlashes(path), 'index.html')

  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, page)
}

// sitemap.xml генерируем из фактически пререндеренных маршрутов — без ручной правки.
await writeFile(resolve(distDir, 'sitemap.xml'), buildSitemap(prerenderPaths, siteOrigin))

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

function buildSitemap(paths, origin) {
  const today = new Date().toISOString().slice(0, 10)

  const urls = [...new Set(paths)]
    .sort()
    .map((path) => {
      const { priority, changefreq } = sitemapMeta(path)
      const loc = new URL(path, origin).toString()

      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        '  </url>',
      ].join('\n')
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

function sitemapMeta(path) {
  const depth = path.split('/').filter(Boolean).length

  if ('/' === path) {
    return { priority: '1.0', changefreq: 'monthly' }
  }
  if ('/privacy/' === path) {
    return { priority: '0.3', changefreq: 'yearly' }
  }
  if (path.startsWith('/services/') || '/prices/' === path) {
    return { priority: '0.9', changefreq: 'monthly' }
  }
  if (path.startsWith('/blog/')) {
    return { priority: '0.6', changefreq: 'monthly' }
  }
  if (path.startsWith('/portfolio/') || path.startsWith('/cases/')) {
    return { priority: depth > 1 ? '0.7' : '0.8', changefreq: 'monthly' }
  }

  return { priority: '0.8', changefreq: 'monthly' }
}

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('"', '&quot;')
}


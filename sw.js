/**
 * PizuPDF service worker — website only. scripts/pwa.mjs copies it into the website build
 * as /sw.js and puts the build's file list in place of __BUILD__; never deploy this file as is.
 *
 * - On install: every page (/, /scal-pdf/ …) and every file the app needs (/assets with the
 *   DejaVu font, pdf.js image decoders, icons…) goes into one cache per version, each checked
 *   against its SHA-256 from the build — a half-copied deployment fails the install and the
 *   previous version stays.
 * - Big files only some PDFs or tools fetch (the rest of pdf.js data, Tesseract OCR) are cached
 *   the first time a tool fetches them, one cache per group and content revision.
 * - A new version installs in the background and waits; the page shows „Jest nowa wersja”
 *   (lib/pwa.ts) and switches only when the visitor clicks „Odśwież” (or closes every tab).
 */
const BUILD = {"app":"1.18.1","version":"579a04189d11","hashLength":16,"base":"/pdf/","pages":["/pdf/","/pdf/dostepny-skan-pisma/","/pdf/edytuj-pdf/","/pdf/faktura-xml-na-pdf/","/pdf/kompresuj-pdf/","/pdf/obraz-na-pdf/","/pdf/ocr-pdf/","/pdf/pdf-na-obraz/","/pdf/pdf-na-txt/","/pdf/pdf-na-word/","/pdf/podpisz-pdf/","/pdf/podziel-pdf/","/pdf/scal-pdf/","/pdf/word-na-pdf/","/pdf/wypelnij-formularz-pdf/","/pdf/zamaz-dane-w-pdf/","/pdf/znak-wodny-pdf/"],"offlinePage":"/pdf/404.html","precache":[["/pdf/","652691650fe50c6c"],["/pdf/dostepny-skan-pisma/","aeacc945b1983ac7"],["/pdf/edytuj-pdf/","d00bed3cc36d0064"],["/pdf/faktura-xml-na-pdf/","f462b8708a2ab9af"],["/pdf/kompresuj-pdf/","4c7cb8b363a99904"],["/pdf/obraz-na-pdf/","6e34f84b3048eb8d"],["/pdf/ocr-pdf/","632260571532510f"],["/pdf/pdf-na-obraz/","e1093f03bdb5b0a2"],["/pdf/pdf-na-txt/","61da34adfb24b1d6"],["/pdf/pdf-na-word/","a0a2f7469a16f156"],["/pdf/podpisz-pdf/","e4bbc293d1b46529"],["/pdf/podziel-pdf/","a46123b81eee297a"],["/pdf/scal-pdf/","ecd2e14743b19242"],["/pdf/word-na-pdf/","77b63696b446c8f6"],["/pdf/wypelnij-formularz-pdf/","1c1abf6e91e9dc81"],["/pdf/zamaz-dane-w-pdf/","df52cf9b3984d557"],["/pdf/znak-wodny-pdf/","aa0c22ecfd2e38d7"],["/pdf/favicon.png","82ea74a8d0ebad74"],["/pdf/settings-init.js","2e4a59e23cc2d053"],["/pdf/404.html","036065efa79f6bab"],["/pdf/404.css","3c181cf453dbda73"],["/pdf/manifest.webmanifest","a3ec5c326be0da05"],["/pdf/icon-192.png","0ccd7cd14a670db5"],["/pdf/icon-512.png","182cdf7bf3c68928"],["/pdf/icon-maskable-512.png","83ac1a38617c85f5"],["/pdf/apple-touch-icon.png","ea6a6543383ed58d"],["/pdf/assets/AccessibleScan-xB9F-Zm6.js","24a211ef86ba8247"],["/pdf/assets/Choice-Cpmrr4mg.js","1378181ccbb2d9d5"],["/pdf/assets/CompressPdf-DAh-3bbe.js","763f8b65bd7ee6b9"],["/pdf/assets/DejaVuSans-CHjR2eXl.ttf","7da195a74c55bef9"],["/pdf/assets/EditPdf-BefWOyj-.js","8aff331805e89e26"],["/pdf/assets/FileDropZone-ObeJh-Mn.js","1365da3cef5efc3c"],["/pdf/assets/FillPdfForm-Cvc_ZFHX.js","d9e639499ae1bb21"],["/pdf/assets/ImageToPdf-DVdyG4_b.js","cd0eabb15649a252"],["/pdf/assets/InvoiceXmlToPdf-6O4CNqPk.js","3c229740818914e3"],["/pdf/assets/MergePdf-DBYHQOow.js","aaedbcab8ea15f55"],["/pdf/assets/OcrPdf-ln11buIR.js","8597c602c83eda60"],["/pdf/assets/PdfToImage-CquFKa0X.js","193487533ee7eff3"],["/pdf/assets/PdfToText-BavT7qou.js","454c02550c4aae37"],["/pdf/assets/PdfToWord-BrTIvEdV.js","392b2182b3416dbb"],["/pdf/assets/PdfViewer-18Z80XeH.js","c8cc146b5b765a0a"],["/pdf/assets/RedactPdf-C0UJT4cX.js","1aa18fbf0aaf5820"],["/pdf/assets/SignPdf-SmgUwMIo.js","b41d7f2ab4195bbf"],["/pdf/assets/SplitPdf-CcIWtPQX.js","225738f910fc2c59"],["/pdf/assets/Toast-nXc2T_Va.js","7c753695125d2ad6"],["/pdf/assets/WatermarkPdf-kYVYV-6o.js","f6dea71a7dc614db"],["/pdf/assets/WordToPdf-m3P382KV.js","a0e899ce1b5415c8"],["/pdf/assets/binary-CPg90aSP.js","7ec4d52c3959e937"],["/pdf/assets/browser-DsdMkOke.js","8124bbcf56dcff1b"],["/pdf/assets/chunk-zsgVPwQN.js","bb6bb9a7845ce36a"],["/pdf/assets/dist-DYv-3eyR.js","cbebb2f3a5136cb6"],["/pdf/assets/env-Cj5UkmZ6.js","c8b04b62e2ba2a6b"],["/pdf/assets/es-Bwpy0l98.js","639f2ad8186ab5ac"],["/pdf/assets/es-DYq6TjsO.js","3e8d08ed3809df22"],["/pdf/assets/fontkit.es-C6jPOAI5.js","fbdc6f17aaab8c30"],["/pdf/assets/image-embed-BgFwRbDH.js","11ab8ecbb05760aa"],["/pdf/assets/image-orientation-Am5N-sAW.js","72112da20dd95654"],["/pdf/assets/index-CzPdCLKx.js","68ebf1f7bb5a1dc8"],["/pdf/assets/index-Dd7aFFxh.css","780158ede053de2f"],["/pdf/assets/lib-Dk4TGvH4.js","ca4664b48d4c3311"],["/pdf/assets/licenses-4uRCY0hr.js","cd0d301215f5b093"],["/pdf/assets/ocr-B688ibOy.js","053ab19be10edd6a"],["/pdf/assets/ocr-font-DidvqpHD.js","8bcec5b45b469c99"],["/pdf/assets/ocr-text-layer-C996RE1T.js","102d482b55061531"],["/pdf/assets/pako-O7nK5USD.js","72b05001d9a01084"],["/pdf/assets/pdf-setup-BlSFk2mU.js","73d75b7a13a5b638"],["/pdf/assets/pdf-tools-BDkIxWTT.js","06ad8131feea482d"],["/pdf/assets/pdf.worker.min-Dkey6ZUl.mjs","145d2dd3ab0c8615"],["/pdf/assets/preload-helper-CTXC5jDH.js","4d6ad1ee2ea9aad9"],["/pdf/assets/pwa-Bo2xJLW3.js","15fcb0028e56d190"],["/pdf/assets/recents-DQJ_d9x9.js","cae3c6ffa33f27c6"],["/pdf/assets/routes-BdfYCH-W.js","2c5c37f1552f3b71"],["/pdf/assets/scan-align.worker-sPsED5zO.js","1a22376dfdd766a2"],["/pdf/assets/src-C8ljFK72.js","ffe30711e8b6c681"],["/pdf/assets/tool-activity-y5BORXCY.js","b2cc2d3a80047071"],["/pdf/assets/web-api-DWMwD5kZ.js","efabe648f62a44c4"],["/pdf/pdfjs/wasm/jbig2.wasm","466f45c2a61a6981"],["/pdf/pdfjs/wasm/openjpeg.wasm","95e5002597af0824"],["/pdf/pdfjs/wasm/qcms_bg.wasm","663d86126d5f5fcb"],["/pdf/pdfjs/iccs/CGATS001Compat-v2-micro.icc","73e1ba37d2bad5ba"],["/pdf/pdfjs/standard_fonts/FoxitSymbol.pfb","47967d055530e735"],["/pdf/pdfjs/standard_fonts/FoxitDingbats.pfb","845c752392b6c914"]],"lazy":[{"cache":"pizupdf-pdfjs-51cb634ccbab","prefix":"/pdf/pdfjs/"},{"cache":"pizupdf-tesseract-dac72fb1e24f","prefix":"/pdf/tesseract/"}]}
const APP_CACHE = `pizupdf-app-${BUILD.version}`
const PRECACHED = new Set(BUILD.precache.map(([path]) => path))
const PAGES = new Set(BUILD.pages)

async function sha256(body) {
  const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', body))
  return Array.from(digest, (byte) => byte.toString(16).padStart(2, '0')).join('').slice(0, BUILD.hashLength)
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(APP_CACHE)
      await Promise.all(
        BUILD.precache.map(async ([path, hash]) => {
          // a hashed name never changes its content, so the HTTP cache may answer; the rest is revalidated
          const response = await fetch(path, { cache: path.startsWith(BUILD.base + 'assets/') ? 'default' : 'no-cache' })
          if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`)
          const body = await response.clone().arrayBuffer()
          if ((await sha256(body)) !== hash) throw new Error(`${path}: treść inna niż w wersji ${BUILD.version}`)
          // a redirected response cannot answer a navigation — store a plain copy
          await cache.put(path, response.redirected ? new Response(body, response) : response)
        })
      )
    })()
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const current = new Set([APP_CACHE, ...BUILD.lazy.map((group) => group.cache)])
      for (const name of await caches.keys()) {
        if (name.startsWith('pizupdf-') && !current.has(name)) await caches.delete(name)
      }
      // The first install takes over the page that registered it, so files a tool fetches
      // during that first visit are cached too. Later versions get here only after „Odśwież”.
      await self.clients.claim()
    })()
  )
})

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting()
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET' || request.headers.has('range')) return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return
  const path = url.pathname
  if (request.mode === 'navigate') {
    event.respondWith(page(path, url, request))
  } else if (PRECACHED.has(path)) {
    event.respondWith(fromCache(path, request))
  } else {
    const group = BUILD.lazy.find((entry) => path.startsWith(entry.prefix))
    if (group) event.respondWith(onFirstUse(event, group.cache, path, request))
  }
  // anything else (sitemap.xml, og-image.png …) goes to the server as usual
})

// Query strings (?utm_source=…) do not change a page, so /?x and / share one copy
async function fromCache(path, request) {
  return (await caches.match(path, { cacheName: APP_CACHE })) ?? fetch(request)
}

async function page(path, url, request) {
  if (PAGES.has(path)) return fromCache(path, request)
  // /scal-pdf → /scal-pdf/, as the server does — offline too
  if (PAGES.has(`${path}/`)) return Response.redirect(`${url.origin}${path}/${url.search}`, 301)
  try {
    return await fetch(request)
  } catch {
    return (await caches.match(BUILD.offlinePage, { cacheName: APP_CACHE })) ?? Response.error()
  }
}

async function onFirstUse(event, cacheName, path, request) {
  const cache = await caches.open(cacheName)
  const hit = await cache.match(path)
  if (hit) return hit
  const response = await fetch(request)
  if (response.status === 200 && response.type === 'basic') event.waitUntil(cache.put(path, response.clone()))
  return response
}

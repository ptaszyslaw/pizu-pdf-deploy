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
const BUILD = {"app":"1.17.2","version":"83ac5f8b80d6","hashLength":16,"pages":["/","/dostepny-skan-pisma/","/edytuj-pdf/","/faktura-xml-na-pdf/","/kompresuj-pdf/","/obraz-na-pdf/","/ocr-pdf/","/pdf-na-obraz/","/pdf-na-txt/","/pdf-na-word/","/podpisz-pdf/","/podziel-pdf/","/scal-pdf/","/word-na-pdf/","/wypelnij-formularz-pdf/","/zamaz-dane-w-pdf/","/znak-wodny-pdf/"],"offlinePage":"/404.html","precache":[["/","8cbc7ccd373ab863"],["/dostepny-skan-pisma/","a00c846588d1d520"],["/edytuj-pdf/","12642b25971db0bd"],["/faktura-xml-na-pdf/","4cab1069298d70ba"],["/kompresuj-pdf/","fce9bdf7184b4849"],["/obraz-na-pdf/","3d04e23fe79ff5b8"],["/ocr-pdf/","88255857520360fc"],["/pdf-na-obraz/","fb3402329db82974"],["/pdf-na-txt/","31148a869e6ba83d"],["/pdf-na-word/","85c62c572b94f367"],["/podpisz-pdf/","f44573833021833d"],["/podziel-pdf/","096e10f688613256"],["/scal-pdf/","d4d56ab13496a29e"],["/word-na-pdf/","1cc536b462fd4c4a"],["/wypelnij-formularz-pdf/","9e8e5a7446b8723d"],["/zamaz-dane-w-pdf/","c669bc79a51e9f22"],["/znak-wodny-pdf/","213718e1a5173b53"],["/favicon.png","82ea74a8d0ebad74"],["/settings-init.js","928b77c179da5c60"],["/404.html","0f5b351e38f1d755"],["/404.css","3c181cf453dbda73"],["/manifest.webmanifest","501109b746ae3143"],["/icon-192.png","0ccd7cd14a670db5"],["/icon-512.png","182cdf7bf3c68928"],["/icon-maskable-512.png","83ac1a38617c85f5"],["/apple-touch-icon.png","ea6a6543383ed58d"],["/assets/AccessibleScan-eusgXEGu.js","53ff939f4ae0815a"],["/assets/Choice-Cpmrr4mg.js","1378181ccbb2d9d5"],["/assets/CompressPdf-Di_WH5m-.js","3d00a9e0cef7a372"],["/assets/DejaVuSans-CHjR2eXl.ttf","7da195a74c55bef9"],["/assets/EditPdf-B6D6uq1p.js","5329290db0f3f7e7"],["/assets/FileDropZone-ObeJh-Mn.js","1365da3cef5efc3c"],["/assets/FillPdfForm-DUDod4QK.js","9e7613ea251998d0"],["/assets/ImageToPdf-DVdyG4_b.js","cd0eabb15649a252"],["/assets/InvoiceXmlToPdf-C3cJ4G80.js","1765618c443e5377"],["/assets/MergePdf-DBYHQOow.js","aaedbcab8ea15f55"],["/assets/OcrPdf-B_Uok85E.js","cd2607921b0fe6d0"],["/assets/PdfToImage-CVIfyH1C.js","ba33735e086bc963"],["/assets/PdfToText-SGtKGPPV.js","047e5bcb862aecd1"],["/assets/PdfToWord-OPCKUItp.js","13902bacf3d3cd86"],["/assets/PdfViewer-iPG391QV.js","93be69a756d24472"],["/assets/RedactPdf-C1vYtnQ1.js","a6731fcae594078b"],["/assets/SignPdf-inIfA-sf.js","95caaef5c0dc4bd6"],["/assets/SplitPdf-DrVXENYo.js","dde14e0422866a06"],["/assets/Toast-nXc2T_Va.js","7c753695125d2ad6"],["/assets/WatermarkPdf-W6itjHmm.js","1eb431ea244cb83d"],["/assets/WordToPdf-YpxNHs1d.js","f56ea94dec1211d3"],["/assets/binary-CPg90aSP.js","7ec4d52c3959e937"],["/assets/browser-DsdMkOke.js","8124bbcf56dcff1b"],["/assets/chunk-zsgVPwQN.js","bb6bb9a7845ce36a"],["/assets/dist-DYv-3eyR.js","cbebb2f3a5136cb6"],["/assets/env-Cj5UkmZ6.js","c8b04b62e2ba2a6b"],["/assets/es-Bwpy0l98.js","639f2ad8186ab5ac"],["/assets/es-DYq6TjsO.js","3e8d08ed3809df22"],["/assets/fontkit.es-C6jPOAI5.js","fbdc6f17aaab8c30"],["/assets/image-embed-BgFwRbDH.js","11ab8ecbb05760aa"],["/assets/image-orientation-Am5N-sAW.js","72112da20dd95654"],["/assets/index-BYGJC_Cs.js","b2fa93f584e3a9c4"],["/assets/index-Dd7aFFxh.css","780158ede053de2f"],["/assets/lib-Dk4TGvH4.js","ca4664b48d4c3311"],["/assets/licenses-4uRCY0hr.js","cd0d301215f5b093"],["/assets/ocr-DUu67c2Z.js","0fd7f8987f0509da"],["/assets/ocr-font-DbPN4Dz5.js","57d430be6bfc96b0"],["/assets/ocr-text-layer-CyDpVkGH.js","551dd445c000eb00"],["/assets/pako-O7nK5USD.js","72b05001d9a01084"],["/assets/pdf-setup-CGj-ysCd.js","754103de65e2862d"],["/assets/pdf-tools-D2QkOLYn.js","7fe1bad646f06a4a"],["/assets/pdf.worker.min-Dkey6ZUl.mjs","145d2dd3ab0c8615"],["/assets/preload-helper-Dkne9qBW.js","558f2ed4e09a4ff6"],["/assets/pwa-CgaPolpA.js","7dadbaeb20a06f83"],["/assets/recents-DQJ_d9x9.js","cae3c6ffa33f27c6"],["/assets/routes-K5dVKWgX.js","396b84c374e0c74d"],["/assets/scan-align.worker-sPsED5zO.js","1a22376dfdd766a2"],["/assets/src-C8ljFK72.js","ffe30711e8b6c681"],["/assets/tool-activity-y5BORXCY.js","b2cc2d3a80047071"],["/assets/web-api-CPa9c6t7.js","859a3b2dba0e31c0"],["/pdfjs/wasm/jbig2.wasm","466f45c2a61a6981"],["/pdfjs/wasm/openjpeg.wasm","95e5002597af0824"],["/pdfjs/wasm/qcms_bg.wasm","663d86126d5f5fcb"],["/pdfjs/iccs/CGATS001Compat-v2-micro.icc","73e1ba37d2bad5ba"],["/pdfjs/standard_fonts/FoxitSymbol.pfb","47967d055530e735"],["/pdfjs/standard_fonts/FoxitDingbats.pfb","845c752392b6c914"]],"lazy":[{"cache":"pizupdf-pdfjs-51cb634ccbab","prefix":"/pdfjs/"},{"cache":"pizupdf-tesseract-dac72fb1e24f","prefix":"/tesseract/"}]}
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
          const response = await fetch(path, { cache: path.startsWith('/assets/') ? 'default' : 'no-cache' })
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

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
const BUILD = {"app":"1.16.0","version":"31cfc8d57b2a","hashLength":16,"pages":["/","/dostepny-skan-pisma/","/edytuj-pdf/","/faktura-xml-na-pdf/","/kompresuj-pdf/","/obraz-na-pdf/","/ocr-pdf/","/pdf-na-obraz/","/pdf-na-txt/","/pdf-na-word/","/podpisz-pdf/","/podziel-pdf/","/scal-pdf/","/word-na-pdf/","/wypelnij-formularz-pdf/","/zamaz-dane-w-pdf/","/znak-wodny-pdf/"],"offlinePage":"/404.html","precache":[["/","d10172ce03b1946f"],["/dostepny-skan-pisma/","ebe2a22c951ad918"],["/edytuj-pdf/","f75cc01b3c847fef"],["/faktura-xml-na-pdf/","619e7d9fb6982726"],["/kompresuj-pdf/","1fc651c8dd9a4220"],["/obraz-na-pdf/","99d339e50db9642d"],["/ocr-pdf/","6db1caa8a893fbad"],["/pdf-na-obraz/","7f6e40009541550b"],["/pdf-na-txt/","ec53c47bb5ac3892"],["/pdf-na-word/","09775ba14869fc71"],["/podpisz-pdf/","e510bbf10e0c754d"],["/podziel-pdf/","5c604395286433fc"],["/scal-pdf/","5ed68500700a28fc"],["/word-na-pdf/","112b7418c500e4cf"],["/wypelnij-formularz-pdf/","90a06f89e3292263"],["/zamaz-dane-w-pdf/","56b81ddf32373b40"],["/znak-wodny-pdf/","0347e94aab755e9e"],["/favicon.png","cce8572f1d74da34"],["/settings-init.js","928b77c179da5c60"],["/404.html","0f5b351e38f1d755"],["/404.css","3c181cf453dbda73"],["/manifest.webmanifest","501109b746ae3143"],["/icon-192.png","58b46d6ce3836752"],["/icon-512.png","6824f65999b89b7c"],["/icon-maskable-512.png","6ae093246f36da20"],["/apple-touch-icon.png","eca97eb536e43ae3"],["/assets/AccessibleScan-Clzj82RT.js","0bb7e9444edb206d"],["/assets/Choice-IZUr6FTE.js","8e823dc86acb78da"],["/assets/CompressPdf-Cqmxo8AV.js","8c8d2fca5f61c991"],["/assets/DejaVuSans-CHjR2eXl.ttf","7da195a74c55bef9"],["/assets/EditPdf-DtBkB9tJ.js","2b48a093c966acde"],["/assets/FileDropZone-CTvOyhdy.js","f9f9ec4a1c40b612"],["/assets/FillPdfForm-DMuiN4FD.js","3915d2d073e80be5"],["/assets/ImageToPdf-rOCCFnjd.js","a51f33b23166ef42"],["/assets/InvoiceXmlToPdf-DKMh9Gf-.js","256c3dd93533f274"],["/assets/MergePdf-B0GWOALh.js","f90697d00c68cdb2"],["/assets/OcrPdf-gzg2ZfFl.js","2c2b07f8978b5aac"],["/assets/PdfToImage-DOi4d084.js","4cd2c95284c1b0b2"],["/assets/PdfToText-t7xoF2nV.js","390b48cf94116be9"],["/assets/PdfToWord-Cx44s9SF.js","87d20ddbae56b130"],["/assets/PdfViewer-DOTqozx_.js","e212ff8058ffd57b"],["/assets/RedactPdf-4GRaLMms.js","5a893913db06a5ab"],["/assets/SignPdf-QSO1Zt5Z.js","9e81e8b6c644717b"],["/assets/SplitPdf-03tK-goB.js","5d925abf04ee254e"],["/assets/Toast-CsQsTzXa.js","b91ac1321df33c01"],["/assets/WatermarkPdf-D_pK92vF.js","559851eff8ac0544"],["/assets/WordToPdf-CJibjMrz.js","d8206f621f4b2ab3"],["/assets/binary-CPg90aSP.js","7ec4d52c3959e937"],["/assets/browser-DsdMkOke.js","8124bbcf56dcff1b"],["/assets/chunk-zsgVPwQN.js","bb6bb9a7845ce36a"],["/assets/dist-DYv-3eyR.js","cbebb2f3a5136cb6"],["/assets/env-Cj5UkmZ6.js","c8b04b62e2ba2a6b"],["/assets/es-Bwpy0l98.js","639f2ad8186ab5ac"],["/assets/es-DYq6TjsO.js","3e8d08ed3809df22"],["/assets/fontkit.es-C6jPOAI5.js","fbdc6f17aaab8c30"],["/assets/image-embed-BgFwRbDH.js","11ab8ecbb05760aa"],["/assets/image-orientation-Am5N-sAW.js","72112da20dd95654"],["/assets/index-BiUSM-6T.css","1d4428849f6ffb5a"],["/assets/index-DrZJRp6D.js","8d050957efdb2909"],["/assets/lib-Dk4TGvH4.js","ca4664b48d4c3311"],["/assets/licenses-4uRCY0hr.js","cd0d301215f5b093"],["/assets/ocr-DIDajJr3.js","0ea1730004ba730d"],["/assets/ocr-font-BZIpSWO5.js","0f44a8f18e40a238"],["/assets/ocr-text-layer-CyDpVkGH.js","551dd445c000eb00"],["/assets/pako-O7nK5USD.js","72b05001d9a01084"],["/assets/pdf-setup-CGj-ysCd.js","754103de65e2862d"],["/assets/pdf-tools-UAVvKGc_.js","b7cb8ff0ea755e08"],["/assets/pdf.worker.min-Dkey6ZUl.mjs","145d2dd3ab0c8615"],["/assets/preload-helper-Dkne9qBW.js","558f2ed4e09a4ff6"],["/assets/pwa-C9NmoMsj.js","f732b117cec07412"],["/assets/recents-CwVMBHTg.js","f08928a5aa98e6f1"],["/assets/routes-7TLXYjvJ.js","0fd2d1d8e8a2a50b"],["/assets/scan-align.worker-sPsED5zO.js","1a22376dfdd766a2"],["/assets/src-C8ljFK72.js","ffe30711e8b6c681"],["/assets/tool-activity-DYYTiITm.js","bacf7d38f8b602c9"],["/assets/web-api-CPa9c6t7.js","859a3b2dba0e31c0"],["/pdfjs/wasm/jbig2.wasm","466f45c2a61a6981"],["/pdfjs/wasm/openjpeg.wasm","95e5002597af0824"],["/pdfjs/wasm/qcms_bg.wasm","663d86126d5f5fcb"],["/pdfjs/iccs/CGATS001Compat-v2-micro.icc","73e1ba37d2bad5ba"],["/pdfjs/standard_fonts/FoxitSymbol.pfb","47967d055530e735"],["/pdfjs/standard_fonts/FoxitDingbats.pfb","845c752392b6c914"]],"lazy":[{"cache":"pizupdf-pdfjs-51cb634ccbab","prefix":"/pdfjs/"},{"cache":"pizupdf-tesseract-dac72fb1e24f","prefix":"/tesseract/"}]}
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

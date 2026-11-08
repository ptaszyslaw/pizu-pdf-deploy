/**
 * Retiring service worker for pdf.pizu.pl — the app moved to https://pizu.pl/pdf/.
 * Browsers check service worker updates at the URL it was registered from and never
 * follow the 301 the .htaccess sends for everything else, so an installed PWA would
 * otherwise keep the old version forever. This worker takes over, clears the old
 * caches, unregisters itself and navigates every open window to the new address.
 */
self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      for (const name of await caches.keys()) await caches.delete(name)
      await self.registration.unregister()
      const target = "https://pizu.pl/pdf/"
      const windows = await self.clients.matchAll({ type: "window" })
      for (const client of windows) {
        const current = new URL(client.url)
        // only windows of this app (the old subdomain), path and query preserved
        if (current.hostname !== "pdf.pizu.pl" && current.hostname !== "www.pdf.pizu.pl") continue
        client.navigate(target + current.pathname + current.search + current.hash).catch(() => {})
      }
    })()
  )
})

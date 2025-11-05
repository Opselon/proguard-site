// File: src/index.mjs - FINAL VERSION FOR STANDALONE WORKER

import { renderPage } from './html.mjs';
import { pageModel } from './data.mjs';

// Import the raw text content of your static assets
import clientJs from './assets/client.mjs?raw';
import styleCss from './assets/style.css?raw';
import themeJs from './assets/theme.mjs?raw';
import i18nIndex from './assets/i18n/index.mjs?raw';
import faJsonStr from './assets/i18n/fa.json?raw';
import enJsonStr from './assets/i18n/en.json?raw';

// A map to hold our static assets for serving
const assetMap = new Map([
  ['/assets/client.mjs', { content: clientJs, type: 'application/javascript; charset=utf-8' }],
  ['/assets/style.css', { content: styleCss, type: 'text/css; charset=utf-8' }],
  ['/assets/theme.mjs', { content: themeJs, type: 'application/javascript; charset=utf-8' }],
  ['/assets/i18n/index.mjs', { content: i18nIndex, type: 'application/javascript; charset=utf-8' }],
  ['/assets/i18n/fa.json', { content: faJsonStr, type: 'application/json; charset=utf-8' }],
  ['/assets/i18n/en.json', { content: enJsonStr, type: 'application/json; charset=utf-8' }],
]);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;

    // 1. Check if the request is for a static asset in our map
    if (assetMap.has(pathname)) {
      const asset = assetMap.get(pathname);
      return new Response(asset.content, {
        headers: { 'Content-Type': asset.type, 'Cache-Control': 'public, max-age=604800' },
      });
    }
    // NOTE: For images, you should host them on a service like R2 or a CDN.
    // Serving binary files directly from the worker code is inefficient.

    // 2. Handle API requests
    if (pathname === '/api/contact' && request.method === 'POST') {
      const rateLimiterId = env.RATE_LIMITER.idFromName(request.headers.get('CF-Connecting-IP'));
      const rateLimiter = env.RATE_LIMITER.get(rateLimiterId);
      return rateLimiter.fetch(request);
    }

    // 3. Handle the main page request
    if (pathname === '/') {
      // Parse the JSON strings into objects for use in rendering
      const faJson = JSON.parse(faJsonStr);
      const enJson = JSON.parse(enJsonStr);
      
      const acceptLang = request.headers.get('Accept-Language') || '';
      const preferredLocale = acceptLang.startsWith('fa') ? 'fa' : env.DEFAULT_LOCALE || 'fa';
      const messages = preferredLocale === 'fa' ? faJson : enJson;
      
      const themeCookie = request.headers.get('Cookie')?.match(/theme=(light|dark)/);
      const theme = themeCookie ? themeCookie[1] : env.THEME_DEFAULT || 'light';

      const html = renderPage({ model: pageModel, locale: preferredLocale, messages, theme, env });
      return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }
    
    // 4. If nothing else matches, return a 404
    return new Response('Not Found', { status: 404 });
  },
};

// Durable Object class for rate limiting
export class RateLimiter {
    constructor(state, env) { this.storage = state.storage; }
    async fetch(request) {
        const timestamp = Date.now();
        const limit = 5;
        const window = 60000;
        let timestamps = await this.storage.get('timestamps') || [];
        timestamps = timestamps.filter(ts => timestamp - ts < window);
        if (timestamps.length >= limit) {
            return new Response(JSON.stringify({ error: 'Too many requests' }), { status: 429 });
        }
        timestamps.push(timestamp);
        await this.storage.put('timestamps', timestamps);
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    }
}
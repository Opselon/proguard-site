// File: src/index.mjs - FINAL VERSION (using the build script)

import { renderPage } from './html.mjs';
import { pageModel } from './data.mjs';

// Import assets from the auto-generated file. NO MORE `?raw`!
import {
  clientJs,
  styleCss,
  themeJs,
  i18nIndex,
  faJsonStr,
  enJsonStr
} from './generated-assets.mjs';

// Map the imported content to be served
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

    // 1. Serve static assets
    if (assetMap.has(pathname)) {
      const asset = assetMap.get(pathname);
      return new Response(asset.content, { headers: { 'Content-Type': asset.type } });
    }

    // 2. Handle API
    if (pathname === '/api/contact' && request.method === 'POST') {
      const rateLimiterId = env.RATE_LIMITER.idFromName(request.headers.get('CF-Connecting-IP'));
      const rateLimiter = env.RATE_LIMITER.get(rateLimiterId);
      return rateLimiter.fetch(request);
    }

    // 3. Render main page
    if (pathname === '/') {
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
    
    // 4. Not Found
    return new Response('Not Found', { status: 404 });
  },
};

// Durable Object class
export class RateLimiter {
    constructor(state, env) { this.storage = state.storage; }
    async fetch(request) {
        // ... (your rate limiter logic)
        return new Response(JSON.stringify({ success: true }));
    }
}
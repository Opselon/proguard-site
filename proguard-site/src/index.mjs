// File: src/index.mjs - Worker entry that serves the marketing site

import { renderPage } from './html.mjs';
import { pageModel } from './data.mjs';

// Import assets from the auto-generated file. NO MORE `?raw`!
import {
  clientJs,
  styleCss,
  themeJs,
  i18nIndex,
  faJsonStr,
  enJsonStr,
} from './generated-assets.mjs';

const assetMap = new Map([
  ['/assets/client.mjs', { content: clientJs, type: 'application/javascript; charset=utf-8' }],
  ['/assets/style.css', { content: styleCss, type: 'text/css; charset=utf-8' }],
  ['/assets/theme.mjs', { content: themeJs, type: 'application/javascript; charset=utf-8' }],
  ['/assets/i18n/index.mjs', { content: i18nIndex, type: 'application/javascript; charset=utf-8' }],
  ['/assets/i18n/fa.json', { content: faJsonStr, type: 'application/json; charset=utf-8' }],
  ['/assets/i18n/en.json', { content: enJsonStr, type: 'application/json; charset=utf-8' }],
]);

const pageRoutes = new Map([
  ['/', 'home'],
  ['/why-us', 'why-us'],
  ['/services', 'services'],
  ['/solutions', 'solutions'],
  ['/products', 'solutions'],
  ['/projects', 'projects'],
  ['/case-studies', 'projects'],
  ['/faq', 'faq'],
  ['/contact', 'contact'],
  ['/about', 'about'],
]);

const toSlug = (text = '') => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const productSlugSet = new Set(pageModel.products.map((product) => product.slug || toSlug(product.id)));

function resolveLocale(request, url, env) {
  const faJson = JSON.parse(faJsonStr);
  const enJson = JSON.parse(enJsonStr);

  const acceptLang = request.headers.get('Accept-Language') || '';
  const localeParam = url.searchParams.get('lang') || url.searchParams.get('locale');
  const normalizedParam = localeParam ? localeParam.toLowerCase() : '';
  const defaultLocale = env.DEFAULT_LOCALE || 'fa';
  const preferredLocale = normalizedParam === 'en'
    ? 'en'
    : normalizedParam === 'fa'
      ? 'fa'
      : acceptLang.startsWith('fa')
        ? 'fa'
        : defaultLocale;

  const messages = preferredLocale === 'fa' ? faJson : enJson;
  return { locale: preferredLocale, messages };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;

    if (assetMap.has(pathname)) {
      const asset = assetMap.get(pathname);
      return new Response(asset.content, {
        headers: {
          'Content-Type': asset.type,
          'Cache-Control': 'public, max-age=604800',
        },
      });
    }

    if (pathname === '/api/contact' && request.method === 'POST') {
      const rateLimiterId = env.RATE_LIMITER.idFromName(request.headers.get('CF-Connecting-IP'));
      const rateLimiter = env.RATE_LIMITER.get(rateLimiterId);
      return rateLimiter.fetch(request);
    }

    const themeCookie = request.headers.get('Cookie')?.match(/theme=(light|dark)/);
    const theme = themeCookie ? themeCookie[1] : env.THEME_DEFAULT || 'light';
    const { locale, messages } = resolveLocale(request, url, env);

    const productMatch = pathname.match(/^\/products\/([a-z0-9-]+)/i);
    if (productMatch) {
      const slug = productMatch[1].toLowerCase();
      if (!productSlugSet.has(slug)) {
        return new Response('Not Found', { status: 404 });
      }

      const html = renderPage({
        model: pageModel,
        locale,
        messages,
        theme,
        env,
        page: 'product-detail',
        productSlug: slug,
      });

      return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }

    const pageKey = pageRoutes.get(pathname);
    if (pageKey) {
      const html = renderPage({
        model: pageModel,
        locale,
        messages,
        theme,
        env,
        page: pageKey,
      });

      return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }

    return new Response('Not Found', { status: 404 });
  },
};

export class RateLimiter {
  constructor(state, env) {
    this.storage = state.storage;
  }

  async fetch(request) {
    const timestamp = Date.now();
    const limit = 5;
    const window = 60000;
    let timestamps = await this.storage.get('timestamps') || [];
    timestamps = timestamps.filter((ts) => timestamp - ts < window);
    if (timestamps.length >= limit) {
      return new Response(JSON.stringify({ error: 'Too many requests' }), { status: 429 });
    }
    timestamps.push(timestamp);
    await this.storage.put('timestamps', timestamps);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }
}

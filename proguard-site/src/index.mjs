// File: src/index.mjs - Worker entry that serves the marketing site

import { renderPage } from './html.mjs';
import { pageModel } from './data.mjs';

// Import assets from the auto-generated file. NO MORE `?raw`!
import {
  clientJs,
  lazyJs,
  styleCss,
  themeJs,
  i18nIndex,
  faJsonStr,
  enJsonStr,
} from './generated-assets.mjs';

const assetMap = new Map([
  ['/assets/client.mjs', { content: clientJs, type: 'application/javascript; charset=utf-8' }],
  ['/assets/lazy.mjs', { content: lazyJs, type: 'application/javascript; charset=utf-8' }],
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
  ['/articles', 'articles'],
]);

const toSlug = (text = '') => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const productSlugSet = new Set(pageModel.products.map((product) => product.slug || toSlug(product.id)));
const articleSlugSet = new Set(pageModel.articles?.map((article) => article.slug));

const supportedLocales = ['fa', 'en'];

const normalizeBaseUrl = (env, url) => {
  const configured = typeof env?.SITE_URL === 'string' ? env.SITE_URL.trim() : '';
  if (configured) {
    const trimmed = configured.replace(/\/$/, '');
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return trimmed;
    }
    return `https://${trimmed}`;
  }
  const origin = `${url.protocol}//${url.host}`;
  return origin.replace(/\/$/, '');
};

const buildLocalizedUrl = ({ baseUrl, path, locale, defaultLocale, searchParams }) => {
  const params = searchParams instanceof URLSearchParams
    ? new URLSearchParams(searchParams.toString())
    : new URLSearchParams(searchParams || '');
  params.delete('locale');
  if (locale === defaultLocale) {
    params.delete('lang');
  } else {
    params.set('lang', locale);
  }
  const query = params.toString();
  return `${baseUrl}${path}${query ? `?${query}` : ''}`;
};

const generateRobotsTxt = (baseUrl) => `User-agent: *
Allow: /
Disallow: /api/
Sitemap: ${baseUrl}/sitemap.xml
Host: ${baseUrl.replace(/^https?:\/\//, '')}
`;

const generateSitemapXml = ({ baseUrl, defaultLocale, locales }) => {
  const isoDate = new Date().toISOString();
  const paths = new Set([
    ...pageRoutes.keys(),
    ...Array.from(productSlugSet, (slug) => `/products/${slug}`),
    ...Array.from(articleSlugSet, (slug) => `/articles/${slug}`),
  ]);
  const urlEntries = Array.from(paths)
    .sort()
    .map((path) => {
      const defaultLoc = buildLocalizedUrl({ baseUrl, path, locale: defaultLocale, defaultLocale, searchParams: '' });
      const localeLinks = locales
        .map((locale) => `      <xhtml:link rel="alternate" hreflang="${locale}" href="${buildLocalizedUrl({ baseUrl, path, locale, defaultLocale, searchParams: '' })}" />`)
        .join('\n');
      const xDefault = `      <xhtml:link rel="alternate" hreflang="x-default" href="${defaultLoc}" />`;
      const priority = path === '/' ? '1.0' : '0.7';
      return `  <url>\n    <loc>${defaultLoc}</loc>\n${localeLinks}\n${xDefault}\n    <lastmod>${isoDate}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urlEntries}\n</urlset>`;
};

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
    const baseOrigin = normalizeBaseUrl(env, url);
    const defaultLocale = env.DEFAULT_LOCALE || 'fa';
    const locales = Array.from(new Set([defaultLocale, ...supportedLocales]));

    if (assetMap.has(pathname)) {
      const asset = assetMap.get(pathname);
      return new Response(asset.content, {
        headers: {
          'Content-Type': asset.type,
          'Cache-Control': 'public, max-age=604800',
        },
      });
    }

    if (pathname === '/robots.txt') {
      const robotsTxt = generateRobotsTxt(baseOrigin);
      return new Response(robotsTxt, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, max-age=86400',
        },
      });
    }

    if (pathname === '/sitemap.xml') {
      const sitemapXml = generateSitemapXml({ baseUrl: baseOrigin, defaultLocale, locales });
      return new Response(sitemapXml, {
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=86400',
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
    const canonical = buildLocalizedUrl({
      baseUrl: baseOrigin,
      path: url.pathname,
      locale,
      defaultLocale,
      searchParams: url.searchParams,
    });
    const alternateLocales = locales.map((lang) => ({
      locale: lang,
      href: buildLocalizedUrl({ baseUrl: baseOrigin, path: url.pathname, locale: lang, defaultLocale, searchParams: url.searchParams }),
      isDefault: lang === defaultLocale,
    }));

    const articleMatch = pathname.match(/^\/articles\/([a-z0-9-]+)/i);
    if (articleMatch) {
      const slug = articleMatch[1].toLowerCase();
      if (!articleSlugSet.has(slug)) {
        return new Response('Not Found', { status: 404 });
      }

      const html = renderPage({
        model: pageModel,
        locale,
        messages,
        theme,
        env,
        page: 'article-detail',
        articleSlug: slug,
        canonicalUrl: canonical,
        baseUrl: baseOrigin,
        alternateLocales,
      });

      return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }

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
        canonicalUrl: canonical,
        baseUrl: baseOrigin,
        alternateLocales,
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
        canonicalUrl: canonical,
        baseUrl: baseOrigin,
        alternateLocales,
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

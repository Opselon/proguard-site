// File: src/html.mjs

// NOTE: These imports will fail if their respective files are empty.
// Make sure icons/index.mjs and images/index.mjs have content.
import { getIcon } from './assets/icons/index.mjs';
import { resolveImageUrl } from './assets/images/index.mjs';

const t = (key, messages) => {
  // Simple key resolver
  return key.split('.').reduce((o, i) => (o ? o[i] : key), messages);
};

const renderProductCard = ({ product, messages, env }) => {
  const imageUrl = resolveImageUrl(product.imageKey, { format: 'webp' }, env);
  const fallbackUrl = resolveImageUrl(product.imageKey, { format: 'jpg' }, env);
  const altText = t(product.titleKey, messages);

  return `
    <article class="product-card" data-id="${product.id}" data-search-term="${altText.toLowerCase()}">
      <picture class="product-card__image">
        <source srcset="${imageUrl}" type="image/webp">
        <img src="${fallbackUrl}" alt="${altText}" loading="lazy" decoding="async">
      </picture>
      <div class="product-card__content">
        <h3 class="product-card__title">${altText}</h3>
        <p class="product-card__desc">${t(product.descriptionKey, messages)}</p>
        <a href="${product.qrLink}" class="product-card__cta">${t('global.learnMore', messages)}</a>
      </div>
    </article>
  `;
};

// THIS IS THE MISSING EXPORT
export const renderPage = ({ model, locale, messages, theme, env }) => {
  const direction = messages._meta.direction;
  const criticalCss = `/* Critical CSS Placeholder */ body { visibility: hidden; }`;

  return `
    <!DOCTYPE html>
    <html lang="${locale}" dir="${direction}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${t('global.title', messages)}</title>
      <meta name="description" content="${t('global.description', messages)}">
      <meta name="theme-color" content="${theme === 'light' ? '#0B5671' : '#0B1220'}">
      <meta name="color-scheme" content="light dark">

      <style>${criticalCss}</style>
      <link rel="stylesheet" href="/assets/style.css" media="print" onload="this.media='all'">
      <link rel="preload" href="/assets/client.mjs" as="script" cross-origin>
    </head>
    <body class="${theme === 'dark' ? 'dark-theme' : ''}">
      <div id="app">
        <!-- Header, Main, Footer content will be rendered here based on other functions -->
        <header class="site-header">
            <div class="container">
                <a href="/" class="logo">LOGO</a>
                <nav>SEARCH | THEME | LOCALE</nav>
            </div>
        </header>
        <main>
            <section class="hero"><h1>${t(model.hero.titleKey, messages)}</h1></section>
            <section id="products" class="product-section">
                <div class="product-grid">
                    ${model.products.map(p => renderProductCard({ product: p, messages, env })).join('')}
                </div>
            </section>
        </main>
      </div>
      <script type="module" src="/assets/client.mjs"></script>
    </body>
    </html>
  `;
};
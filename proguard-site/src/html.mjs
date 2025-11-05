// File: src/html.mjs

// NOTE: These imports will fail if their respective files are empty.
// Make sure icons/index.mjs and images/index.mjs have content.
import { getIcon } from './assets/icons/index.mjs';
import { resolveImageUrl, getProductIllustration } from './assets/images/index.mjs';

const t = (key, messages) => {
  // Simple key resolver
  return key.split('.').reduce((o, i) => (o ? o[i] : key), messages);
};

const renderHeader = ({ messages, locale }) => {
  const navLinks = [
    { href: '#products', label: t('global.nav.solutions', messages) },
    { href: 'https://www.proguardcoatings.com/projects', label: t('global.nav.projects', messages), external: true },
    { href: 'https://www.proguardcoatings.com/about', label: t('global.nav.about', messages), external: true },
  ];

  const localeLinks = [
    { code: 'fa', label: t('global.locale.fa', messages) },
    { code: 'en', label: t('global.locale.en', messages) },
  ];

  const wordmark = locale === 'fa' ? 'پروگارد' : 'Proguard';

  return `
    <header class="site-header">
      <div class="container site-header__inner">
        <a href="/" class="logo" aria-label="${t('global.companyName', messages)}">
          ${getIcon('logo')}
          <span class="logo__wordmark">${wordmark}</span>
        </a>
        <nav class="site-nav" aria-label="${t('global.products', messages)}">
          ${navLinks
            .map(({ href, label, external }) => {
              const rel = external ? ' rel="noopener noreferrer" target="_blank"' : '';
              return `<a href="${href}"${rel}>${label}</a>`;
            })
            .join('')}
        </nav>
        <div class="site-controls">
          <div class="header-search">
            <label for="product-search" class="visually-hidden">${t('global.search.label', messages)}</label>
            <input id="product-search" type="search" name="search" placeholder="${t('global.search.placeholder', messages)}" autocomplete="off">
            <span class="header-search__icon">${getIcon('search')}</span>
          </div>
          <button id="theme-toggle" class="control-button" type="button" aria-label="${t('global.theme.toggle', messages)}">
            ${getIcon('theme-light')}
            ${getIcon('theme-dark')}
          </button>
          <div class="locale-switcher" aria-label="${t('global.locale.label', messages)}">
            ${localeLinks
              .map(({ code, label }) => {
                const isActive = code === locale;
                return `<a href="${code === 'fa' ? '/' : '/?lang=' + code}" data-locale="${code}" class="${isActive ? 'active' : ''}">
                  <span class="locale-switcher__icon">${getIcon('locale')}</span>
                  <span>${label}</span>
                </a>`;
              })
              .join('')}
          </div>
        </div>
      </div>
    </header>
  `;
};

const renderHero = ({ model, messages, env }) => {
  const heroWebp = resolveImageUrl(model.hero.imageKey, { format: 'webp' }, env);
  const heroJpg = resolveImageUrl(model.hero.imageKey, { format: 'jpg' }, env);

  return `
    <section class="hero" id="hero">
      <div class="container hero__inner">
        <div class="hero__content">
          <p class="hero__eyebrow">${t('global.companyName', messages)}</p>
          <h1 class="hero__title">${t(model.hero.titleKey, messages)}</h1>
          <p class="hero__subtitle">${t(model.hero.subtitleKey, messages)}</p>
          <div class="hero__cta">
            <a href="#products" class="btn btn--primary">${t(model.hero.ctaKey, messages)}</a>
            <a href="https://www.proguardcoatings.com/contact" target="_blank" rel="noopener noreferrer" class="btn btn--secondary">
              ${t('global.nav.contact', messages)}
            </a>
          </div>
        </div>
        <div class="hero__visual" aria-hidden="true">
          <picture>
            <source srcset="${heroWebp}" type="image/webp">
            <img src="${heroJpg}" alt="" loading="lazy" decoding="async">
          </picture>
          <div class="hero__glow"></div>
        </div>
      </div>
      <div class="section-separator" aria-hidden="true">
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 120L1440 0V120H0Z"></path>
        </svg>
      </div>
    </section>
  `;
};

const renderProductCard = ({ product, messages }) => {
  const title = t(product.titleKey, messages);
  const tagline = t(product.taglineKey, messages);
  const description = t(product.descriptionKey, messages);
  const illustration = getProductIllustration(product.illustrationKey);

  const searchTerm = `${title} ${tagline} ${description}`.toLowerCase();

  return `
    <article class="product-card" data-id="${product.id}" data-search-term="${searchTerm}">
      <div class="product-card__surface" aria-hidden="true"></div>
      <div class="product-card__visual" aria-hidden="true">${illustration}</div>
      <div class="product-card__content">
        <div class="product-card__heading">
          <h3 class="product-card__title">${title}</h3>
          <p class="product-card__tagline">${tagline}</p>
        </div>
        <p class="product-card__desc">${description}</p>
        <a href="${product.qrLink}" class="product-card__cta" target="_blank" rel="noopener noreferrer">
          <span>${t('global.learnMore', messages)}</span>
          <span class="product-card__cta-icon" aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  `;
};

const renderProductsSection = ({ model, messages }) => {
  return `
    <section id="products" class="product-section">
      <div class="container">
        <header class="section-heading">
          <span class="section-heading__eyebrow">${t(model.productsSection.eyebrowKey, messages)}</span>
          <h2 class="section-heading__title">${t(model.productsSection.titleKey, messages)}</h2>
          <p class="section-heading__description">${t(model.productsSection.descriptionKey, messages)}</p>
        </header>
        <div class="product-grid">
          ${model.products.map(product => renderProductCard({ product, messages })).join('')}
        </div>
      </div>
    </section>
  `;
};

const renderFooter = ({ messages }) => {
  const phoneValue = t('footer.phone', messages);
  const phoneLink = phoneValue.replace(/\s+/g, '');
  const emailValue = t('footer.email', messages);

  return `
    <footer class="site-footer" id="contact">
      <div class="container site-footer__inner">
        <div class="site-footer__content">
          <h2>${t('footer.cta', messages)}</h2>
          <p class="site-footer__address">${t('footer.address', messages)}</p>
          <div class="site-footer__contacts">
            <a href="tel:${phoneLink}" class="contact-link">
              <span class="contact-link__label">${t('footer.phoneLabel', messages)}</span>
              <span class="contact-link__value">${phoneValue}</span>
            </a>
            <a href="mailto:${emailValue}" class="contact-link">
              <span class="contact-link__label">${t('footer.emailLabel', messages)}</span>
              <span class="contact-link__value">${emailValue}</span>
            </a>
            <a href="https://www.proguardcoatings.com/contact" target="_blank" rel="noopener noreferrer" class="contact-link contact-link--cta">
              ${t('footer.contactCta', messages)}
            </a>
          </div>
        </div>
        <p class="site-footer__legal">© ${new Date().getFullYear()} ${t('global.companyName', messages)} — ${t('global.rightsReserved', messages)}</p>
      </div>
    </footer>
  `;
};

export const renderPage = ({ model, locale, messages, theme, env }) => {
  const direction = messages._meta.direction;
  const criticalCss = `
    :root { color-scheme: light dark; }
    body { margin: 0; font-family: 'Inter', sans-serif; background: #edf1f3; color: #0f1a21; transition: background-color .6s ease, color .6s ease; }
    html[dir="rtl"] body { font-family: 'Vazirmatn', sans-serif; }
  `;

  return `
    <!DOCTYPE html>
    <html lang="${locale}" dir="${direction}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${t('global.title', messages)}</title>
      <meta name="description" content="${t('global.description', messages)}">
      <meta name="theme-color" content="${theme === 'light' ? '#0C5D7A' : '#091423'}">
      <meta name="color-scheme" content="light dark">

      <style>${criticalCss}</style>
      <link rel="stylesheet" href="/assets/style.css" media="print" onload="this.media='all'">
      <link rel="preload" href="/assets/client.mjs" as="script" cross-origin>
    </head>
    <body class="${theme === 'dark' ? 'dark-theme' : ''}">
      <div id="app">
        ${renderHeader({ messages, locale })}
        <main>
          ${renderHero({ model, messages, env })}
          ${renderProductsSection({ model, messages })}
        </main>
        ${renderFooter({ messages })}
      </div>
      <script type="module" src="/assets/client.mjs"></script>
    </body>
    </html>
  `;
};
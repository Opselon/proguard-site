// File: src/html.mjs

import { getIcon } from './assets/icons/index.mjs';
import { resolveImageUrl, getProductIllustration } from './assets/images/index.mjs';

const resolveKey = (key, messages) => key.split('.').reduce((o, i) => (o ? o[i] : undefined), messages);

const t = (key, messages) => {
  const value = resolveKey(key, messages);
  return value === undefined || value === null ? key : value;
};

const normalizeHref = (item) => item.path || item.anchor || '#';

const cleanObject = (object) => {
  if (!object || typeof object !== 'object') return object;
  Object.entries(object).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      delete object[key];
      return;
    }
    if (Array.isArray(value)) {
      const filtered = value.filter((item) => {
        if (item === undefined || item === null) return false;
        if (typeof item === 'object') {
          const cleaned = cleanObject({ ...item });
          return Object.keys(cleaned).length > 0;
        }
        return true;
      });
      if (filtered.length > 0) {
        object[key] = filtered.map((item) => (typeof item === 'object' ? cleanObject({ ...item }) : item));
      } else {
        delete object[key];
      }
      return;
    }
    if (typeof value === 'object') {
      const cleaned = cleanObject({ ...value });
      if (Object.keys(cleaned).length === 0) {
        delete object[key];
      } else {
        object[key] = cleaned;
      }
    }
  });
  return object;
};

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const toOgLocale = (locale) => (locale === 'fa' ? 'fa_IR' : 'en_US');

const buildPageMeta = ({ model, messages, page, productSlug, defaultTitle, defaultDescription }) => {
  const companyName = t('global.companyName', messages);
  const baseKeywords = [
    'protective coatings',
    'waterproofing systems',
    'industrial nanocoatings',
    'construction chemistry',
    companyName,
  ];

  const productKeywords = Array.isArray(model.products)
    ? model.products
        .map((product) => t(product.titleKey, messages))
        .filter((keyword) => typeof keyword === 'string' && keyword.trim().length > 0)
    : [];

  let title = defaultTitle;
  let description = typeof defaultDescription === 'string' ? defaultDescription : defaultTitle;
  let ogType = 'website';
  let schemaType = 'WebPage';
  let imageAlt = defaultTitle;

  if (page === 'product-detail') {
    const product = model.products?.find((item) => item.slug === productSlug);
    const detail = model.productDetails?.[productSlug];
    if (product) {
      const productTitle = t(product.titleKey, messages);
      const tagline = t(product.taglineKey, messages);
      const overview = detail ? t(detail.overviewKey, messages) : tagline;
      title = `${productTitle} | ${defaultTitle}`;
      if (typeof overview === 'string' && overview.trim().length > 0) {
        description = overview;
      } else if (typeof tagline === 'string') {
        description = tagline;
      }
      if (typeof tagline === 'string' && tagline.trim().length > 0) {
        imageAlt = tagline;
      } else if (typeof productTitle === 'string') {
        imageAlt = productTitle;
      }
      ogType = 'product';
      schemaType = 'Product';
    }
  } else if (page !== 'home') {
    const navItem = model.navigation?.find((item) => Array.isArray(item.pages) && item.pages.includes(page));
    if (navItem) {
      const label = t(navItem.labelKey, messages);
      title = `${label} | ${defaultTitle}`;
      description = `${label} – ${defaultDescription}`;
    }
  }

  const keywords = Array.from(new Set([...baseKeywords, ...productKeywords]));

  return {
    title,
    description,
    keywords,
    ogType,
    schemaType,
    imageAlt,
  };
};

const renderHeader = ({ model, messages, locale, currentPage }) => {
  const isHome = currentPage === 'home';
  const wordmark = locale === 'fa' ? 'پروگارد' : 'ProGuard';
  const navItems = new Map(model.navigation.map((item) => [item.id, item]));
  const navGroupsConfig = [
    { id: 'discover', itemIds: ['hero', 'why-us', 'services'] },
    { id: 'solutions', itemIds: ['products', 'case-studies'] },
    { id: 'company', itemIds: ['about', 'faq', 'contact'] },
  ];

  const buildNavLink = (item, { leafClass, linkClass }) => {
    if (!item) return '';
    const href = normalizeHref(item);
    const label = t(item.labelKey, messages);
    const isActive = Array.isArray(item.pages) && item.pages.includes(currentPage);
    const scrollTarget = isHome && item.anchor ? item.anchor : '';
    const classNames = [linkClass];
    if (isActive) {
      classNames.push('is-active');
    }
    const scrollAttr = scrollTarget ? ` data-scroll-target="${scrollTarget}"` : '';
    const ariaCurrent = isActive ? ' aria-current="page"' : '';
    return `
      <li class="${leafClass}">
        <a href="${href}" class="${classNames.filter(Boolean).join(' ')}"${scrollAttr}${ariaCurrent}>${label}</a>
      </li>
    `;
  };

  const navGroupsDesktop = navGroupsConfig
    .map((group) => {
      const links = group.itemIds
        .map((id) => buildNavLink(navItems.get(id), { leafClass: 'site-menu__item', linkClass: 'site-menu__link' }))
        .filter(Boolean)
        .join('');
      if (!links) return '';
      const panelId = `desktop-nav-${group.id}`;
      return `
        <li class="site-menu__group" data-menu-group>
          <button class="site-menu__trigger" type="button" aria-expanded="false" aria-controls="${panelId}" data-menu-trigger>
            <span>${t(`global.nav.groups.${group.id}`, messages)}</span>
            <span class="site-menu__chevron">${getIcon('chevron')}</span>
          </button>
          <div class="site-menu__dropdown" id="${panelId}" role="menu" data-menu-dropdown>
            <ul class="site-menu__list">${links}</ul>
          </div>
        </li>
      `;
    })
    .filter(Boolean)
    .join('');

  const navGroupsMobile = navGroupsConfig
    .map((group, index) => {
      const links = group.itemIds
        .map((id) => buildNavLink(navItems.get(id), { leafClass: 'drawer-menu__item', linkClass: 'drawer-menu__link' }))
        .filter(Boolean)
        .join('');
      if (!links) return '';
      const panelId = `mobile-nav-${group.id}`;
      const defaultAttr = index === 0 ? ' data-nav-default="true"' : '';
      return `
        <li class="drawer-menu__group" data-drawer-group${defaultAttr}>
          <button class="drawer-menu__trigger" type="button" aria-expanded="false" aria-controls="${panelId}" data-drawer-toggle>
            <span>${t(`global.nav.groups.${group.id}`, messages)}</span>
            <span class="drawer-menu__icon">${getIcon('chevron')}</span>
          </button>
          <div class="drawer-menu__panel" id="${panelId}" data-drawer-panel hidden>
            <ul class="drawer-menu__list">${links}</ul>
          </div>
        </li>
      `;
    })
    .filter(Boolean)
    .join('');

  const contactItem = navItems.get('contact');
  const contactHref = contactItem ? normalizeHref(contactItem) : '/contact';
  const contactScroll = isHome && contactItem?.anchor ? contactItem.anchor : '';
  const contactScrollAttr = contactScroll ? ` data-scroll-target="${contactScroll}"` : '';

  return `
    <header class="site-header" id="top">
      <div class="container site-header__bar">
        <a href="/" class="logo" aria-label="${t('global.companyName', messages)}">
          ${getIcon('logo')}
          <span class="logo__wordmark">${wordmark}</span>
        </a>
        <nav class="site-menu" aria-label="${t('global.products', messages)}">
          <ul class="site-menu__groups">${navGroupsDesktop}</ul>
        </nav>
        <div class="site-header__actions">
          <button id="theme-toggle" class="control-button" type="button" aria-label="${t('global.theme.toggle', messages)}">
            ${getIcon('theme-light')}
            ${getIcon('theme-dark')}
          </button>
          <a href="${contactHref}" class="btn btn--primary btn--compact"${contactScrollAttr}>
            ${t('services.cta', messages)}
          </a>
          <button id="menu-toggle" class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-navigation">
            <span class="visually-hidden">${t('global.menu.toggle', messages)}</span>
            <span class="menu-toggle__icon menu-toggle__icon--open">${getIcon('menu')}</span>
            <span class="menu-toggle__icon menu-toggle__icon--close">${getIcon('close')}</span>
          </button>
        </div>
      </div>
      <div class="site-drawer__backdrop" data-menu-backdrop aria-hidden="true"></div>
      <div class="site-drawer" id="site-navigation" aria-hidden="true" role="dialog" aria-modal="true" aria-label="${t('global.menu.title', messages)}" hidden>
        <div class="site-drawer__inner" tabindex="-1">
          <div class="site-drawer__top">
            <span class="site-drawer__brand">${wordmark}</span>
            <button class="site-drawer__close" type="button" data-drawer-close aria-label="${t('global.menu.close', messages)}">
              ${getIcon('close')}
            </button>
          </div>
          <div class="site-drawer__search">
            <label for="product-search" class="visually-hidden">${t('global.search.label', messages)}</label>
            <input id="product-search" type="search" name="search" placeholder="${t('global.search.placeholder', messages)}" autocomplete="off">
            <span class="site-drawer__search-icon">${getIcon('search')}</span>
          </div>
          <nav class="site-drawer__nav" aria-label="${t('global.products', messages)}">
            <ul class="drawer-menu">${navGroupsMobile}</ul>
          </nav>
          <div class="site-drawer__cta">
            <a href="/solutions" class="btn btn--primary">${t(model.hero.ctaPrimaryKey, messages)}</a>
            <a href="/projects" class="btn btn--secondary">${t(model.hero.ctaSecondaryKey, messages)}</a>
            <a href="#catalog" class="btn btn--ghost" data-scroll-target="#catalog">
              ${getIcon('download')}
              <span>${t('catalog.cta', messages)}</span>
            </a>
          </div>
          <div class="site-drawer__utility" aria-label="${t('global.locale.label', messages)}">
            <div class="locale-switcher">
              <a href="/" data-locale="fa" class="${locale === 'fa' ? 'active' : ''}">
                <span class="locale-switcher__icon">${getIcon('locale')}</span>
                <span>${t('global.locale.fa', messages)}</span>
              </a>
              <a href="/?lang=en" data-locale="en" class="${locale === 'en' ? 'active' : ''}">
                <span class="locale-switcher__icon">${getIcon('locale')}</span>
                <span>${t('global.locale.en', messages)}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  `;
};

const renderHero = ({ model, messages, env }) => {
  const heroWebp = resolveImageUrl(model.hero.imageKey, { format: 'webp' }, env);
  const heroJpg = resolveImageUrl(model.hero.imageKey, { format: 'jpg' }, env);
  const badges = model.hero.badgesKeys
    .map((key) => t(key, messages))
    .filter(Boolean)
    .map((badge) => `<span class="hero__badge">${badge}</span>`)
    .join('');

  return `
    <section class="hero" id="hero">
      <div class="container hero__inner">
        <div class="hero__content">
          <p class="hero__eyebrow">${t('global.companyName', messages)}</p>
          <h1 class="hero__title">${t(model.hero.titleKey, messages)}</h1>
          <p class="hero__subtitle">${t(model.hero.subtitleKey, messages)}</p>
          <div class="hero__badges">${badges}</div>
          <div class="hero__cta">
            <a href="/solutions" class="btn btn--primary">${t(model.hero.ctaPrimaryKey, messages)}</a>
            <a href="/projects" class="btn btn--secondary">${t(model.hero.ctaSecondaryKey, messages)}</a>
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

const renderCatalog = ({ model, messages }) => {
  const catalog = model.catalogDownloads;
  if (!catalog) return '';

  const eyebrow = catalog.eyebrowKey ? t(catalog.eyebrowKey, messages) : '';
  const title = catalog.titleKey ? t(catalog.titleKey, messages) : '';
  const description = catalog.descriptionKey ? t(catalog.descriptionKey, messages) : '';
  const note = catalog.noteKey ? t(catalog.noteKey, messages) : '';
  const downloadLabel = catalog.downloadLabelKey ? t(catalog.downloadLabelKey, messages) : t('catalog.download', messages);

  const cards = Array.isArray(catalog.items)
    ? catalog.items
        .map((item) => {
          const href = item.href || '#';
          const localeLabel = item.localeLabelKey ? t(item.localeLabelKey, messages) : '';
          const cardTitle = item.titleKey ? t(item.titleKey, messages) : '';
          const cardDescription = item.descriptionKey ? t(item.descriptionKey, messages) : '';
          const badge = item.badgeKey ? t(item.badgeKey, messages) : '';
          return `
            <article class="catalog-card">
              <div class="catalog-card__header">
                ${localeLabel ? `<span class="catalog-card__badge">${localeLabel}</span>` : ''}
                ${badge ? `<span class="catalog-card__meta">${badge}</span>` : ''}
              </div>
              <h3 class="catalog-card__title">${cardTitle}</h3>
              <p class="catalog-card__description">${cardDescription}</p>
              <a class="catalog-card__action" href="${href}" target="_blank" rel="noopener noreferrer">
                ${getIcon('download')}
                <span>${downloadLabel}</span>
              </a>
            </article>
          `;
        })
        .join('')
    : '';

  return `
    <section class="catalog" id="catalog">
      <div class="container catalog__inner">
        <header class="section-heading catalog__heading">
          ${eyebrow ? `<span class="section-heading__eyebrow">${eyebrow}</span>` : ''}
          <h2 class="section-heading__title">${title}</h2>
          <p class="section-heading__description">${description}</p>
        </header>
        <div class="catalog__grid">${cards}</div>
        ${note ? `<p class="catalog__note">${note}</p>` : ''}
      </div>
    </section>
  `;
};

const renderMetrics = ({ model, messages }) => {
  return `
    <section class="metrics" id="metrics" aria-label="${t('metrics.sectionLabel', messages)}">
      <div class="container metrics__grid">
        ${model.metrics
          .map(
            (metric) => `
              <article class="metric-card">
                <div class="metric-card__icon">${getIcon(metric.icon)}</div>
                <div class="metric-card__value">${t(metric.valueKey, messages)}</div>
                <div class="metric-card__label">${t(metric.labelKey, messages)}</div>
              </article>
            `,
          )
          .join('')}
      </div>
    </section>
  `;
};

const renderHighlights = ({ model, messages }) => {
  if (!model.highlights) return '';
  return `
    <section class="highlights" id="highlights">
      <div class="container highlights__inner">
        <header class="section-heading">
          <span class="section-heading__eyebrow">${t(model.highlights.eyebrowKey, messages)}</span>
          <h2 class="section-heading__title">${t(model.highlights.titleKey, messages)}</h2>
          <p class="section-heading__description">${t(model.highlights.descriptionKey, messages)}</p>
        </header>
        <div class="highlights__grid">
          ${model.highlights.items
            .map(
              (item) => `
                <article class="highlight-card">
                  <div class="highlight-card__icon">${getIcon(item.icon)}</div>
                  <h3 class="highlight-card__title">${t(item.titleKey, messages)}</h3>
                  <p class="highlight-card__description">${t(item.descriptionKey, messages)}</p>
                </article>
              `,
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
};

const renderWhyUs = ({ model, messages }) => {
  return `
    <section class="why" id="why-us">
      <div class="container why__inner">
        <header class="section-heading section-heading--left">
          <span class="section-heading__eyebrow">${t(model.whyUs.eyebrowKey, messages)}</span>
          <h2 class="section-heading__title">${t(model.whyUs.titleKey, messages)}</h2>
          <p class="section-heading__description">${t(model.whyUs.descriptionKey, messages)}</p>
        </header>
        <div class="why__grid">
          ${model.whyUs.pillars
            .map(
              (pillar) => `
                <article class="why-card">
                  <div class="why-card__icon">${getIcon(pillar.icon)}</div>
                  <h3 class="why-card__title">${t(pillar.titleKey, messages)}</h3>
                  <p class="why-card__description">${t(pillar.descriptionKey, messages)}</p>
                </article>
              `,
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
};

const renderServices = ({ model, messages }) => {
  return `
    <section class="services" id="services">
      <div class="container services__inner">
        <header class="section-heading">
          <span class="section-heading__eyebrow">${t(model.services.eyebrowKey, messages)}</span>
          <h2 class="section-heading__title">${t(model.services.titleKey, messages)}</h2>
          <p class="section-heading__description">${t(model.services.descriptionKey, messages)}</p>
        </header>
        <div class="services__grid">
          ${model.services.categories
            .map((category) => {
              const items = t(category.itemsKey, messages) || [];
              const listItems = Array.isArray(items)
                ? items.map((item) => `<li>${item}</li>`).join('')
                : '';
              return `
                <article class="service-card">
                  <div class="service-card__icon">${getIcon(category.icon)}</div>
                  <h3 class="service-card__title">${t(category.titleKey, messages)}</h3>
                  <ul class="service-card__list">${listItems}</ul>
                </article>
              `;
            })
            .join('')}
        </div>
        <div class="services__cta">
          <a class="btn btn--primary" href="/contact">${t(model.services.ctaKey, messages)}</a>
        </div>
      </div>
    </section>
  `;
};

const renderProcess = ({ model, messages }) => {
  if (!model.process) return '';
  return `
    <section class="process" id="process">
      <div class="container process__inner">
        <header class="section-heading section-heading--left">
          <span class="section-heading__eyebrow">${t(model.process.eyebrowKey, messages)}</span>
          <h2 class="section-heading__title">${t(model.process.titleKey, messages)}</h2>
          <p class="section-heading__description">${t(model.process.noteKey, messages)}</p>
        </header>
        <ol class="process__steps">
          ${model.process.steps
            .map(
              (step, index) => `
                <li class="process-step">
                  <span class="process-step__index">${index + 1}</span>
                  <div class="process-step__icon">${getIcon(step.icon)}</div>
                  <div class="process-step__content">
                    <h3 class="process-step__title">${t(step.titleKey, messages)}</h3>
                    <p class="process-step__description">${t(step.descriptionKey, messages)}</p>
                  </div>
                </li>
              `,
            )
            .join('')}
        </ol>
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
        <a href="${product.detailPath}" class="product-card__cta">
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
          ${model.products.map((product) => renderProductCard({ product, messages })).join('')}
        </div>
      </div>
    </section>
  `;
};

const renderCaseStudies = ({ model, messages }) => {
  return `
    <section class="cases" id="case-studies">
      <div class="container cases__inner">
        <header class="section-heading">
          <span class="section-heading__eyebrow">${t(model.caseStudies.eyebrowKey, messages)}</span>
          <h2 class="section-heading__title">${t(model.caseStudies.titleKey, messages)}</h2>
          <p class="section-heading__description">${t(model.caseStudies.descriptionKey, messages)}</p>
        </header>
        <div class="cases__grid">
          ${model.caseStudies.cards
            .map(
              (card) => `
                <article class="case-card">
                  <div class="case-card__icon">${getIcon(card.icon)}</div>
                  <h3 class="case-card__title">${t(card.titleKey, messages)}</h3>
                  <p class="case-card__subtitle">${t(card.subtitleKey, messages)}</p>
                  <p class="case-card__metric">${t(card.metricKey, messages)}</p>
                  <p class="case-card__description">${t(card.descriptionKey, messages)}</p>
                </article>
              `,
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
};

const renderTestimonials = ({ model, messages }) => {
  if (!model.testimonials) return '';
  return `
    <section class="testimonials" id="testimonials">
      <div class="container testimonials__inner">
        <header class="section-heading">
          <span class="section-heading__eyebrow">${t(model.testimonials.eyebrowKey, messages)}</span>
          <h2 class="section-heading__title">${t(model.testimonials.titleKey, messages)}</h2>
        </header>
        <div class="testimonials__grid">
          ${model.testimonials.cards
            .map((card) => {
              const quote = t(card.quoteKey, messages);
              const name = t(card.nameKey, messages);
              const role = t(card.roleKey, messages);
              return `
                <article class="testimonial-card">
                  <div class="testimonial-card__quote">“${quote}”</div>
                  <div class="testimonial-card__author">
                    <span class="testimonial-card__name">${name}</span>
                    <span class="testimonial-card__role">${role}</span>
                  </div>
                </article>
              `;
            })
            .join('')}
        </div>
      </div>
    </section>
  `;
};

const renderPartners = ({ model, messages }) => {
  if (!model.partners) return '';
  return `
    <section class="partners" id="partners">
      <div class="container partners__inner">
        <header class="section-heading">
          <span class="section-heading__eyebrow">${t(model.partners.eyebrowKey, messages)}</span>
          <h2 class="section-heading__title">${t(model.partners.titleKey, messages)}</h2>
          <p class="section-heading__description">${t(model.partners.descriptionKey, messages)}</p>
        </header>
        <div class="partners__grid">
          ${model.partners.items
            .map(
              (partner) => `
                <article class="partner-card">
                  <div class="partner-card__logo">${getIcon('partnership')}</div>
                  <div class="partner-card__content">
                    <h3 class="partner-card__name">${t(partner.nameKey, messages)}</h3>
                    <p class="partner-card__detail">${t(partner.detailKey, messages)}</p>
                  </div>
                </article>
              `,
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
};

const renderCredentials = ({ model, messages }) => {
  return `
    <section class="credentials" id="credentials">
      <div class="container credentials__inner">
        <header class="section-heading section-heading--left">
          <span class="section-heading__eyebrow">${t(model.credentials.eyebrowKey, messages)}</span>
          <h2 class="section-heading__title">${t(model.credentials.titleKey, messages)}</h2>
        </header>
        <div class="timeline">
          ${model.credentials.timeline
            .map(
              (item) => `
                <article class="timeline__item">
                  <div class="timeline__icon">${getIcon(item.icon)}</div>
                  <div class="timeline__body">
                    <span class="timeline__time">${t(item.timeKey, messages)}</span>
                    <h3 class="timeline__title">${t(item.titleKey, messages)}</h3>
                    <p class="timeline__description">${t(item.descriptionKey, messages)}</p>
                  </div>
                </article>
              `,
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
};

const renderFaq = ({ model, messages }) => {
  return `
    <section class="faq" id="faq">
      <div class="container faq__inner">
        <header class="section-heading">
          <span class="section-heading__eyebrow">${t(model.faq.eyebrowKey, messages)}</span>
          <h2 class="section-heading__title">${t(model.faq.titleKey, messages)}</h2>
        </header>
        <div class="faq__list">
          ${model.faq.items
            .map((item, index) => {
              const question = t(item.questionKey, messages);
              const answer = t(item.answerKey, messages);
              const content = Array.isArray(answer) ? answer.join('') : answer;
              return `
                <article class="faq-item">
                  <button class="faq-item__trigger" type="button" aria-expanded="false" aria-controls="faq-panel-${index}">
                    <span>${question}</span>
                    ${getIcon('chevron')}
                  </button>
                  <div class="faq-item__panel" id="faq-panel-${index}" hidden>
                    <p>${content}</p>
                  </div>
                </article>
              `;
            })
            .join('')}
        </div>
      </div>
    </section>
  `;
};

const renderContact = ({ model, messages }) => {
  const phoneValue = t(model.contact.phoneKey, messages);
  const phoneLink = typeof phoneValue === 'string' ? phoneValue.replace(/\s+/g, '') : '';
  const emailValue = t(model.contact.emailKey, messages);
  const addressValue = t(model.contact.addressKey, messages);
  const successMessage = t('contact.form.success', messages);
  const errorMessage = t('contact.form.error', messages);

  return `
    <section class="contact" id="contact">
      <div class="container contact__inner">
        <div class="contact__content">
          <span class="section-heading__eyebrow">${t(model.contact.eyebrowKey, messages)}</span>
          <h2 class="section-heading__title">${t(model.contact.titleKey, messages)}</h2>
          <p class="section-heading__description">${t(model.contact.descriptionKey, messages)}</p>
          <div class="contact__details">
            <a href="tel:${phoneLink}" class="contact__detail">
              ${getIcon('phone')}
              <div>
                <span>${t('footer.phoneLabel', messages)}</span>
                <strong>${phoneValue}</strong>
              </div>
            </a>
            <a href="mailto:${emailValue}" class="contact__detail">
              ${getIcon('mail')}
              <div>
                <span>${t('footer.emailLabel', messages)}</span>
                <strong>${emailValue}</strong>
              </div>
            </a>
            <div class="contact__detail contact__detail--static">
              ${getIcon('pin')}
              <div>
                <span>${t('contact.addressLabel', messages)}</span>
                <strong>${addressValue}</strong>
              </div>
            </div>
          </div>
        </div>
        <form class="contact__form" id="contact-form" novalidate data-success="${successMessage}" data-error="${errorMessage}">
          <div class="contact__form-row">
            <label>
              <span>${t(model.contact.form.nameKey, messages)}</span>
              <input type="text" name="name" required autocomplete="name">
            </label>
            <label>
              <span>${t(model.contact.form.phoneKey, messages)}</span>
              <input type="tel" name="phone" required autocomplete="tel">
            </label>
          </div>
          <div class="contact__form-row">
            <label>
              <span>${t(model.contact.form.companyKey, messages)}</span>
              <input type="text" name="company" autocomplete="organization">
            </label>
          </div>
          <label>
            <span>${t(model.contact.form.messageKey, messages)}</span>
            <textarea name="message" rows="4" required></textarea>
          </label>
          <button type="submit" class="btn btn--primary">${t(model.contact.form.submitKey, messages)}</button>
          <p class="contact__form-feedback" id="contact-form-feedback" role="status" aria-live="polite"></p>
        </form>
      </div>
    </section>
  `;
};

const renderSubpageHero = ({ model, messages, pageKey }) => {
  const hero = model.subpageHero?.[pageKey];
  if (!hero) return '';

  const eyebrow = t(hero.eyebrowKey, messages);
  const title = t(hero.titleKey, messages);
  const description = t(hero.descriptionKey, messages);
  const badge = hero.badgeKey ? t(hero.badgeKey, messages) : '';
  const backLabel = t('subpages.common.back', messages);
  const ctaLabel = hero.cta?.labelKey ? t(hero.cta.labelKey, messages) : '';
  const ctaHref = hero.cta?.href || '#';
  const secondaryLabel = hero.secondaryCta?.labelKey ? t(hero.secondaryCta.labelKey, messages) : '';
  const secondaryHref = hero.secondaryCta?.href || '#';

  const stats = Array.isArray(hero.stats)
    ? hero.stats
        .map((stat) => {
          const value = t(stat.valueKey, messages);
          const label = t(stat.labelKey, messages);
          if (!value || !label) return '';
          return `
            <div class="subpage-hero__stat">
              <span class="subpage-hero__stat-value">${value}</span>
              <span class="subpage-hero__stat-label">${label}</span>
            </div>
          `;
        })
        .filter(Boolean)
        .join('')
    : '';

  const actions = [
    ctaLabel ? `<a href="${ctaHref}" class="btn btn--primary">${ctaLabel}</a>` : '',
    secondaryLabel ? `<a href="${secondaryHref}" class="btn btn--secondary">${secondaryLabel}</a>` : '',
  ]
    .filter(Boolean)
    .join('');

  return `
    <section class="subpage-hero subpage-hero--${pageKey}">
      <div class="container subpage-hero__inner">
        <div class="subpage-hero__content">
          <a class="subpage-hero__back" href="/">${getIcon('chevron')}<span>${backLabel}</span></a>
          <div class="subpage-hero__icon">${getIcon(hero.icon)}</div>
          <span class="subpage-hero__eyebrow">${eyebrow}</span>
          <h1 class="subpage-hero__title">${title}</h1>
          <p class="subpage-hero__description">${description}</p>
          <div class="subpage-hero__actions">${actions}</div>
        </div>
        <div class="subpage-hero__meta">
          ${badge ? `<span class="subpage-hero__badge">${badge}</span>` : ''}
          <div class="subpage-hero__stats">${stats}</div>
        </div>
      </div>
    </section>
  `;
};

const sectionRegistry = {
  hero: renderHero,
  catalog: renderCatalog,
  metrics: renderMetrics,
  highlights: renderHighlights,
  why: renderWhyUs,
  services: renderServices,
  products: renderProductsSection,
  caseStudies: renderCaseStudies,
  credentials: renderCredentials,
  testimonials: renderTestimonials,
  process: renderProcess,
  partners: renderPartners,
  faq: renderFaq,
  contact: renderContact,
};

const renderSectionByKey = ({ key, model, messages, env }) => {
  if (key.startsWith('subpage-hero:')) {
    const pageKey = key.split(':')[1];
    return renderSubpageHero({ model, messages, pageKey });
  }
  const renderer = sectionRegistry[key];
  if (!renderer) {
    return '';
  }
  return renderer({ model, messages, env });
};

const renderCompositePage = ({ model, messages, env, pageKey = 'home' }) => {
  const sections = model.pageSections?.[pageKey] || model.pageSections?.home || [];
  return sections
    .map((key) => renderSectionByKey({ key, model, messages, env }))
    .join('');
};

const renderDetailMetrics = (detail, messages) => {
  if (!detail.metrics || detail.metrics.length === 0) {
    return '';
  }

  return `
    <div class="product-detail__metrics">
      ${detail.metrics
        .map(
          (metric) => `
            <div class="product-detail__metric">
              <span class="product-detail__metric-icon">${getIcon(metric.icon)}</span>
              <span class="product-detail__metric-value">${metric.value}</span>
              <span class="product-detail__metric-label">${t(metric.labelKey, messages)}</span>
            </div>
          `,
        )
        .join('')}
    </div>
  `;
};

const renderDetailList = (items, className) => {
  if (!Array.isArray(items) || !items.length) {
    return '';
  }
  return `<ul class="product-detail__list ${className}">${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
};

const renderRelatedProducts = ({ model, messages, currentSlug }) => {
  const related = model.products.filter((product) => product.slug !== currentSlug).slice(0, 3);
  if (related.length === 0) return '';

  return `
    <section class="related" aria-labelledby="related-products">
      <div class="container related__inner">
        <div class="related__header">
          <h2 id="related-products">${t('detail.hero.related', messages)}</h2>
          <a href="/solutions" class="related__link">${t('detail.hero.viewAll', messages)}</a>
        </div>
        <div class="related__grid">
          ${related.map((product) => renderProductCard({ product, messages })).join('')}
        </div>
      </div>
    </section>
  `;
};

const renderProductDetail = ({ model, messages, env, productSlug }) => {
  const product = model.products.find((item) => item.slug === productSlug);
  const detail = model.productDetails[productSlug];
  if (!product || !detail) {
    return `
      <section class="product-detail product-detail--missing">
        <div class="container">
          <h1>${t('detail.hero.notFound', messages)}</h1>
          <p>${t('detail.hero.notFoundDescription', messages)}</p>
          <a class="btn btn--primary" href="/solutions">${t('detail.hero.viewAll', messages)}</a>
        </div>
      </section>
    `;
  }

  const title = t(product.titleKey, messages);
  const tagline = t(product.taglineKey, messages);
  const overview = t(detail.overviewKey, messages);
  const performance = t(detail.performanceKey, messages);
  const features = t(detail.featuresKey, messages);
  const applications = t(detail.applicationsKey, messages);
  const illustration = getProductIllustration(detail.illustrationKey);

  return `
    <section class="product-detail" id="product">
      <div class="container product-detail__hero">
        <div class="product-detail__breadcrumbs">
          <a href="/">${t('detail.hero.back', messages)}</a>
          <span>•</span>
          <span>${title}</span>
        </div>
        <span class="product-detail__eyebrow">${t('detail.hero.eyebrow', messages)}</span>
        <h1 class="product-detail__title">${title}</h1>
        <p class="product-detail__subtitle">${tagline}</p>
        ${renderDetailMetrics(detail, messages)}
        <div class="product-detail__cta">
          <a class="btn btn--primary" href="/contact">${t('detail.hero.cta', messages)}</a>
          <a class="btn btn--secondary" href="/solutions">${t('detail.hero.viewAll', messages)}</a>
        </div>
      </div>
      <div class="product-detail__visual" aria-hidden="true">${illustration}</div>
      <div class="container product-detail__content">
        <article class="product-detail__panel">
          <h2>${t('detail.hero.overview', messages)}</h2>
          <p>${overview}</p>
        </article>
        <article class="product-detail__panel">
          <h2>${t('detail.hero.features', messages)}</h2>
          ${renderDetailList(features, 'product-detail__list--features')}
        </article>
        <article class="product-detail__panel">
          <h2>${t('detail.hero.performance', messages)}</h2>
          <p>${performance}</p>
        </article>
        <article class="product-detail__panel">
          <h2>${t('detail.hero.applications', messages)}</h2>
          ${renderDetailList(applications, 'product-detail__list--applications')}
        </article>
      </div>
    </section>
    ${renderRelatedProducts({ model, messages, currentSlug: productSlug })}
  `;
};

const renderFooter = ({ messages, model }) => {
  const phoneValue = t('footer.phone', messages);
  const phoneLink = typeof phoneValue === 'string' ? phoneValue.replace(/\s+/g, '') : '';
  const emailValue = t('footer.email', messages);

  return `
    <footer class="site-footer">
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
            <a href="/contact" class="contact-link contact-link--cta">
              ${t('footer.contactCta', messages)}
            </a>
          </div>
        </div>
        <nav class="site-footer__nav" aria-label="${t('global.companyName', messages)}">
          ${model.navigation
            .map((item) => `<a href="${item.path}">${t(item.labelKey, messages)}</a>`)
            .join('')}
        </nav>
        <p class="site-footer__legal">© ${new Date().getFullYear()} ${t('global.companyName', messages)} — ${t('global.rightsReserved', messages)}</p>
      </div>
    </footer>
  `;
};

export const renderPage = ({
  model,
  locale,
  messages,
  theme,
  env,
  page = 'home',
  productSlug = '',
  scrollTarget = '',
  canonicalUrl = '',
  baseUrl = '',
  alternateLocales = [],
}) => {
  const direction = messages._meta.direction;
  const bodyClasses = [];
  if (theme === 'dark') {
    bodyClasses.push('dark-theme');
  }
  if (page === 'product-detail') {
    bodyClasses.push('product-detail-page');
  } else if (page !== 'home') {
    bodyClasses.push('subpage');
  }

  const bodyAttributes = [
    bodyClasses.length ? `class="${bodyClasses.join(' ')}"` : '',
    `data-page="${page}"`,
    scrollTarget ? `data-scroll-target="${scrollTarget}"` : '',
  ]
    .filter(Boolean)
    .join(' ');

  const criticalCss = `
    :root { color-scheme: light dark; }
    body { margin: 0; font-family: 'Inter', 'Sora', 'Vazirmatn', sans-serif; background: #edf1f3; color: #0f1a21; transition: background-color .6s ease, color .6s ease; }
    html[dir="rtl"] body { font-family: 'B Vazir', 'Vazirmatn', 'IRANSans', 'Tahoma', sans-serif; }
  `;

  const defaultTitle = t('global.title', messages);
  const defaultDescription = t('global.description', messages);
  const companyName = t('global.companyName', messages);
  const meta = buildPageMeta({
    model,
    messages,
    page,
    productSlug,
    defaultTitle,
    defaultDescription,
  });
  const sanitizedBase = typeof baseUrl === 'string' ? baseUrl.replace(/\/$/, '') : '';
  const canonical = canonicalUrl || (sanitizedBase ? `${sanitizedBase}${page === 'home' ? '/' : ''}` : '');
  const heroSocial = resolveImageUrl(model.hero.imageKey, { format: 'webp' }, env);
  const socialImageAbsolute = heroSocial.startsWith('http://') || heroSocial.startsWith('https://') || heroSocial.startsWith('data:')
    ? heroSocial
    : sanitizedBase
      ? `${sanitizedBase}${heroSocial}`
      : heroSocial;
  const socialImageType = heroSocial.toLowerCase().endsWith('.webp')
    ? 'image/webp'
    : heroSocial.toLowerCase().endsWith('.jpg') || heroSocial.toLowerCase().endsWith('.jpeg')
      ? 'image/jpeg'
      : 'image/png';
  const metaTitle = typeof meta.title === 'string' ? meta.title : defaultTitle;
  const metaDescription = typeof meta.description === 'string' ? meta.description : defaultDescription;
  const trimmedTitle = metaTitle.trim();
  const trimmedDescription = metaDescription.replace(/\s+/g, ' ').trim();
  const keywordList = Array.isArray(meta.keywords) && meta.keywords.length > 0
    ? meta.keywords
    : [companyName, 'ProGuard systems', 'advanced protective coatings'];
  const keywords = keywordList.join(', ');
  const robotsContent = 'index, follow';
  const openGraphLocale = toOgLocale(locale);
  const alternateLinkMarkup = alternateLocales.length
    ? alternateLocales
        .map(({ locale: altLocale, href }) => `<link rel="alternate" hreflang="${altLocale}" href="${escapeHtml(href)}">`)
        .join('\n      ')
    : '';
  const defaultAlternate = alternateLocales.find((item) => item.isDefault);
  const xDefaultMarkup = defaultAlternate
    ? `<link rel="alternate" hreflang="x-default" href="${escapeHtml(defaultAlternate.href)}">`
    : '';
  const ogAlternateMarkup = alternateLocales
    .filter((item) => item.locale !== locale)
    .map((item) => `<meta property="og:locale:alternate" content="${toOgLocale(item.locale)}">`)
    .join('\n      ');
  const isoTimestamp = new Date().toISOString();

  const structuredData = cleanObject({
    '@context': 'https://schema.org',
    '@type': meta.schemaType,
    name: trimmedTitle,
    description: trimmedDescription,
    url: canonical || undefined,
    inLanguage: locale,
    dateModified: isoTimestamp,
    image: socialImageAbsolute ? [socialImageAbsolute] : undefined,
    publisher: {
      '@type': 'Organization',
      name: companyName,
      url: sanitizedBase || canonical || undefined,
      logo: socialImageAbsolute && !socialImageAbsolute.startsWith('data:')
        ? { '@type': 'ImageObject', url: socialImageAbsolute }
        : undefined,
    },
    brand: meta.schemaType === 'Product' ? { '@type': 'Brand', name: companyName } : undefined,
    productID: meta.schemaType === 'Product' ? productSlug : undefined,
    isPartOf: meta.schemaType !== 'Product'
      ? {
          '@type': 'WebSite',
          name: defaultTitle,
          url: sanitizedBase || canonical || undefined,
        }
      : undefined,
  });

  const ldJson = JSON.stringify(structuredData, null, 2)
    .replace(/</g, '\\u003C')
    .replace(/>/g, '\\u003E')
    .replace(/&/g, '\\u0026');

  const mainContent = page === 'product-detail'
    ? renderProductDetail({ model, messages, env, productSlug })
    : renderCompositePage({ model, messages, env, pageKey: model.pageSections?.[page] ? page : 'home' });

  return `
    <!DOCTYPE html>
    <html lang="${locale}" dir="${direction}">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${escapeHtml(trimmedTitle)}</title>
      <meta name="description" content="${escapeHtml(trimmedDescription)}">
      <meta name="keywords" content="${escapeHtml(keywords)}">
      <meta name="robots" content="${robotsContent}">
      <meta name="application-name" content="${escapeHtml(companyName)}">
      <meta name="author" content="${escapeHtml(companyName)}">
      <meta name="theme-color" content="${theme === 'light' ? '#0C5D7A' : '#091423'}">
      <meta name="color-scheme" content="light dark">
      <meta name="format-detection" content="telephone=no">
      ${canonical ? `<link rel="canonical" href="${escapeHtml(canonical)}">` : ''}
      ${alternateLinkMarkup ? `${alternateLinkMarkup}` : ''}
      ${xDefaultMarkup ? `${xDefaultMarkup}` : ''}
      <meta property="og:type" content="${escapeHtml(meta.ogType)}">
      <meta property="og:title" content="${escapeHtml(trimmedTitle)}">
      <meta property="og:description" content="${escapeHtml(trimmedDescription)}">
      ${canonical ? `<meta property="og:url" content="${escapeHtml(canonical)}">` : ''}
      <meta property="og:site_name" content="${escapeHtml(companyName)}">
      <meta property="og:locale" content="${openGraphLocale}">
      ${ogAlternateMarkup ? `${ogAlternateMarkup}` : ''}
      ${socialImageAbsolute
        ? `<meta property="og:image" content="${escapeHtml(socialImageAbsolute)}">
      <meta property="og:image:secure_url" content="${escapeHtml(socialImageAbsolute)}">
      <meta property="og:image:type" content="${socialImageType}">
      <meta property="og:image:alt" content="${escapeHtml(meta.imageAlt || trimmedTitle)}">`
        : ''}
      <meta property="og:updated_time" content="${isoTimestamp}">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="${escapeHtml(trimmedTitle)}">
      <meta name="twitter:description" content="${escapeHtml(trimmedDescription)}">
      ${canonical ? `<meta name="twitter:url" content="${escapeHtml(canonical)}">` : ''}
      ${socialImageAbsolute ? `<meta name="twitter:image" content="${escapeHtml(socialImageAbsolute)}">` : ''}
      <meta name="generator" content="ProGuard Experience 2025">
      <meta name="apple-mobile-web-app-title" content="${escapeHtml(companyName)}">
      <meta name="apple-mobile-web-app-capable" content="yes">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Sora:wght@400;500;600;700&family=Vazirmatn:wght@400;500;600;700;800&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="https://cdn.fontcdn.ir/Font/Persian/BVazir/BVazir.css">
      <style>${criticalCss}</style>
      <link rel="stylesheet" href="/assets/style.css" media="print" onload="this.media='all'">
      <link rel="preload" href="/assets/client.mjs" as="script" cross-origin>
      <script type="application/ld+json">${ldJson}</script>
    </head>
    <body ${bodyAttributes}>
      <div id="app">
        ${renderHeader({ model, messages, locale, currentPage: page })}
        <main>
          ${mainContent}
        </main>
        ${renderFooter({ messages, model })}
      </div>
      <script type="module" src="/assets/client.mjs"></script>
    </body>
    </html>
  `;
};

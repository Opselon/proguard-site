// File: src/html.mjs

import { getIcon } from './assets/icons/index.mjs';
import { resolveImageUrl, getProductIllustration } from './assets/images/index.mjs';

const resolveKey = (key, messages) => key.split('.').reduce((o, i) => (o ? o[i] : undefined), messages);

const t = (key, messages) => {
  const value = resolveKey(key, messages);
  return value === undefined || value === null ? key : value;
};

const normalizeHref = (item) => item.path || item.anchor || '#';

const renderHeader = ({ model, messages, locale, currentPage }) => {
  const isHome = currentPage === 'home';
  const wordmark = locale === 'fa' ? 'پروگارد' : 'ProGuard';
  const heroNav = model.navigation
    .map((item) => {
      const href = normalizeHref(item);
      const label = t(item.labelKey, messages);
      const isActive = Array.isArray(item.pages) && item.pages.includes(currentPage);
      const scrollTarget = isHome && item.anchor ? item.anchor : '';
      const classNames = ['site-nav__link'];
      if (isActive) {
        classNames.push('is-active');
      }
      const scrollAttr = scrollTarget ? ` data-scroll-target="${scrollTarget}"` : '';
      const ariaCurrent = isActive ? ' aria-current="page"' : '';
      return `<a href="${href}" class="${classNames.join(' ')}"${scrollAttr}${ariaCurrent}>${label}</a>`;
    })
    .join('');

  return `
    <header class="site-header" id="top">
      <div class="container site-header__inner">
        <a href="/" class="logo" aria-label="${t('global.companyName', messages)}">
          ${getIcon('logo')}
          <span class="logo__wordmark">${wordmark}</span>
        </a>
        <nav class="site-nav" aria-label="${t('global.products', messages)}">
          ${heroNav}
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
            <a href="/" data-locale="fa" class="${locale === 'fa' ? 'active' : ''}">
              <span class="locale-switcher__icon">${getIcon('locale')}</span>
              <span>${t('global.locale.fa', messages)}</span>
            </a>
            <a href="/?lang=en" data-locale="en" class="${locale === 'en' ? 'active' : ''}">
              <span class="locale-switcher__icon">${getIcon('locale')}</span>
              <span>${t('global.locale.en', messages)}</span>
            </a>
          </div>
          <a href="/contact" class="control-button control-button--cta">
            ${getIcon('phone')}
            <span>${t('global.nav.contact', messages)}</span>
          </a>
          <button id="menu-toggle" class="control-button" type="button" aria-label="${t('global.menu.toggle', messages)}">
            ${getIcon('menu')}
          </button>
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

export const renderPage = ({ model, locale, messages, theme, env, page = 'home', productSlug = '', scrollTarget = '' }) => {
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

  const mainContent = page === 'product-detail'
    ? renderProductDetail({ model, messages, env, productSlug })
    : renderCompositePage({ model, messages, env, pageKey: model.pageSections?.[page] ? page : 'home' });

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
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Sora:wght@400;500;600;700&family=Vazirmatn:wght@400;500;600;700;800&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="https://cdn.fontcdn.ir/Font/Persian/BVazir/BVazir.css">
      <style>${criticalCss}</style>
      <link rel="stylesheet" href="/assets/style.css" media="print" onload="this.media='all'">
      <link rel="preload" href="/assets/client.mjs" as="script" cross-origin>
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

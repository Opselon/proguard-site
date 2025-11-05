/// <reference lib="dom" />

import { applyTheme, getInitialTheme } from './theme.mjs';

function initThemeSwitcher() {
  const toggleButton = document.getElementById('theme-toggle');
  if (!toggleButton) return;

  let currentTheme = getInitialTheme();
  applyTheme(currentTheme, false);

  toggleButton.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme, true);
  });
}

function initProductSearch() {
  const searchInput = document.getElementById('product-search');
  /** @type {NodeListOf<HTMLElement>} */
  const productCards = document.querySelectorAll('.product-card');

  if (!searchInput || productCards.length === 0) return;

  searchInput.addEventListener('input', (e) => {
    const target = /** @type {HTMLInputElement} */ (e.target);
    const searchTerm = target.value.toLowerCase().trim();

    productCards.forEach((card) => {
      const cardSearchTerm = card.dataset.searchTerm || '';
      const isVisible = cardSearchTerm.includes(searchTerm);
      card.style.display = isVisible ? 'flex' : 'none';
    });
  });
}

function scrollToTarget(selector) {
  if (!selector || !selector.startsWith('#')) return;
  const target = document.querySelector(selector);
  if (!target) return;
  window.requestAnimationFrame(() => {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function initSmoothScroll() {
  const body = document.body;
  const isHome = body.dataset.page === 'home';
  if (!isHome) return;

  const scrollLinks = document.querySelectorAll('a[data-scroll-target]');
  scrollLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetSelector = /** @type {HTMLAnchorElement} */ (event.currentTarget).getAttribute('data-scroll-target');
      if (!targetSelector) return;
      event.preventDefault();
      scrollToTarget(targetSelector);
    });
  });
}

function initFaqToggle() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-item__trigger');
    const panel = item.querySelector('.faq-item__panel');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      panel.hidden = expanded;
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('contact-form-feedback');
  if (!form || !feedback) return;

  const successMessage = form.getAttribute('data-success') || 'پیام شما با موفقیت ارسال شد.';
  const errorMessage = form.getAttribute('data-error') || 'ارسال پیام با خطا مواجه شد.';

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    feedback.textContent = '';
    form.classList.add('is-pending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      feedback.textContent = successMessage;
      feedback.style.color = 'var(--pg-primary)';
      form.reset();
    } catch (error) {
      console.error('Contact form submission failed', error);
      feedback.textContent = errorMessage;
      feedback.style.color = 'var(--pg-accent)';
    } finally {
      form.classList.remove('is-pending');
    }
  });
}

function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 80 && currentScroll > lastScroll) {
      header.classList.add('site-header--condensed');
    } else if (currentScroll < 80) {
      header.classList.remove('site-header--condensed');
    }
    lastScroll = currentScroll;
  });
}

function revealBody() {
  document.body.style.visibility = 'visible';
}

document.addEventListener('DOMContentLoaded', () => {
  revealBody();
  initThemeSwitcher();
  initProductSearch();
  initSmoothScroll();
  initFaqToggle();
  initContactForm();
  initStickyHeader();
});

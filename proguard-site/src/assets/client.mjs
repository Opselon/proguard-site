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

function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  });
}

function revealBody() {
  document.body.style.visibility = 'visible';
}

function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      siteNav.classList.toggle('is-open');
    });

    siteNav.addEventListener('click', (event) => {
      if (event.target.tagName === 'A') {
        siteNav.classList.remove('is-open');
      }
    });
  }
}

function lazyLoadModules() {
  const lazySections = document.querySelectorAll('#faq, #contact');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        import('./lazy.mjs');
        observer.unobserve(entry.target);
      }
    });
  });

  lazySections.forEach(section => {
    observer.observe(section);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  revealBody();
  initThemeSwitcher();
  initProductSearch();
  initSmoothScroll();
  initStickyHeader();
  initMobileMenu();
  lazyLoadModules();
});

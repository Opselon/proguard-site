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

function initMobileMenu(onOpen) {
  const menuToggle = document.getElementById('menu-toggle');
  const drawer = document.getElementById('site-navigation');
  const header = document.querySelector('.site-header');
  const navBackdrop = document.querySelector('[data-menu-backdrop]');
  const closeButton = drawer ? drawer.querySelector('[data-drawer-close]') : null;
  const drawerScrollContainer = drawer ? drawer.querySelector('.site-drawer__inner') : null;
  const mq = window.matchMedia('(min-width: 1024px)');

  if (!menuToggle || !drawer || !header) return;

  let closeTimer = 0;

  /**
   * @param {boolean} shouldOpen
   */
  const toggleSharedState = (shouldOpen) => {
    header.classList.toggle('is-drawer-open', shouldOpen);
    document.body.classList.toggle('is-menu-open', shouldOpen);
    document.documentElement.classList.toggle('is-menu-open', shouldOpen);
    menuToggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    drawer.setAttribute('aria-hidden', shouldOpen ? 'false' : 'true');
    if (navBackdrop) {
      navBackdrop.setAttribute('aria-hidden', shouldOpen ? 'false' : 'true');
    }
  };

  const openDrawer = () => {
    window.clearTimeout(closeTimer);
    drawer.removeAttribute('hidden');
    toggleSharedState(true);
    requestAnimationFrame(() => {
      drawer.classList.add('is-open');
      if (drawerScrollContainer) {
        drawerScrollContainer.scrollTo({ top: 0, behavior: 'auto' });
        drawerScrollContainer.focus({ preventScroll: true });
      }
    });
    if (typeof onOpen === 'function') {
      onOpen();
    }
  };

  /**
   * @param {boolean} immediate
   */
  const closeDrawer = (immediate = false) => {
    window.clearTimeout(closeTimer);
    toggleSharedState(false);

    const finishClose = () => {
      drawer.setAttribute('hidden', '');
    };

    if (immediate) {
      drawer.classList.remove('is-open');
      finishClose();
      return;
    }

    requestAnimationFrame(() => {
      drawer.classList.remove('is-open');
    });

    closeTimer = window.setTimeout(() => {
      if (!drawer.classList.contains('is-open')) {
        finishClose();
      }
    }, 450);
  };

  /**
   * @param {boolean} shouldOpen
   * @param {{ immediate?: boolean }} [options]
   */
  const setMenuState = (shouldOpen, options = {}) => {
    const { immediate = false } = options;
    if (shouldOpen) {
      openDrawer();
    } else {
      closeDrawer(immediate);
    }
  };

  closeDrawer(true);

  menuToggle.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('is-open');
    setMenuState(!isOpen);
  });

  if (closeButton) {
    closeButton.addEventListener('click', () => setMenuState(false));
  }

  drawer.addEventListener('click', (event) => {
    const target = /** @type {HTMLElement} */ (event.target);
    if (target.closest('a')) {
      setMenuState(false);
    }
  });

  if (navBackdrop) {
    navBackdrop.addEventListener('click', () => setMenuState(false));
  }

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && drawer.classList.contains('is-open')) {
      setMenuState(false);
    }
  });

  const handleViewportChange = () => {
    if (mq.matches && drawer.classList.contains('is-open')) {
      setMenuState(false, { immediate: true });
    }
  };

  mq.addEventListener('change', handleViewportChange);
}

function initDrawerAccordions() {
  const groups = Array.from(document.querySelectorAll('[data-drawer-group]'));
  if (groups.length === 0) return undefined;

  const setGroupState = (group, shouldOpen) => {
    const panel = group.querySelector('[data-drawer-panel]');
    const toggle = group.querySelector('[data-drawer-toggle]');
    group.classList.toggle('is-open', shouldOpen);
    if (panel) {
      if (shouldOpen) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', '');
      }
    }
    if (toggle) {
      toggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    }
  };

  const openDefault = () => {
    const defaultGroup = groups.find((group) => group.dataset.navDefault === 'true') || groups[0];
    groups.forEach((group) => {
      setGroupState(group, group === defaultGroup);
    });
  };

  openDefault();

  groups.forEach((group) => {
    const toggle = group.querySelector('[data-drawer-toggle]');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      const isOpen = group.classList.contains('is-open');
      groups.forEach((other) => {
        if (other === group) {
          setGroupState(other, !isOpen);
        } else {
          setGroupState(other, false);
        }
      });
    });
  });

  return openDefault;
}

function initDesktopMenu() {
  const groups = Array.from(document.querySelectorAll('[data-menu-group]'));
  if (groups.length === 0) return;

  const setGroupState = (group, shouldOpen) => {
    const trigger = group.querySelector('[data-menu-trigger]');
    group.classList.toggle('is-open', shouldOpen);
    if (trigger) {
      trigger.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    }
  };

  groups.forEach((group) => {
    const trigger = group.querySelector('[data-menu-trigger]');
    if (!trigger) return;

    setGroupState(group, false);

    const openGroup = () => {
      groups.forEach((other) => {
        if (other !== group) {
          setGroupState(other, false);
        }
      });
      setGroupState(group, true);
    };

    const closeGroup = () => setGroupState(group, false);

    group.addEventListener('mouseenter', openGroup);
    group.addEventListener('mouseleave', closeGroup);
    group.addEventListener('focusin', openGroup);
    group.addEventListener('focusout', (event) => {
      const relatedTarget = /** @type {HTMLElement | null} */ (event.relatedTarget);
      if (!relatedTarget || !group.contains(relatedTarget)) {
        closeGroup();
      }
    });

    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeGroup();
        trigger.blur();
      }
    });
  });
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
  const resetDrawerGroups = initDrawerAccordions();
  initMobileMenu(resetDrawerGroups);
  initDesktopMenu();
  lazyLoadModules();
});

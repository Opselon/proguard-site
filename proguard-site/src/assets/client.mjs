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
    
    productCards.forEach(card => {
      const cardSearchTerm = card.dataset.searchTerm || '';
      const isVisible = cardSearchTerm.includes(searchTerm);
      card.style.display = isVisible ? 'flex' : 'none';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.visibility = 'visible';
  initThemeSwitcher();
  initProductSearch();
});
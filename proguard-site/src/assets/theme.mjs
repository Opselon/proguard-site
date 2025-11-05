/**
 * Applies a theme to the document.
 * @param {'light' | 'dark'} themeName - The name of the theme to apply.
 * @param {boolean} persist - Whether to save the theme choice to localStorage.
 */
export function applyTheme(themeName, persist = false) {
    document.body.className = themeName === 'dark' ? 'dark-theme' : '';

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      const newColor = themeName === 'dark' ? '#091423' : '#0C5D7A';
      metaThemeColor.setAttribute('content', newColor);
    }
  
    if (persist) {
      try {
        localStorage.setItem('theme', themeName);
      } catch (e) {
        console.warn('Could not save theme to localStorage.');
      }
    }
  }
  
  /**
   * Gets the initial theme from localStorage or system preferences.
   * @returns {'light' | 'dark'}
   */
  export function getInitialTheme() {
    try {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'light' || storedTheme === 'dark') {
        return storedTheme;
      }
    } catch (e) { /* ignore */ }
  
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  
    return 'light';
  }
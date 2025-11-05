// این فایل SVG ها را به صورت متن خام نگه می‌دارد
const iconMap = {
  logo: `
    <svg class="icon-logo" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="pgLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0C5D7A" />
          <stop offset="50%" stop-color="#0E7699" />
          <stop offset="100%" stop-color="#FF6B2C" />
        </linearGradient>
        <linearGradient id="pgLogoCore" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.85" />
          <stop offset="100%" stop-color="#D7ECF3" stop-opacity="0.25" />
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="104" height="104" rx="22" fill="#0A1D28" opacity="0.7" />
      <rect x="14" y="14" width="92" height="92" rx="20" fill="url(#pgLogoGradient)" />
      <path d="M60 32c-16 0-28 12-28 28s12 28 28 28c6.6 0 12.7-2.2 17.4-6h-17.4v-14h15.6c.3-1.6.4-3.3.4-5 0-17-11.2-31-28-31z" fill="url(#pgLogoCore)" />
      <path d="M78 52h-18v16h10.4c-3.4 3.2-7.8 5-12.4 5-11.6 0-21-9.4-21-21s9.4-21 21-21 21 9.4 21 21c0 .7 0 1.4-.1 2.1l5.6-5.6c-.8-4.4-2.6-8.7-5.5-12.5C93.5 45.7 95 58.6 87.7 68.6c-6.8 9.3-18.1 15-30 15-20.4 0-37-16.6-37-37S37.3 9 57.6 9c13.3 0 25.5 7 32.3 18.3L100 17.2C92.1 7.6 76.4 1 60 1 27.5 1 1 27.5 1 60s26.5 59 59 59 59-26.5 59-59c0-8.4-1.9-16.4-5.3-23.5L78 52z" fill="#06141D" opacity="0.35" />
    </svg>
  `,
  'theme-light': `
    <svg class="icon-theme-light" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="pgSunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFE8B5" />
          <stop offset="60%" stop-color="#FFBD6B" />
          <stop offset="100%" stop-color="#FF9445" />
        </radialGradient>
        <filter id="pgSoftShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#FF9A4A" flood-opacity="0.35" />
        </filter>
      </defs>
      <circle cx="32" cy="32" r="18" fill="url(#pgSunGlow)" filter="url(#pgSoftShadow)" />
      <g stroke="#FFC47A" stroke-width="3" stroke-linecap="round">
        <line x1="32" y1="6" x2="32" y2="16" />
        <line x1="32" y1="48" x2="32" y2="58" />
        <line x1="6" y1="32" x2="16" y2="32" />
        <line x1="48" y1="32" x2="58" y2="32" />
        <line x1="12" y1="12" x2="20" y2="20" />
        <line x1="44" y1="44" x2="52" y2="52" />
        <line x1="12" y1="52" x2="20" y2="44" />
        <line x1="44" y1="20" x2="52" y2="12" />
      </g>
    </svg>
  `,
  'theme-dark': `
    <svg class="icon-theme-dark" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="pgMoonCore" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stop-color="#6DDCFF" />
          <stop offset="60%" stop-color="#3B7FFF" />
          <stop offset="100%" stop-color="#122C54" />
        </radialGradient>
        <filter id="pgGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#2F9CFF" flood-opacity="0.55" />
        </filter>
      </defs>
      <path d="M45 12c-12 0-22 10-22 22 0 7 3.3 13.3 8.6 17.4C21.3 50.5 14 42 14 32 14 21 23 12 34 12c3.8 0 7.3 1 10.4 2.8C42.4 12.5 38.9 12 35 12h10z" fill="url(#pgMoonCore)" filter="url(#pgGlow)" />
      <circle cx="48" cy="20" r="6" fill="#FF6B2C" opacity="0.65" />
      <circle cx="18" cy="22" r="3" fill="#6DDCFF" opacity="0.4" />
      <circle cx="40" cy="48" r="4" fill="#6DDCFF" opacity="0.35" />
    </svg>
  `,
  search: `
    <svg class="icon-search" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M11 4a7 7 0 105.3 12l4.1 4.1a1.2 1.2 0 001.7-1.7l-4.1-4.1A7 7 0 0011 4zm0 2.4a4.6 4.6 0 110 9.2 4.6 4.6 0 010-9.2z" fill="currentColor" />
    </svg>
  `,
  locale: `
    <svg class="icon-locale" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="pgLocale" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F2F5F7" />
          <stop offset="100%" stop-color="#CBD9E3" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="28" height="28" rx="9" fill="url(#pgLocale)" />
      <path d="M16 6c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 2.2c1.3 0 2.5.5 3.5 1.2-.9 1.8-1.7 3.3-3.5 3.3s-2.6-1.5-3.5-3.3a6.1 6.1 0 013.5-1.2zm-6.2 6.8h3.4c.1 2 .6 3.9 1.4 5.5a6.1 6.1 0 01-4.8-5.5zm8.9 5.5c.8-1.6 1.3-3.5 1.4-5.5h3.4a6.1 6.1 0 01-4.8 5.5zm1.4-7.6c-.1-1.4-.4-2.7-.9-3.8a6.2 6.2 0 014.3 3.8h-3.4zm-7.4-3.8c-.5 1.1-.8 2.4-.9 3.8H8.4a6.2 6.2 0 014.3-3.8z" fill="#0E1B27" />
    </svg>
  `,
};

export function getIcon(name, { inline = false, ariaLabel = '' } = {}) {
  const svg = iconMap[name];
  if (!svg) return '';
  if (inline) {
    return `<span class="icon" role="img" ${ariaLabel ? `aria-label="${ariaLabel}"` : ''}>${svg}</span>`;
  }
  return svg;
}
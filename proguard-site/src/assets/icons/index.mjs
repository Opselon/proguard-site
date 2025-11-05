// مجموعه آیکون‌های SVG مورد استفاده در رابط کاربری
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
      </defs>
      <circle cx="32" cy="32" r="18" fill="url(#pgSunGlow)" />
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
      </defs>
      <path d="M45 12c-12 0-22 10-22 22 0 7 3.3 13.3 8.6 17.4C21.3 50.5 14 42 14 32 14 21 23 12 34 12c3.8 0 7.3 1 10.4 2.8C42.4 12.5 38.9 12 35 12h10z" fill="url(#pgMoonCore)" />
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
      <rect x="2" y="2" width="28" height="28" rx="9" fill="#E7EEF4" />
      <path d="M16 6c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 2.2c1.3 0 2.5.5 3.5 1.2-.9 1.8-1.7 3.3-3.5 3.3s-2.6-1.5-3.5-3.3a6.1 6.1 0 013.5-1.2zm-6.2 6.8h3.4c.1 2 .6 3.9 1.4 5.5a6.1 6.1 0 01-4.8-5.5zm8.9 5.5c.8-1.6 1.3-3.5 1.4-5.5h3.4a6.1 6.1 0 01-4.8 5.5zm1.4-7.6c-.1-1.4-.4-2.7-.9-3.8a6.2 6.2 0 014.3 3.8h-3.4zm-7.4-3.8c-.5 1.1-.8 2.4-.9 3.8H8.4a6.2 6.2 0 014.3-3.8z" fill="#0E1B27" />
    </svg>
  `,
  phone: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M11.4 4.2l2.4-.9a2 2 0 012.5 1.2l1.7 4.4a2 2 0 01-.6 2.2l-2.2 1.9a18.5 18.5 0 007.9 7.9l1.9-2.2a2 2 0 012.2-.6l4.4 1.7a2 2 0 011.2 2.5l-.9 2.4a3 3 0 01-3 1.9C15.4 26.6 5.4 16.6 3.2 7a3 3 0 011.9-3z" fill="currentColor"/>
    </svg>
  `,
  mail: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 6h20a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2zm0 2l10 7 10-7H6zm20 14V10l-10 7-10-7v12h20z" fill="currentColor" />
    </svg>
  `,
  pin: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16 3a9 9 0 019 9c0 6.2-6 12.6-8.1 14.6a1.2 1.2 0 01-1.8 0C13 24.6 7 18.2 7 12a9 9 0 019-9zm0 12.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" fill="currentColor" />
    </svg>
  `,
  chevron: `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `,
  'shield-up': `
    <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M18 3l12 5v8c0 7.3-5.2 14.1-12 17-6.8-2.9-12-9.7-12-17V8l12-5z" fill="currentColor" opacity="0.2" />
      <path d="M18 5.2l-9 3.7v7c0 5.8 4 11.4 9 13.8 5-2.4 9-8 9-13.8v-7l-9-3.7zm0 6.3a5 5 0 110 10 5 5 0 010-10z" fill="currentColor" />
    </svg>
  `,
  projector: `
    <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="11" width="28" height="14" rx="3" fill="currentColor" opacity="0.18" />
      <rect x="6" y="13" width="24" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2" />
      <circle cx="14" cy="18" r="4" fill="none" stroke="currentColor" stroke-width="2" />
      <circle cx="24" cy="18" r="2" fill="currentColor" />
    </svg>
  `,
  'globe-grid': `
    <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" stroke-width="2" />
      <ellipse cx="18" cy="18" rx="6" ry="14" fill="none" stroke="currentColor" stroke-width="2" />
      <ellipse cx="18" cy="18" rx="14" ry="6" fill="none" stroke="currentColor" stroke-width="2" />
    </svg>
  `,
  handshake: `
    <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 14l6-5h6l3 3h5l4-3 2 2-4 4h-6l-2.5-2.5L15 16l2 2-2 2-2-2-2 2-2-2 2-2-2-2-3 3z" fill="currentColor" opacity="0.25" />
      <path d="M6 14l4-3 3 3 3-3 3 3h5l4-3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M14 18l2 2-2 2-2-2-2 2-2-2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  `,
  'lab-beaker': `
    <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 4h12v2h-2v9.5l6.6 11.4A3 3 0 0125 30H11a3 3 0 01-2.6-4.6L15 15.5V6h-3z" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M15 19h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <circle cx="18" cy="23" r="1.5" fill="currentColor" />
    </svg>
  `,
  layers: `
    <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M18 6l13 6-13 6-13-6z" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M5 18l13 6 13-6" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M5 24l13 6 13-6" fill="none" stroke="currentColor" stroke-width="2" />
    </svg>
  `,
  'shield-check': `
    <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M18 3l12 5v8c0 7.3-5.2 14.1-12 17-6.8-2.9-12-9.7-12-17V8l12-5z" fill="currentColor" opacity="0.2" />
      <path d="M18 5.5l-9 3.7v6.8c0 5.4 3.8 10.7 9 13 5.2-2.3 9-7.6 9-13V9.2l-9-3.7zm-2 15l-4-4 1.8-1.8L16 17.9l6.2-6.2 1.8 1.8-8 8z" fill="currentColor" />
    </svg>
  `,
  support: `
    <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 8a6 6 0 1112 0v4h-2V8a4 4 0 00-8 0v4h-2z" fill="currentColor" />
      <path d="M8 15h20a4 4 0 014 4v6a3 3 0 01-3 3h-2v-8h-4v8H13v-8H9v8H7a3 3 0 01-3-3v-6a4 4 0 014-4z" fill="currentColor" opacity="0.35" />
    </svg>
  `,
  spray: `
    <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 6h8l4 4v4H10z" fill="currentColor" opacity="0.25" />
      <rect x="12" y="14" width="12" height="16" rx="4" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M23 9h3" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M26 12h2M26 15h2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  `,
  structure: `
    <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 28h24v2H6z" fill="currentColor" />
      <path d="M10 26V12l8-5 8 5v14" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
      <path d="M16 26v-6h4v6" fill="none" stroke="currentColor" stroke-width="2" />
    </svg>
  `,
  engineering: `
    <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="18" cy="18" r="6" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M18 6v4M18 26v4M6 18h4M26 18h4M9.5 9.5l2.8 2.8M23.7 23.7l2.8 2.8M26.5 9.5l-2.8 2.8M12.3 23.7l-2.8 2.8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  `,
  infrastructure: `
    <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="6" y="10" width="24" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M6 16h24" stroke="currentColor" stroke-width="2" />
      <path d="M11 21h4v4h-4zM21 21h4v4h-4z" fill="currentColor" />
    </svg>
  `,
  energy: `
    <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M19 4l-8 12h6l-2 12 10-14h-6z" fill="currentColor" />
    </svg>
  `,
  arena: `
    <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="18" cy="12" rx="12" ry="5" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M6 12v8c0 3.9 5.4 7 12 7s12-3.1 12-7v-8" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M10 20c1.3 1.8 4.3 3 8 3s6.7-1.2 8-3" fill="none" stroke="currentColor" stroke-width="2" />
    </svg>
  `,
  calendar: `
    <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="6" y="8" width="24" height="22" rx="3" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M10 6v4M26 6v4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M6 14h24" stroke="currentColor" stroke-width="2" />
    </svg>
  `,
  award: `
    <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="18" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M13 19l-3 11 8-4 8 4-3-11" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
    </svg>
  `,
  partnership: `
    <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 12a4 4 0 118 0 4 4 0 01-8 0zm10 0a4 4 0 118 0 4 4 0 01-8 0z" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M5 26c0-4 5-6 9-6s9 2 9 6v4H5v-4zm18 0c0-3 4-5 6-5s6 2 6 5v4h-12v-4z" fill="currentColor" opacity="0.25" />
    </svg>
  `,
  drop: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16 4c4 6 8 10 8 14a8 8 0 11-16 0c0-4 4-8 8-14z" fill="none" stroke="currentColor" stroke-width="2" />
    </svg>
  `,
  clock: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M16 10v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `,
  crystal: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16 4l8 8-8 16-8-16z" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M16 12l8 0" stroke="currentColor" stroke-width="2" />
    </svg>
  `,
  stopwatch: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="16" cy="18" r="10" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M16 8V4m6 4l2-2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M16 14v5l3 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  `,
  temperature: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 8a4 4 0 118 0v10a6 6 0 11-8 0V8z" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M16 6v14" stroke="currentColor" stroke-width="2" />
    </svg>
  `,
  hammer: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 10l6-6h8l2 2-4 4h-6l8 8-3 3-8-8-3 3z" fill="currentColor" />
    </svg>
  `,
  brush: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 22c2-1 4-1 6 0l10-10c1-1 1-3 0-4l-2-2c-1-1-3-1-4 0L6 16v6z" fill="currentColor" />
      <path d="M6 26c2 0 4-1 5-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  `,
  uv: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="16" cy="16" r="6" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M16 4v3M16 25v3M4 16h3M25 16h3M8 8l2 2M22 22l2 2M22 10l2-2M10 22l-2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  `,
  palette: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16 4a12 12 0 110 24c-1.6 0-3-1.4-3-3a3 3 0 00-3-3H8a4 4 0 01-4-4c0-8 5.4-14 12-14z" fill="none" stroke="currentColor" stroke-width="2" />
      <circle cx="20" cy="12" r="1.5" fill="currentColor" />
      <circle cx="22" cy="18" r="1.5" fill="currentColor" />
      <circle cx="14" cy="10" r="1.5" fill="currentColor" />
    </svg>
  `,
  nano: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="16" cy="16" r="10" fill="none" stroke="currentColor" stroke-width="2" />
      <circle cx="16" cy="16" r="3" fill="currentColor" />
      <path d="M16 6v7M16 26v-7M6 16h7M26 16h-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  `,
  leaf: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M26 6C16 6 10 12 6 22c6 4 12 0 14-4 3-6 4-8 6-12z" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M12 22c2-4 6-6 12-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  `,
  thermo: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 6h8l2 4-2 16h-8L10 10z" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M14 14h6" stroke="currentColor" stroke-width="2" />
    </svg>
  `,
  sound: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8 12h4l6-5v18l-6-5H8z" fill="currentColor" />
      <path d="M20 11c2 2 2 8 0 10M23 9c3 3 3 12 0 15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  `,
  resistance: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 26l20-20 2 2-20 20z" fill="currentColor" />
      <path d="M22 10l4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  `,
  chemical: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 6h12v2h-2v9l5.5 9.5A2.5 2.5 0 0123.4 30H8.6a2.5 2.5 0 01-2.1-3.5L12 17V8h-2z" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M12 20h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  `,
  helmet: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16 6a10 10 0 0110 10v4H6v-4A10 10 0 0116 6z" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M6 20h20v4H6z" fill="currentColor" opacity="0.25" />
    </svg>
  `,
  adhesion: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8 8h16v16H8z" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4 2" />
      <path d="M12 12l8 8M12 20l8-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  `,
  stretch: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 16h20" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M10 12l-4 4 4 4m12-8l4 4-4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  `,
  rust: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="8" y="8" width="16" height="16" rx="4" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M10 16h12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M16 10v12" stroke="currentColor" stroke-width="2" stroke-dasharray="2 2" />
    </svg>
  `,
  flame: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 6c0 4-4 6-4 9 0-3-4-5-4-9 0-2.5 2-4 4-4s4 1.5 4 4z" fill="currentColor" />
      <path d="M24 18a8 8 0 11-16 0c0-3 2-5 4-7 0 4 4 5 4 9 0-4 4-5 4-9 2 2 4 4 4 7z" fill="none" stroke="currentColor" stroke-width="2" />
    </svg>
  `,
  certificate: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="6" y="6" width="20" height="20" rx="3" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M12 12h8M12 16h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M18 21l2 5 2-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
    </svg>
  `,
  light: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="16" cy="16" r="6" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M16 6v2M16 24v2M6 16h2M24 16h2M9 9l1.5 1.5M22 22l1.5 1.5M23 9l-1.5 1.5M9 23l1.5-1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  `,
  traffic: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="10" y="6" width="12" height="20" rx="3" fill="none" stroke="currentColor" stroke-width="2" />
      <circle cx="16" cy="12" r="2" fill="currentColor" />
      <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="16" cy="20" r="2" fill="currentColor" opacity="0.35" />
    </svg>
  `,
  rain: `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 14a6 6 0 0110-4 5 5 0 118 3 5 5 0 01-1 10H10a4 4 0 01-1-9z" fill="none" stroke="currentColor" stroke-width="2" />
      <path d="M12 22l-2 4M18 22l-2 4M24 22l-2 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  `,
};

export function getIcon(name, { inline = false, ariaLabel = '' } = {}) {
  const svg = iconMap[name];
  if (!svg) {
    return '';
  }
  if (inline) {
    return `<span class="icon" role="img" ${ariaLabel ? `aria-label="${ariaLabel}"` : ''}>${svg}</span>`;
  }
  return svg;
}

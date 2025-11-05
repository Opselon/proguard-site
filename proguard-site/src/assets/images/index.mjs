const rasterImageMap = {
  'hero.main': {
    webp: '/assets/images/hero.webp',
    jpg: '/assets/images/hero.jpg',
  },
};

const placeholderImage = '/assets/images/placeholder.svg';

const illustrationMap = {
  'product.ultraguard.illustration': `
    <svg class="product-illustration" viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="ultraBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1C8BB0" />
          <stop offset="60%" stop-color="#0D5D7A" />
          <stop offset="100%" stop-color="#0B3F58" />
        </linearGradient>
        <radialGradient id="ultraAura" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="rgba(111, 213, 241, 0.45)" />
          <stop offset="100%" stop-color="rgba(12, 93, 122, 0)" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="320" height="220" rx="28" fill="url(#ultraAura)" />
      <g transform="translate(70,20)">
        <ellipse cx="90" cy="170" rx="90" ry="24" fill="rgba(7, 31, 44, 0.45)" />
        <path d="M20 36h140l-10 120c-2 15-12 28-24 28H54c-12 0-22-13-24-28L20 36z" fill="url(#ultraBody)" />
        <path d="M30 32c0-18 22-32 80-32s80 14 80 32-22 32-80 32-80-14-80-32z" fill="#122C3A" opacity="0.65" />
        <path d="M38 34c0-12 18-22 72-22s72 10 72 22-18 22-72 22-72-10-72-22z" fill="#7AD8F8" opacity="0.25" />
        <rect x="54" y="68" width="92" height="64" rx="16" fill="rgba(255,255,255,0.08)" stroke="rgba(122,216,248,0.45)" stroke-width="3" />
        <path d="M54 110h92l-4 32c-1 8-6 14-12 14H70c-6 0-11-6-12-14l-4-32z" fill="#0F4A62" />
      </g>
    </svg>
  `,
  'product.bloguard.illustration': `
    <svg class="product-illustration" viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="bloBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3FC28A" />
          <stop offset="70%" stop-color="#1E855A" />
          <stop offset="100%" stop-color="#0D3A2B" />
        </linearGradient>
        <radialGradient id="bloAura" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="rgba(147, 235, 186, 0.4)" />
          <stop offset="100%" stop-color="rgba(30, 133, 90, 0)" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="320" height="220" rx="28" fill="url(#bloAura)" />
      <g transform="translate(60,30)">
        <ellipse cx="100" cy="160" rx="92" ry="24" fill="rgba(10, 41, 30, 0.35)" />
        <path d="M10 46l36-24h108l36 24-14 104c-2 16-15 30-28 30H52c-13 0-26-14-28-30L10 46z" fill="url(#bloBody)" />
        <path d="M74 48h52l12 74c2 12-6 22-18 22H80c-12 0-20-10-18-22l12-74z" fill="rgba(15, 58, 41, 0.9)" />
        <path d="M32 60h136l-4 30H36z" fill="rgba(255,255,255,0.14)" />
        <circle cx="100" cy="100" r="42" fill="rgba(241,255,251,0.08)" stroke="rgba(121,225,178,0.5)" stroke-width="4" />
        <path d="M100 72a28 28 0 0126 38c-4-8-12-14-22-14s-18 6-22 14a28 28 0 0126-38z" fill="#8CF2C2" opacity="0.3" />
      </g>
    </svg>
  `,
  'product.smartguard.illustration': `
    <svg class="product-illustration" viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="smartBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#5B7DFF" />
          <stop offset="60%" stop-color="#2B46A8" />
          <stop offset="100%" stop-color="#131B52" />
        </linearGradient>
        <radialGradient id="smartAura" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="rgba(113, 143, 255, 0.42)" />
          <stop offset="100%" stop-color="rgba(35, 52, 128, 0)" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="320" height="220" rx="28" fill="url(#smartAura)" />
      <g transform="translate(54,26)">
        <ellipse cx="106" cy="168" rx="100" ry="28" fill="rgba(8, 13, 38, 0.45)" />
        <path d="M18 58l40-36h112l40 36-18 104c-3 18-17 32-32 32H68c-15 0-29-14-32-32L18 58z" fill="url(#smartBody)" />
        <path d="M50 64h112l-12 86c-1 10-9 18-18 18H80c-9 0-17-8-18-18L50 64z" fill="#1A2674" />
        <rect x="72" y="92" width="68" height="48" rx="14" fill="rgba(255,255,255,0.06)" stroke="rgba(129,147,255,0.45)" stroke-width="3" />
        <path d="M60 64l38-28 38 28" fill="none" stroke="rgba(162,184,255,0.4)" stroke-width="6" stroke-linecap="round" />
      </g>
    </svg>
  `,
  'product.fastguard.illustration': `
    <svg class="product-illustration" viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="fastBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FF7A55" />
          <stop offset="60%" stop-color="#D1492F" />
          <stop offset="100%" stop-color="#6E2317" />
        </linearGradient>
        <radialGradient id="fastAura" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="rgba(255, 143, 103, 0.45)" />
          <stop offset="100%" stop-color="rgba(180, 52, 25, 0)" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="320" height="220" rx="28" fill="url(#fastAura)" />
      <g transform="translate(58,22)">
        <ellipse cx="102" cy="176" rx="96" ry="26" fill="rgba(45, 11, 4, 0.4)" />
        <path d="M16 44h172l-16 118c-2 16-13 28-26 28H58c-13 0-24-12-26-28L16 44z" fill="url(#fastBody)" />
        <path d="M32 44c0-16 24-36 84-36s84 20 84 36-24 32-84 32-84-16-84-32z" fill="#3A1008" opacity="0.55" />
        <path d="M40 44c0-12 22-26 76-26s76 14 76 26-22 22-76 22-76-10-76-22z" fill="rgba(255,228,214,0.15)" />
        <path d="M44 92h160l-6 44c-1 10-8 18-16 18H66c-8 0-15-8-16-18l-6-44z" fill="#5A1A0F" />
        <path d="M74 122h100" stroke="rgba(255,171,140,0.5)" stroke-width="6" stroke-linecap="round" />
      </g>
    </svg>
  `,
  'product.richguard.illustration': `
    <svg class="product-illustration" viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="richBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFB86C" />
          <stop offset="60%" stop-color="#F68A3C" />
          <stop offset="100%" stop-color="#B04F1C" />
        </linearGradient>
        <radialGradient id="richAura" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="rgba(255, 198, 143, 0.45)" />
          <stop offset="100%" stop-color="rgba(176, 79, 28, 0)" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="320" height="220" rx="28" fill="url(#richAura)" />
      <g transform="translate(52,24)">
        <ellipse cx="108" cy="172" rx="100" ry="28" fill="rgba(73, 24, 4, 0.35)" />
        <path d="M18 52h180l-18 112c-3 18-16 30-30 30H66c-14 0-27-12-30-30L18 52z" fill="url(#richBody)" />
        <path d="M34 52c0-18 28-38 94-38s94 20 94 38-28 34-94 34-94-16-94-34z" fill="#4D1C05" opacity="0.55" />
        <path d="M52 102h136l-10 54c-2 10-9 18-18 18H80c-9 0-16-8-18-18l-10-54z" fill="#783313" />
        <path d="M60 74h120" stroke="rgba(255,226,201,0.6)" stroke-width="8" stroke-linecap="round" />
        <path d="M84 132h72" stroke="rgba(255,220,190,0.35)" stroke-width="10" stroke-linecap="round" />
      </g>
    </svg>
  `,
  'product.nanoguard.illustration': `
    <svg class="product-illustration" viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="nanoBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#9DE7FF" />
          <stop offset="60%" stop-color="#5AB3F7" />
          <stop offset="100%" stop-color="#1B4F8A" />
        </linearGradient>
        <radialGradient id="nanoAura" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="rgba(157, 231, 255, 0.5)" />
          <stop offset="100%" stop-color="rgba(26, 79, 138, 0)" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="320" height="220" rx="28" fill="url(#nanoAura)" />
      <g transform="translate(54,22)">
        <ellipse cx="106" cy="176" rx="100" ry="26" fill="rgba(10, 26, 43, 0.35)" />
        <path d="M16 42h180l-18 120c-3 18-17 32-32 32H66c-15 0-29-14-32-32L16 42z" fill="url(#nanoBody)" />
        <path d="M32 42c0-18 28-38 94-38s94 20 94 38-28 34-94 34-94-16-94-34z" fill="#153A61" opacity="0.55" />
        <path d="M48 90h152l-8 54c-2 10-10 18-20 18H76c-10 0-18-8-20-18l-8-54z" fill="#1E4A76" />
        <g fill="rgba(255,255,255,0.35)">
          <circle cx="70" cy="112" r="12" />
          <circle cx="108" cy="108" r="18" />
          <circle cx="146" cy="118" r="10" />
          <circle cx="124" cy="142" r="8" />
          <circle cx="92" cy="148" r="6" />
        </g>
        <path d="M62 120l24-10 22 16 24-18 24 10" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      </g>
    </svg>
  `,
  'product.thermosound.illustration': `
    <svg class="product-illustration" viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="thermoBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#8ED6FF" />
          <stop offset="50%" stop-color="#5472FF" />
          <stop offset="100%" stop-color="#0B1F52" />
        </linearGradient>
        <radialGradient id="thermoAura" cx="50%" cy="50%" r="72%">
          <stop offset="0%" stop-color="rgba(100, 160, 255, 0.5)" />
          <stop offset="100%" stop-color="rgba(15, 32, 82, 0)" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="320" height="220" rx="28" fill="url(#thermoAura)" />
      <g transform="translate(60,18)">
        <ellipse cx="100" cy="180" rx="96" ry="26" fill="rgba(12, 26, 58, 0.35)" />
        <path d="M24 40h152l-12 128c-2 16-14 28-28 28H64c-14 0-26-12-28-28L24 40z" fill="url(#thermoBody)" />
        <path d="M52 54c0-18 24-32 72-32s72 14 72 32-24 32-72 32-72-14-72-32z" fill="#102046" opacity="0.55" />
        <path d="M52 54c10 10 28 16 72 16s62-6 72-16" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="6" stroke-linecap="round" />
        <path d="M64 104h120l-6 48c-1 10-8 18-18 18H88c-10 0-17-8-18-18l-6-48z" fill="#1F3370" />
        <path d="M72 132h16l16-16 16 16 16-16 16 16 16-16" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="6" stroke-linecap="round" />
      </g>
    </svg>
  `,
  'product.floguard.illustration': `
    <svg class="product-illustration" viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="floBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4FD5D0" />
          <stop offset="60%" stop-color="#1C7B8C" />
          <stop offset="100%" stop-color="#0A2E3C" />
        </linearGradient>
        <radialGradient id="floAura" cx="50%" cy="50%" r="72%">
          <stop offset="0%" stop-color="rgba(96, 220, 214, 0.45)" />
          <stop offset="100%" stop-color="rgba(12, 45, 60, 0)" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="320" height="220" rx="28" fill="url(#floAura)" />
      <g transform="translate(58,24)">
        <ellipse cx="102" cy="176" rx="96" ry="24" fill="rgba(6, 32, 44, 0.38)" />
        <path d="M20 48h164l-14 112c-2 14-12 26-24 26H58c-12 0-22-12-24-26L20 48z" fill="url(#floBody)" />
        <rect x="44" y="72" width="116" height="68" rx="18" fill="rgba(255,255,255,0.08)" stroke="rgba(98,206,208,0.45)" stroke-width="4" />
        <path d="M36 48c10 14 34 24 82 24s72-10 82-24" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="8" stroke-linecap="round" />
        <path d="M52 126h100" stroke="rgba(79,213,208,0.45)" stroke-width="8" stroke-linecap="round" />
      </g>
    </svg>
  `,
  'product.armyguard.illustration': `
    <svg class="product-illustration" viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="armyBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#95FFA2" />
          <stop offset="55%" stop-color="#3A9B57" />
          <stop offset="100%" stop-color="#143220" />
        </linearGradient>
        <radialGradient id="armyAura" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="rgba(133, 241, 156, 0.45)" />
          <stop offset="100%" stop-color="rgba(20, 54, 32, 0)" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="320" height="220" rx="28" fill="url(#armyAura)" />
      <g transform="translate(52,26)">
        <ellipse cx="108" cy="170" rx="102" ry="26" fill="rgba(15, 44, 28, 0.4)" />
        <path d="M18 48h180l-20 114c-3 16-14 26-28 26H66c-14 0-25-10-28-26L18 48z" fill="url(#armyBody)" />
        <path d="M42 70h140l-10 60c-2 12-10 20-20 20H72c-10 0-18-8-20-20l-10-60z" fill="#1E4C30" />
        <path d="M40 48c0-16 30-36 86-36s86 20 86 36-30 30-86 30-86-14-86-30z" fill="#173D26" opacity="0.55" />
        <path d="M64 116l20-18 24 18 24-18 20 18" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="8" stroke-linecap="round" />
      </g>
    </svg>
  `,
  'product.indax.illustration': `
    <svg class="product-illustration" viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="indaxBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FF8FA6" />
          <stop offset="60%" stop-color="#D14F70" />
          <stop offset="100%" stop-color="#5A1C34" />
        </linearGradient>
        <radialGradient id="indaxAura" cx="50%" cy="50%" r="72%">
          <stop offset="0%" stop-color="rgba(255, 143, 166, 0.45)" />
          <stop offset="100%" stop-color="rgba(88, 28, 52, 0)" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="320" height="220" rx="28" fill="url(#indaxAura)" />
      <g transform="translate(60,22)">
        <ellipse cx="100" cy="176" rx="96" ry="26" fill="rgba(46, 16, 30, 0.42)" />
        <path d="M18 44h164l-16 122c-2 14-12 26-24 26H58c-12 0-22-12-24-26L18 44z" fill="url(#indaxBody)" />
        <path d="M32 44c0-18 28-36 86-36s86 18 86 36-28 32-86 32-86-14-86-32z" fill="#3C1727" opacity="0.6" />
        <rect x="48" y="88" width="108" height="56" rx="18" fill="rgba(255,255,255,0.1)" stroke="rgba(255,165,190,0.45)" stroke-width="4" />
        <path d="M60 128h92" stroke="rgba(255,200,214,0.45)" stroke-width="6" stroke-linecap="round" />
      </g>
    </svg>
  `,
  'product.flexcoat.illustration': `
    <svg class="product-illustration" viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="flexBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F1A6FF" />
          <stop offset="60%" stop-color="#8E52F6" />
          <stop offset="100%" stop-color="#2E1C65" />
        </linearGradient>
        <radialGradient id="flexAura" cx="50%" cy="50%" r="72%">
          <stop offset="0%" stop-color="rgba(203, 143, 255, 0.45)" />
          <stop offset="100%" stop-color="rgba(46, 28, 101, 0)" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="320" height="220" rx="28" fill="url(#flexAura)" />
      <g transform="translate(58,22)">
        <ellipse cx="102" cy="176" rx="98" ry="26" fill="rgba(26, 16, 53, 0.42)" />
        <path d="M20 44h164l-16 122c-2 14-12 26-24 26H58c-12 0-22-12-24-26L20 44z" fill="url(#flexBody)" />
        <path d="M36 44c0-18 30-36 86-36s86 18 86 36-30 32-86 32-86-14-86-32z" fill="#2C1646" opacity="0.55" />
        <path d="M44 94h120l-8 58c-1 10-8 18-18 18H70c-10 0-17-8-18-18l-8-58z" fill="#3C2E75" />
        <path d="M60 132c14-10 32-16 42-16s28 6 42 16" fill="none" stroke="rgba(255,233,255,0.45)" stroke-width="8" stroke-linecap="round" />
      </g>
    </svg>
  `,
  'product.grotex.illustration': `
    <svg class="product-illustration" viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="groBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFCE8F" />
          <stop offset="60%" stop-color="#E08A40" />
          <stop offset="100%" stop-color="#6A2F0A" />
        </linearGradient>
        <radialGradient id="groAura" cx="50%" cy="50%" r="72%">
          <stop offset="0%" stop-color="rgba(255, 198, 143, 0.45)" />
          <stop offset="100%" stop-color="rgba(106, 47, 10, 0)" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="320" height="220" rx="28" fill="url(#groAura)" />
      <g transform="translate(60,22)">
        <ellipse cx="100" cy="176" rx="94" ry="26" fill="rgba(60, 24, 8, 0.4)" />
        <path d="M18 46h164l-16 120c-2 14-12 26-24 26H58c-12 0-22-12-24-26L18 46z" fill="url(#groBody)" />
        <path d="M40 46c0-16 30-36 84-36s84 20 84 36-30 32-84 32-84-16-84-32z" fill="#4C1F06" opacity="0.55" />
        <path d="M48 96h112l-8 54c-1 10-8 18-18 18H74c-10 0-17-8-18-18l-8-54z" fill="#6A3715" />
        <path d="M62 120l22-10 22 18 22-18 22 10" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="8" stroke-linecap="round" />
      </g>
    </svg>
  `,
  'product.metalguard.illustration': `
    <svg class="product-illustration" viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="metalBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#C3D1FF" />
          <stop offset="60%" stop-color="#7D8AFF" />
          <stop offset="100%" stop-color="#2B3070" />
        </linearGradient>
        <radialGradient id="metalAura" cx="50%" cy="50%" r="72%">
          <stop offset="0%" stop-color="rgba(195, 209, 255, 0.45)" />
          <stop offset="100%" stop-color="rgba(43, 48, 112, 0)" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="320" height="220" rx="28" fill="url(#metalAura)" />
      <g transform="translate(58,22)">
        <ellipse cx="102" cy="178" rx="100" ry="26" fill="rgba(28, 32, 72, 0.4)" />
        <path d="M20 46h164l-16 120c-2 14-12 26-24 26H60c-12 0-22-12-24-26L20 46z" fill="url(#metalBody)" />
        <path d="M36 46c0-18 30-36 86-36s86 18 86 36-30 32-86 32-86-14-86-32z" fill="#272D64" opacity="0.6" />
        <path d="M44 94h120l-8 60c-1 10-8 18-18 18H70c-10 0-17-8-18-18l-8-60z" fill="#363D8A" />
        <path d="M60 120h100" stroke="rgba(255,255,255,0.45)" stroke-width="6" stroke-linecap="round" />
      </g>
    </svg>
  `,
  'product.fireguard.illustration': `
    <svg class="product-illustration" viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="fireBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FF9F6E" />
          <stop offset="60%" stop-color="#FF5C3A" />
          <stop offset="100%" stop-color="#6B1B0D" />
        </linearGradient>
        <radialGradient id="fireAura" cx="50%" cy="50%" r="72%">
          <stop offset="0%" stop-color="rgba(255, 140, 96, 0.45)" />
          <stop offset="100%" stop-color="rgba(107, 27, 13, 0)" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="320" height="220" rx="28" fill="url(#fireAura)" />
      <g transform="translate(58,24)">
        <ellipse cx="102" cy="176" rx="96" ry="26" fill="rgba(52, 14, 6, 0.4)" />
        <path d="M18 44h172l-18 118c-2 16-14 28-26 28H58c-12 0-24-12-26-28L18 44z" fill="url(#fireBody)" />
        <path d="M32 44c0-18 30-34 86-34s86 16 86 34-30 32-86 32-86-14-86-32z" fill="#471309" opacity="0.6" />
        <path d="M44 96h120l-8 56c-1 10-8 18-18 18H70c-10 0-17-8-18-18l-8-56z" fill="#7A2A16" />
        <path d="M62 120l18-16 18 16 18-16 18 16 18-16" fill="none" stroke="rgba(255,230,220,0.4)" stroke-width="8" stroke-linecap="round" />
      </g>
    </svg>
  `,
  'product.luminex.illustration': `
    <svg class="product-illustration" viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="luminexBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#D6FF8F" />
          <stop offset="60%" stop-color="#7EE05A" />
          <stop offset="100%" stop-color="#1F4A1F" />
        </linearGradient>
        <radialGradient id="luminexAura" cx="50%" cy="50%" r="72%">
          <stop offset="0%" stop-color="rgba(214, 255, 143, 0.5)" />
          <stop offset="100%" stop-color="rgba(31, 74, 31, 0)" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="320" height="220" rx="28" fill="url(#luminexAura)" />
      <g transform="translate(58,24)">
        <ellipse cx="102" cy="176" rx="96" ry="26" fill="rgba(24, 52, 24, 0.35)" />
        <path d="M20 48h164l-16 112c-2 14-12 26-24 26H60c-12 0-22-12-24-26L20 48z" fill="url(#luminexBody)" />
        <path d="M34 48c0-16 30-34 84-34s84 18 84 34-30 32-84 32-84-14-84-32z" fill="#234223" opacity="0.55" />
        <path d="M50 96h108l-8 52c-1 10-8 18-18 18H76c-10 0-17-8-18-18l-8-52z" fill="#2E6A2E" />
        <path d="M70 126h88" stroke="rgba(255,255,255,0.45)" stroke-width="8" stroke-linecap="round" />
      </g>
    </svg>
  `,
  placeholder: `
    <svg class="product-illustration" viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <rect x="0" y="0" width="320" height="220" rx="28" fill="#1A2631" opacity="0.25" />
      <path d="M100 70h120l-12 120H112z" fill="#223240" />
      <path d="M120 56c0-14 20-26 60-26s60 12 60 26-20 26-60 26-60-12-60-26z" fill="#2F4152" />
    </svg>
  `,
};

export function resolveImageUrl(key, { format = 'webp' } = {}, env = {}) {
  const baseCdn = env.IMAGE_CDN_BASE || '';
  const entry = rasterImageMap[key];
  if (!entry) {
    console.warn(`Image key not found: ${key}`);
    return `${baseCdn}${placeholderImage}`;
  }

  if (typeof entry === 'string') {
    return `${baseCdn}${entry}`;
  }

  if (entry[format]) {
    return `${baseCdn}${entry[format]}`;
  }

  const fallback = entry.webp || entry.jpg || entry.png || entry.svg;
  return fallback ? `${baseCdn}${fallback}` : `${baseCdn}${placeholderImage}`;
}

export function getProductIllustration(key) {
  return illustrationMap[key] || illustrationMap.placeholder;
}

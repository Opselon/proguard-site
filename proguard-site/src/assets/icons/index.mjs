// این فایل SVG ها را به صورت متن خام نگه می‌دارد
const iconMap = {
  logo: `<svg viewBox="0 0 100 120" ... (کد کامل SVG لوگو) ... </svg>`,
  'theme-light': `<svg class="icon-theme-light" ... (کد کامل SVG) ... </svg>`,
  'theme-dark': `<svg class="icon-theme-dark" ... (کد کامل SVG) ... </svg>`,
};

export function getIcon(name, { inline = false, ariaLabel = '' } = {}) {
  const svg = iconMap[name];
  if (!svg) return '';
  if (inline) {
    return `<span class="icon" role="img" ${ariaLabel ? `aria-label="${ariaLabel}"` : ''}>${svg}</span>`;
  }
  return svg;
}
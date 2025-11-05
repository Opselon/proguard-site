const imageMap = {
    'hero.main': '/assets/images/hero',
    'product.ultraguard.card': '/assets/images/ultraguard',
    // ... سایر محصولات
  };
  const placeholderImage = '/assets/images/placeholder.svg';
  
  export function resolveImageUrl(key, { format = 'webp' } = {}, env = {}) {
    const baseCdn = env.IMAGE_CDN_BASE || '';
    const basePath = imageMap[key];
    if (!basePath) {
      console.warn(`Image key not found: ${key}`);
      return placeholderImage;
    }
    return `${baseCdn}${basePath}.${format}`;
  }
const imageMap = {
    'hero.main': '/assets/images/hero',
    'product.ultraguard.card': '/assets/images/ultraguard',
    'product.bioguard.card': '/assets/images/bioguard', // Placeholder
    'product.smartguard.card': '/assets/images/smartguard', // Placeholder
    'product.fastguard.card': '/assets/images/fastguard', // Placeholder
    'product.richguard.card': '/assets/images/richguard', // Placeholder
    'product.nanoguard.card': '/assets/images/nanoguard', // Placeholder
  };
  
  const placeholderImage = '/assets/images/placeholder.svg';
  
  /**
   * Resolves an image URL, considering CDN and fallbacks.
   * @param {string} key - The logical key for the image.
   * @param {{format?: 'webp' | 'jpg' | 'png', size?: string}} options - Image options.
   * @param {object} [env={}] - Worker environment variables.
   * @returns {string} The full URL to the image.
   */
  export function resolveImageUrl(key, { format = 'webp', size = '' } = {}, env = {}) {
    const baseCdn = env.IMAGE_CDN_BASE || '';
    const basePath = imageMap[key];
  
    if (!basePath) {
      console.warn(`Image key not found: ${key}`);
      return placeholderImage;
    }
  
    const sizeSuffix = size ? `@${size}` : '';
    return `${baseCdn}${basePath}${sizeSuffix}.${format}`;
  }
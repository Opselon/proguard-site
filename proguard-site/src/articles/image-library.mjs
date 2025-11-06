/**
 * Centralised mapping for article imagery used across sliders and cards.
 * Update the URLs here to refresh visuals without touching templates.
 */
export const articleImageLinks = {
  placeholder: 'https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?auto=format&fit=crop&w=1200&q=80',
  overrides: {
    'ultraguard-moisture-barrier': 'https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?auto=format&fit=crop&w=1200&q=80',
    'fastguard-emergency-leak-stop': 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    'guard-poly-green-building': 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
    'waterproofing-system-selection': 'https://images.unsplash.com/photo-1523419409543-0c1df022bdd1?auto=format&fit=crop&w=1200&q=80',
    'smartguard-hydrostatic-defense': 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1200&q=80',
    'coastal-infrastructure-waterproofing': 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80',
    'richguard-uv-protection': 'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1200&q=80',
  },
};

/**
 * Resolves the most appropriate cover image for an article.
 * Overrides take precedence, followed by the article-supplied URL, then the shared placeholder.
 *
 * @param {{ slug?: string, imageUrl?: string }} article
 * @returns {{ src: string, isFallback: boolean }}
 */
export function resolveArticleImage(article) {
  const placeholder = articleImageLinks.placeholder;
  if (!article || typeof article !== 'object') {
    return { src: placeholder, isFallback: true };
  }

  const slug = typeof article.slug === 'string' ? article.slug.toLowerCase() : '';
  const override = slug ? articleImageLinks.overrides[slug] : undefined;
  if (override) {
    return { src: override, isFallback: false };
  }

  const provided = typeof article.imageUrl === 'string' ? article.imageUrl.trim() : '';
  if (provided) {
    return { src: provided, isFallback: false };
  }

  return { src: placeholder, isFallback: true };
}

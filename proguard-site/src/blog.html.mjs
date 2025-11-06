// File: src/blog.html.mjs

import { getIcon } from './assets/icons/index.mjs';
import { resolveImageUrl } from './assets/images/index.mjs';

const resolveKey = (key, messages) => key.split('.').reduce((o, i) => (o ? o[i] : undefined), messages);

const t = (key, messages) => {
  const value = resolveKey(key, messages);
  return value === undefined || value === null ? key : value;
};

const renderBlogCard = ({ post, messages, lang }) => {
  const title = t(post.titleKey, messages);
  const excerpt = t(post.excerptKey, messages);
  const date = t(post.dateKey, messages);
  const author = t(post.authorKey, messages);
  const path = lang && lang !== 'fa' ? `${post.path}?lang=${lang}` : post.path;

  return `
    <article class="blog-card">
      <div class="blog-card__image">
        <a href="${path}">
          <img src="${post.image}" alt="${title}" />
        </a>
      </div>
      <div class="blog-card__content">
        <h2 class="blog-card__title">
          <a href="${path}">${title}</a>
        </h2>
        <p class="blog-card__excerpt">${excerpt}</p>
        <div class="blog-card__meta">
          <span class="blog-card__author">${author}</span>
          <time class="blog-card__date" datetime="${post.isoDate}">${date}</time>
        </div>
      </div>
    </article>
  `;
};

export const renderBlogPage = ({ model, messages }) => {
  return `
    <section class="blog-page">
      <div class="container">
        <header class="section-heading">
          <h1 class="section-heading__title">${t('blog.title', messages)}</h1>
          <p class="section-heading__description">${t('blog.description', messages)}</p>
        </header>
        <div class="blog-grid">
          ${model.blog.posts.map((post) => renderBlogCard({ post, messages, lang: model.lang })).join('')}
        </div>
      </div>
    </section>
  `;
};

export const renderBlogPostPage = ({ post, messages }) => {
  const title = t(post.titleKey, messages);
  const content = t(post.contentKey, messages);
  const date = t(post.dateKey, messages);
  const author = t(post.authorKey, messages);

  return `
    <article class="blog-post">
      <header class="blog-post__header">
        <div class="blog-post__image">
          <img src="${post.image}" alt="${title}" />
        </div>
        <div class="container">
          <h1 class="blog-post__title">${title}</h1>
          <div class="blog-post__meta">
            <span class="blog-post__author">${author}</span>
            <time class="blog-post__date" datetime="${post.isoDate}">${date}</time>
          </div>
        </div>
      </header>
      <div class="blog-post__content">
        <div class="container">
          ${content}
        </div>
      </div>
    </article>
  `;
};

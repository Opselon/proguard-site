
function initFaqToggle() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-item__trigger');
    const panel = item.querySelector('.faq-item__panel');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      panel.hidden = expanded;
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('contact-form-feedback');
  if (!form || !feedback) return;

  const successMessage = form.getAttribute('data-success') || 'پیام شما با موفقیت ارسال شد.';
  const errorMessage = form.getAttribute('data-error') || 'ارسال پیام با خطا مواجه شد.';

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    feedback.textContent = '';
    form.classList.add('is-pending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      feedback.textContent = successMessage;
      feedback.style.color = 'var(--pg-primary)';
      form.reset();
    } catch (error) {
      console.error('Contact form submission failed', error);
      feedback.textContent = errorMessage;
      feedback.style.color = 'var(--pg-accent)';
    } finally {
      form.classList.remove('is-pending');
    }
  });
}

const initLazyFeatures = () => {
  initFaqToggle();
  initContactForm();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLazyFeatures, { once: true });
} else {
  initLazyFeatures();
}

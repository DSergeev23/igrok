const body = document.body;
const mobileMenu = document.querySelector('.mobile-menu');
const menuToggle = document.querySelector('.menu-toggle');
const metrikaId = Number(window.IGROK_ANALYTICS?.yandexMetrikaId);
const metrikaEnabled = Number.isInteger(metrikaId) && metrikaId > 0;

window.dataLayer = window.dataLayer || [];

if (metrikaEnabled) {
  ((m, e, t, r, i, k, a) => {
    m[i] = m[i] || function metrikaQueue() { (m[i].a = m[i].a || []).push(arguments); };
    m[i].l = Date.now();
    k = e.createElement(t);
    a = e.getElementsByTagName(t)[0];
    k.async = true;
    k.src = r;
    a.parentNode.insertBefore(k, a);
  })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

  window.ym(metrikaId, 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  });
}

const trackGoal = (goal, params = {}) => {
  window.dataLayer.push({ event: goal, ...params });
  if (metrikaEnabled && typeof window.ym === 'function') window.ym(metrikaId, 'reachGoal', goal, params);
};

const openModal = (id) => {
  const modal = document.getElementById(id);
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  body.style.overflow = 'hidden';
};
const closeModals = () => {
  document.querySelectorAll('.modal.is-open').forEach((modal) => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  });
  body.style.overflow = '';
};
document.querySelectorAll('.contact-trigger, .booking-trigger').forEach((button) => button.addEventListener('click', () => {
  trackGoal('open_contact', { cta: button.textContent.trim() });
  openModal('contact-modal');
}));
document.querySelectorAll('.contact-links a').forEach((link) => link.addEventListener('click', () => {
  const href = link.getAttribute('href');
  const goal = href.startsWith('tel:') ? 'contact_phone' : href.includes('t.me') ? 'contact_telegram' : 'contact_vk';
  trackGoal(goal);
}));
document.querySelectorAll('[data-close]').forEach((button) => button.addEventListener('click', closeModals));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModals(); });
menuToggle.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('is-open');
  menuToggle.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  mobileMenu.setAttribute('aria-hidden', String(!open));
});
mobileMenu.querySelectorAll('a, button').forEach((item) => item.addEventListener('click', () => {
  mobileMenu.classList.remove('is-open'); menuToggle.classList.remove('is-open'); menuToggle.setAttribute('aria-expanded', 'false'); mobileMenu.setAttribute('aria-hidden', 'true');
}));

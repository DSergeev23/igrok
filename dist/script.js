const body = document.body;
const mobileMenu = document.querySelector('.mobile-menu');
const menuToggle = document.querySelector('.menu-toggle');
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
document.querySelectorAll('.contact-trigger').forEach((button) => button.addEventListener('click', () => openModal('contact-modal')));
document.querySelectorAll('.booking-trigger').forEach((button) => button.addEventListener('click', () => openModal('contact-modal')));
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

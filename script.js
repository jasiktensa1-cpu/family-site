const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const siteNav = document.querySelector('.site-nav');
const navLinks = [...document.querySelectorAll('.site-nav a')];
const sections = [...document.querySelectorAll('main section[id]')];

const setMenu = (open) => {
  menuButton.classList.toggle('open', open);
  siteNav.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  document.body.style.overflow = open ? 'hidden' : '';
};

menuButton.addEventListener('click', () => setMenu(!siteNav.classList.contains('open')));
navLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

const updateNavigation = () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  const current = sections.reduce((active, section) => {
    return window.scrollY >= section.offsetTop - 180 ? section.id : active;
  }, 'home');
  navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
};

window.addEventListener('scroll', updateNavigation, { passive: true });
updateNavigation();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const wishes = [
  'Пусть каждый новый день начинается с улыбки, а заканчивается тёплыми разговорами.',
  'Пусть в вашем доме всегда будет место для радости, добрых слов и неожиданных чудес.',
  'Желаем чаще собираться вместе, создавать традиции и бережно хранить общие истории.',
  'Пусть любовь даёт силы, поддержка — уверенность, а семья всегда остаётся тихой гаванью.',
  'Цените обычные дни: именно из них однажды складываются самые дорогие воспоминания.'
];

const wishText = document.querySelector('#wish-text');
document.querySelector('#new-wish').addEventListener('click', () => {
  const available = wishes.filter((wish) => wish !== wishText.textContent);
  wishText.style.opacity = '0';
  window.setTimeout(() => {
    wishText.textContent = available[Math.floor(Math.random() * available.length)];
    wishText.style.opacity = '1';
  }, 180);
});

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('p');

document.querySelectorAll('.album-photo').forEach((photo) => {
  photo.addEventListener('click', () => {
    const image = photo.querySelector('img');
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = photo.dataset.caption;
    lightbox.showModal();
  });
});

lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

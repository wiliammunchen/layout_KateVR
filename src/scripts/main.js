'use strict';

const body = document.querySelector('.page__body');
const menuOpenButton = document.querySelector('[data-menu-open]');
const menuCloseButton = document.querySelector('[data-menu-close]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const mobileMenuLinks = document.querySelectorAll('[data-menu-link]');
const contactForm = document.querySelector('[data-contact-form]');
const faqItems = document.querySelectorAll('.faq__item');

const closeMenu = () => {
  if (!mobileMenu || !menuOpenButton) {
    return;
  }

  mobileMenu.classList.remove('mobile-menu--open');
  body.classList.remove('page__body--menu-open');
  menuOpenButton.setAttribute('aria-expanded', 'false');

  window.setTimeout(() => {
    if (!mobileMenu.classList.contains('mobile-menu--open')) {
      mobileMenu.hidden = true;
    }
  }, 300);
};

const openMenu = () => {
  if (!mobileMenu || !menuOpenButton) {
    return;
  }

  mobileMenu.hidden = false;

  window.requestAnimationFrame(() => {
    mobileMenu.classList.add('mobile-menu--open');
  });

  body.classList.add('page__body--menu-open');
  menuOpenButton.setAttribute('aria-expanded', 'true');
};

if (menuOpenButton) {
  menuOpenButton.addEventListener('click', openMenu);
}

if (menuCloseButton) {
  menuCloseButton.addEventListener('click', closeMenu);
}

if (mobileMenu) {
  mobileMenu.addEventListener('click', (event) => {
    if (event.target === mobileMenu) {
      closeMenu();
    }
  });
}

for (const link of mobileMenuLinks) {
  link.addEventListener('click', closeMenu);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobileMenu && !mobileMenu.hidden) {
    closeMenu();
  }
});

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();

      return;
    }

    event.preventDefault();
    contactForm.reset();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

for (const item of faqItems) {
  item.addEventListener('toggle', () => {
    if (!item.open) {
      return;
    }

    for (const otherItem of faqItems) {
      if (otherItem !== item) {
        otherItem.open = false;
      }
    }
  });
}

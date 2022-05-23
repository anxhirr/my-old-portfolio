'use strict';

const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav__link');
const menu = document.querySelector('.nav__list');
const menuBtn = document.querySelector('.nav__menu-btn');
const cancelBtn = document.querySelector('.nav__cancel-btn');

const modal = document.querySelector('.modal');
const btnsOpenModal = document.querySelectorAll('.open-modal--btn');
const btnsCloseModal = document.querySelectorAll('.btn--close-modal');
const modalOverlay = document.querySelector('#modal--overlay');

const showMenu = function () {
  menu.classList.add('active');
  menuBtn.classList.add('hide');
  cancelBtn.classList.add('show');
};

const hideMenu = function () {
  menu.classList.remove('active');
  menuBtn.classList.remove('hide');
  cancelBtn.classList.remove('show');
};

menuBtn.addEventListener('click', () => {
  showMenu();
});

cancelBtn.addEventListener('click', () => {
  hideMenu();
});

navLinks.forEach(navLink => {
  navLink.addEventListener('click', () => {
    hideMenu();
  });
});

window.onscroll = () => {
  navbar.classList.remove('sticky');
  if (this.scrollY > 20) navbar.classList.add('sticky');
};

const openModal = function (modal) {
  if (!modal) return;
  modal.classList.add('active');
  modalOverlay.classList.add('active');
};

const closeModal = function (modal) {
  if (!modal) return;
  modal.classList.remove('active');
  modalOverlay.classList.remove('active');
};

btnsOpenModal.forEach(openButton => {
  openButton.addEventListener('click', () => {
    openModal(modal);
  });
});

btnsCloseModal.forEach(closeButton => {
  closeButton.addEventListener('click', () => {
    closeModal(modal);
  });
});

modalOverlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active');
  modals.forEach(modal => {
    closeModal(modal);
  });
});

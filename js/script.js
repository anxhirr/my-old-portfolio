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

const imgs = document.querySelector('img');
const socialIcons = document.querySelectorAll('.social-list__link');

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
    imgs.style.visibility = 'hidden';
  });
});

btnsCloseModal.forEach(closeButton => {
  closeButton.addEventListener('click', () => {
    closeModal(modal);
    imgs.style.visibility = 'unset';
  });
});

modalOverlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active');
  modals.forEach(modal => {
    closeModal(modal);
  });
});

socialIcons.forEach(sIcon => {
  sIcon.addEventListener('click', () => {
    console.log(socialIcons);
    sIcon.style.opacity = '1';
  });
});

// TO-DO PROJECT //

const newTaskForm = document.querySelector('.new-task-form');
const userInput = document.querySelector('#new-task-input');
const tasks = document.querySelector('#tasks');

newTaskForm.addEventListener('submit', e => {
  e.preventDefault();
  if (!userInput.value) {
    alert('Please Add a Task Before Submiting');
    return;
  }

  const taskHtml = `
  <div class="tasks__task">
    <div class="task__content">
     <input
       type="text"
       class="task__content-text"
       value="${userInput.value}"
       readonly
     />
    </div>
  <div class="task__actions">
    <button class="btn btn-edit">Edit</button>
    <button class="btn btn-delete">Delete</button>
  </div>
</div>`;

  tasks.insertAdjacentHTML('afterbegin', taskHtml);

  const btnEditTask = document.querySelector('.btn-edit');
  const btnDeleteTask = document.querySelector('.btn-delete');

  btnDeleteTask.addEventListener('click', () => {
    console.log('sadfhjsdkal');
    console.log(btnDeleteTask.closest('.tasks__task'));
    btnDeleteTask.closest('.tasks__task').remove();
  });
});

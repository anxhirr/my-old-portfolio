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

let page = document.body.id;

if (page === 'body-p-todo') {
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
      btnDeleteTask.closest('.tasks__task').remove();
    });

    btnEditTask.addEventListener('click', () => {
      const taskEditEL = document.querySelector('.task__content-text');
      if (btnEditTask.innerText.toLowerCase() == 'edit') {
        taskEditEL.removeAttribute('readonly');
        taskEditEL.focus();
        btnEditTask.innerText = 'Save';
      } else {
        taskEditEL.setAttribute('readonly', 'readonly');
        btnEditTask.innerText = 'Edit';
      }
    });
  });
}

// WEATHER PROJECT

if (page == 'body-p-weather') {
  const userCountryInput = document.querySelector('.weather__search-bar');
  const btnSearch = document.querySelector('.weather__search-icon');
  const weatherInfoContainer = document.querySelector('.weather-info');
  const weatherSection = document.querySelector('.weather__section');
  const weatherSearchBar = document.querySelector('.weather__search-bar');

  const getWeather = async function (country) {
    try {
      const resCountry = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=9b52766a465fb64aedd5bbbe78a41344`
      );
      const countryData = await resCountry.json();
      displayWeather(countryData);
    } catch (error) {
      alert('City not Found');
    }
  };

  const displayWeather = function (countryData) {
    const toDisplayHtml = `
  <h2 class="weather-city">Weather in ${countryData.name}</h2>
      <h1 class="weather-temp">${Math.round(
        countryData.main.temp - 273.15
      )}°C</h1>
         <div class="flex">
            <img
              src="https://openweathermap.org/img/wn/${
                countryData.weather[0].icon
              }.png"
              alt=""
              class="icon"
            />
           <div class="weather-description">${
             countryData.weather[0].description
           }</div>
          </div>
        <div class="weather-humidity">Total Clouds: ${
          countryData.clouds.all
        }</div>
      <div class="weather-wind">Wind speed: ${countryData.wind.speed} km/h</div>
  `;
    weatherInfoContainer.insertAdjacentHTML('afterbegin', toDisplayHtml);

    weatherSection.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${countryData.name})`;
  };
  // getWeather('germany');

  btnSearch.addEventListener('click', () => {
    getWeather(userCountryInput.value);
  });

  weatherSearchBar.addEventListener('keypress', e => {
    if (e.key == 'Enter') getWeather(userCountryInput.value);
  });
}

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// https://api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

// 9b52766a465fb64aedd5bbbe78a41344

// https://api.openweathermap.org/data/2.5/weather?lat=52&lon=37&appid=9b52766a465fb64aedd5bbbe78a41344

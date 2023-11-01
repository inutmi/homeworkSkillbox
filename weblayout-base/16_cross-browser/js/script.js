const header__left = document.querySelector("#hamb");
const popup = document.querySelector("#popup");
const menu = document.querySelector("#menu").cloneNode(1);
const body = document.body;

hamb.addEventListener("click", hambHandler);

function hambHandler(e) {
  e.preventDefault();
  popup.classList.toggle("open");
  hamb.classList.toggle("active");
  body.classList.toggle("noscroll");
  renderPopup();
}

function renderPopup() {
  popup.appendChild(menu);
}

// Код для закрытия меню при нажатии на ссылку

const links = Array.from(menu.children);

links.forEach((link) => {
  link.addEventListener("click", closeOnClick);
});

function closeOnClick() {
  popup.classList.remove("open");
  hamb.classList.remove("active");
  body.classList.remove("noscroll");
}









let tabsBtn = document.querySelectorAll('.howwework-tabs-nav__btn');
let tabsItem = document.querySelectorAll('.howwework-tabs-item');

tabsBtn.forEach(function(element){
  element.addEventListener('click', function(e){
    const path = e.currentTarget.dataset.path;

    tabsBtn.forEach(function(btn){ btn.classList.remove('howwework-tabs-nav__btn--active')});
    e.currentTarget.classList.add('howwework-tabs-nav__btn--active');

    tabsItem.forEach(function(element){ element.classList.remove('howwework-tabs-item--active')});
    document.querySelector(`[data-target="${path}"]`).classList.add('howwework-tabs-item--active');
  });
    });

const swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 30,
  loop: true,
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  });


  new Accordion('.accordion-list', {
    elementClass: 'accordion',
    triggerClass: 'accordion__control',
    panelClass: 'accordion__content',
    activeClass: 'accordion--active'
});


const searchBtn = document.querySelector(".search-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const searchBox = document.querySelector(".header__menu-right");
const searchInput = document.querySelector("input");
const searchData = document.querySelector(".search-data");
searchBtn.onclick = () => {
    searchBox.classList.add("active");
    searchInput.classList.add("active");
    searchBtn.classList.add("active");
    cancelBtn.classList.add("active");
    
    if (searchInput.value != "") {
        let values = searchInput.value;
        searchData.classList.remove("active");
        searchData.innerHTML = "Вы только что набрали " + "<span style='font-weight: 500;'>" + values + "</span>";
    } else {
        searchData.innerHTML = "";
    }
}

cancelBtn.onclick = () => {
    searchBox.classList.remove("active");
    searchInput.classList.remove("active");
    searchBtn.classList.remove("active");
    cancelBtn.classList.remove("active");
    searchData.classList.remove("active");
    searchData.classList.add("active");
    searchInput.value = "";
};






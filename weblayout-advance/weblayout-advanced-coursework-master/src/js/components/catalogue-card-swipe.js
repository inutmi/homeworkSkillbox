import Swiper, { Grid, Pagination } from 'swiper';
Swiper.use([Grid, Pagination]);

const catalogueCouchBlock = new Swiper('.catalogue-couch__block', {
  allowTouchMove: true,
  loop: false,
  slidesPerView: 2,
  grid: {
    fill: 'row',
    rows: 3,
  },
  slidesPerGroup : 3,
  spaceBetween: 16,


  breakpoints: {
    568: {
      spaceBetween: 32,
    },
    769: {
      slidesPerView: 3,
      grid: {
        rows: 3,
        fill: 'row',
      },
      slidesPerGroup : 3,
    }
  },
  
  pagination: {
    el: ".catalogue-couch__btns",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
});

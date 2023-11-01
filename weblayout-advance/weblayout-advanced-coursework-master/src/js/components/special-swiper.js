import Swiper, { Navigation } from 'swiper';
Swiper.use([Navigation]);
const special__swiper = new Swiper('.special__swiper', {
  allowTouchMove: true,
  loop: false,
  slidesPerView: 1,
  slidesPerGroup: 1,

  navigation: {
    nextEl: '.special__btn-next',
    prevEl: '.special__btn-prev',
  },

  breakpoints: {
    769: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 42
    },
    831: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 32
    },
    1320: {
      slidesPerView: 'auto',
      slidesPerGroup: 3,
      loopedSlides: 3,
      spaceBetween: 32
    }
  }
});

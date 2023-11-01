import Swiper, { Navigation } from 'swiper';
Swiper.use([Navigation]);
const blog__swiper = new Swiper('.blog__swiper', {
  allowTouchMove: true,
  loop: false,
  slidesPerView: 1,
  slidesPerGroup: 1,

  navigation: {
    nextEl: '.blog__btn-next',
    prevEl: '.blog__btn-prev',
  },

  breakpoints: {
    680: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 32
    },

    1000: {
      slidesPerView: 3,
      slidesPerGroup: 1,
      spaceBetween: 32
    },

    1025: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 32
    }
  }
});

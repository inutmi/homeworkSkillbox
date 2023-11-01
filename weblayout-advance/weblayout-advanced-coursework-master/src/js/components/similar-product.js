import Swiper, { Navigation } from 'swiper';
Swiper.use([Navigation]);
const similar__swiper = new Swiper('.similar__swiper', {
  allowTouchMove: true,
  loop: false,
  slidesPerView: 2,
  slidesPerGroup: 1,
  spaceBetween: 20,

  navigation: {
    nextEl: '.similar__swiper-btn-next',
    prevEl: '.similar__swiper-btn-prev',
  },
  breakpoints: {
    770: {
      slidesPerView: 3,
      slidesPerGroup: 1,
      spaceBetween: 30,
    },
    1025: {
      slidesPerView: 4,
      slidesPerGroup: 1,
      spaceBetween: 30,
    }
  }
});
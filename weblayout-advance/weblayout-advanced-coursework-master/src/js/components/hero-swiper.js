import Swiper, { Pagination } from 'swiper/bundle';
Swiper.use([Pagination]);
const hero__swiper = new Swiper('.hero__swiper', {
  allowTouchMove: true,
  loop: true,
  autoplay: {
    delay: 2000,
  },
  pagination: {
    el: '.hero__swiper-pagination',
    clickable: true,
  },
});

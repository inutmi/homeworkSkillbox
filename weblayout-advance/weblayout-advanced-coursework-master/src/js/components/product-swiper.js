import Swiper from 'swiper/bundle';

const thumbsSlider = new Swiper('.product-card__mini-images-overflow', {
  allowTouchMove: true,
  direction: 'horizontal',
  loop: false,
  spaceBetween: 10,
  slidesPerView: 3,
  centeredSlides: true,
  freeMode: true,
  clickable: true,
  watchSlidesProgress: true,
  initialSlide: 1,

  breakpoints: {
    579: {
      direction: 'vertical',
      slidesPerView: 4,
      centeredSlides: false,
    },

    1001: {
      direction: 'horizontal',
      spaceBetween: 10,
      slidesPerView: 4,
      centeredSlides: false,
    }
  }
});

const productSlider = new Swiper('.product-card__main-img__slider', {
  thumbs: {
    swiper: thumbsSlider,
  },
});

// modal

function productCardModal() {
  const productCardSlide = document.querySelectorAll('.product-card__main-img')
  const productCardModal = document.querySelector('.modal__product-card')
  const productCardModalClose = document.querySelector('.modal__product-card__close')
  const overlay = document.querySelector('.overlay')

  productCardSlide.forEach(el => {
    el.addEventListener('click', (item) => {
      item.preventDefault();

      productCardModal.classList.add('is-active')
      overlay.classList.add('is-active')
    })
  })

  productCardModalClose.addEventListener('click', () => {
    productCardModal.classList.remove('is-active')
    overlay.classList.remove('is-active')
  })

  overlay.addEventListener('click', () => {
    productCardModal.classList.remove('is-active')
    overlay.classList.remove('is-active')
  })
}

productCardModal()

// modal swiper

const thumbsModalSlider = new Swiper('.modal__product-card__thumbs', {
  allowTouchMove: true,
  loop: false,
  spaceBetween: 50,
  slidesPerView: 1,
  freeMode: true,
  clickable: true,
  watchSlidesProgress: true,

  navigation: {
    enabled: true,
    nextEl: '.modal__product-card__thumbs__btn__next',
    prevEl: '.modal__product-card__thumbs__btn__prev',
  },

  breakpoints: {
    579: {
      slidesPerView: 2,
    },

    1001: {
      slidesPerView: 3,
    },

    1322: {
      spaceBetween: 50,
      slidesPerView: 4,
      navigation: {
        enabled: false,
      },
    }
  }
});

const productModalSlider = new Swiper('.modal__product-card__slider', {
  thumbs: {
    swiper: thumbsModalSlider,
  },
});

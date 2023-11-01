const onclickBtn = document.querySelector('.product-card__main-info__buy');
const closeModalBtn = document.querySelector('.oneclick-buy__close')
const onclickModal = document.querySelector('.oneclick-buy');
const overlay = document.querySelector('.overlay')

onclickBtn.addEventListener('click', function() {
  onclickModal.classList.add('is-active')
  overlay.classList.add('is-active')
})

closeModalBtn.addEventListener('click', function() {
  onclickModal.classList.remove('is-active')
  overlay.classList.remove('is-active')
})

overlay.addEventListener('click', function() {
  onclickModal.classList.remove('is-active')
  overlay.classList.remove('is-active')
})
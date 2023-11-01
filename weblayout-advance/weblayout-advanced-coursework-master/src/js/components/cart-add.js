const buyBtn = document.querySelectorAll('.buy')
let buyNumber = document.querySelector('.header-bottom__cart-number')

buyBtn.forEach(el => {
  el.addEventListener('click', () => {
    buyNumber.innerHTML = +buyNumber.innerHTML + 1
  })
})


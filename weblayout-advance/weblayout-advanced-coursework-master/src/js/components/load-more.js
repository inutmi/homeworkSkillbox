const colorsMoreBtn = document.querySelector('#colors-more')
const colorsCheckboxes = document.querySelectorAll('.colors')

let colorsLeft = colorsCheckboxes.length - 8

for (let i = 0; i < 8; i++) {
  colorsCheckboxes[i].style.display = 'block'
}

colorsMoreBtn.innerHTML = `+ еще ${colorsLeft}`

colorsMoreBtn.addEventListener('click', function() {
  colorsCheckboxes.forEach((el) => {
    el.style.display = 'block'
  })
  colorsMoreBtn.style.display = 'none'
})
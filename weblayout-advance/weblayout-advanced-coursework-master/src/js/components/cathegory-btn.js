document.querySelectorAll('.filter-item__title').forEach(function(el) {
  el.addEventListener('click', function(event) {
    event.target.classList.toggle('is-opened')
  })
})
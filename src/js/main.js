document.querySelectorAll('[data-link-disabled]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault()
  })
})

document.querySelector('[data-link-pets]').addEventListener('click', () => {
  goToPetsPage()
})

document.querySelector('.logo').addEventListener('click', () => {
  window.location.replace('./../../index.html')
})

const goToPetsPage = () => {
  window.location.replace('./src/pages/pets.html')
}
document.querySelectorAll('[data-link-disabled]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault()
  })
})

document.querySelector('[data-link-main]').addEventListener('click', () => {
  goToMainPage()
})

document.querySelector('.logo').addEventListener('click', () => {
  goToMainPage()
})

const goToMainPage = () => {
  window.location.replace('./../../index.html')
}

//Pagination
let pets = []
let fullPetsList = []
const petsCardWrapper = document.querySelector('.our-friends__list')

const request = new XMLHttpRequest();
request.open('GET', './../assets/pets.json')

request.onload = () => {
  pets = JSON.parse(request.response)

  clearPetsCardWrapper()

  fullPetsList = (() => {
    let tempArr =[]
    
    for(let i = 0; i < 6; i++) {
      const newPetsCard = pets

      for(let j = pets.length; j > 0; j--) {
        let randomIndex = Math.floor(Math.random() * j)
        const randomElem = newPetsCard.splice(randomIndex, 1)[0]
        newPetsCard.push(randomElem)
      }

      tempArr = [...tempArr, ...newPetsCard]
    }
    return tempArr
  })();

  fullPetsList = sortPetsCard(fullPetsList)

  createPetCards(fullPetsList)
}

const clearPetsCardWrapper = () => {
  petsCardWrapper.innerHTML = ''
  return petsCardWrapper
}

const createPetCards = (petsCardList) => {
  petsCardWrapper.innerHTML += createCards(petsCardList);
}

const createCards = (petsCardList) => {
  let card = ''
  for(let i = 0; i < petsCardList.length; i++) {
    card += `<div class="card">
              <div class="card__img">
                <img src="${petsCardList[i].img}" alt="pet ${petsCardList[i].name}">
              </div>
              <h4 class="card__title">${petsCardList[i].name}</h4>
              <button class="card__btn btn btn_outline">Learn more</button>
            </div>`
  }

  return card
}

request.send()

const sortPetsCard = (list) => {
  list = sortRecursivelyPetsCard(list)

  return list
}

const sortRecursivelyPetsCard = (list) => {
  const length = list.length

  for(let i = 0; i < (length / 6); i++) {
    const stepList = list.slice(i * 6, (i * 6) + 6)

    for(let j = 0; j < 6; j++) {
      const duplicatedItem = stepList.find((item, index) => {
        return item.name === stepList[j].name && (index !== j)
      })

      if(duplicatedItem !== undefined) {
        const index = (i * 6) + j
        const which8OfList = Math.trunc(index / 8)

        list.splice(which8OfList * 8, 0, list.splice(index, 1)[0])

        sortRecursivelyPetsCard(list)
      }
    }
  }

  return list
}

let counterPage = 0
let lastPage
let heightSection = document.querySelector('.our-friends__list').offsetHeight
const arrowStart = document.querySelector('.arrow_start')
const arrowPrev = document.querySelector('.arrow_prev')
const arrowNext = document.querySelector('.arrow_next')
const arrowEnd = document.querySelector('.arrow_end')

switch(heightSection) {
  case 900:
    lastPage = 5
    break
  case 1830:
    lastPage = 7
    break
  case 3690:
    lastPage = 15
    break
}

arrowPrev.addEventListener('click', () => {
  if(counterPage > 0) {
    counterPage--
  }
  petsCardWrapper.style.top = `calc(0px - ${930 * counterPage}px)`
  updateCounterButton()
  setDisabledButton()
})

arrowNext.addEventListener('click', () => {
  if(counterPage < lastPage) {
    counterPage++
  }
  petsCardWrapper.style.top = `calc(0px - ${930 * counterPage}px)`
  updateCounterButton()
  setDisabledButton()
})

arrowStart.addEventListener('click', () => {
  petsCardWrapper.style.top = '0px'
  counterPage = 0
  updateCounterButton()
  setDisabledButton()
})

arrowEnd.addEventListener('click', () => {
  petsCardWrapper.style.top = `calc(0px - ${930 * lastPage}px)`
  counterPage = lastPage
  updateCounterButton()
  setDisabledButton()
})

const updateCounterButton = () => {
  document.querySelector('.btn_count').innerText = counterPage + 1
}

const setDisabledButton = () => {
  if(counterPage === 0) {
    arrowStart.classList.add('arrow_disabled')
    arrowPrev.classList.add('arrow_disabled')
    arrowStart.setAttribute('disabled', 'true')
    arrowPrev.setAttribute('disabled', 'true')
  } else {
    arrowStart.classList.remove('arrow_disabled')
    arrowPrev.classList.remove('arrow_disabled')
    arrowStart.removeAttribute('disabled')
    arrowPrev.removeAttribute('disabled')
  }

  if(counterPage === lastPage) {
    arrowEnd.classList.add('arrow_disabled')
    arrowNext.classList.add('arrow_disabled')
    arrowEnd.setAttribute('disabled', 'true')
    arrowNext.setAttribute('disabled', 'true')
  } else {
    arrowEnd.classList.remove('arrow_disabled')
    arrowNext.classList.remove('arrow_disabled')
    arrowEnd.removeAttribute('disabled')
    arrowNext.removeAttribute('disabled')
  }
}
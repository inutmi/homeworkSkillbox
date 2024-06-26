class Card {
    _open = false
    _success = false
      constructor (container, number, action) {
          this.card = document.createElement('div')
          this.card.classList.add('card')
          this.card.textContent = number
          this.number = number
          this.card.addEventListener('click', () => {
             if (this.open == false && this.success == false) {
                 this.open = true
                 action(this)
              }
          })
        container.append(this.card)
      }
      set open(value) {
        this._open = value;
        value ? this.card.classList.add('open') : this.card.classList.remove('open')
      }
      get open() {
        return this._open
      }
      set success(value) {
        this._success = value;
        value ? this.card.classList.add('success') : this.card.classList.remove('success')
      }
      get success() {
        return this._success
      }
}

class AmazingCard extends Card {
  constructor (container, number, flip) {
      super(container, number, flip);
          this.cardNumber = number;
  }
      set cardNumber(value) {
        const cardsImgArray = [
          './images/0.png',
          './images/1.png',
          './images/2.png',
          './images/3.png',
          './images/4.png',
          './images/5.png',
          './images/6.png',
          './images/7.png',
          './images/8.png',
        ]
        const img = document.createElement('img');
        img.classList.add('card-img');
        img.src = cardsImgArray[value-1];
        this.card.innerHTML = '';
        this.card.appendChild(img);
       }

      get cardNumber() {
        return this._cardNumber
      }
}

  function restartBtn (display) {
    let elem = document.getElementById("restart");
    elem.style.display = display;
  }
  function newGame(container, cardsCount) {
  // Создание игрового поля
    let cardsNumberArray = [],
    cardsArray = [],
    firstCard = null,
    secondCard = null
      for(let i=1; i<=cardsCount / 2; i++) {
        cardsNumberArray.push(i)
        cardsNumberArray.push(i)
      }
        cardsNumberArray = cardsNumberArray.sort(() => Math.random() - 0.5)
      for (const cardNumber of cardsNumberArray) {
        cardsArray.push(new AmazingCard(container, cardNumber, flip))
      }
  //Формирование логики игры
  function flip(card) {
    if(firstCard!==null && secondCard !==null) {
          if (firstCard.number != secondCard.number) {
            firstCard.open = false
            secondCard.open = false
            firstCard=null
            secondCard=null
          }
      }
          if(firstCard==null) {
              firstCard = card
          }else{
              if(secondCard==null) {
                  secondCard = card
              }
          }
          if(firstCard!==null && secondCard !==null) {
              if (firstCard.number == secondCard.number) {
                  firstCard.success = true
                  secondCard.success = true
                  firstCard=null
                  secondCard=null
              }
          }
          if (document.querySelectorAll('.card.success').length == cardsNumberArray.length) {
              restartBtn ('flex')
          }

          restart.addEventListener('click', () => {
              restartBtn ('none')
              container.innerHTML = ''
              cardsNumberArray = []
              cardsArray = []
              firstCard = null
              secondCard = null
              newGame(container, cardsCount)
        })
      }
  }
  restartBtn(document.getElementById('restart'))
  newGame(document.getElementById('game'), 16)
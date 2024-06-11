/// <reference types="cypress" />
describe('Игра в пары', () => {
  const path = 'http://localhost:3000/';

  beforeEach(() => {
    cy.visit(path);
  });

  it('В начальном состоянии игра должна иметь поле четыре на четыре клетки', () => {
    cy.get('.card').should('have.length', 16);
  });

  it('В каждой клетке цифра должна быть невидима', () => {
    cy.get('.card').each((el) => {
      cy.get(el)
        .should('not.have.class', 'open')
        .invoke('text')
        .should('not.be.empty');
    });
  });

  it('Нажать на одну произвольную карточку. Убедиться, что она осталась открытой', () => {
    const number = getRandomIntInclusive(0, 16);

    cy.get('.card')
      .eq(number)
      .click()
      .clock(200)
      .should('have.class', 'open')
      .then(($el) => {
        const number = Number($el.text());
        cy.wrap(number)
          .should('be.greaterThan', 0)
          .should('be.lessThan', (16) / 2 + 1);
      });
  });

  it('Нажать на левую верхнюю карточку, затем на следующую. Если это не пара, то повторять со следующей карточкой, пока не будет найдена пара. Проверить, что найденная пара карточек осталась видимой', () => {
    checkCardOpening(1, 15);
  });

  it('Нажать на левую верхнюю карточку, затем на следующую. Если это пара, то повторять со следующими двумя карточками, пока не найдутся непарные карточки. Проверить, что после нажатия на третью карточку две несовпадающие карточки становятся закрытыми', () => {
    checkCardClosing(0, 16);
  });

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function checkCardClosing(cardIndex, length) {
    if (cardIndex > length) return;

    cy.get('.card')
      .eq(cardIndex)
      .click()
      .invoke('text')
      .as('myElement2text');
    cy.get('.card')
      .eq(cardIndex + 1)
      .click()
      .invoke('text')
      .as('myElement2text');

    cy.then(function () {
      // если номера разные то клик на следующую, и  проверка классов
      if (this.myElement2text !== this.myElement1text) {
        cy.get('.card')
          .eq(cardIndex + 2)
          .click();
        // проверка классов
        cy.clock(200);
        cy.get('.card').eq(cardIndex).should('have.class', 'card');
        cy.get('.card').eq(0).should('have.class', 'card');
      } else {
        checkCardClosing(cardIndex + 2, length);
      }
    });
  }

  function checkCardOpening(cardIndex, length) {
    if (cardIndex > length) return;

    cy.get('.card')
      .eq(cardIndex)
      .click()
      .invoke('text')
      .as('myElement2text');
    cy.get('.card').eq(0).click().invoke('text')
      .as('myElement1text');
    cy.then(function () {
      if (this.myElement2text === this.myElement1text) {
        cy.clock(200);
        cy.get('.card').eq(cardIndex).should('have.class', 'open');
        cy.get('.card').eq(0).should('have.class', 'open');
      } else {
        checkCardOpening(cardIndex + 1, length);
      }
    });
  }
});

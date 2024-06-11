
import 'babel-polyfill';
import CardInfo from 'card-info';


//Создаем функции для создания DOM дерева

function createElement(tag, attributes = {}, children = []) {
  const element = document.createElement(tag);
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });
  return element;
}

function createInputBox(className, inputs) {
  const inputBox = createElement('div', { class: className, style: 'display: flex; flex-direction: column; align-items: center; justify-content: center;' });
  inputs.forEach(input => inputBox.appendChild(input));
  return inputBox;
}

export function createDOMTree() {
  const container = createElement('div', { class: 'container' });
  const form = createElement('form', {
    class: 'form',
    style: 'display: flex; flex-direction: column; align-items: center; justify-content: center; border: solid 0.3em gray; min-height: 300px; min-width: 200px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);',
    action: '#',
    id: 'before-submit_form'
  });

  const cardImg = createElement('img', {'height': '200px', 'class': 'card-image'});
  const cardNumberInput = createElement('input', { 'data-required': 'true', 'data-max-length': '19', 'data-min-length': '16', id: 'cardnumber', type: 'text', class: 'form__input form-control', placeholder: 'Номер карты'});
  const expirationInput = createElement('input', { 'data-required': 'true', id: 'date', type: 'text', class: 'form__input form-control', placeholder: 'ММ/ГГ' });
  const cvvInput = createElement('input', { 'data-required': 'true', 'data-max-length': '3', 'data-min-length': '3', id: 'cvc', type: 'password', class: 'form__input form-control', placeholder: 'CVV/CVC' });
  const emailInput = createElement('input', { 'data-type': 'true', id: 'email', type: 'email', class: 'form__input form-control', placeholder: 'Email' });
  const submitButton = createElement('button', { type: 'submit', class: 'button', id: 'button' }, ['Отправить']);

  const inputBox1 = createInputBox('form__input-box control-wrapper', [cardImg, cardNumberInput]);
  const inputBox2 = createInputBox('form__input-box control-wrapper', [expirationInput]);
  const inputBox3 = createInputBox('form__input-box control-wrapper', [cvvInput]);
  const inputBox4 = createInputBox('form__input-box control-wrapper', [emailInput]);

  form.appendChild(inputBox1);
  form.appendChild(inputBox2);
  form.appendChild(inputBox3);
  form.appendChild(inputBox4);
  form.appendChild(submitButton);

  container.appendChild(form);

  return container;
}

const domTree = createDOMTree();
document.body.appendChild(domTree);


//Определяем логотип карты с помощью библиотеки

document.querySelector('#cardnumber').oninput = function()  {
  let cardNum = this.value;
  if (cardNum.trim().length > 5) {
    let cardInfo = new CardInfo(cardNum.trim(), {
      brandsLogosPath: './src/images/'
    });
    console.log(cardInfo.bankName);
    console.log(cardInfo.brandLogo);
    console.log(cardInfo.brandName);
    document.querySelector('.card-image').src = cardInfo.brandLogo;
  }}


//Добавляем маску ввода для номера карты для удобства пользователя

document.getElementById('cardnumber').addEventListener('input', function (e) {
  let value = e.target.value.replace(/\W/g, '').substring(0, 20);
  value = value.replace(/(\d{4})/g, '$1 ').trim();
  e.target.value = value;
});


//Добавляем маску ввода для ввода срока действия для удобства пользователя

const input = document.querySelector('#date');
input.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '').substring(0, 4); // Оставляем только цифры и обрезаем до 4 символов
    if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2); // Добавляем разделитель "/" после первых 2 символов
    }
    e.target.value = value;
});

//Создаем функцию валидации формы

export function validation(form) {
      function removeError(input) {
        const parent = input.parentNode;
        if (parent.classList.contains('error')) {
          parent.querySelector('.error-label').remove()
          parent.classList.remove('error')
        }
      }
      function createError(input, text) {
        const parent = input.parentNode;
        const errorLabel = document.createElement('label')
        errorLabel.classList.add('error-label')
        errorLabel.textContent = text
        parent.classList.add('error')
        parent.append(errorLabel)
      }

      let result = true;
      const allInputs = form.querySelectorAll('input');
      for (const input of allInputs) {
        removeError(input)
        if(input.dataset.minLength) {
          if(input.value.replace(/_/g, '').replace(/ /g, '').length < input.dataset.minLength) {
            removeError(input);
            createError(input, `Минимальное кол-во символов: ${input.dataset.minLength}`)
            result = false
          }
        }
        if(input.dataset.minLength){
          if(input.value.replace(/_/g, '').replace(/ /g, '').length < input.dataset.minLength){
            removeError(input);
            createError(input, `Минимальное кол-во символов: ${input.dataset.minLength}`)
            result = false
          }
        }
        if(input.dataset.maxLength){
          if(input.value.replace(/_/g, '').replace(/ /g, '').length > input.dataset.maxLength){
            removeError(input);
            createError(input, `Максимальное кол-во символов: ${input.dataset.maxLength}`)
            result = false
          }
        }
        if (input.dataset.type == "true"){
          if (input.value === ''){
            removeError(input);
            createError(input, 'Поле не заполнено');
            result = false;
          }
        }
        if (input.dataset.required == "true"){
          if (input.value === ''){
            removeError(input);
            createError(input, 'Поле не заполнено');
            result = false;
          }
        if (/[^0-9]/.test(input.value.replace(/ /g, '').replace(/\//g, ''))){
            removeError(input);
            createError(input, 'Поле содержит недопустимые символы');
            result = false;
            }
        }
      }
      return result
    }
    document.getElementById('before-submit_form').addEventListener('submit', function(event){
      event.preventDefault()
      if(validation(this)==true) {
        alert('Форма проверена успешно!')
      }
    })

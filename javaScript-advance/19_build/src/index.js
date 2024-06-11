
import 'babel-polyfill';
import JustValidate from 'just-validate';
import Inputmask from "inputmask";
import { el, setChildren, setAttr } from "redom";
import CardInfo from 'card-info';
import Default from './assets/images/default.png'


const container = el('div');
const boxInput = el('form');

const formCardNumber = el('div');
const cardImg = el('img');
const cardNumber = el('input', 'Номер карты');
const labelCardNumber = el('label', 'Введите номер карты');

const formCardDate = el('div');
const cardDate = el('input', 'Срок действия');
const labelCardDate = el('label', 'Введите срок действия карты');

const formCardCvc = el('div');
const cardCvc = el('input', 'CVC карты');
const labelCardCvc = el('label', 'Введите CVC карты')

const formEmail = el('div');
const email = el('input', 'Введите email');
const labelEmail = el('label', 'Введите email')

const formBtn = el('div');
const btn = el('input', 'Оплатить');

setChildren(window.document.body, container);
setAttr(container, {
  style: { display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(82, 82, 82)' },
  className: 'container'
})


setChildren(container, boxInput);



setChildren(boxInput, [formCardNumber, formCardDate, formCardCvc, formEmail, formBtn]); //cardNumber, labelCardNumber, cardDate, labelCardDate, cardCvc, labelCardCvc, email, labelEmail, btn
setAttr(boxInput, {
  style: { backgroundColor: 'white', padding: '40px', borderRadius: '8px'},
  className: 'form',
  id: 'before-submit_form',
  autocomplete: 'off',
  novalidate: 'novalidate',
  name: 'form',
})

setChildren(formCardNumber, [ cardImg, cardNumber, labelCardNumber ]);
setAttr(formCardNumber, {
  style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: 'solid 0.3em gray'},
  className: 'form__input-box control-wrapper'
});
setAttr(cardImg, {
  style: { height: '200px' },
  className: 'card-image',
  src: Default,
})
setAttr(cardNumber, {
  style: { marginBottom: '5px', marginTop: '50px', width: '400px' },
  id: 'cardnumber',
  className: 'form__input form-control',
  name: 'cardnumber',
  autocomplete: 'cc-number',
  pattern: '[0-9]*',
  type: 'text',
  placeholder: '0000 0000 0000 0000',
  dataReg: '',
})
setAttr(labelCardNumber, {
  style: { marginBottom: '10px' },
})

setChildren(formCardDate, [ cardDate, labelCardDate ]);
setAttr(formCardDate, {
  style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: 'solid 0.3em gray'},
  className: 'form__input-box control-wrapper'
})
setAttr(cardDate, {
  style: { marginBottom: '5px', width: '400px' },
  id: 'date',
  className: 'form__input form-control',
  name: 'date',
  autocomplete: 'off',
  pattern: 'm/y',
  type: 'text',
  placeholder: 'MM/YY',
  inputmode: 'numeric',
  dataReg: '',
})
setAttr(labelCardDate, {
  style: { marginBottom: '10px' }
})

setChildren(formCardCvc, [ cardCvc, labelCardCvc ]);
setAttr(formCardCvc, {
  style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: 'solid 0.3em gray'},
  className: 'form__input-box control-wrapper'
});
setAttr(cardCvc, {
  style: { marginBottom: '5px', width: '400px' },
  id: 'cvc',
  className: 'form__input form-control',
  name: 'cvc',
  autocomplete: 'cc-csc',
  pattern: '[0-9]*',
  type: 'password',
  placeholder: 'CVC',
  inputmode: 'numeric',
  dataReg: '^[a-zA-Z0-9]+$',
})
setAttr(labelCardCvc, {
  style: { marginBottom: '10px' }
})

setChildren(formEmail, [ email, labelEmail ]);
setAttr(formEmail, {
  style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: 'solid 0.3em gray'},
  className: 'form__input-box control-wrapper'
});
setAttr(email, {
  style: { marginBottom: '5px', width: '400px' },
  id: 'email',
  className: 'form__input form-control',
  name: 'email',
  autocomplete: 'off',
  pattern: '[0-9]*',
  type: 'email',
  placeholder: 'Enter your email',
  inputmode: 'numeric',
  dataReg: '',
})
setAttr(labelEmail, {
  style: { marginBottom: '10px' }
})

setChildren(formBtn, btn);
setAttr(formBtn, {
  style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'},
  className: 'button'
});
setAttr(btn, {
  style: { marginTop: '10px', fontSize: '20px', backgroundColor: 'gray', outline: 'none', border: 'none',  padding: '10px 20px', borderRadius: '8px', display: 'block', color: 'white', fontWeight: 'bold', cursor: 'pointer' },
  type: 'submit',
  id: 'button',
  name: 'button'
})




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




//Настраиваем JustValidate для обработки вводимых данных
const validate = new JustValidate('#before-submit_form', {validateBeforeSubmitting: true,});

let selector = document.querySelector("#cardnumber");
let im = new Inputmask("9999 9999 9999 9999");
im.mask(selector);

let selectorDate = document.querySelector("#date");
let inputdate = new Inputmask("99/99");
inputdate.mask(selectorDate);

validate
  .addField('#cardnumber', [
    {
      validator: (value) => {
        const cardnumber = selector.inputmask.unmaskedvalue();
        return Boolean(Number(cardnumber) && cardnumber.length > 0)
      },
      errorMessage: 'Введите номер карты'
      },
    {
      validator: (value) => {
        const cardnumber = selector.inputmask.unmaskedvalue();
        return Boolean(Number(cardnumber) && cardnumber.length === 16)
      },
      errorMessage: 'Число введенных цифр должно быть равно 16'
      },
  ])
  
  .addField('#date', [
    {
      validator: (value) => {
        const date = selectorDate.inputmask.unmaskedvalue();
        return Boolean(Number(date) && date.length > 0)
      },
      errorMessage: 'Введите дату окончания срока действия карты'
      },
    {
      validator: (value) => {
        const date = selectorDate.inputmask.unmaskedvalue();
        return Boolean(Number(date) && date.length === 4)
      },
      errorMessage: 'Число введенных цифр должно быть равно 4'
      },
      {
        validator: (value) => {
          const date = selectorDate.inputmask.unmaskedvalue();
          return Boolean(Number(date) && (date.slice(0, 2) < 13) && date.slice(0, 2) > 0)
        },
        errorMessage: 'Месяц введен некорректно'
        },
        {
          validator: (value) => {
            const date = selectorDate.inputmask.unmaskedvalue();
            let month = date.slice(0, 2);
            let year = date.slice(2);
            let currentDate = new Date();
            let currentMonth = currentDate.getMonth() + 1;
            let currentYear = currentDate.getFullYear();
            let y = '20'+ year;
            let m = Number(month);
            return Boolean(Number(date) && (y > currentYear) || ((y == currentYear) && (m > currentMonth)) )
          },
          errorMessage: 'Срок действия вашей карты закончился'
          },
  ])

 
  .addField('#cvc', [
    {
      rule: 'required',
      errorMessage: 'Поле CVC обязательно для заполнения',
    },
    {
        rule: 'number',
        errorMessage: 'Допускается введение только цифр',
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Количество цифр должно быть равно 3',
      },
    {
      rule: 'maxLength',
      value: 3,
      errorMessage: 'Количество цифр должно быть равно 3',
    },
  ])
  .addField('#email', [
    {
      rule: 'required',
      errorMessage: 'Поле Email обязательно для заполнения',
    },
    {
      rule: 'email',
      errorMessage: 'Введите Email в нужном формате!',
    },
  ]);
  


  //Дополняем обработку стиля кнопки, в зависимости от корректности введенных данных

  const form = document.forms["form"];
  const button = form.elements["button"];

  const inputArr = Array.from(form);
  const validInputArr = [];
  
  inputArr.forEach((el) => {
    if (el.hasAttribute("datareg")) {
      el.setAttribute("is-valid", "0");
      validInputArr.push(el);
    }
  });

  form.addEventListener("input", inputHandler);
  button.addEventListener("click", buttonHandler);

  function inputHandler({ target }) {
    if (target.hasAttribute("datareg")) {
      inputCheck(target);
    }
  }

  function inputCheck(el) {
    const inputValue = el.value;
    const inputReg = el.getAttribute("datareg");
    const reg = new RegExp(inputReg);
    if (reg.test(inputValue)) {
      el.style.border = "2px solid rgb(0, 196, 0)";
      el.setAttribute("is-valid", "1");
    } else {
      el.style.border = "2px solid rgb(255, 0, 0)"
      el.setAttribute("is-valid", "0");
    }
    }

    function buttonHandler(e) {
      const isAllValid = [];
      validInputArr.forEach((el) => {
        isAllValid.push(el.getAttribute("is-valid"));
      });
      const isValid = isAllValid.reduce((acc, current) => {
        return acc && current;
      });
      if (!Boolean(Number(isValid))) {
        button.style.backgroundColor = "gray";
      } else {
        button.style.backgroundColor = "blue";
      }
    }


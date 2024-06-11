import JustValidate from 'just-validate';
import Inputmask from "inputmask";
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
  

  const form = document.forms["form"];
  const button = form.elements["button"];

  const inputArr = Array.from(form);
  const validInputArr = [];
  
  inputArr.forEach((el) => {
    if (el.hasAttribute("data-reg")) {
      el.setAttribute("is-valid", "0");
      validInputArr.push(el);
    }
  });

  form.addEventListener("input", inputHandler);
  button.addEventListener("click", buttonHandler);

  function inputHandler({ target }) {
    if (target.hasAttribute("data-reg")) {
      inputCheck(target);
    }
  }

  function inputCheck(el) {
    const inputValue = el.value;
    const inputReg = el.getAttribute("data-reg");
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
        button.style.cursor = "none";
        // e.preventDefault();
      } else {
        button.style.backgroundColor = "blue";
        button.style.cursor = "pointer";
      }
    }


import { validateForms } from '../functions/validate-forms';
const rules1 = [
  {
    ruleSelector: '#form-name',
    rules: [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'В этом поле должно быть минимум 3 символа!'
      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: 'Введите имя!'
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заполните имя!'
      }
    ]
  },
  {
    ruleSelector: '#form-tel',
    tel: true,
    telError: 'Введите корректный телефон',
    rules: [
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заполните телефон!'
      }
    ]
  },
  {
    ruleSelector: '#form-email',
    rules: [
      {
        rule: 'required',
        errorMessage: 'Заполните email!',
      },
      {
        rule: 'email',
        errorMessage: 'Введите email!',
      }
    ]
  },
  {
    ruleSelector: '#form-checkbox',
    rules: [
      {
        rule: 'required',
        errorMessage: 'Поставьте галочку',
      }
    ]
  }
];

const afterSend = () => {
  const contactFormModal = document.querySelector('.contact-modal')
  const contactFormModalClose = document.querySelector('.contact-modal__close')
  const overlay = document.querySelector('.overlay')
  
  contactFormModal.classList.add('is-active')
  overlay.classList.add('is-active')
  contactFormModalClose.addEventListener('click', function() {
    contactFormModal.classList.remove('is-active')
    overlay.classList.remove('is-active')
  })

  if (contactFormModal.classList.contains('is-active')) {
    setTimeout(() => {
      contactFormModal.classList.remove('is-active')
      overlay.classList.remove('is-active')
    }, 3000)
  }
};

validateForms('.contact-form', rules1, afterSend);

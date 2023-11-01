import { validateForms } from '../functions/validate-forms';

const rules2 = [
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
  const buyModal = document.querySelector('.oneclick-buy')
  const feedbackFormModal = document.querySelector('.feedback-modal')
  const feedbackFormModalClose = document.querySelector('.feedback-modal__close')
  const overlay = document.querySelector('.overlay')

  buyModal.classList.remove('is-active')
  
  feedbackFormModal.classList.add('is-active')
  overlay.classList.add('is-active')
  feedbackFormModalClose.addEventListener('click', function() {
    feedbackFormModal.classList.remove('is-active')
    overlay.classList.remove('is-active')
  })

  if (feedbackFormModal.classList.contains('is-active')) {
    setTimeout(() => {
      feedbackFormModal.classList.remove('is-active')
      overlay.classList.remove('is-active')
    }, 3000)
  }
};

validateForms('.oneclick-buy__form', rules2, afterSend);

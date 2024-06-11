
import { validation } from './index';

describe('Form Validation', () => {
  let form1;

  beforeEach(() => {
    // Создаем форму для теста
    form1 = document.createElement('form');
    const input1 = document.createElement('input');
    input1.dataset.maxLength = '19';
    input1.dataset.minLength = '16';
    input1.dataset.required = 'true';
    input1.value = '5555 5555 5555 5555';
    form1.appendChild(input1);

    const input2 = document.createElement('input');
    input2.value = '12/26';
    form1.appendChild(input2);

    const input3 = document.createElement('input');
    input3.dataset.maxLength = '3';
    input3.dataset.minLength = '3';
    input3.dataset.required = 'true';
    input3.value = '125';
    form1.appendChild(input3);

    const input4 = document.createElement('input');
    input4.value = '6and9@mail.ru';
    form1.appendChild(input4);

  });

  test('Форма должна пропускать корректные значения', () => {
    expect(validation(form1)).toBe(true);
  });
});



import { createDOMTree } from "./index";

test("Функция создания DOM-дерева возвращает DOM-элемент с четырьмя полями для ввода и правильными плейсхолдерами", () => {
  const domElement = createDOMTree();

  // Проверяем, что созданный элемент является экземпляром DIV
  expect(domElement.tagName).toBe('DIV');

  // Проверяем, что элемент содержит класс 'container'
  expect(domElement.classList.contains('container')).toBe(true);

  // Проверяем, что внутри контейнера есть форма
  const form = domElement.querySelector('form');
  expect(form).toBeTruthy();

  // Проверяем, что форма содержит четыре поля ввода
  const inputFields = form.querySelectorAll('.form__input');
  expect(inputFields.length).toBe(4);

  // Проверяем, что каждое поле ввода имеет правильный плейсхолдер
  expect(inputFields[0].getAttribute('placeholder')).toBe('Номер карты');
  expect(inputFields[1].getAttribute('placeholder')).toBe('ММ/ГГ');
  expect(inputFields[2].getAttribute('placeholder')).toBe('CVV/CVC');
  expect(inputFields[3].getAttribute('placeholder')).toBe('Email');
});

const requestUrl = 'http://localhost:3000/api/clients';
const body = document.querySelector('body');
const headerSearchInput = document.getElementById('headerSearchInput');
const tablePreloader = document.getElementById('tablePreloader');
const tableHeaderBtns = document.querySelectorAll('.sort-th-btn');
const modalOverlay = document.getElementById('modalOverlay');
const modalWindow = document.getElementById('modalWindow');
const modalTitle = document.querySelector('.modal__title');
const modalId = document.querySelector('.modal__id');
const modalForm = document.getElementById('modalForm');
const modalInputs = modalForm.querySelectorAll('input');
const surnameInput = document.getElementById('surnameInput');
const nameInput = document.getElementById('nameInput');
const modalContacts = document.querySelector('.modal__contacts');
const modalErrorField = document.getElementById('modalError');
const addContactBtnWrapper = document.querySelector('.form-btn__add-contact-wrapper');
const addContactBtn = document.getElementById('addContactBtn');
const addClientBtn = document.getElementById('addClientBtn');
const saveClientBtn = document.getElementById('saveClient');
const confirmWindow = document.getElementById('modalConfirm');
const autocomplete = document.querySelector('.autocomplete');

const DELAY_TIME = 300;

// параметры сотировки
let columnName = 'id';
let columnDirection = false;

const maxContactValue = 10;
const defaultContactType = 'Телефон';
let timeout;
let current = undefined;
let focusedItem = -1;
listItems = [];

// валидация формы
let validForm;
const onlyTextError = 'Допустимы только буквы';
const emptyNameValue = 'Поле Имя* обязательно для заполнения';
const emptySurnameValue = 'Поле Фамилия* обязательно для заполнения';
const emptyContactValue = 'Поле контакта должно быть заполнено';
const defaultError = 'Что-то пошло не так...';

// получение данных с сервера
async function getClientsData(url) {
  const response = await fetch(url);
  return response;
}

// поиск по запросу
async function searchInClientData(url, string) {
  const response = await fetch(`${url}?search=${string}`);
  return response;
}

// добавление нового клиента
async function postNewClient(url, obj) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
}
// редактирование данных клиента
async function editClientData(url, obj, id) {
  const response = await fetch(`${url}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
}
// удаление клиента
async function deleteClient(url, id) {
  console.log(id);
  const response = await fetch(`${url}/${id}`, {
    method: 'DELETE',
  });
  return response;
}
// сортировка массива
function sortData(array, prop, dir) {
  const copyArray = [...array];
  return copyArray.sort((prev, next) => {
    if (!dir === false ? prev[prop] > next[prop] : prev[prop] < next[prop]) {
      return -1;
    }
    return copyArray;
  });
}

// получение полного имени из объекта
function getFullname(obj) {
  const fullname = `${obj.surname} ${obj.name} ${obj.lastName}`;
  return fullname;
}
// получение корректого формата даты
function getCorrectDateValue(dateString) {
  const correctYear = new Date(dateString).getFullYear();
  const correctMonth = (new Date(dateString).getMonth() + 1).toString().padStart(2, '0');
  const correctDay = new Date(dateString).getDate().toString().padStart(2, '0');

  const correctDate = `${correctDay}.${correctMonth}.${correctYear}`;
  return correctDate;
}
// получение времени в нужном формате
function getCorrectTime(dateString) {
  const correctHours = new Date(dateString).getHours().toString().padStart(2, '0');
  const correctMinutes = new Date(dateString).getMinutes().toString().padStart(2, '0');

  const correctTime = `${correctHours}:${correctMinutes}`;
  return correctTime;
}

// добавление иконки для кнопок контактов
function getCurrentContactBtn(obj) {
  const contactBtn = document.createElement('button');
  contactBtn.classList.add('client__contact-btn', 'btn-reset');
  contactBtn.setAttribute('data-tippy-content', `${obj.type}: ${obj.value}`);

  if (obj.type === 'Телефон') {
    contactBtn.insertAdjacentHTML('afterbegin',
      `<svg class="client__contact-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="8"/>
    <path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/>
    </svg>`);
  }

  if (obj.type === 'Email') {
    contactBtn.insertAdjacentHTML('afterbegin',
      `<svg class="client__contact-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z" />
      </svg>
      `);
  }

  if (obj.type === 'Vk') {
    contactBtn.insertAdjacentHTML('afterbegin',
      `<svg class="client__contact-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z" />
      </svg>
      `);
  }

  if (obj.type === 'Facebook') {
    contactBtn.insertAdjacentHTML('afterbegin',
      `<svg class="client__contact-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z"/>
      </svg>

      `);
  }

  if (obj.type === 'Другое') {
    contactBtn.insertAdjacentHTML('afterbegin',
      `<svg class="client__contact-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z"/>
      </svg>

      `);
  }
  return contactBtn;
}
// закрытие модального окна
function closeModal() {
  const invalidInputs = document.querySelectorAll('.is-invalid');
  const activeBtn = document.querySelectorAll('.active');
  modalWindow.classList.remove('modal-window-open');
  modalWindow.classList.remove('upload');
  modalContacts.classList.remove('more-contacts');
  addContactBtnWrapper.classList.remove('more-contacts');
  modalOverlay.classList.remove('modal-open');
  body.classList.remove('block-scroll');
  confirmWindow.classList.remove('modal__confirm--open');
  modalErrorField.textContent = '';
  modalTitle.textContent = '';
  modalId.textContent = '';
  modalContacts.textContent = '';

  for (const btn of activeBtn) {
    btn.classList.remove('active');
  }

  for (const input of modalInputs) {
    input.classList.remove('complited');
    input.value = '';
  }

  for (const input of invalidInputs) {
    input.classList.remove('is-invalid');
  }

  if (addContactBtn.disabled === true) {
    addContactBtn.disabled = false;
  }
  const url = window.location.origin;
  window.history.replaceState({}, '', url)
  init();
}
// создание поля контактов в модальном окне
function createClientContact(obj = '') {
  modalContacts.classList.add('more-contacts');
  addContactBtnWrapper.classList.add('more-contacts');

  const contactWrapper = document.createElement('div');
  let contactSelect = document.createElement('select');
  const contactInput = document.createElement('input');
  const deleteBtn = document.createElement('button');

  contactWrapper.classList.add('contacts__wrapper', 'contact');
  contactSelect.classList.add('contact__select');
  contactInput.classList.add('contact__input');
  deleteBtn.classList.add('contact__delete-btn', 'btn-reset');

  contactInput.placeholder = 'Введите данные контакта';

  contactInput.addEventListener('input', () => {
    if (contactInput.classList.contains('is-invalid')) {
      contactInput.classList.remove('is-invalid');
      modalErrorField.innerHTML = '';
    }
  });

  // дефолтный список типов контактов
  const defaultSelectOptions = [{
    value: 'Телефон',
  },
  {
    value: 'Другое',
  },
  {
    value: 'Email',
  },
  {
    value: 'Vk',
  },
  {
    value: 'Facebook',
  }];

  const cloneArray = [...defaultSelectOptions];

  // иконка кнопки удаления контакта
  deleteBtn.insertAdjacentHTML('afterbegin',
    `<svg class="contact__delete-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z"/>
      </g>
    </svg>`);

  deleteBtn.addEventListener('click', () => {
    contactWrapper.remove();
    const contactsValue = document.querySelectorAll('.contact').length;
    if (addContactBtn.disabled) {
      addContactBtn.disabled = false;
    }
    if (contactsValue === 0) {
      modalContacts.classList.remove('more-contacts');
      addContactBtnWrapper.classList.remove('more-contacts');
    }
  });

  contactWrapper.append(contactSelect);
  contactWrapper.append(contactInput);
  contactWrapper.append(deleteBtn);
  modalContacts.append(contactWrapper);

  if (obj === '') {
    for (const item of cloneArray) {
      if (item.value === defaultContactType) {
        item.selected = true;
      }
    }
    // eslint-disable-next-line no-undef
    contactSelect = new Choices(contactSelect, {
      choices: defaultSelectOptions,
      searchEnabled: false,
      itemSelectText: '',
    });

    contactInput.value = '';
  } else {
    for (const item of cloneArray) {
      if (item.value === obj.type) {
        item.selected = true;
      }
    }
    // eslint-disable-next-line no-undef
    contactSelect = new Choices(contactSelect, {
      choices: cloneArray,
      searchEnabled: false,
      itemSelectText: '',
    });

    contactInput.value = obj.value;
  }

  // eslint-disable-next-line no-undef
  const im = new Inputmask('+7(999) 999-99-99', { showMaskOnHover: false });

  contactInput.addEventListener('focus', () => {
    const modalContact = contactInput.parentNode;
    const optionValue = modalContact.querySelector('option').value;
    if (optionValue === 'Телефон') {
      im.mask(contactInput);
    } else {
      // eslint-disable-next-line no-undef
      Inputmask.remove(contactInput);
      contactInput.placeholder = 'Введите данные контакта';
    }
  });
  contactInput.focus();
}
// изменение текста (1-я заглавная остальные маленькие)
function getCurrerntTextValue(string) {
  const firstStrLength = string.substr(0, 1);
  const otherStrLength = string.substr(1);

  const currentValue = firstStrLength.toUpperCase() + otherStrLength.toLowerCase();

  return currentValue;
}

// открытие модального окна
async function openModalWinow(title, id = '') {
  const closeModalBtn = document.querySelector('.modal__close-btn');
  const lastnameInput = document.getElementById('lastnameInput');
  const deleteClientBtn = document.getElementById('deleteClient');

  for (const input of modalInputs) {
    input.addEventListener('input', () => {
      if (input.classList.contains('is-invalid')) {
        input.classList.remove('is-invalid');
        modalErrorField.innerHTML = '';
      }
    });
  }

  modalTitle.textContent = title;

  if (id !== '') {
    const data = await getClientsData(`${requestUrl}/${id}`);
    const clientData = await data.json();

    if (data.status < DELAY_TIME) {
      window.history.pushState({}, '', `?id=${id}`);
      body.classList.add('block-scroll');
      modalOverlay.classList.add('modal-open');
      modalWindow.classList.add('modal-window-open');

      modalId.textContent = `ID: ${id}`;
      surnameInput.value = clientData.surname;
      nameInput.value = clientData.name;
      lastnameInput.value = clientData.lastName;
      for (const item of clientData.contacts) {
        createClientContact(item);
      }

      for (const input of modalInputs) {
        if (input.value !== '') {
          input.classList.add('complited');
        }
      }
    } else if (data.status === 404) {
      tablePreloader.innerHTML = `<b>Такой клиент не найден</b>`;
      tablePreloader.classList.remove('hidden');
      const url = window.location.origin;
      window.history.replaceState({}, '', url)
      setTimeout(() => {
        init();
      }, 1000)
    }
    deleteClientBtn.textContent = 'Удалить клиента';
  } else {
    body.classList.add('block-scroll');
    modalOverlay.classList.add('modal-open');
    modalWindow.classList.add('modal-window-open');
    deleteClientBtn.textContent = 'Отмена';
  }

  deleteClientBtn.addEventListener('click', async () => {
    if (deleteClientBtn.textContent === 'Отмена') {
      closeModal();
    } else if (deleteClientBtn.textContent === 'Удалить клиента') {
      const serverDeleteResponce = await deleteClient(requestUrl, id);
      if (serverDeleteResponce.status < DELAY_TIME) {
        closeModal();
        init();
      } else {
        const copyArr = await serverDeleteResponce.json();

        if (copyArr) {
          modalErrorField.textContent = '';
            console.log(copyArr.message);

        } else {
          showFormError(defaultError);
        }
      }
    }
  });

  closeModalBtn.addEventListener('click', () => {
    closeModal();
  });

  if (modalOverlay.classList.contains('modal-open')) {
    // Закрыть модальное окно при нажатии на Esc
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });

    // Закрыть модальное окно при клике вне его
    modalWindow.addEventListener('click', (event) => {
      event.isClickWithInModal = true;
    });
    modalOverlay.addEventListener('click', (event) => {
      if (event.isClickWithInModal) return;
      closeModal();
    });
  }
}

function loadTippy(str) {
  tippy(str, {
    allowHTML: true,
    trigger: 'mouseenter focus click',
    interactive: true,
    duration: 300,
  });
}

// отрисовка данных в таблице
async function renderTable(array) {
  const copyArray = [...array];
  const tableBody = document.getElementById('clientsBody');
  tableBody.textContent = '';
  for (const item of copyArray) {
    const tableRow = document.createElement('tr');
    const clientIdTd = document.createElement('td');
    const clientFullnameTd = document.createElement('td');
    const clientEditDateTd = document.createElement('td');
    const clientAddDateWrapper = document.createElement('div');
    const clientEditDateWrapper = document.createElement('div');
    const clientAddDateTd = document.createElement('td');
    const clientTimeAdd = document.createElement('span');
    const clientTimeEdit = document.createElement('span');
    const clientContactsTd = document.createElement('td');
    const clientsmodalContacts = document.createElement('div');
    const clientBtnsTd = document.createElement('td');
    const clientLinksTd = document.createElement('td');
    const clientsBtnsWrapper = document.createElement('div');
    const clientEditBtn = document.createElement('button');
    const editIcon = document.createElement('span');
    const clientDeletetBtn = document.createElement('button');
    const deleteIcon = document.createElement('span');
    const loadEditIcon = document.createElement('span');
    const loadDeleteIcon = document.createElement('span');
    const clientsLinkWrapper = document.createElement('div');
    const clientLink = document.createElement('a');

    tableRow.classList.add('client');
    clientIdTd.classList.add('clients-table__info', 'client__id');
    clientFullnameTd.classList.add('clients-table__info', 'client__fio');
    clientAddDateTd.classList.add('clients-table__info', 'client__date', 'client__date--add');
    clientAddDateWrapper.classList.add('client__date-wrapper');
    clientEditDateWrapper.classList.add('client__date-wrapper');
    clientTimeAdd.classList.add('client__time', 'client__time--add');
    clientEditDateTd.classList.add('clients-table__info', 'client__date', 'client__date--edit');
    clientTimeEdit.classList.add('client__time', 'client__time--edit');
    clientContactsTd.classList.add('clients-table__info', 'client__contacts');
    clientsmodalContacts.classList.add('client__contacts-wrapper');
    clientBtnsTd.classList.add('clients-table__info', 'client__btns');
    clientLinksTd.classList.add('clients-table__info', 'client__links');
    clientsBtnsWrapper.classList.add('client__btns-wrapper');
    clientEditBtn.classList.add('client__btn', 'client__btn--edit', 'btn-reset');
    clientDeletetBtn.classList.add('client__btn', 'client__btn--delete', 'btn-reset');
    editIcon.classList.add('client__btn-icon', 'client__btn-icon--edit');
    deleteIcon.classList.add('client__btn-icon', 'client__btn-icon--delete');
    loadEditIcon.classList.add('client__btn-icon', 'client__btn-icon--load');
    loadDeleteIcon.classList.add('client__btn-icon', 'client__btn-icon--load');
    clientsLinkWrapper.classList.add('client__link-wrapper');
    clientLink.classList.add('client__link');


    clientIdTd.textContent = item.id;
    clientFullnameTd.textContent = getFullname(item);
    clientAddDateWrapper.textContent = getCorrectDateValue(item.createdAt);
    clientTimeAdd.textContent = getCorrectTime(item.createdAt);
    clientEditDateWrapper.textContent = getCorrectDateValue(item.updatedAt);
    clientTimeEdit.textContent = getCorrectTime(item.updatedAt);
    // отрисовка контактов если их меньше 6
    if (item.contacts.length <= 5) {
      for (const contact of item.contacts) {
        clientsmodalContacts.append(getCurrentContactBtn(contact));
      }
      // отрисовка контактов если их больше 5
    } else {
      const contactsArr = [...item.contacts];
      for (let i = 0; i < 4; i++) {
        clientsmodalContacts.append(getCurrentContactBtn(contactsArr[i]));
      }
      const moreBtn = document.createElement('button');
      moreBtn.classList.add('client__contact-btn', 'btn-reset', 'client__contact-btn--more');

      moreBtn.addEventListener('click', () => {
        clientContactsTd.classList.add('many-btns');
        moreBtn.remove();
        for (let i = 4; i < item.contacts.length; i++) {
          clientsmodalContacts.append(getCurrentContactBtn(contactsArr[i]));
        }
        loadTippy('[data-tippy-content]');
      });

      moreBtn.textContent = `+${item.contacts.length - 4}`;
      clientsmodalContacts.append(moreBtn);
    }

    // иконки для кнопок изменить/удалить
    editIcon.insertAdjacentHTML('afterbegin',
      `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 10.5002V13.0002H2.5L9.87333 5.62687L7.37333 3.12687L0 10.5002ZM11.8067 3.69354C12.0667 3.43354 12.0667 3.01354 11.8067 2.75354L10.2467 1.19354C9.98667 0.933535 9.56667 0.933535 9.30667 1.19354L8.08667 2.41354L10.5867 4.91354L11.8067 3.69354V3.69354Z"/>
      </svg>`);

    deleteIcon.insertAdjacentHTML('afterbegin',
      `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z"/>
      </svg>`);

    loadEditIcon.insertAdjacentHTML('afterbegin',
      `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.00008 6.04008C1.00008 8.82356 3.2566 11.0801 6.04008 11.0801C8.82356 11.0801 11.0801 8.82356 11.0801 6.04008C11.0801 3.2566 8.82356 1.00008 6.04008 1.00008C5.38922 1.00008 4.7672 1.12342 4.196 1.34812" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
      </svg>`);

    loadDeleteIcon.insertAdjacentHTML('afterbegin',
      `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.00008 6.04008C1.00008 8.82356 3.2566 11.0801 6.04008 11.0801C8.82356 11.0801 11.0801 8.82356 11.0801 6.04008C11.0801 3.2566 8.82356 1.00008 6.04008 1.00008C5.38922 1.00008 4.7672 1.12342 4.196 1.34812" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
      </svg>`);
    // иконки для кнопок изменить/удалить

    clientEditBtn.textContent = 'Изменить';
    clientEditBtn.append(editIcon);
    clientEditBtn.append(loadEditIcon);
    clientDeletetBtn.textContent = 'Удалить';
    clientDeletetBtn.append(deleteIcon);
    clientDeletetBtn.append(loadDeleteIcon);
    clientLink.href = `${window.location.origin}/?id=${item.id}`;

    clientLink.insertAdjacentHTML('afterbegin', `
      <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 13L20 18C20 19.1046 19.1046 20 18 20L6 20C4.89543 20 4 19.1046 4 18L4 13" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16 8L12 4M12 4L8 8M12 4L12 16" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `);

    clientEditBtn.addEventListener('click', () => {
      openModalWinow('Изменить данные', item.id);
    });

    clientDeletetBtn.addEventListener('click', () => {
      const confirmBtn = document.getElementById('confirmDelete');
      const cancelBtn = document.getElementById('confirmCancel');
      const closeConfirmBtn = confirmWindow.querySelector('.modal__close-btn');
      modalOverlay.classList.add('modal-open');
      confirmWindow.classList.add('modal__confirm--open');

      confirmBtn.addEventListener('click', async () => {
        const serverResponse = await deleteClient(requestUrl, item.id);
        if (serverResponse.status < DELAY_TIME) {
          clientDeletetBtn.classList.remove('active');
          modalOverlay.classList.remove('modal-open');
          confirmWindow.classList.remove('modal__confirm--open');
          // eslint-disable-next-line no-use-before-define
          init();
        }
      });

      cancelBtn.addEventListener('click', () => {
        closeModal();
      });

      closeConfirmBtn.addEventListener('click', () => {
        closeModal();
      });
    });

    tableRow.append(clientIdTd);
    tableRow.append(clientFullnameTd);
    clientAddDateWrapper.append(clientTimeAdd);
    clientAddDateTd.append(clientAddDateWrapper);
    tableRow.append(clientAddDateTd);
    clientEditDateWrapper.append(clientTimeEdit);
    clientEditDateTd.append(clientEditDateWrapper);
    tableRow.append(clientEditDateTd);
    tableRow.append(clientContactsTd);
    clientContactsTd.append(clientsmodalContacts);
    clientsBtnsWrapper.append(clientEditBtn);
    clientsBtnsWrapper.append(clientDeletetBtn);
    clientBtnsTd.append(clientsBtnsWrapper);
    clientsLinkWrapper.append(clientLink);
    clientLinksTd.append(clientsLinkWrapper);
    tableRow.append(clientBtnsTd);
    tableRow.append(clientLinksTd);

    tableBody.append(tableRow);
  }
  const clientBtns = document.querySelectorAll('.client__btn');
  for (const btn of clientBtns) {
    btn.addEventListener('click', (e) => {
      clientBtns.forEach((elem) => {
        elem.classList.remove('active');
      });
      e.target.classList.add('active');
    });
  }
}

// функция запуска получает данные и отрисовывает в таблице
async function init() {
  let clientsArr = [];
  const pageParams = new URLSearchParams(window.location.search);
  let id = pageParams.get('id');

  if (!id) {
    id = '';
  }

  if (id === '') {
    const data = await getClientsData(requestUrl);
    const clientsList = await data.json();
    clientsArr = [...clientsList];
    await renderTable(clientsList);
    loadTippy('[data-tippy-content]');
  } else {
    openModalWinow('Данные клиента', id);
  }
  // Прелоадер исчезает после загрузки страницы
  tablePreloader.classList.add('hidden');
  return clientsArr;
}

// показ сообщений об ошибке
function showFormError(errorText) {
  const errorField = document.createElement('div');
  errorField.textContent = errorText;
  modalErrorField.append(errorField);

  modalErrorField.classList.add('add-error');
}

// проверка корректности текста(только буквы) и пустое значение
function validateTextValue(input, arr, errorText) {
  const textRe = new RegExp(/^[а-яА-ЯёЁa-zA-Z- ]+$/);
  const currentValue = textRe.test(input.value.trim());
  if (!currentValue && input.value !== '') {
    input.classList.add('is-invalid');
    showFormError(onlyTextError);
    arr.push(false);
  } else if (currentValue && input.value !== '') {
    input.classList.remove('is-invalid');
    arr.push(true);
  } else if (input.value === '') {
    input.classList.add('is-invalid');
    showFormError(errorText);
    arr.push(false);
  }
}

// валидация формы
function formValidate() {
  modalErrorField.textContent = '';
  const contactsInput = modalContacts.querySelectorAll('input');
  const tempArr = [];
  for (const input of contactsInput) {
    if (input.value.trim() === '') {
      input.classList.add('is-invalid');
      showFormError(emptyContactValue);
      tempArr.push(false);
    } else {
      tempArr.push(true);
    }
  }

  validateTextValue(nameInput, tempArr, emptyNameValue);
  validateTextValue(surnameInput, tempArr, emptySurnameValue);

  if (tempArr.every((elem) => elem === true)) {
    validForm = true;
  } else {
    validForm = false;
  }
  return validForm;
}

// получение данных из-формы в виде объекта
function getFormInfo(form) {
  const contacts = document.querySelectorAll('.contact');
  const clientFormData = {};
  const contactsArr = [];
  clientFormData.name = getCurrerntTextValue(form.nameInput.value);
  clientFormData.surname = getCurrerntTextValue(form.surnameInput.value);
  clientFormData.lastName = getCurrerntTextValue(form.lastnameInput.value);
  for (const contact of contacts) {
    const clientContact = {};
    const contactSelectValue = contact.querySelector('select').value;
    const contactInputValue = contact.querySelector('.contact__input').value;
    clientContact.type = contactSelectValue;
    clientContact.value = contactInputValue;
    contactsArr.push(clientContact);
  }
  clientFormData.contacts = contactsArr;
  return clientFormData;
}

// добавление класса при hover
function onMouseover() {
  if (current) {
    current.classList.remove('focused');
  }
  this.classList.add('focused');
  current = this;
}

// добавление класса для автодополнения поиска
function setActive(active = true) {
  if (active)
    autocomplete.classList.add('active');
  else
    autocomplete.classList.remove('active');
}
// отмена фокуса и очистка инпута
function inputUnfocus(input) {
  input.value = '';
  input.blur();
}

// подсвечивание выбранного элемента
function searchHighlighting(str) {
  const currentString = str.toLowerCase();
  const nameTdList = document.querySelectorAll('.client__fio');

  for (const nametd of nameTdList) {
    nametd.classList.remove('highlighted');

    if (nametd.textContent.toLowerCase().includes(currentString)) {
      const tdParent = nametd.closest('tr');
      const tdChilds = tdParent.childNodes;
      for (const td of tdChilds) {
        td.classList.add('highlighted');
      }
      nametd.scrollIntoView();
      setActive(false);
      inputUnfocus(headerSearchInput);

      const highLightedElements = document.querySelectorAll('.highlighted');
      if (highLightedElements.length > 0) {
        setTimeout(() => {
          for (const element of highLightedElements) {
            element.classList.remove('highlighted');
          }
        }, 1000)
      }
    }
  }
}

// автодополнение поиска
function seachComplite(arr, elem) {
  elem.innerHTML = '';

  for (const item of arr) {
    const completeItem = document.createElement('li');
    completeItem.classList.add('autocomplete__item');

    const currentName = `${item.surname} ${item.name}`;

    completeItem.textContent = currentName;

    completeItem.addEventListener('click', () => {
      searchHighlighting(completeItem.textContent);
    });

    completeItem.addEventListener('mouseover', onMouseover);
    listItems.push(completeItem);
    elem.append(completeItem);
  }
}
// отмена фокуса у списка автодополнения
function unfocusAllItems() {
  listItems.forEach(item => {
    item.classList.remove('focused');
  });
}

// добавление класса при фокусе
function focusItem(index) {
  if (!listItems.length) return false;
  if (index > listItems.length - 1) return focusItem(0);
  if (index < 0) return focusItem(listItems.length - 1);
  focusedItem = index;
  unfocusAllItems();
  listItems[focusedItem].classList.add('focused');
}

init();

// сортировка в таблице по нажатию на заголовки таблицы
tableHeaderBtns.forEach((elem) => {
  elem.addEventListener('click', async function ckickSort() {
    const clientData = await init();
    columnName = this.dataset.header;
    columnDirection = !columnDirection;
    const sortArr = sortData(clientData, columnName, columnDirection);
    renderTable(sortArr);
    loadTippy('[data-tippy-content]');
    const arrowIcon = elem.querySelector('.clients-table__header-icon');
    arrowIcon.classList.toggle('rotate-icon');
    tableHeaderBtns.forEach((btn) => {
      btn.classList.remove('clients-table__header-btn--active');
    });
    elem.classList.add('clients-table__header-btn--active');
  });
});

// кнопка добавить нового клиента
addClientBtn.addEventListener('click', () => {
  openModalWinow('Новый клиент');
});

// кнопка добавления поля с контактом
addContactBtn.addEventListener('click', (e) => {
  const contactsValue = document.querySelectorAll('.contact').length + 1;
  if (contactsValue < maxContactValue) {
    createClientContact();
  } else {
    createClientContact();
    addContactBtn.disabled = true;
  }
});
// анимация placeholder в форме
for (const input of modalInputs) {
  input.addEventListener('input', () => {
    input.classList.add('complited');
    if (input.value === '') {
      input.classList.remove('complited');
    }
  });
}
// отправка данных формы
modalForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (formValidate() === false) {
    e.stopPropagation();
  } else {
    saveClientBtn.classList.add('load');
    modalWindow.classList.add('upload');
    // если новый клиент
    if (modalId.textContent === '') {
      const formInfo = getFormInfo(modalForm);
      const serverResponseAddClient = await postNewClient(requestUrl, formInfo);
      if (serverResponseAddClient.status < DELAY_TIME) {
        closeModal();
        e.target.reset();
        modalWindow.classList.remove('upload');
        saveClientBtn.classList.remove('load');

        init();

      } else {
        const data = await serverResponseAddClient.json();
        const copyArr = [...data.errors];
        modalWindow.classList.remove('upload');
        saveClientBtn.classList.remove('load');

        if (copyArr.length > 0) {
          modalErrorField.textContent = '';
          for (const item of copyArr) {
            showFormError(item.message);
          }
        } else {
          showFormError(defaultError);
        }
      }
      // если изменяем существующего клиента
    } else {
      saveClientBtn.classList.add('load');
      const formInfo = getFormInfo(modalForm);
      const currentId = modalId.textContent.substring(4);
      const serverResponseEditClient = await editClientData(requestUrl, formInfo, currentId);
      if (serverResponseEditClient.status < DELAY_TIME) {
        closeModal();
        e.target.reset();
        init();
        modalWindow.classList.remove('upload');
        saveClientBtn.classList.remove('load');
      } else {
        const data = await serverResponseEditClient.json();
        const copyArr = [...data.errors];
        modalWindow.classList.remove('upload');
        saveClientBtn.classList.remove('load');

        if (copyArr.length > 0) {
          modalErrorField.textContent = '';
          for (const item of copyArr) {
            showFormError(item.message);
          }
        } else {
          showFormError(defaultError);
        }
      }
    }
  }
});

// поиск в хедере
headerSearchInput.addEventListener('input', () => {
  const clientsName = document.querySelectorAll('.client__fio');
  listItems = [];

  timeout = setTimeout(async () => {
    const inputValue = headerSearchInput.value;
    const response = await searchInClientData(requestUrl, inputValue);
    tablePreloader.classList.remove('hidden');
    const data = await response.json();

    if (response.status < DELAY_TIME) {
      if (data.length === 0) {
        tablePreloader.textContent = 'Ничего не найдено';
        renderTable(data);
      } else {
        init();
        for (const nameTd of clientsName) {
          nameTd.classList.remove('highLighted');
        }
        tablePreloader.classList.add('hidden');
        const copyArr = [...data];
        const completeList = autocomplete.querySelector('ul');
        seachComplite(copyArr, completeList);
        setActive(true);
      }
    }
  }, 300);

  if (headerSearchInput.value === '') {
    setActive(false);
    clearTimeout(timeout);
    init();
  }
});

headerSearchInput.addEventListener('keydown', (e) => {
  let keyCode = e.key;

  if (keyCode === 'ArrowDown') {
    e.preventDefault();
    focusedItem++;
    focusItem(focusedItem);
  } else if (keyCode === 'ArrowUp') {
    e.preventDefault();
    if (focusedItem > 0) focusedItem--;
    focusItem(focusedItem);
  } else if (keyCode === 'Escape') {
    setActive(false);
    init();
  } else if (keyCode === 'Enter') {
    e.preventDefault();
    searchHighlighting(listItems[focusedItem].textContent);
  }

});

document.addEventListener('click', (e) => {
  if (autocomplete.classList.contains('active')) {
    if (!autocomplete.contains(e.target)) {
      setActive(false);
      inputUnfocus(headerSearchInput);
      init();
    }
  }
});

document.addEventListener('keydown', () => {
  clearTimeout(timeout);
});



function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;

    return appTitle;
}

function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';
    button.disabled = true;

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
        form,
        input,
        button,
    };
}

function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');

    return list;
}

function createTodoItemElement(todoItem, { switchTodoItemDone, deleteTodoItem }) {
    let item = document.createElement('li');
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-item-center');
    if (todoItem.done) {
        item.classList.add('list-group-item-success');
    }
    item.textContent = todoItem.name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    doneButton.addEventListener('click', function () {
        switchTodoItemDone(todoItem);
        item.classList.toggle('list-group-item-success');
    });

    deleteButton.addEventListener('click', function () {
        deleteTodoItem({ todoItem, element: item });
    });

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return item;
}

function createTodoApp(container, {
    title,
    owner,
    todoItemList = [],
    createTodoItem,
    switchTodoItemDone,
    deleteTodoItem,
    storage
}) {
    let todoAppTitle = createAppTitle(title);
    let todoitemForm = createTodoItemForm();
    let todoList = createTodoList();
    const handlers = { switchTodoItemDone, deleteTodoItem };


    container.append(todoAppTitle);
    container.append(todoitemForm.form);
    container.append(todoList);

    todoItemList.forEach(todoItem => {
        console.log('Добавили элемент в список');
        const todoItemElement = createTodoItemElement(todoItem, handlers);
        todoList.append(todoItemElement);
    });

    todoitemForm.input.addEventListener('input', function () {
        if (!todoitemForm.input.value) {
            todoitemForm.button.disabled = true;
        } else (todoitemForm.button.disabled = false);
    });

    todoitemForm.form.addEventListener('submit', async function (e) {
        e.preventDefault();
        console.log('Создали дело');
        if (!todoitemForm.input.value) {
            return;
        }

        let todoItem = await createTodoItem({
            owner,
            name: todoitemForm.input.value.trim(),
        });

        let todoItemElement = createTodoItemElement(todoItem, handlers);

        todoList.append(todoItemElement);

        todoitemForm.input.value = '';
        todoitemForm.button.disabled = true;

    });
    createChangeStorage(storage);
    return todoAppTitle;
}

function createChangeStorage(storage) {
    if (storage.storage === 'serverStorage') {
        document.getElementById("serverInput").checked = true;
        document.getElementById("serverLabel").classList.add('active');
    } else {
        document.getElementById("localStorageInput").checked = true;
        document.getElementById("localStorageLabel").classList.add('active');
    }

    let localStorageLabel = document.getElementById('localStorageLabel');
    let localStorageInput = document.getElementById('localStorageInput');
    let serverLabel = document.getElementById('serverLabel');
    let serverInput = document.getElementById('serverInput');

    localStorageInput.addEventListener('click', function () {
        localStorageInput.checked = true;
        localStorageLabel.classList.add('active', 'btn', 'btn-primary');
        serverInput.checked = false;
        serverLabel.className = '';
        serverLabel.classList.add('btn', 'btn-primary');


        createOrSwitchStorage(storage, 'localStorage');

        console.log('Выбрали локальное хранилище');
        window.location.reload();
    });
    serverInput.addEventListener('click', function () {
        serverInput.checked = true;
        serverLabel.classList.add('active', 'btn', 'btn-primary');
        localStorageInput.checked = false;
        localStorageLabel.className = '';
        localStorageLabel.classList.add('btn', 'btn-primary');

        createOrSwitchStorage(storage, 'serverStorage');

        console.log('Выбрали серверное хранилище');
        window.location.reload();
    });
}

function createOrSwitchStorage(storage, name) {
    let todoMass = JSON.parse(localStorage.getItem('storage'));
    console.log('storage', storage);
    console.log('массив', todoMass);
    if (!todoMass) {
        todoMass = [];
        console.log('Мaссив был пуст');
        todoMass.push({ storage: name, owner: storage.owner });
        console.log('массив', todoMass);
        localStorage.setItem('storage', JSON.stringify(todoMass));
        console.log('localStorage', localStorage);
    } else if (todoMass.length > 0) {
        console.log('длинна массива', todoMass.length);
        let a = todoMass.find(todo => todo.owner === storage.owner);
        if (!a) {
            console.log("Owner not equal");
            todoMass.push({ storage: name, owner: storage.owner });
            localStorage.setItem('storage', JSON.stringify(todoMass));
        } else if (a.owner === storage.owner) {
            a.storage = name;
            localStorage.setItem('storage', JSON.stringify(todoMass));
            console.log(localStorage);
        } 
    } 
    // else if (todoMass.owner == storage.owner) {

    //     todoMass.storage = name;
    //     localStorage.setItem('storage', JSON.stringify(todoMass));
    // } else {
    //     todoMass.push({ storage: name, owner: storage.owner });
    //     localStorage.setItem('storage', JSON.stringify(todoMass));
    // }
    console.log('перешли на хранилище', name);
};

export { createTodoApp };
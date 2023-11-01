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

    function createTodoItem(name) {
        let item = document.createElement('li');
        let textItem = document.createElement('div');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-item-center');
        textItem.textContent = name;
        item.append(textItem);

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return {
            item,
            textItem,
            doneButton,
            deleteButton,
        };
    }

    function createTodoApp(container, title = 'Список дел', todoMass = []) {

        let todoAppTitle = createAppTitle(title);
        let todoitemForm = createTodoItemForm();
        let todoList = createTodoList();

        todoMass = loadMass(todoMass,todoAppTitle);
        loadTodoList(todoMass,todoList,todoAppTitle);

        container.append(todoAppTitle);
        container.append(todoitemForm.form);
        container.append(todoList);


        todoitemForm.input.addEventListener('input', function () {
            if (!todoitemForm.input.value) {
                todoitemForm.button.disabled = true;
            } else (todoitemForm.button.disabled = false);
        });

        todoitemForm.form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!todoitemForm.input.value) {
                return;
            }

            let todoItem = createTodoItem(todoitemForm.input.value);

            todoMass.push({ name: todoitemForm.input.value, parametr: false });
            saveMass(todoMass, todoAppTitle);

            todoItem.doneButton.addEventListener('click', function () {
                changeColor(todoItem, todoMass, todoAppTitle);
            });

            todoItem.deleteButton.addEventListener('click', function () {
                deleteItem(todoItem, todoMass,todoAppTitle);
            });

            todoList.append(todoItem.item);

            todoitemForm.input.value = '';
            todoitemForm.button.disabled = true;

        });
    }

    function saveMass(mass, todoAppTitle) {
        localStorage.setItem(todoAppTitle.textContent, JSON.stringify(mass));
    }

    function changeColor(todoItem, todoMass, todoAppTitle) {
        todoItem.item.classList.toggle('list-group-item-success');

        let a = todoMass.find(todo => todo.name === todoItem.textItem.textContent);
        a.parametr = !a.parametr;
        saveMass(todoMass, todoAppTitle);
    }

    function deleteItem(todoItem, todoMass,todoAppTitle) {
        if (confirm('Вы уверены?')) {
            todoItem.item.remove();

            let a = todoMass.findIndex(todo => todo.name === todoItem.textItem.textContent);
            todoMass.splice(a, 1);
            saveMass(todoMass, todoAppTitle);
        }
    }

    function loadTodoList(todoMass, todoList, todoAppTitle) {
        for (let a of todoMass) {
            let todoItem = createTodoItem(a.name);
            if (a.parametr === true) {
                todoItem.item.classList.toggle('list-group-item-success');
            }

            todoItem.doneButton.addEventListener('click', function () {
                changeColor(todoItem, todoMass, todoAppTitle);
            });

            todoItem.deleteButton.addEventListener('click', function () {
                deleteItem(todoItem, todoMass, todoAppTitle);
            });
            todoList.append(todoItem.item);
        }
    }

    function loadMass(todoMass, todoAppTitle) {
        let keys = Object.keys(localStorage);
        for (let key of keys) {
            if (key === todoAppTitle.textContent) {
                todoMass = (JSON.parse(localStorage.getItem(key)));
            }
        }
        return todoMass;
    }
    export {createTodoApp};
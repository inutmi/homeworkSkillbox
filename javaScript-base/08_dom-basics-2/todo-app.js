(function() {
    
    let listArray = [],
    listName = '';
    
    //создаем и возвращаем заголовок приложения
    // чтобы текст заголовка было легко изменить, мы будем его задавать в аргументе функции
    function createAppTitle(title) {
    // в теле функции мы создаем переменную appTitle, в которую мы помещаем DOM элемент h2, который мы создаем с помощью функции  document.createElement()
    let appTitle = document.createElement('h2');
    // дальше мы присваиваем свойству .innerHTML (т.е. внутреннему содержимому этого тэга) title, который мы передаем в качестве аргумента
    appTitle.innerHTML = title;
    // таким образом у нас получился заголовок с нужным нам текстом и мы возвращаем тот DOM элемент, который мы только что создали
    //вернуть из функции его нужно обязательно, потому что потом, когда мы будем инициировать наше приложение, мы будем вызывать эти функции
    //и возвращаемое значение, т.е. DOM элемент, который мы здесь создали, мы будем помещать внутрь нашего <div>, который мы создали до этого. Т.е. <div> с id todo-app
    return appTitle;
}

//создаем и возвращаем форму для создания дела
function createTodoItemForm() {
    //cоздаем сам элемент формы с помощью функции document.createElement()
    let form = document.createElement('form');
    //создаем поле для ввода
    let input = document.createElement('input');
    //в переменную buttonWrapper мы передаем еще один вспомогательнй элемент, который необходим, чтобы правильно стилизовать кнопку в стиле bootstrap
    let buttonWrapper = document.createElement('div');
    //создаем саму кнопку
    let button = document.createElement('button');

    //расставляем различные атрибуты нашим элементам
    //для form мы устанавливаем два класса 'input-group' и 'mb-3', они нужны для того, чтобы правильно нарисовать форму.
    //'input-group' содержит в себе группу элементов формы и специальным образом стилизуется bootstrap 'mb-3' - это класс, который оставляет отступ
    //после формы, чтобы она не слеплялась со списком элементов
    form.classList.add('input-group', 'mb-3');
    //в поле для ввода необходим установить класс 'form-control', чтобы bootstrap правильно отобразил элемент формы
    input.classList.add('form-control');
    //с помощью установки атрибута .placeholder мы добавляем пояснение о том, что нужно вводить в данное поле
    //этот текст будет отображаться всегда, пока в поле ничего не введено
    input.placeholder = 'Введите название нового дела';
    //для начала на  buttonWrapper. добавим класс 'input-group-append', он нужен для того, чтобы позиционировать какой-то элемент в форме
    //справа от нашего поля для ввода
    buttonWrapper.classList.add('input-group-append');
    //добавляем кнопке два класса 'btn'(нужен для того, чтобы применить кнопке все стили, которые нужны каждой кнопке в bootstrap), 'btn-primary'(нарисует эту кнопку красивым синим цветом)
    //такой набор классов зачастую используется для единственной кнопки на форме, либо кнопке на формке, которая осуществляет основное действие, если есть еще какие-то
    button.classList.add('btn','btn-primary');
    //добавление к кнопке button текста, который будет отображаться внутри кнопки
    button.textContent = 'Добавить дело';
    button.disabled = true;

    //объединяем наши DOM элементы в единую структуру
    //buttonWrapper вкладываем в button
    buttonWrapper.append(button);
    //на form вкладываем input
    form.append(input);
    //и buttonWrapper, на который уже вложена кнопка
    form.append(buttonWrapper);

    // для наглядности покажем html код, который сгенерировался благодаря командам:
    // <form class="input-group mb-3">
    //     <input class="form-control" placeholder="Input name a new task"></input>
    //     <div class="input-group-append">
    //         <button class="btn btn-primary">Add task</button>
    //     </div>
    // </form>

    input.addEventListener('input', function () {
        if (input.value !== '') {
            button.disabled = false
        } else
        button.disabled = true
    });

    //возвращаем результат
    //но мы не можем вернуть только форм, т.к. помимо нее мы должны иметь доступ к инпуту и button внутри
    //т.к. по нажатию на кнопку мы должны будем создать новый элемент в списке и забрать при этом значение из input
    //если мы не вернем их отсюда, то мы не будем иметь к ним доступа
    return {
        form,
        input,
        button,
    };
}

//создаем и возвращаем список элементов
function createTodoList() {
    //создаем переменную list и присваем ей новый элемент ul, т.е. ненумерованный список в html
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
}

function createTodoItem(obj) {
    //создаем элемент li, который потом будем помещать в список
    let item = document.createElement('li');
    // кнопки помещаем в элемент, который красиво покажет их в одной группе
    let buttonGroup = document.createElement('div')
    //кнопка для того, чтобы отметить дело как сделанное
    let doneButton = document.createElement('button');
    //кнопка для удаления дела из списка
    let deleteButton = document.createElement('dbutton');

    //устанавливаем стили для элемента списка, а также для размещения кнопок
    //в его правой части с помощью Flex
    //обавление классов к элементу li
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    //передаем свойство .textContent в то, что было передано в качестве аргумента. Используем именно .textContent, а не InnerHTML
    //Это важно, потому что внутри name могут быть спецсимволы, типа открывающихся и закрывающихся скобок
    item.textContent = obj.name;


    //здесь добавляем классы к buttonGroup. 'btn-group'(стили группы кнопок) 'btn-group-sm' (делает эту группу немного меньше по высоте, чтобы элемент не был слишком большим)
    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    //настройка кнопок 'btn' - уже знаком.  'btn-success' - делает кнопку зеленой
    doneButton.classList.add('btn', 'btn-success');
    //устанавливаеме для doneButton. текст 'Done'
    doneButton.textContent = 'Готово';
     //настройка кнопок 'btn' - уже знаком.  'btn-danger' - делает кнопку красной
    deleteButton.classList.add('btn', 'btn-danger');
    //устанавливаеме для  deleteButton. текст 'Delete'
    deleteButton.textContent = 'Удалить';


    if (obj.done == true) item.classList.add('list-group-item-success')
    doneButton.addEventListener('click', function () {
        item.classList.toggle('list-group-item-success')
  
        for (const listItem of listArray) {
          if (listItem.id == obj.id) listItem.done = !listItem.done
        }
  
        saveList(listArray, listName);
  
      });
  
      deleteButton.addEventListener('click', function () {
        if (confirm('Вы уверены?')) {
          item.remove()
  
          for (let i = 0; i < listArray.length; i++) {
            if (listArray[i].id == obj.id) listArray.splice(i, 1)
          }
  
          saveList(listArray, listName);
        }
  
      });
  

    //вкладываем кнопки в отдельный элемент, чтобы они соединились в один блок
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    //группу кнопок вкладываем в наш item, т.е. в li
    item.append(buttonGroup);

    //приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия
    //возвращаем объект, в котором есть item,  doneButton,  deleteButton
    return {
        item,
        doneButton,
        deleteButton,
    };

}

function getNeewID(arr) {
    let max = 0;
    for (const item of arr) {
      if (item.id > max) max = item.id
    }

    return max + 1;
  }

  function saveList(arr, keyName) {
    localStorage.setItem(keyName, JSON.stringify(arr));
  }


function createTodoApp(container, title = 'Список дел', keyName) {
    
    //вызываем поочередно все три функции, которые создали до этого 
    //createAppTitle(title) и createTodoList() вернут сам DOM элемент, который можно разместить
    let todoAppTitle = createAppTitle(title);
    //в случае с  todoItemForm мы возвращаем объект, в котором помимо прочего есть form, поэтому мы не сам todoItemForm размещаем внутри контейнера, а сначала берем у него свойство form
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();



    listName = keyName;

    //размещаем результат функций внутри контейнера

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);


    let localData = localStorage.getItem(listName);


    if (localData !== null && localData !== '') listArray = JSON.parse(localData)

    for (const itemList of listArray) {
      let todoItem = createTodoItem(itemList);
      todoList.append(todoItem.item);
    }


    //браузер создает событие submit на форме по нажатию Enter или на кнопку создания дела
    todoItemForm.form.addEventListener('submit', function(e) {
        //эта строчка необходима, чтобы превратить стандартные действия браузера
        //в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
        e.preventDefault();

        //игорируем создание элемента, если пользователь ничего не ввел в поле
        if (!todoItemForm.input.value) {
            return;
        }


        let newItem = {
            id: getNeewID(listArray),
            name: todoItemForm.input.value,
            done: false
          }

        
        //помещаем в  todoItem  результат выполнения createTodoItem результат выполнения 
        let todoItem = createTodoItem(newItem);



        listArray.push(newItem);

        saveList(listArray, listName);
  
        // создаем и добовляем в списки новое дело с названием из поля ввода
        todoList.append(todoItem.item);
  
        todoItemForm.button.disabled = true;

        
        //обнуляем значение в поле, чтобы не пришлось стирать его вручную
        todoItemForm.input.value = '';
    });
}

// document.addEventListener('DOMContentLoaded', function() {
// createTodoApp(document.getElementById('my-todos'), 'My tasks');
// createTodoApp(document.getElementById('mom-todos'), 'Mothers tasks');
// createTodoApp(document.getElementById('dad-todos'), 'Dads tasks');
// });

//регистрация функции createTodoApp в глобальном объекте Window, чтобы получить доступ к этой функции из других скриптов
window.createTodoApp = createTodoApp;
})();
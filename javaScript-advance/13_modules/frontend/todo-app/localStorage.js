export async function getTodoList(owner) {
    let todoMass = [];
    let keys = Object.keys(localStorage);
    for (let key of keys) {
        if (key === owner) {
            todoMass = (JSON.parse(localStorage.getItem(key)));
        }
    }
    return todoMass;
};

export function createTodoItem({ owner, name }) {
    let todoMass = (JSON.parse(localStorage.getItem(owner)));
    if (!todoMass) {
        todoMass = [];
    }
    todoMass.push({ done: false, id: Date.now().toString(), name: name, owner: owner });
    localStorage.setItem(owner, JSON.stringify(todoMass));
    return todoMass[todoMass.length - 1];
};

export function switchTodoItemDone( todoItem ) {
    let todoMass = (JSON.parse(localStorage.getItem(todoItem.owner)));
    todoItem.done = !todoItem.done;
    let a = todoMass.find(todo => todo.id === todoItem.id);
    a.done = !a.done;
    localStorage.setItem(todoItem.owner, JSON.stringify(todoMass));
}

export function deleteTodoItem({ todoItem, element }) {
    if (!confirm('Вы уверены?')) {
        return;
    }
    element.remove();
    let todoMass = (JSON.parse(localStorage.getItem(todoItem.owner)));
    let a = todoMass.findIndex(todo => todo.id === todoItem.id);
    todoMass.splice(a, 1);
    localStorage.setItem(todoItem.owner, JSON.stringify(todoMass));
}
export async function getTodoList(owner) {
    const responce = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
    return await responce.json();
};

export async function createTodoItem({ owner, name }) {
    const responce = await fetch(`http://localhost:3000/api/todos`, {
        method: 'POST',
        body: JSON.stringify({
            name,
            owner
        }),
        headers: {
            'Content-type': 'application/json'
        }
    });
    return await responce.json();
};

export function switchTodoItemDone( todoItem ) {
    todoItem.done = !todoItem.done;
    fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ done: todoItem.done }),
        headers: {
            'Content-type': 'application/json'
        }
    });

};

export function deleteTodoItem({ todoItem, element }) {
    if (!confirm('Вы уверены?')) {
        return;
    }
    element.remove();
    fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
        method: 'DELETE'
    });
};
const errorMsg = document.querySelector('.invalid-feedback'),
      form = document.querySelector('.form'),
      input = document.querySelector('.class-name'),
      prototypeList = document.querySelector('.prototype-chain');
function errorProcessing(msg) {
    input.classList.add('is-invalid');
    errorMsg.textContent = msg;
}
async function inputChecking() {
    const request = input.value;
    try {
        if (request.endsWith('.js')) { 
            const module = await import(`./modules/${request}`);
            moduleClassHandler(module.default);
        } else {       
            windowClassHandler(request);
        }
    } catch(error) {
        if(error.name === 'TypeError') error.message = 'Модуль не найден'
        errorProcessing(error.message);
    }
}
function windowClassHandler(currentClass) {
    if (!Object.hasOwn(window, currentClass)) {
        throw new Error('Данный класс отсутствует в Window')
    }
    if (typeof window[currentClass] != 'function') {
        throw new Error('Данное свойство не является функцией-конструктором')
    }
    prototypeList.textContent = '';
    showFirstPrototype(window[currentClass].prototype);
    showPrototypeChain(window[currentClass].prototype);    
}
function moduleClassHandler(currentClass) {
    prototypeList.textContent = '';
    showFirstPrototype(currentClass.prototype);
    showPrototypeChain(currentClass.prototype);    
}
function showFirstPrototype(classProto) {
    let listItem = document.createElement('li');
    listItem.textContent = classProto.constructor ? classProto.constructor.name : 'Без названия'
    listItem.append(showPrototypePropertiesList(classProto));
    prototypeList.append(listItem); 
}
function showPrototypeChain(classProto) { 
    if(Object.getPrototypeOf(classProto) != null) {        
        let objPrototype = Object.getPrototypeOf(classProto),
            listItem = document.createElement('li');
        listItem.textContent = objPrototype.constructor ? objPrototype.constructor.name : 'Без названия'
        listItem.append(showPrototypePropertiesList(objPrototype));
        prototypeList.append(listItem);
        showPrototypeChain(objPrototype);
    }
}
function showPrototypePropertiesList(currentPrototype) {
    let list = document.createElement('ol');    
    const descriptors = Object.getOwnPropertyDescriptors(currentPrototype);
    Object.entries(descriptors).map(([key, value]) => {
        let item = document.createElement('li');
        item.textContent = `Название свойства - "${key}". Тип свойства - ${value.get ? typeof value.get : typeof value.value}`;
        list.append(item);
    })
    return list;
}
form.addEventListener('submit', el => {
    el.preventDefault();
    inputChecking();
})
input.addEventListener('focus', function() {
    this.classList.remove('is-invalid');
    errorMsg.textContent = '';
})
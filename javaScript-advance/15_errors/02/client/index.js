let counter = 0;
function CreateMessage (message) {
    const box = document.createElement('p');
    box.textContent = message;
    box.style.position = 'fixed';
    box.style.bottom = '10px';
    box.style.right = '10px';
    return box;
};
const loaderBlock = CreateMessage('Загрузка...');
document.body.appendChild(loaderBlock);
    async function getData() {
     try{
        const response = await fetch('http://localhost:3000/api/products?');
        const data = await response.json();
        loaderBlock.style.display = 'none';
        if (response.status === 404) {
            const error = new Error('Список пуст');
            error.statusCode = data.Code;
            const er = CreateMessage('Список товаров пуст');
            document.body.append(er);
            setTimeout(function() {er.remove();}, 3000);
            throw error;
        } if (response.status === 500) {
            counter ++
            if (counter < 3) {
            return getData();
            } else {
                    const er = CreateMessage('Произошла ошибка, попробуйте обновить страницу позже');
                    document.body.append(er);
                    setTimeout(function() {er.remove();}, 3000);
                    }
        }
        return data;
     } catch (error) {
        loaderBlock.style.display = 'none';
        switch (error.name) {
            case 'SyntaxError':
                const er = CreateMessage('Произошла ошибка, попробуйте обновить страницу позже');
                document.body.append(er);
                setTimeout(function() {er.remove();}, 3000);
                break;
            case 'TypeError':
                const er2 = CreateMessage('Произошла ошибка, попробуйте обновить страницу позже');
                document.body.append(er2);
                setTimeout(function() {er2.remove();}, 3000);
                break;
            default:
                if (!navigator.onLine) {
                    const er = CreateMessage('Отсутствует интернет соединение');
                    document.body.append(er);
                    setTimeout(function() {er.remove();}, 3000);
                    break;
                }
                throw error;
        }
        }
    };
      window.addEventListener("offline", (e) => {
        const InternetConnectionBlock = CreateMessage('Offline');
        document.body.appendChild(InternetConnectionBlock);
        setTimeout(function() { InternetConnectionBlock.remove();}, 3000);
      });
      window.addEventListener("online", (e) => {
        const InternetConnectionBlock = CreateMessage('Online');
        document.body.appendChild(InternetConnectionBlock);
        setTimeout(function() { InternetConnectionBlock.remove();}, 3000);
      });
let opr = getData().then((res) => {
    const container = document.createElement('div'),
          app = document.createElement('div');
    document.body.append(app);
    app.append(container);
    for (const product of res.products) {
        const card = document.createElement('div'),
            img = document.createElement('img'),
            prodName = document.createElement('h2'),
            price = document.createElement('p');
            img.src = product.image;
            prodName.textContent = product.name;
            price.textContent = product.price;
            card.append(img, prodName, price);
            container.append(card);
    }
});
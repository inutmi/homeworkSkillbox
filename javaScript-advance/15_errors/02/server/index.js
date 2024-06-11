const express = require('express');
const path = require('path');
const { fakerRU: faker } = require('@faker-js/faker');

const PORT = 3000;

const app = express();
const products = new Array(10).fill().map(() => ({
  image: faker.image.urlLoremFlickr({
    category: 'fashion',
    height: 640,
    width: 480
  }),
  name: faker.commerce.product(),
  price: faker.commerce.price(),
}));



const responces = [{
  status: 200,
  data: {
    products,
  },
},
{
  status: 404,
  data: {
    products: [],
  },
},
{
  status: 500,
  data: {
    error: 'Server error',
  },
},
{
  status: 200,
  data: null,
},
];

function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

app.use(express.static(path.resolve(__dirname, '../client')));

app.get('/api/products', (req, res) => {
  const { query } = req;
  const queryStatus = Number(query.status);
  const delay = query.delay || getRandomNumberBetween(0, 5);
  const forceJsonInvalid = query.json_invalid === 'true';

  let status;
  let data;

  if (queryStatus) {
    const responce = responces.find((responceItem) => responceItem.status === queryStatus);
    status = queryStatus;

    if (responce) {
      data = responce.data;
    } else {
      data = {
        error: 'Some error',
      };
    }
  } else {
    const randomResponce = responces[getRandomNumberBetween(0, responces.length - 1)];
    status = randomResponce.status;
    data = randomResponce.data;
  }

  setTimeout(() => {
    if (forceJsonInvalid) {
      res.status(status).send(null);
      return;
    }

    res.status(status).send(data);
  }, delay * 1000);
});

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`Сервер запущен. Вы можете использовать его по адресу http://localhost:${PORT}`);
  console.log('Нажмите CTRL+C, чтобы остановить сервер');
  /* eslint-enable no-console */
});

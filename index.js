require('dotenv').config();
const express = require('express');
const rescue = require('express-rescue');
const productsControllers = require('./controllers/productsControllers');
const salesControllers = require('./controllers/salesControllers');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', rescue(productsControllers.getAll));

app.get('/products/:id', rescue(productsControllers.getById));

app.get('/sales', rescue(salesControllers.getAll));

app.get('/sales/:id', rescue(salesControllers.getById));

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

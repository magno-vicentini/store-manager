require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const rescue = require('express-rescue');
const productsControllers = require('./controllers/productsControllers');
const salesControllers = require('./controllers/salesControllers');
const middlewares = require('./middlewares/validations');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', rescue(productsControllers.getAll));

app.get('/products/:id', rescue(productsControllers.getById));

app.get('/sales', rescue(salesControllers.getAll));

app.get('/sales/:id', rescue(salesControllers.getById));

app.post('/products', 
  middlewares.valName, 
  middlewares.valQuantityProducts, 
  rescue(productsControllers.createProduct));

app.put('/products/:id', 
middlewares.valQuantityProducts, 
middlewares.valName, 
  rescue(productsControllers.updateProduct));

app.delete('/products/:id', 
  rescue(productsControllers.deleteProduct));

app.post('/sales', 
  middlewares.valQuantitySales,
  middlewares.valProductIdSales, 
  rescue(salesControllers.createSale));

app.put('/sales/:id', 
  middlewares.valQuantitySales,
  middlewares.valProductIdSales, 
  rescue(salesControllers.updateSale));

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

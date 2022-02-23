const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';

  const [products] = await connection.execute(query);

  return products;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';

  const [products] = await connection.execute(query, [id]);

  return products;
};

const createProduct = async (name, quantity) => {
  const query = 'INSERT INTO products( name, quantity) VALUES (?, ?)';

  const [product] = await connection.execute(query, [name, quantity]);
  
  return product.insertId;
};

module.exports = {
  getAll,
  getById,
  createProduct,
};
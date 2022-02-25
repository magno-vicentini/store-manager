const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT sp.sale_id as saleId, s.date, sp.product_id as productId, 
  sp.quantity FROM sales_products as sp INNER JOIN sales as s ON sp.sale_id = s.id 
  `;

  const [sales] = await connection.execute(query);

  return sales;
};

const getById = async (id) => {
  const query = `SELECT s.date, sp.product_id as productId, sp.quantity 
  FROM sales_products as sp INNER JOIN sales as s ON sp.sale_id = s.id 
  WHERE sp.sale_id = ?`;

  const [sales] = await connection.execute(query, [id]);

  return sales;
};

const createSale = async (result) => {
  const querySale = 'INSERT INTO sales (date) VALUES (NOW())';
  const querySalesProducts = `INSERT INTO sales_products 
  (sale_id, product_id, quantity) VALUES (?, ?, ?)`;
  const queryUpdateProduct = 'UPDATE products SET quantity = (quantity - ?) WHERE id = ?';
  
  const [resultSales] = await connection.execute(querySale);
  
  result.map(async (sale) => {
     await connection
    .execute(querySalesProducts, [resultSales.insertId, sale.productId, sale.quantity]);
    await connection
    .execute(queryUpdateProduct, [sale.quantity, sale.productId]);
  });

  return resultSales.insertId;
};

const updateSale = async (id, arrayRequest) => {
  const query = `UPDATE sales_products 
  SET product_id = ?, quantity = ?
  WHERE sale_id = ? LIMIT 1`;

  const [result] = await connection
  .execute(query, [arrayRequest[0].productId, arrayRequest[0].quantity, id]);
  return result;
};

const deleteSale = async (id) => {
  const query = 'DELETE FROM sales_products WHERE sale_id = ?';

  const queryProductById = 'SELECT * FROM sales_products WHERE sale_id = ?';

  const queryUpdateProduct = 'UPDATE products SET quantity = (quantity + ?) WHERE id = ?';

  const [products] = await connection.execute(queryProductById, [id]);

  const [result] = await connection.execute(query, [id]);
  
  products.map(async (el) => {
  await connection
    .execute(queryUpdateProduct, [el.quantity, el.product_id]);
    });

  return result;
};

module.exports = {
  getAll,
  getById,
  createSale,
  updateSale,
  deleteSale,
};
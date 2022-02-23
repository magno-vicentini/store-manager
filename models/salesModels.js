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

module.exports = {
  getAll,
  getById,
};
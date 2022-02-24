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

  const [resultSales] = await connection.execute(querySale);
  
  result.map(async (sale) => {
     await connection
    .execute(querySalesProducts, [resultSales.insertId, sale.productId, sale.quantity]);
  });

  return resultSales.insertId;
};

const updateSale = async (id, arrayRequest) => {
  const query = `UPDATE sales_products 
  SET product_id = ?, quantity = ? 
  WHERE sale_id = ?`;

  const [result] = await connection
  .execute(query, [arrayRequest.productId, arrayRequest.quantity, id]);
  console.log(result);
  return result;
};

module.exports = {
  getAll,
  getById,
  createSale,
  updateSale,
};
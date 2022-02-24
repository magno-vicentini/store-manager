const salesServices = require('../services/salesServices');

const getAll = async (_req, res) => {
  const allsales = await salesServices.getAll();

  return res.status(200).json(allsales);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const saleById = await salesServices.getById(id);

  if (!saleById.length) return res.status(404).json({ message: 'Sale not found' });

  res.status(200).json(saleById);
};

const createSale = async (req, res) => {
  const result = req.body;

  const idSales = await salesServices.createSale(result);

  return res.status(201).json({ idSales });
};

module.exports = {
  getAll,
  getById,
  createSale,
};
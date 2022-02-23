const productsServices = require('../services/productsServices');

const getAll = async (_req, res) => {
  const allProducts = await productsServices.getAll();

  res.status(200).json(allProducts);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const productById = await productsServices.getById(id);

  if (!productById.length) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(productById[0]);
};

module.exports = {
  getAll,
  getById,
};
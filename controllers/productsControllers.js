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

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const allProducts = await productsServices.getAll();

  if (allProducts.some((product) => product.name === name)) {
    return res.status(409).json({ message: 'Product already exists' });
  }

  const id = await productsServices.createProduct(name, quantity);

  return res.status(201).json({ id, name, quantity });
};

module.exports = {
  getAll,
  getById,
  createProduct,
};
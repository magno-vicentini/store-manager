const productsServices = require('../services/productsServices');

const getAll = async (_req, res) => {
  const allProducts = await productsServices.getAll();

  res.status(200).json(allProducts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const productById = await productsServices.getById(id);

  if (!productById.length) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(...productById);
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const allProducts = await productsServices.getAll();

  if (allProducts.some((product) => product.name === name)) {
    console.log(name);
    return res.status(409).json({ message: 'Product already exists' });
  }

  const idCreated = await productsServices.createProduct(name, quantity);

  return res.status(201).json({ id: idCreated, name, quantity });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const productById = await productsServices.getById(id);

  if (!productById.length) return res.status(404).json({ message: 'Product not found' });

  await productsServices.updateProduct(id, name, quantity);

  return res.status(200).json({ id, name, quantity });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const productById = await productsServices.getById(id);

  if (!productById.length) return res.status(404).json({ message: 'Product not found' });

  await productsServices.deleteProduct(id);

  return res.status(204).end();
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};
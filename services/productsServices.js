const productsModels = require('../models/productsModels');

const getAll = async () => productsModels.getAll();

const getById = async (id) => productsModels.getById(id);

const createProduct = async (name, quantity) => productsModels.createProduct(name, quantity);

const updateProduct = async (id, name, quantity) => productsModels
.updateProduct(id, name, quantity);

const deleteProduct = async (id) => productsModels.deleteProduct(id);

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};
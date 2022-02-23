const productsModels = require('../models/productsModels');

const getAll = async () => productsModels.getAll();

const getById = async (id) => productsModels.getById(id);

const createProduct = async (name, quantity) => productsModels.createProduct(name, quantity);

module.exports = {
  getAll,
  getById,
  createProduct,
};
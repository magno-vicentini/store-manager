const productsModels = require('../models/productsModels');

const getAll = async () => productsModels.getAll();

const getById = async (id) => productsModels.getById(id);

module.exports = {
  getAll,
  getById,
};
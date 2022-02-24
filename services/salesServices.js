const salesModels = require('../models/salesModels');

const getAll = async () => salesModels.getAll();

const getById = async (id) => salesModels.getById(id);

const createSale = async (result) => salesModels.createSale(result);

module.exports = {
  getAll,
  getById,
  createSale,
};
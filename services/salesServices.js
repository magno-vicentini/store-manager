const salesModels = require('../models/salesModels');

const getAll = async () => salesModels.getAll();

const getById = async (id) => salesModels.getById(id);

module.exports = {
  getAll,
  getById,
};
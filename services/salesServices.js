const salesModels = require('../models/salesModels');

const getAll = async () => salesModels.getAll();

const getById = async (id) => salesModels.getById(id);

const createSale = async (result) => { 
  const idSale = await salesModels.createSale(result);

  return {
    id: idSale,
    itemsSold: result,
  };
};

module.exports = {
  getAll,
  getById,
  createSale,
};
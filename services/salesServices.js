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

const updateSale = async (id, arrayRequest) => {
  await salesModels.updateSale(id, arrayRequest[0]);

  return ({
    saleId: id,
    itemUpdated: arrayRequest,
  });
};

const deleteSale = async (id) => salesModels.deleteSale(id);

module.exports = {
  getAll,
  getById,
  createSale,
  updateSale,
  deleteSale,
};
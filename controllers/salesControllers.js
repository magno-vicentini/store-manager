const salesServices = require('../services/salesServices');
const servicesControllers = require('../services/productsServices');

const getAll = async (_req, res) => {
  const allsales = await salesServices.getAll();

  return res.status(200).json(allsales);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const saleById = await salesServices.getById(id);

  if (!saleById.length) return res.status(404).json({ message: 'Sale not found' });

  res.status(200).json(saleById);
};

const createSale = async (req, res) => {
  const result = req.body;

  const allProducts = await servicesControllers.getAll();
  result.map((q) => {
    allProducts.map((p) => {
      console.log(p.id);
      if (p.id === q.productId && p.quantity < q.quantity) {
        return res.status(422).json({
          message: 'Such amount is not permitted to sell',
        });
      }
      return true;
    });
    return true;
  });

  const idSales = await salesServices.createSale(result);

  return res.status(201).json(idSales);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const arrayRequest = req.body;

  const saleById = await salesServices.getById(id);

  if (!saleById.length) return res.status(404).json({ message: 'Sale not found' });

  const result = await salesServices.updateSale(id, arrayRequest);

  res.status(200).json(result);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const saleById = await salesServices.getById(id);

  if (!saleById.length) return res.status(404).json({ message: 'Sale not found' });

  await salesServices.deleteSale(id);

  return res.status(204).end();
};

module.exports = {
  getAll,
  getById,
  createSale,
  updateSale,
  deleteSale,
};
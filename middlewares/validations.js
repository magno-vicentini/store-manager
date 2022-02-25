function valName(req, res, next) {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
   }

  next();
}

function valQuantityProducts(req, res, next) {
  const { quantity } = req.body;
  console.log(quantity);

  if (quantity === undefined) return res.status(400).json({ message: '"quantity" is required' });

  if (quantity <= 0) {
    return res.status(422)
    .json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
}

function valQuantitySales(req, res, next) {
  const result = req.body;

  result.some((q) => {
    if (!q.quantity) return res.status(400).json({ message: '"quantity" is required' });

    if (q.quantity <= 0) {
      return res.status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
    }
    return false;
  });
  next();
}

function valProductIdSales(req, res, next) {
  const result = req.body;

  result.some((q) => {
    if (!q.productId) return res.status(400).json({ message: '"productId" is required' });

    if (q.productId <= 0) {
      return res.status(422)
      .json({ message: '"productId" must be greater than or equal to 1' });
    }
    return false;
  });
  next();
}

function valProductId(req, res, next) {
  const { productId } = req.body;

  if (!productId) return res.status(400).json({ message: '"productId" is required' });

 next();
}

module.exports = {
  valName,
  valQuantityProducts,
  valProductId,
  valQuantitySales,
  valProductIdSales,
};
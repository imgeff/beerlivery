const { getBySaleId } = require('../services/salesProductsService');

const getById = async (req, res) => {
  const { saleId } = req.params;
  const orders = await getBySaleId(saleId);
  return res.status(200).json(orders);
};

module.exports = { getById };

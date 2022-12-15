const ordersService = require('../services/ordersService');

const getOrdersBySaleId = async (req, res) => {
  const { saleId } = req.params;
  const orders = await ordersService.getOrdersBySaleId(saleId);
  return res.status(200).json(orders);
};

module.exports = { getOrdersBySaleId };

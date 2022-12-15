const { order, sale, product, user } = require('../database/models');

// eslint-disable-next-line max-lines-per-function
const getOrdersBySaleId = async (saleId) => {
  const orderBySaleId = await order.findAll({
    include: [
      {
        model: product,
        as: 'product',
        attributes: {
          exclude: ['id'],
        },
      },
      { 
        model: sale,
        as: 'sale',
        attributes: {
          exclude: ['userId', 'sellerId'],
        },
        include: { model: user, as: 'seller', attributes: ['name'] },
      },
    ],
    where: { saleId },
    attributes: {
      exclude: ['saleId', 'productId'],
    },
  });
  return orderBySaleId;
};

module.exports = { getOrdersBySaleId };

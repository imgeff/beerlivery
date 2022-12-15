const { salesProduct, sale, product, user } = require('../database/models');

// eslint-disable-next-line max-lines-per-function
const getBySaleId = async (saleId) => {
  const saleProductById = await salesProduct.findAll({
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
  return saleProductById;
};

module.exports = { getBySaleId };

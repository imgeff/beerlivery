const salesProductsModel = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('salesProduct', { 
    saleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  }, { timestamps: false, underscored: true, tableName: 'salesProducts' });

  SalesProducts.associate = (models) => {
    SalesProducts.belongsTo(models.sale, {
      as: 'sale',
      foreignKey: 'saleId',
    });
    SalesProducts.belongsTo(models.product, {
      as: 'product',
      foreignKey: 'productId',
    });
  };
  return SalesProducts;
};

module.exports = salesProductsModel;

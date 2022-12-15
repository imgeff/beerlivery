const ordersModel = (sequelize, DataTypes) => {
  const Orders = sequelize.define('order', { 
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
  }, { timestamps: false, underscored: true });

  Orders.associate = (models) => {
    Orders.belongsTo(models.sale, {
      as: 'sale',
      foreignKey: 'saleId',
    });
    Orders.belongsTo(models.product, {
      as: 'product',
      foreignKey: 'productId',
    });
  };
  return Orders;
};

module.exports = ordersModel;

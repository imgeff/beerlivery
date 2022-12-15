const salesModel = (sequelize, DataTypes) => {
  const Sale = sequelize.define('sale', {
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    status: DataTypes.STRING,
  }, { 
    underscored: true, 
    createdAt: 'saleDate', 
    updatedAt: false 
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.user, {
      foreignKey: 'userId',
    });
    Sale.belongsTo(models.user, {
      foreignKey: 'sellerId',
      as: 'seller'
    });
    Sale.hasMany(models.order, {
      foreignKey: "saleId"
    })
  };

  return Sale;
};

module.exports = salesModel;

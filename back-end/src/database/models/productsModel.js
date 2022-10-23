const productsModel = (sequelize, DataTypes) => {
  const Products = sequelize.define('product', {
    brandingId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    urlImage: DataTypes.STRING,
  }, {
    timestamps: false,
    underscored: true,
  });

  Products.associate = (models) => {
    Products.belongsTo(models.branding, {
      foreignKey: 'brandingId'
    })
  }

  return Products;
};

module.exports = productsModel;

const brandingsModel = (sequelize, DataTypes) => {
  const Brandings = sequelize.define('branding', {
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  Brandings.associate = (models) => {
    Brandings.hasMany(models.product, {
      foreignKey: 'brandingId'
    })
  }

  return Brandings;
};

module.exports = brandingsModel;

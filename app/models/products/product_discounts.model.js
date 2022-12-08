module.exports = (sequelize, Sequelize, product, discount) => {
  const Product_discounts = sequelize.define("product_discounts", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    product: {      
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: product,
        key: 'id',
      }
    },
    discount: {      
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: discount,
        key: 'id',
      }
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id']
      },
    ]
  });

  return Product_discounts;
};

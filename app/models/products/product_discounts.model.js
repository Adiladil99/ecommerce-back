module.exports = (sequelize, Sequelize, product, discount) => {
  const Product_discounts = sequelize.define("product_discounts", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    product_id: {      
      type: Sequelize.INTEGER,
      references: {
        model: product,
        key: 'id',
      }
    },
    discount_id: {      
      type: Sequelize.INTEGER,
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

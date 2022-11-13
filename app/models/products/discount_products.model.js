
const discount = require("./discount.model.js")(sequelize, Sequelize);
const products = require("./product.model.js")(sequelize, Sequelize);
module.exports = (sequelize, Sequelize) => {
  const DiscountProducts = sequelize.define("discount_products", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    discountId: {
        type: Sequelize.INTEGER,
        references: {
            model: discount,
            key: 'id',
        },
    }, productsId: {
        type: Sequelize.INTEGER,
        references: {
            model: products,
            key: 'id',
        },
    },
  });

  return DiscountProducts;
};

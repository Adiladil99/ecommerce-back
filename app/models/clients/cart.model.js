module.exports = (sequelize, Sequelize, product, client) => {
  const Cart = sequelize.define("cl_cart", {
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
    client_id: {      
      type: Sequelize.INTEGER,
      references: {
        model: client,
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

  return Cart;
};

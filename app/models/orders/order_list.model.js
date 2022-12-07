module.exports = (sequelize, Sequelize) => {
  const Order_list = sequelize.define("or_order_list", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    count: {
      type: Sequelize.INTEGER
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id']
      },
    ]
  });

  return Order_list;
};

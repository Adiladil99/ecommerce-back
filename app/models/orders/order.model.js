module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("or_order", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    total: {
      type: Sequelize.FLOAT
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id']
      },
    ]
  });

  return Order;
};

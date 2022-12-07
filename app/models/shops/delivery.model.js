module.exports = (sequelize, Sequelize) => {
  const Delivery = sequelize.define("sh_delivery", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    delivery: {
      type: Sequelize.BOOLEAN
    },
    postponeTime: {
      type: Sequelize.DATE
    },
    typeOrderDay: {
      type: Sequelize.BOOLEAN
    },
    typeNextDay: {
      type: Sequelize.BOOLEAN
    },
    orderPrice: {
      type: Sequelize.INTEGER
    },
    cost: {
      type: Sequelize.INTEGER
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id']
      },
    ]
  });

  return Delivery;
};

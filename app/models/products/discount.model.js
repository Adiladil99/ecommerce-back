module.exports = (sequelize, Sequelize) => {
  const Discount = sequelize.define("discount", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    discount_percent: {
      type: Sequelize.INTEGER
    },
    active: {
      type: Sequelize.BOOLEAN
    },
  });

  return Discount;
};

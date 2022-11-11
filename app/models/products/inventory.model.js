module.exports = (sequelize, Sequelize) => {
  const Inventory = sequelize.define("inventory", {
    quantity: {
      type: Sequelize.INTEGER
    },
  });

  return Inventory;
};

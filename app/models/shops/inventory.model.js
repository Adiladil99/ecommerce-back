module.exports = (sequelize, Sequelize) => {
  const Inventory = sequelize.define("sh_inventory", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    price: {
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

  return Inventory;
};

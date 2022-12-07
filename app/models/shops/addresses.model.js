module.exports = (sequelize, Sequelize) => {
  const Addresses = sequelize.define("sh_addresses", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    address: {
      type: Sequelize.STRING
    },
    is_warehouse: {
      type: Sequelize.BOOLEAN
    },
    status: {
      type: Sequelize.BOOLEAN
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id']
      },
    ]
  });

  return Addresses;
};

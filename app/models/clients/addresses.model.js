module.exports = (sequelize, Sequelize) => {
  const Addresses = sequelize.define("cl_addresses", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    address: {
      type: Sequelize.STRING
    }
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

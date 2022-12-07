module.exports = (sequelize, Sequelize) => {
  const Payment_type = sequelize.define("or_payment_type", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id']
      },
    ]
  });

  return Payment_type;
};

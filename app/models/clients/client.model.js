module.exports = (sequelize, Sequelize) => {
  const Client = sequelize.define("cl_client", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    surname: {
      type: Sequelize.STRING
    },
    patronomyc: {
      type: Sequelize.STRING
    },
    iin: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    bonus: {
      type: Sequelize.FLOAT
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id', 'iin']
      },
    ]
  });

  return Client;
};

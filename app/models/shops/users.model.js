module.exports = (sequelize, Sequelize) => {
  const Shop_users = sequelize.define("sh_users", {
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
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id', 'iin']
      },
    ]
  });

  return Shop_users;
};

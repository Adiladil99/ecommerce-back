module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },   
    first_name: {
      type: Sequelize.STRING
    },  
    last_name: {
      type: Sequelize.STRING
    },  
    phone_number: {
      type: Sequelize.STRING
    },        
  });

  return User;
};

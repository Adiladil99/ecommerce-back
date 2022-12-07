module.exports = (sequelize, Sequelize, user, role) => {
  const User_roles = sequelize.define("user_roles", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {      
      type: Sequelize.INTEGER,
      references: {
        model: user,
        key: 'id',
      }
    },
    role_id: {      
      type: Sequelize.INTEGER,
      references: {
        model: role,
        key: 'id',
      }
    }       
  }, {
    indexes: [
      {
        fields: ['id']
      },
    ]
  });

  return User_roles;
};

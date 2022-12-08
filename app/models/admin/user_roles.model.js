module.exports = (sequelize, Sequelize, user, role) => {
  const User_roles = sequelize.define("user_roles", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user: {      
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: user,
        key: 'id',
      }
    },
    role: {      
      type: Sequelize.INTEGER,
      allowNull: false,
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

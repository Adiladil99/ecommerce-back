module.exports = (sequelize, Sequelize) => {
  const Users_role = sequelize.define("sh_users_role", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    is_created: {
      type: Sequelize.BOOLEAN
    },
    is_edited: {
      type: Sequelize.BOOLEAN
    },
    is_deleted: {
      type: Sequelize.BOOLEAN
    },
    is_read: {
      type: Sequelize.BOOLEAN
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id']
      },
    ]
  });

  return Users_role;
};

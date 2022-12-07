module.exports = (sequelize, Sequelize) => {
  const Cities = sequelize.define("cities", {
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
        fields: ['id', 'name']
      },
    ]
  });

  return Cities;
};

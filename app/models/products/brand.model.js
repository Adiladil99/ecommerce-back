module.exports = (sequelize, Sequelize) => {
  const Brand = sequelize.define("pr_brand", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    },
    description: {
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

  return Brand;
};

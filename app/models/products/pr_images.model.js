module.exports = (sequelize, Sequelize) => {
  const Pr_images = sequelize.define("pr_images", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    path: {
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

  return Pr_images;
};

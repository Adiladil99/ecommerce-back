module.exports = (sequelize, Sequelize) => {
  const Shop_reviews = sequelize.define("sh_reviews", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    comment: {
      type: Sequelize.STRING,
    },
    positive: {
      type: Sequelize.STRING
    },
    negative: {
      type: Sequelize.STRING
    },
    rating: {
      type: Sequelize.FLOAT
    },
    date: {
      type: Sequelize.DATE
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id']
      },
    ]
  });

  return Shop_reviews;
};

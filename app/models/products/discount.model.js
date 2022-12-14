module.exports = (sequelize, Sequelize) => {
  const Discount = sequelize.define("pr_discount", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    start_time: {
      type: Sequelize.DATE
    },
    end_time: {
      type: Sequelize.DATE
    },
    percent: {
      type: Sequelize.INTEGER
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id', 'name']
      },
    ]
  });

  return Discount;
};

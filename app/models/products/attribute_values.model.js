module.exports = (sequelize, Sequelize) => {
  const Attribute_values = sequelize.define("pr_attribute_values", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    value: {
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

  return Attribute_values;
};

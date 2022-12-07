module.exports = (sequelize, Sequelize) => {
  const Attribute_types = sequelize.define("pr_attribute_types", {
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

  return Attribute_types;
};

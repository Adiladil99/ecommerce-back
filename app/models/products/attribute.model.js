module.exports = (sequelize, Sequelize) => {
  const Attribute = sequelize.define("pr_attribute", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    mandatory: {
      type: Sequelize.BOOLEAN,
    },
    multivalue: {
      type: Sequelize.BOOLEAN
    },
    position: {
      type: Sequelize.INTEGER
    },
    searchable: {
      type: Sequelize.BOOLEAN
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id', 'name']
      },
    ]
  });

  return Attribute;
};

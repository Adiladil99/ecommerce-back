module.exports = (sequelize, Sequelize) => {
  const Subcategory = sequelize.define("subcategory", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
  });

  return Subcategory;
};

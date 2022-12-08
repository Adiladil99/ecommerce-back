module.exports = (sequelize, Sequelize, category, discount) => {
  const Category_discounts = sequelize.define("category_discounts", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    category: {      
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: category,
        key: 'id',
      }
    },
    discount: {      
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: discount,
        key: 'id',
      }
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id']
      },
    ]
  });

  return Category_discounts;
};

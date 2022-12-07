module.exports = (sequelize, Sequelize, category, discount) => {
  const Category_discounts = sequelize.define("category_discounts", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    category_id: {      
      type: Sequelize.INTEGER,
      references: {
        model: category,
        key: 'id',
      }
    },
    discount_id: {      
      type: Sequelize.INTEGER,
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

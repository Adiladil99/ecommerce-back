module.exports = (sequelize, Sequelize, brand, discount) => {
  const Brand_discounts = sequelize.define("brand_discounts", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    brand_id: {      
      type: Sequelize.INTEGER,
      references: {
        model: brand,
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

  return Brand_discounts;
};

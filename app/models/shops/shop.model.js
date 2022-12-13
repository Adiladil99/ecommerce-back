module.exports = (sequelize, Sequelize) => {
  const Shop = sequelize.define("sh_shop", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    iin_bin: {
      type: Sequelize.STRING
    },
    shop_phone: {
      type: Sequelize.STRING
    },
    shop_email: {
      type: Sequelize.STRING
    },
    shop_image: {
      type: Sequelize.STRING
    },
    shop_document: {
      type: Sequelize.STRING
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id', 'name']
      },
    ]
  });

  return Shop;
};

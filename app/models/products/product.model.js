module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("pr_product", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    articul: {
      type: Sequelize.INTEGER,
    },
    description: {
      type: Sequelize.STRING
    },
    main_image: {
      type: Sequelize.STRING
    },
    link_to_video: {
      type: Sequelize.STRING
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id', 'name', 'articul']
      },
    ]
  });

  return Product;
};

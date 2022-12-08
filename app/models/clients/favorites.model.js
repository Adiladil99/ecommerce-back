module.exports = (sequelize, Sequelize, product, client) => {
  const Favorites = sequelize.define("cl_favorites", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    product_id: {      
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: product,
        key: 'id',
      }
    },
    client_id: {      
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: client,
        key: 'id',
    },
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id']
      },
    ]
  });

  return Favorites;
};

const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: '0',

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("./products/product.model.js")(sequelize, Sequelize);
db.brand = require("./products/brand.model.js")(sequelize, Sequelize);
db.category = require("./products/category.model.js")(sequelize, Sequelize);
db.discount = require("./products/discount.model.js")(sequelize, Sequelize);
db.inventory = require("./products/inventory.model.js")(sequelize, Sequelize);
// db.discount_products = require("./products/discount_products.model.js")(sequelize, Sequelize);
const DiscountProducts = sequelize.define("discount_products", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  discountId: {
      type: Sequelize.INTEGER,
      references: {
          model: db.discount,
          key: 'id',
      },
  }, productsId: {
      type: Sequelize.INTEGER,
      references: {
          model: db.products,
          key: 'id',
      },
  },
});

db.user = require("./users/user.model.js")(sequelize, Sequelize);
db.role = require("./users/role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.category.hasMany(db.products); 
db.brand.hasMany(db.products);
db.products.hasOne(db.inventory, { onDelete: "cascade"});
db.discount.belongsToMany(db.products, {
  through: DiscountProducts,
});
db.products.belongsToMany(db.discount, {
  through: DiscountProducts,
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;

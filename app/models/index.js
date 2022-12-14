const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  // port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  // dialectOptions: {
  //   connectTimeout:100000
  // },
  // dialectOptions: {
  //   allowPublicKeyRetrieval: true,
  // },
  operatorsAliases: '0',
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
// const sequelize = new Sequelize('mysql://172.17.0.2:3306/ecommerce?allowPublicKeyRetrieval=true')

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.cities = require("./others/cities.model.js")(sequelize, Sequelize);

//product models
db.pr_attribute_types = require("./products/attribute_types.model.js")(sequelize, Sequelize);
db.pr_attribute_values = require("./products/attribute_values.model.js")(sequelize, Sequelize);
db.pr_attribute = require("./products/attribute.model.js")(sequelize, Sequelize);
db.pr_brand = require("./products/brand.model.js")(sequelize, Sequelize);
db.pr_category = require("./products/category.model.js")(sequelize, Sequelize);
db.pr_characteristic = require("./products/characteristic.model.js")(sequelize, Sequelize);
db.pr_discount = require("./products/discount.model.js")(sequelize, Sequelize);
db.pr_reviews = require("./products/pr_reviews.model.js")(sequelize, Sequelize);
db.pr_product = require("./products/product.model.js")(sequelize, Sequelize);
db.pr_images = require("./products/pr_images.model.js")(sequelize, Sequelize);
db.product_discounts = require("./products/product_discounts.model.js")(sequelize, Sequelize, db.pr_product, db.pr_discount);
db.brand_discounts = require("./products/brand_discounts.model.js")(sequelize, Sequelize, db.pr_brand, db.pr_discount);
db.category_discounts = require("./products/category_discounts.model.js")(sequelize, Sequelize, db.pr_category, db.pr_discount);

//products associations
db.pr_product.hasMany(db.pr_images);
db.pr_attribute.hasMany(db.pr_attribute_values);
db.pr_characteristic.hasMany(db.pr_attribute);
db.pr_category.hasOne(db.pr_characteristic);
db.pr_category.belongsTo(db.pr_category, {as: 'sub_categories', foreignKey: 'parentId'});
db.pr_product.hasMany(db.pr_reviews);
db.pr_brand.hasMany(db.pr_product);
db.pr_category.hasMany(db.pr_product);

//shop models
db.sh_addresses = require("./shops/addresses.model.js")(sequelize, Sequelize);
db.sh_delivery = require("./shops/delivery.model.js")(sequelize, Sequelize);
db.sh_inventory = require("./shops/inventory.model.js")(sequelize, Sequelize);
db.sh_product_status = require("./shops/product_status.model.js")(sequelize, Sequelize);
db.sh_schedule = require("./shops/schedule.model.js")(sequelize, Sequelize);
db.sh_reviews = require("./shops/sh_reviews.model.js")(sequelize, Sequelize);
db.sh_shop = require("./shops/shop.model.js")(sequelize, Sequelize);
db.sh_users_role = require("./shops/users_role.model.js")(sequelize, Sequelize);
db.sh_users = require("./shops/users.model.js")(sequelize, Sequelize);

//shop associations
db.sh_shop.hasMany(db.sh_addresses);
db.sh_shop.hasMany(db.sh_reviews);
db.sh_addresses.hasOne(db.sh_schedule);
db.cities.hasMany(db.sh_addresses);
db.sh_product_status.hasMany(db.sh_inventory);
db.sh_shop.hasOne(db.sh_inventory);
db.sh_shop.hasMany(db.sh_users);
db.sh_users_role.hasOne(db.sh_users);
db.sh_shop.hasOne(db.sh_delivery);
db.cities.hasMany(db.sh_delivery);

//client models
db.cl_addresses = require("./clients/addresses.model.js")(sequelize, Sequelize);
db.cl_client = require("./clients/client.model.js")(sequelize, Sequelize);
db.cl_cart = require("./clients/cart.model.js")(sequelize, Sequelize, db.pr_product, db.cl_client);
db.cl_favorites = require("./clients/favorites.model.js")(sequelize, Sequelize, db.pr_product, db.cl_client);

//client associations
db.cl_client.hasMany(db.pr_reviews);
db.cl_client.hasMany(db.sh_reviews);
db.cl_client.hasMany(db.cl_addresses);
db.cities.hasMany(db.cl_addresses);

//order models
db.or_order_list = require("./orders/order_list.model.js")(sequelize, Sequelize);
db.or_order = require("./orders/order.model.js")(sequelize, Sequelize);
db.or_payment_type = require("./orders/payment_type.model.js")(sequelize, Sequelize);
db.or_status = require("./orders/status.model.js")(sequelize, Sequelize);

//order associations
db.or_payment_type.hasMany(db.or_order);
db.or_status.hasMany(db.or_order);
db.sh_shop.hasMany(db.or_order);
db.cl_client.hasMany(db.or_order);
db.or_order.hasMany(db.or_order_list);
db.pr_product.hasMany(db.or_order_list);

//admin models
db.ad_user = require("./admin/user.model.js")(sequelize, Sequelize);
db.ad_role = require("./admin/role.model.js")(sequelize, Sequelize);
db.ad_user_roles = require("./admin/user_roles.model.js")(sequelize, Sequelize, db.ad_user, db.ad_role);

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;

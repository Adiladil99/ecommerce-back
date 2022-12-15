module.exports = (app) => {
 require("./product.routes")(app);
 require("./categories.routes")(app);
 require('./auth.routes')(app);
 require('./user.routes')(app);
 
 require('./merchant/auth.routes')(app);
 require('./merchant/addresses.routes')(app);
 require('./merchant/delivery.routes')(app);
 require('./merchant/inventory.routes')(app);

 require('./client/auth.routes')(app);
 require('./client/addresses.routes')(app);
 require('./client/favorites.routes')(app);
 require('./client/cart.routes')(app);
}
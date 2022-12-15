const upload = require("../../middleware/upload");
const { authJwt } = require("../../middleware");
module.exports = app => {
  const cart = require("../../controllers/client/cart.controller.js");

  var router = require("express").Router();

  // Create a new Product
  router.post("/", upload.single(''), [authJwt.verifyToken], cart.create);

  // Retrieve all Products
  router.get("/", [authJwt.verifyToken], cart.findAll);

  // Retrieve a single Product with id
  router.get("/:id", cart.findOne);

  // Update a Product with id
  router.put("/:id", cart.update);

  // Delete a Product with id
  router.delete("/:id", cart.delete);

  // Delete all Products
  router.delete("/", cart.deleteAll);

  app.use('/api/client/cart', router);
};

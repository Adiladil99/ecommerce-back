const upload = require("../../middleware/upload");
const { authJwt } = require("../../middleware");
module.exports = app => {
  const inventory = require("../../controllers/merchant/inventory.controller.js");

  var router = require("express").Router();

  // Create a new Product
  router.post("/", upload.single(''), [authJwt.verifyToken], inventory.create);

  // Retrieve all Products
  router.get("/", [authJwt.verifyToken], inventory.findAll);

  // Retrieve a single Product with id
  router.get("/:id", inventory.findOne);

  // Update a Product with id
  router.put("/:id", inventory.update);

  // Delete a Product with id
  router.delete("/:id", inventory.delete);

  // Delete all Products
  router.delete("/", inventory.deleteAll);

  app.use('/api/merchant/inventory', router);
};

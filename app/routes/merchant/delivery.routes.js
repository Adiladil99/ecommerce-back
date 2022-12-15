const upload = require("../../middleware/upload");
const { authJwt } = require("../../middleware");
module.exports = app => {
  const delivery = require("../../controllers/merchant/delivery.controller.js");

  var router = require("express").Router();

  // Create a new Product
  router.post("/", upload.single(''), [authJwt.verifyToken], delivery.create);

  // Retrieve all Products
  router.get("/", [authJwt.verifyToken], delivery.findAll);

  // Retrieve a single Product with id
  router.get("/:id", delivery.findOne);

  // Update a Product with id
  router.put("/:id", delivery.update);

  // Delete a Product with id
  router.delete("/:id", delivery.delete);

  // Delete all Products
  router.delete("/", delivery.deleteAll);

  app.use('/api/merchant/delivery', router);
};

const upload = require("../../middleware/upload");
const { authJwt } = require("../../middleware");
module.exports = app => {
  const addresses = require("../../controllers/client/addresses.controller.js");

  var router = require("express").Router();

  // Create a new Product
  router.post("/", upload.single("image"), [authJwt.verifyToken], addresses.create);

  // Retrieve all Products
  router.get("/", [authJwt.verifyToken], addresses.findAll);

  // Retrieve all published Products
  router.get("/published", addresses.findAllPublished);

  // Retrieve a single Product with id
  router.get("/:id", addresses.findOne);

  // Update a Product with id
  router.put("/:id", addresses.update);

  // Delete a Product with id
  router.delete("/:id", addresses.delete);

  // Delete all Products
  router.delete("/", addresses.deleteAll);

  app.use('/api/client/addresses', router);
};

const upload = require("../../middleware/upload");
const { authJwt } = require("../../middleware");
module.exports = app => {
  const favorites = require("../../controllers/client/favorites.controller.js");

  var router = require("express").Router();

  // Create a new Product
  router.post("/", upload.single(''), [authJwt.verifyToken], favorites.create);

  // Retrieve all Products
  router.get("/", [authJwt.verifyToken], favorites.findAll);

  // Retrieve a single Product with id
  router.get("/:id", favorites.findOne);

  // Update a Product with id
  router.put("/:id", favorites.update);

  // Delete a Product with id
  router.delete("/:id", favorites.delete);

  // Delete all Products
  router.delete("/", favorites.deleteAll);

  app.use('/api/client/favorites', router);
};

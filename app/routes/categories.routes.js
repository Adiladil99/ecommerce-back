const upload = require("../middleware/upload");
const { authJwt } = require("../middleware");
module.exports = app => {
  const categories = require("../controllers/categories.controller.js");

  var router = require("express").Router();

  // Create a new Product
  router.post("/", upload.single("image"), categories.create);

  // Retrieve all Products
  router.get("/", [authJwt.verifyToken], categories.findAll);

  // Retrieve all published Products
  router.get("/published", categories.findAllPublished);

  // Retrieve a single Product with id
  router.get("/:id", categories.findOne);

  // Update a Product with id
  router.put("/:id", categories.update);

  // Delete a Product with id
  router.delete("/:id", categories.delete);

  // Delete all Products
  router.delete("/", categories.deleteAll);

  app.use('/api/categories', router);
};

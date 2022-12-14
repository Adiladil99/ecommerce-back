const { verifySignUp } = require("../../middleware");
const upload = require("../../middleware/upload");
const { authJwt } = require("../../middleware");

module.exports = function(app) {
  
  const authShop = require("../../controllers/merchant/auth.controller.js");

  var router = require("express").Router();

  // Create a new Product
  router.post("/login", upload.single("shop_image"), authShop.signin);
  router.post("/register", upload.single("shop_image"), authShop.signup);
  router.post("/add-employee", upload.single("image"), [authJwt.verifyToken, authJwt.isAdmin], authShop.add_employee);
  router.get("/get-employee", [authJwt.verifyToken, authJwt.isAdmin], authShop.get_employee);

  app.use('/api/merchant/auth', router);

  // app.use(function(req, res, next) {
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "x-access-token, Origin, Content-Type, Accept"
  //   );
  //   next();
  // });

  // app.post(
  //   "/api/merchant/auth/register", upload.single("shop_image"), 
  //   controller.signup
  // );

  
  // // [
  // //   verifySignUp.checkDuplicateUsernameOrEmail,
  // //   verifySignUp.checkRolesExisted
  // // ],

  // app.post("/api/merchant/auth/login", controller.signin);
};

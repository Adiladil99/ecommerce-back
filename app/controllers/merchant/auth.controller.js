const db = require("../../models");
const config = require("../../config/auth.config");
const Shop = db.sh_shop;
const Shop_User = db.sh_users;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  Shop.create({
    name: req.body.shop_name,
    iin_bin: req.body.iin_bin,
    shop_phone: req.body.shop_phone,
    shop_email: req.body.shop_email,
    shop_image: "/upload/" + req.file.shop_image,
    shop_document: "/upload/" + req.file.shop_document,
    // password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(data => {
      Shop_User.create({	
        name: req.body.name,
        surname: req.body.surname,
        patronomyc: req.body.patronomyc,
        iin: req.body.iin,
        phone: req.body.phone,
        image: "/upload/" + req.file.image,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        shShopId: data.dataValues.id,
        shUsersRoleId: 2,
      })
        .then(elem => {
          res.status(201).send('Успешно создано, ожидает модерацию!');
        })
        .catch(err => {
          Product.Shop({
            where: { id: data.dataValues.id }
          })
          res.status(500).send({ message: err.message });
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  console.log('test', req.body.emaill);
  Shop_User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      
      res.status(200).send({
        user: user,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

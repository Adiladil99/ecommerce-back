const db = require("../../models");
const config = require("../../config/auth.config");
const Client = db.cl_client;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  Client.create({	
    name: req.body.name,
    surname: req.body.surname,
    patronomyc: req.body.patronomyc,
    iin: req.body.iin,
    phone: req.body.phone,
    image: "/upload/" + req.file.filename,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
  .then(elem => {
    res.status(201).send(`Регистрация пользователя ${elem.name + ' ' + elem.surname} прошло успешно!`);
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.signin = (req, res) => {
  console.log('test', req.body.emaill);
  Client.findOne({
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
const db = require("../../models");
const fs = require("fs");
const Delivery = db.sh_delivery;
const User = db.sh_users;
const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.name) {
  //   res.status(400).send({
  //     message: req.body
  //   });
  //   return;
  // }
  var delivery = {}
  
  User.findByPk(req.userId)
    .then(data => {
      delivery = {
        cityId: parseInt(req.body.cityId),
        typeOrderDay: eval(req.body.typeOrderDay),
        typeNextDay: eval(req.body.typeNextDay),
        delivery: eval(req.body.delivery),
        postponeTime: req.body.postponeTime,
        orderPrice: req.body.orderPrice,
        cost: req.body.cost,
        shShopId: data.dataValues.shShopId
      };
      Delivery.create(delivery)
      .then(data => {
        res.send(data);
      }) 
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Product."
        }); 
      });
    })
  

  
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  User.findByPk(req.userId)
    .then(data => {
      Delivery.findAll({ 
        where: { shShopId: data.dataValues.shShopId }, 
      })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Нет данных."
          });
        });
    })

  
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  var infoAddresses = null

  Delivery.findByPk(id).then(data => infoAddresses = data)

  Delivery.findAll({ 
    where: { parentId: id }, 
  })
    .then(data => {
      if (data) {
        res.send([
          {
            infoAddresses,
            sub_categories: data
          }
        ]);
      } else {
        res.status(404).send({
          message: `Cannot find Delivery with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Delivery with id=" + id
      });
    });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Product.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product with id=" + id
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
  Product.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Products were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all products."
      });
    });
};

// find all published Product
exports.findAllPublished = (req, res) => {
  Product.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });
};

const db = require("../../models");
const fs = require("fs");
const Cart = db.cl_cart;
const User = db.cl_client;
const Product = db.pr_product;
const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.create = (req, res) => {
  var cart = {}  
  User.findByPk(req.userId)
    .then(data => {
          cart = {
            product_id: parseInt(req.body.product_id),
            client_id: req.userId,
          };
          Cart.create(cart)
          .then(item => {
            res.send(item);
          }) 
          .catch(err => {
            res.status(500).send({
              message:
                "Такой продукт не найден!"
            }); 
          });
      })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      }); 
    });  
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  User.findByPk(req.userId)
    .then(data => {
      Cart.findAll({ 
        where: { client_id: req.userId }, 
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

  Cart.findByPk(id).then(data => infoAddresses = data)

  Cart.findAll({ 
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
          message: `Cannot find Cart with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Cart with id=" + id
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

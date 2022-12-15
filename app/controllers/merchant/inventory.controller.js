const db = require("../../models");
const fs = require("fs");
const Inventory = db.sh_inventory;
const Addresses = db.sh_addresses;
const User = db.sh_users;
const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.create = (req, res) => {
  var inventory = {}
  
  User.findByPk(req.userId)
    .then(data => {
      Addresses.findOne({ 
        where: { 
          [Op.and]: [ 
            { shShopId: data.dataValues.shShopId },
            { id: req.body.address_id },
          ]}, 
      }).then(item => {
        Inventory.findAll({ 
          where: { 
            [Op.and]: [ 
              { shAddressId: req.body.address_id },
              { prProductId: req.body.product_id },
            ]}, 
        }).then(data=> {
          console.log(data);
          if(!data.length) {
            inventory = {			
              prProductId: req.body.product_id,
              shAddressId: req.body.address_id,
              shProductStatusId: 1,
              price: req.body.price,
              quantity: req.body.quantity,
            };
            Inventory.create(inventory)
              .then(data => {
                res.send(data);
              }) 
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the Product."
              }); 
            });
          } else {
            res.status(500).send({
              message:
                "Такой товар уже добавлен!"
            }); 
          }
        })
        // .catch(err=> {
          
        // })
      })      
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
      Inventory.findAll({ 
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

  Inventory.findByPk(id).then(data => infoAddresses = data)

  Inventory.findAll({ 
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
          message: `Cannot find Inventory with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Inventory with id=" + id
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

const db = require("../../models");
const fs = require("fs");
const Addresses = db.sh_addresses;
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
  console.log(req.userId);

  // Create a Product
  // const addresses = {
  //   name: req.body.name,
  //   image: "/upload/" + req.file.filename,
  //   parentId: req.body.parentId
  // };

  // // Save Product in the database
  // Addresses.create(addresses)
  //   .then(data => {
      // res.send(data);
  //     // fs.writeFileSync(
  //     //   global.__dirname + "../../../upload/" + data.name,
  //     //   image.main_image
  //     // );
  //   }) 
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while creating the Product."
  //     }); 
  //   });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Addresses.findAll({ 
    // where: { parentId: null }, 
    include: [{
      model: Addresses, 
      as: 'sub_categories',
      where: { parentId: db.Sequelize.col('pr_Addresses.id') },
      attributes: ['id', 'name', 'image']
    }
    ],
    attributes: ['id', 'name', 'image']
  })
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

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  var infoAddresses = null

  Addresses.findByPk(id).then(data => infoAddresses = data)

  Addresses.findAll({ 
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
          message: `Cannot find Addresses with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Addresses with id=" + id
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

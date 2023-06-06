const db = require("../models1");
const Type = db.types;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const typeObjToCreate = {
    title: req.body.title,
  };

  Type.create(typeObjToCreate)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Type."
      });
    });
};

exports.findAll = async (req, res) => {
  const page = req.query.page ? req.query.page : 1;
  const pageSize = req.query.pageSize ? req.query.pageSize : 10;
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  const offset = (page - 1) * pageSize;

  const total = await Type.count();
  const meta = { page, total: total };

  Type.findAll({
    where: condition,
    offset,
    limit: pageSize
  })
    .then(data => {
      res.send({data, meta});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving types."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.query.id;

  Type.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Type with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.query.id;

  Type.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Type was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Type with id=${id}. Maybe Type was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Type with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.query.id;

  Type.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Type was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Type with id=${id}. Maybe Type was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Type with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Type.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Types were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all types."
      });
    });
};

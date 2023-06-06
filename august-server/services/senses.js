const db = require("../models");
const Sense = db.Sense;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const sense = {
    title: req.body.title,
    content: req.body.content,
    cover: req.body.cover,
    type: req.body.type,
  };

  Sense.create(sense)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Sense."
      });
    });
};

exports.findAll = async (req, res) => {
  const page = req.query.page ? req.query.page : 1;
  const pageSize = req.query.pageSize ? req.query.pageSize : 10;
  const title = req.query.title;
  var condition = title ? {title: {[Op.like]: `%${title}%`}} : null;
  const offset = (page - 1) * pageSize;

  const total = await Sense.count();

  const meta = {page, total: total};

  Sense.findAll({
    where: condition,
    offset,
    limit: pageSize,
    order: [
      ['createdAt', 'DESC']
    ]
  })
    .then(data => {
      res.send({data, meta});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving senses."
      });
    });
};

exports.findByType = async (req, res) => {
  const typeId = req.query.typeId;

  const options = {
    where: {
      type: {
        [Op.eq]: typeId
      }
    },
    order: [
      ['createdAt', 'DESC']
    ]
  };

  const total = await Sense.count(options);
  Sense.findAll(options).then(data => {
    res.send({data, meta: { page: 1, total }});
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving senses."
    });
  });
}

exports.findByLiked = async (req, res) => {
  const options = {
    where: {
      liked: {
        [Op.eq]: 1
      }
    },
    order: [
      ['createdAt', 'DESC']
    ]
  };
  const total = await Sense.count(options);

  Sense.findAll(options).then(data => {
    res.send({data, meta: { page: 1, total }});
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving senses."
    });
  });
}

exports.findOne = (req, res) => {
  const id = req.query.id;

  Sense.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Sense with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.query.id;

  Sense.update(req.body, {
    where: {id}
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "Sense was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Sense with id=${id}. Maybe Sense was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Sense with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.query.id;

  Sense.destroy({
    where: {id: id}
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Sense was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Sense with id=${id}. Maybe Sense was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Sense with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Sense.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({message: `${nums} Senses were deleted successfully!`});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all senses."
      });
    });
};

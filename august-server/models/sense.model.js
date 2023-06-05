module.exports = (sequelize, Sequelize) => {
  const Sense = sequelize.define("Sense", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    title: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.STRING
    },
    cover: {
      type: Sequelize.STRING
    },
    liked: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    read: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    type: {
      type: Sequelize.STRING,
    }
  }, {
    tableName: 'common_sense',
    indexes: [{ unique: true, fields: ['title', 'content'] }]
  });

  return Sense;
};
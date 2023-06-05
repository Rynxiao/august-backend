module.exports = (sequelize, Sequelize) => {
    const Type = sequelize.define("Type", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      title: {
        type: Sequelize.STRING
      }
    }, {
      tableName: 'sense_type',
      indexes: [{ unique: true, fields: ['title'] }]
    });
  
    return Type;
  };
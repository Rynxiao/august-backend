const uuid = require('uuid');
const db = require('../services/db');
const config = require('../config');

function getMultiple(page = 1) {
  const offset = (page - 1) * config.listPerPage;
  const data = db.query(`SELECT * FROM sense_type LIMIT ?,?`, [offset, config.listPerPage]);
  const total = db.count(`SELECT count(*) total FROM sense_type`);
  const meta = {page, total: total};

  return {
    data,
    meta
  }
}

function create(typeObj) {
  const now = Date.now();
  const typeObjToCreate = {
    id: uuid.v4(), 
    title: typeObj.title, 
    createTime: now, 
  };
  const result = db.run(
    'INSERT INTO sense_type VALUES (@id, @title, @createTime)', 
    typeObjToCreate
  );
  
  let message = 'Error in creating type';
  if (result.changes) {
    message = 'Type created successfully';
  }

  return {message};
}

function update(typeObjToUpdate) {
  const result = db.run(
    "UPDATE sense_type SET title = ? WHERE id = ?", 
    [typeObjToUpdate.title, typeObjToUpdate.id]
  );
  
  let message = 'Error in updating type';
  if (result.changes) {
    message = 'Type updated successfully';
  }

  return {message};
}

function deleteType(id) {
  const result = db.run(
    "DELETE FROM sense_type WHERE id = ?", 
    id
  );
  
  let message = 'Error in deleting type';
  if (result.changes) {
    message = 'Type delete successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  deleteType
}

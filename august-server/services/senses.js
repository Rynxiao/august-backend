const uuid = require('uuid');
const db = require('../services/db');
const config = require('../config');

function getMultiple(page = 1) {
  const offset = (page - 1) * config.listPerPage;
  const data = db.query(`SELECT * FROM common_sense WHERE deleted = 0 LIMIT ?,?`, [offset, config.listPerPage]);
  const total = db.count(`SELECT count(*) total FROM common_sense WHERE deleted = 0`);
  const meta = {page, total};

  return {
    data,
    meta
  }
}

function create(senseObj) {
  const now = Date.now();
  const senseObjToCreate = {
    id: uuid.v4(), 
    title: senseObj.title, 
    content: senseObj.content,
    cover: senseObj.cover,
    liked: 0, 
    read: 0, 
    type: senseObj.type,
    createTime: now, 
    modifyTime: now, 
    deleted: 0
  };
  const result = db.run(
    'INSERT INTO common_sense VALUES (@id, @title, @content, @cover, @liked, @read, @type, @createTime, @modifyTime, @deleted)', 
    senseObjToCreate
  );
  
  let message = 'Error in creating sense';
  if (result.changes) {
    message = 'Sense created successfully';
  }

  return {message};
}

function update(senseObjToUpdate) {
  const result = db.run(
    "UPDATE common_sense SET title = ?, content = ?, cover = ?, type = ?, modifyTime = ? WHERE id = ?", 
    [
      senseObjToUpdate.title,
      senseObjToUpdate.content, 
      senseObjToUpdate.cover, 
      senseObjToUpdate.type, 
      Date.now(),
      senseObjToUpdate.id
    ]
  );
  
  let message = 'Error in updating type';
  if (result.changes) {
    message = 'Type updated successfully';
  }

  return {message};
}

function deleteSense(id) {
  const result = db.run(
    "UPDATE common_sense SET deleted = 1 WHERE id = ?", 
    [id]
  );
  
  let message = 'Error in deleting sense';
  if (result.changes) {
    message = 'Type sense successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  deleteSense
}

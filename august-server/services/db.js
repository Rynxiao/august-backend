const sqlite = require('better-sqlite3');
const path = require('path');

const db = new sqlite(path.resolve(__dirname, '../august.db'), {fileMustExist: true});

function query(sql, params) {
  return db.prepare(sql).all(params);
}

function run(sql, params) {
  return db.prepare(sql).run(params);
}

function count(sql) {
  const stmt = db.prepare(sql);
  const row = stmt.get();
  return row.total;
}

module.exports = {
  query,
  run,
  count
}

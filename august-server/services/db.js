const sqlite = require('better-sqlite3');
const path = require('path');

const dbPath = '/Users/yaohan.hu/Library/Developer/CoreSimulator/Devices/85F0DE9E-BE76-4EF4-A0A1-A95E82CC20F8/data/Containers/Data/Application/D2A254EC-8AFB-41C7-8813-FB840C677EE8/Documents/august.db';
const db = new sqlite(path.resolve(dbPath), {fileMustExist: true});

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

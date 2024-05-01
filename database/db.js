const fs = require('node:fs/promises');

const sqlite3 = require('sqlite3');

const { getAbsoluteFilePath } = require('../utils/utils');

let databaseConnection = null;

const checkIfDatabaseExists = async () => {
  try {
    await fs.access('./skarb.sqlite3');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const runSQL = (db, sql) =>
  new Promise((resolve, reject) => {
    db.run(sql, (err, ...rest) => {
      if (err) {
        reject(err);
      }

      resolve(...rest);
    });
  });

const execSQL = (db, sql) =>
  new Promise((resolve, reject) => {
    db.exec(sql, (err, ...rest) => {
      if (err) {
        reject(err);
      }

      resolve(...rest);
    });
  });

const allSQL = (db, sql) =>
  new Promise((resolve, reject) => {
    db.all(sql, (err, ...rest) => {
      if (err) {
        reject(err);
      }

      resolve(...rest);
    });
  });

const initDatabaseConnection = async (filePath = './skarb.sqlite3') => {
  try {
    databaseConnection = new Promise((resolve, reject) => {
      const db = new sqlite3.Database(filePath, (err) => {
        if (err) {
          reject(err);
        }

        resolve(db);
      });
    });

    return databaseConnection;
  } catch (error) {
    return null;
  }
};

const getDatabaseConnectionData = async () => {
  if (!databaseConnection) {
    return null;
  }

  const result = await databaseConnection;
  return getAbsoluteFilePath(result.filename);
};

module.exports = {
  checkIfDatabaseExists,
  initDatabaseConnection,
  getDatabaseConnectionData,
  runSQL,
  execSQL,
  allSQL,
};

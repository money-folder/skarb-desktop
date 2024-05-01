const sqlite3 = require('sqlite3');

const { getAbsoluteFilePath } = require('../utils/utils');

let databaseConnection = null;

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

const isConnectionAlreadyExists = async (filename) => {
  if (!databaseConnection) {
    return false;
  }

  const result = await databaseConnection;
  return result.filename === filename;
};

const setDatabaseConnection = async (filename) => {
  if (!databaseConnection && !filename) {
    throw new Error('You must provide the database filename!');
  }

  if (filename && !(await isConnectionAlreadyExists(filename))) {
    databaseConnection = new Promise((resolve, reject) => {
      const db = new sqlite3.Database(filename, (err) => {
        if (err) {
          reject(err);
        }

        resolve(db);
      });
    });
  }

  if (filename === null) {
    databaseConnection = null;
  }
};

const getDatabaseConnection = async () => {
  const result = await databaseConnection;
  if (!result) {
    throw new Error('Connection is not initialized yet!');
  }

  return result;
};

const getDatabaseConnectionData = async () => {
  if (!databaseConnection) {
    return null;
  }

  const result = await databaseConnection;
  return getAbsoluteFilePath(result.filename);
};

module.exports = {
  setDatabaseConnection,
  getDatabaseConnection,
  getDatabaseConnectionData,
  runSQL,
  execSQL,
  allSQL,
};

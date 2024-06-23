const path = require('node:path');
const fs = require('node:fs/promises');

const { closeDatabaseConnection } = require('../../database/db');
const { createConnectionDb } = require('../../services/connections-service');

const delay = (ms) =>
  new Promise((res) => {
    setTimeout(res, ms);
  });

const checkIfAllItemsExist = ({ arrayToCheck, referenceArray, fields }) =>
  arrayToCheck.every((item) =>
    referenceArray.some((referenceItem) =>
      fields.every((field) => item[field] === referenceItem[field]),
    ),
  );

const wrapDatabaseLevelTest = (test) => async () => {
  await delay(5000);

  await createConnectionDb(__dirname);
  console.log('CONNECTION CREATED');

  await test();

  await closeDatabaseConnection();

  await fs.unlink(path.join(__dirname, 'skarb.sqlite3'));
};

module.exports = { wrapDatabaseLevelTest, checkIfAllItemsExist };

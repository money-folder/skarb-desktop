const path = require('node:path');
const fs = require('node:fs');

const {
  setDatabaseConnection,
  getDatabaseConnection,
} = require('../../database/db');
const { createConnectionDb } = require('../../services/connections-service');

const checkIfAllItemsExist = ({ arrayToCheck, referenceArray, fields }) =>
  arrayToCheck.every((item) =>
    referenceArray.some((referenceItem) =>
      fields.every((field) => item[field] === referenceItem[field]),
    ),
  );

const wrapDatabaseLevelTest = (test) => async () => {
  await createConnectionDb(__dirname);

  await test();

  const db = await getDatabaseConnection();
  await db.close();

  await setDatabaseConnection(null);
};

module.exports = { wrapDatabaseLevelTest, checkIfAllItemsExist };

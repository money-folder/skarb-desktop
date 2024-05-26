const path = require('node:path');
const fs = require('node:fs/promises');

const Store = require('electron-store');

const { BrowserWindow, dialog } = require('electron');

const { createDatabase } = require('../database/db-service');
const { setDatabaseConnection } = require('../database/db');
const { filterExistingFiles } = require('../desktop/src/service');

const store = new Store();

const getDbSources = async () => {
  const dbSources = store.get('dbSources', []);
  const existingFiles = await filterExistingFiles(dbSources);
  const uniqueFiles = [...new Set(existingFiles)];
  return uniqueFiles;
};

const addDbSource = async (dbSource) => {
  const dbSources = store.get('dbSources', []);
  const connectionsToSet = [...dbSources, dbSource];
  const existingFiles = await filterExistingFiles(connectionsToSet);
  const uniqueFiles = [...new Set(existingFiles)];
  store.set('dbSources', uniqueFiles);
};

const getConnectionFolderDialog = async () => {
  try {
    const result = await dialog.showOpenDialog(
      BrowserWindow.getAllWindows()[0],
      {
        properties: ['openDirectory'],
      },
    );

    if (result.canceled) {
      return null;
    }

    return result.filePaths[0];
  } catch (err) {
    console.error(err);
    return null;
  }
};

const createConnectionDb = async (folderPath) => {
  const dbPath = path.join(folderPath, 'skarb.sqlite3');

  const alreadyExists = await fs
    .access(dbPath, fs.constants.F_OK)
    .catch(() => false);
  console.log('1');
  if (alreadyExists) {
    return null;
  }

  await fs.open(dbPath, 'w');
  await setDatabaseConnection(dbPath);
  await createDatabase();

  return dbPath;
};

module.exports = {
  getDbSources,
  addDbSource,
  getConnectionFolderDialog,
  createConnectionDb,
};

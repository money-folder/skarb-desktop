const Store = require('electron-store');

const { filterExistingFiles } = require('../service');
const {
  getDatabaseConnectionData,
  setDatabaseConnection,
} = require('../../../database/db');
const {
  getConnectionFolderDialog,
  createConnectionDb,
  addDbSource,
  getDbSources,
} = require('../../../services/connections-service');

const store = new Store();

async function handleAddDbSource(event, dbSource) {
  await addDbSource(dbSource);
  return await getDbSources();
}

async function handleGetDbSources() {
  return await getDbSources();
}

async function handleDeleteDbSource(event, dbSource) {
  const dbSources = store.get('dbSources', []);
  const connectionsToSet = dbSources.filter((db) => db !== dbSource);
  const existingFiles = await filterExistingFiles(connectionsToSet);
  const uniqueFiles = [...new Set(existingFiles)];
  store.set('dbSources', uniqueFiles);
  return uniqueFiles;
}

async function handleConnectToDb(event, dbSource) {
  await setDatabaseConnection(dbSource);
}

async function handleGetCurrentConnection() {
  return getDatabaseConnectionData();
}

async function handleCreateConnection() {
  const folder = await getConnectionFolderDialog();
  const dbFile = await createConnectionDb(folder);
  await addDbSource(dbFile);
  return dbFile;
}

module.exports = {
  handleAddDbSource,
  handleGetDbSources,
  handleDeleteDbSource,
  handleConnectToDb,
  handleGetCurrentConnection,
  handleCreateConnection,
};

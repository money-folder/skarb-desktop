const { ipcMain } = require('electron');

const {
  ADD_DB_SOURCE,
  GET_DB_SOURCES,
  DELETE_DB_SOURCE,
  CONNECT_TO_DB,
  GET_CURRENT_CONNECTION,
  CREATE_CONNECTION,
} = require('./channels');
const {
  handleAddDbSource,
  handleGetDbSources,
  handleDeleteDbSource,
  handleConnectToDb,
  handleGetCurrentConnection,
  handleCreateConnection,
} = require('./handlers');

const setupConnectionHandlers = () => {
  ipcMain.handle(ADD_DB_SOURCE, handleAddDbSource);
  ipcMain.handle(GET_DB_SOURCES, handleGetDbSources);
  ipcMain.handle(DELETE_DB_SOURCE, handleDeleteDbSource);
  ipcMain.handle(CONNECT_TO_DB, handleConnectToDb);
  ipcMain.handle(GET_CURRENT_CONNECTION, handleGetCurrentConnection);
  ipcMain.handle(CREATE_CONNECTION, handleCreateConnection);
};

module.exports = {
  setupConnectionHandlers,
};

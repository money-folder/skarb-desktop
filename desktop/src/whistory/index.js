const { ipcMain } = require('electron');

const {
  LIST_WHISTORY,
  ADD_WHISTORY,
  SOFT_DELETE_WHISTORY,
} = require('./channels');
const { getWhistory, addWhistory, softDeleteWhistory } = require('./handlers');

const setupWhistoryHandlers = () => {
  ipcMain.handle(LIST_WHISTORY, getWhistory);
  ipcMain.handle(ADD_WHISTORY, addWhistory);
  ipcMain.handle(SOFT_DELETE_WHISTORY, softDeleteWhistory);
};

module.exports = {
  setupWhistoryHandlers,
};

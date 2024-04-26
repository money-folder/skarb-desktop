const { ipcMain } = require('electron');

const {
  LIST_WHISTORY,
  ADD_WHISTORY,
  SOFT_DELETE_WHISTORY,
  RESTORE_WHISTORY,
  HARD_DELETE_WHISTORY,
} = require('./channels');
const {
  getWhistory,
  addWhistory,
  softDeleteWhistory,
  restoreWhistory,
  hardDeleteWhistory,
} = require('./handlers');

const setupWhistoryHandlers = () => {
  ipcMain.handle(LIST_WHISTORY, getWhistory);
  ipcMain.handle(ADD_WHISTORY, addWhistory);
  ipcMain.handle(SOFT_DELETE_WHISTORY, softDeleteWhistory);
  ipcMain.handle(RESTORE_WHISTORY, restoreWhistory);
  ipcMain.handle(HARD_DELETE_WHISTORY, hardDeleteWhistory);
};

module.exports = {
  setupWhistoryHandlers,
};

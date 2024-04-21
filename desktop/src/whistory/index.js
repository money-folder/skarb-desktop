const { ipcMain } = require('electron');

const { LIST_WHISTORY, ADD_WHISTORY } = require('./channels');
const { getWhistory, addWhistory } = require('./handlers');

const setupWhistoryHandlers = () => {
  ipcMain.handle(LIST_WHISTORY, getWhistory);
  ipcMain.handle(ADD_WHISTORY, addWhistory);
};

module.exports = {
  setupWhistoryHandlers,
};

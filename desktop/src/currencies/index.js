const { ipcMain } = require('electron');

const { LIST_CURRENCIES } = require('./channels');
const { listCurrencies } = require('./handlers');

const setupCurrenciesHandlers = () => {
  ipcMain.handle(LIST_CURRENCIES, listCurrencies);
};

module.exports = {
  setupCurrenciesHandlers,
};

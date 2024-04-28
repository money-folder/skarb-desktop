const { ipcMain } = require('electron');

const { LIST_CURRENCIES, CREATE_CURRENCY } = require('./channels');
const { handleListCurrencies, handleCreateCurrency } = require('./handlers');

const setupCurrenciesHandlers = () => {
  ipcMain.handle(LIST_CURRENCIES, handleListCurrencies);
  ipcMain.handle(CREATE_CURRENCY, handleCreateCurrency);
};

module.exports = {
  setupCurrenciesHandlers,
};

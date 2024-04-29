const { ipcMain } = require('electron');

const {
  LIST_CURRENCIES,
  CREATE_CURRENCY,
  SOFT_DELETE_CURRENCY,
  RESTORE_CURRENCY,
  HARD_DELETE_CURRENCY,
} = require('./channels');
const {
  handleListCurrencies,
  handleCreateCurrency,
  handleSoftDeleteCurrency,
  handleRestoreCurrency,
  handleHardDeleteCurrency,
} = require('./handlers');

const setupCurrenciesHandlers = () => {
  ipcMain.handle(LIST_CURRENCIES, handleListCurrencies);
  ipcMain.handle(CREATE_CURRENCY, handleCreateCurrency);
  ipcMain.handle(SOFT_DELETE_CURRENCY, handleSoftDeleteCurrency);
  ipcMain.handle(RESTORE_CURRENCY, handleRestoreCurrency);
  ipcMain.handle(HARD_DELETE_CURRENCY, handleHardDeleteCurrency);
};

module.exports = {
  setupCurrenciesHandlers,
};

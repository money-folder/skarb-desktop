const { ipcMain } = require('electron');

const { LIST_WALLETS, CREATE_WALLET } = require('./channels');
const { listWallets, createWallet } = require('./handlers');

const setupWalletsHandlers = () => {
  ipcMain.handle(LIST_WALLETS, listWallets);
  ipcMain.handle(CREATE_WALLET, createWallet);
};

module.exports = {
  setupWalletsHandlers,
};

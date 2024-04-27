const { ipcMain } = require('electron');

const {
  LIST_WALLETS,
  CREATE_WALLET,
  SOFT_DELETE_WALLET,
} = require('./channels');
const { listWallets, createWallet, softDeleteWallet } = require('./handlers');

const setupWalletsHandlers = () => {
  ipcMain.handle(LIST_WALLETS, listWallets);
  ipcMain.handle(CREATE_WALLET, createWallet);
  ipcMain.handle(SOFT_DELETE_WALLET, softDeleteWallet);
};

module.exports = {
  setupWalletsHandlers,
};

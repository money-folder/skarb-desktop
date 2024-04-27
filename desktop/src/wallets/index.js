const { ipcMain } = require('electron');

const {
  LIST_WALLETS,
  CREATE_WALLET,
  SOFT_DELETE_WALLET,
  RESTORE_WALLET,
  HARD_DELETE_WALLET,
} = require('./channels');
const {
  listWallets,
  createWallet,
  softDeleteWallet,
  handleRestoreWallet,
  handleHardDeleteWallet,
} = require('./handlers');

const setupWalletsHandlers = () => {
  ipcMain.handle(LIST_WALLETS, listWallets);
  ipcMain.handle(CREATE_WALLET, createWallet);
  ipcMain.handle(SOFT_DELETE_WALLET, softDeleteWallet);
  ipcMain.handle(RESTORE_WALLET, handleRestoreWallet);
  ipcMain.handle(HARD_DELETE_WALLET, handleHardDeleteWallet);
};

module.exports = {
  setupWalletsHandlers,
};

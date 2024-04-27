const { contextBridge, ipcRenderer } = require('electron');

const {
  ADD_DB_SOURCE,
  GET_DB_SOURCES,
  DELETE_DB_SOURCE,
  CONNECT_TO_DB,
  GET_CURRENT_CONNECTION,
} = require('./connection/channels');
const {
  LIST_WALLETS,
  CREATE_WALLET,
  SOFT_DELETE_WALLET,
  RESTORE_WALLET,
} = require('./wallets/channels');
const {
  LIST_WHISTORY,
  ADD_WHISTORY,
  SOFT_DELETE_WHISTORY,
  RESTORE_WHISTORY,
  HARD_DELETE_WHISTORY,
} = require('./whistory/channels');
const { LIST_CURRENCIES } = require('./currencies/channels');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    connection: {
      addDbSource: (dbSource) => ipcRenderer.invoke(ADD_DB_SOURCE, dbSource),
      getDbSources: () => ipcRenderer.invoke(GET_DB_SOURCES),
      deleteDbSource: (dbSource) =>
        ipcRenderer.invoke(DELETE_DB_SOURCE, dbSource),
      connectToDb: (dbSource) => ipcRenderer.invoke(CONNECT_TO_DB, dbSource),
      getCurrentConnection: () => ipcRenderer.invoke(GET_CURRENT_CONNECTION),
    },

    currencies: {
      list: () => ipcRenderer.invoke(LIST_CURRENCIES),
    },

    wallets: {
      list: () => ipcRenderer.invoke(LIST_WALLETS),
      create: (name, currencyId) =>
        ipcRenderer.invoke(CREATE_WALLET, name, currencyId),
      softDelete: (walletId) =>
        ipcRenderer.invoke(SOFT_DELETE_WALLET, walletId),
      restore: (walletId) => ipcRenderer.invoke(RESTORE_WALLET, walletId),
    },

    whistory: {
      list: (walletId) => ipcRenderer.invoke(LIST_WHISTORY, walletId),
      add: (walletId, amount, ts) =>
        ipcRenderer.invoke(ADD_WHISTORY, walletId, amount, ts),
      softDelete: (whistoryId) =>
        ipcRenderer.invoke(SOFT_DELETE_WHISTORY, whistoryId),
      hardDelete: (whistoryId) =>
        ipcRenderer.invoke(HARD_DELETE_WHISTORY, whistoryId),
      restore: (whistoryId) => ipcRenderer.invoke(RESTORE_WHISTORY, whistoryId),
    },
  },
});

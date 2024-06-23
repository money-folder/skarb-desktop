#! /usr/bin/env node

const { program } = require('commander');

const { logger, decorateWithArgsLogger } = require('./logger');

// database
const { setDatabaseConnection } = require('../database/db');

// controllers
const {
  handleInit,
  handleMigrate,
} = require('./controllers/database-controller');
const { handleListCurrencies } = require('./controllers/currency-controller');
const {
  handleAddWallet,
  handleListWallets,
  handleRmWallet,
} = require('./controllers/wallet-controller');
const {
  handleAddWhistoryEntry,
  handleListWhistory,
  handleRmWhistoryEntry,
  handleExportWhistory,
  handlePlotWhistory,
  handlePlotWhistoryDiff,
} = require('./controllers/whistory-controller');

logger.info('Skarb CLI started');

program.command('init').action(decorateWithArgsLogger(handleInit));

program.command('migrate').action(decorateWithArgsLogger(handleMigrate));

// currencies

const currencies = program
  .command('currencies')
  .description('Manage currencies');

currencies
  .command('list')
  .description('Shows a list of currencies')
  .action(decorateWithArgsLogger(handleListCurrencies));

// wallets

const wallets = program.command('wallets').description('Manage wallets');

wallets
  .command('add')
  .description('Add a wallet')
  .requiredOption('-n, --name <name>', 'Wallet name')
  .requiredOption('-c, --currency <currency>', 'Currency')
  .action(decorateWithArgsLogger(handleAddWallet));

wallets
  .command('rm')
  .description('Remove a wallet')
  .requiredOption('-w, --walletId <id>', 'Wallet id')
  .option('-h, --hard', 'Hard deletion')
  .action(decorateWithArgsLogger(handleRmWallet));

wallets
  .command('list')
  .description('Shows a list of wallets')
  .action(decorateWithArgsLogger(handleListWallets));

// whistory

const whistory = program
  .command('whistory')
  .description('Manage wallets history');

whistory
  .command('add')
  .description('Add a wallet history entry')
  .requiredOption('-w, --walletId <walletId>', 'Wallet id')
  .requiredOption('-a, --amount <amount>', 'Amount')
  .option('-d, --date <date>', 'Date')
  .action(decorateWithArgsLogger(handleAddWhistoryEntry));

whistory
  .command('rm')
  .description('Remove a wallet history entry')
  .requiredOption(
    '-wh, --wallet-history-id <walletHistoryId>',
    'Wallet history id',
  )
  .option('-h, --hard', 'Hard deletion')
  .action(decorateWithArgsLogger(handleRmWhistoryEntry));

whistory
  .command('list')
  .description('Shows a list of wallets history')
  .option('-w, --walletId <walletId>', 'Wallet id')
  .action(decorateWithArgsLogger(handleListWhistory));

whistory
  .command('export')
  .description('Export wallets history')
  .option('-w, --walletId <walletId>')
  .action(decorateWithArgsLogger(handleExportWhistory));

const whistoryPlot = whistory
  .command('plot')
  .description('Plot wallets history');

whistoryPlot
  .command('days')
  .description('Plot wallets history per day')
  .requiredOption('-w, --walletId <walletId>')
  .action(decorateWithArgsLogger(handlePlotWhistory));

whistoryPlot
  .command('diff')
  .description('Plot wallets history diff')
  .requiredOption('-w, --walletId <walletId>')
  .option('-s, --span <span>', 'Span in days', '1')
  .action(decorateWithArgsLogger(handlePlotWhistoryDiff));

process.on('uncaughtException', async (err) => {
  await logger.error('uncaughtException', err);
  process.exit(1);
});

process.on('unhandledRejection', async (err) => {
  await logger.error('unhandledRejection', err);
  process.exit(1);
});

process.on('exit', async (code) => {
  await logger.info('Skarb CLI exited with code', code);
});

(async () => {
  await setDatabaseConnection('./skarb.sqlite3');
  program.parse(process.argv);
})();

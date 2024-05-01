const {
  selectCurrencies,
  insertCurrency,
  deleteCurrencySoft,
  restoreCurrency,
  deleteCurrencyHard,
} = require('../../../database/repositories/currency-repository');
const {
  formatCurrencyFromDb,
} = require('../../../formatters/currency-formatter');

const handleListCurrencies = async () => {
  const currencies = await selectCurrencies();
  return currencies.map(formatCurrencyFromDb);
};

const handleCreateCurrency = async (event, name) => {
  await insertCurrency({ currency: name });
};

const handleSoftDeleteCurrency = async (event, currencyId) => {
  await deleteCurrencySoft(currencyId);
};

const handleRestoreCurrency = async (event, currencyId) => {
  await restoreCurrency(currencyId);
};

const handleHardDeleteCurrency = async (event, currencyId) => {
  await deleteCurrencyHard(currencyId);
};

module.exports = {
  handleListCurrencies,
  handleCreateCurrency,
  handleSoftDeleteCurrency,
  handleRestoreCurrency,
  handleHardDeleteCurrency,
};
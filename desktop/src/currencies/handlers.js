const {
  selectCurrencies,
  insertCurrency,
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

module.exports = {
  handleListCurrencies,
  handleCreateCurrency,
};

const {
  selectCurrencies,
} = require('../../../database/repositories/currency-repository');
const {
  formatCurrencyFromDb,
} = require('../../../formatters/currency-formatter');

const listCurrencies = async () => {
  const currencies = await selectCurrencies();
  return currencies.map(formatCurrencyFromDb);
};

module.exports = {
  listCurrencies,
};

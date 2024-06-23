const {
  selectCurrencies,
} = require('../../database/repositories/wallet-repository');

const handleListCurrencies = async () => {
  try {
    const currencies = await selectCurrencies();
    console.table(currencies);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  handleListCurrencies,
};

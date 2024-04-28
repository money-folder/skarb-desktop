const formatCurrencyFromDb = (currencyData) => ({
  id: currencyData.c_id,
  name: currencyData.c_name,
  createdAt: currencyData.c_createdAt,
  deletedAt: currencyData.c_deletedAt,
});

module.exports = {
  formatCurrencyFromDb,
};

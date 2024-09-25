export const formatCurrency = (currencies: {}) => {
  const currencyArray = Object.entries(currencies);
  return currencyArray.map(([code, name]) => ({
    value: code,
    label: name,
  }));
};

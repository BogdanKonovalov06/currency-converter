export const getCurrencies = async () => {
  const url = process.env.REACT_CURRENCY_API;

  try {
    const response = await fetch(`${url}.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

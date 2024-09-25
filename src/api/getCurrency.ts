export const getCurrency = async (code: string) => {
  const url =
    'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';

  try {
    const response = await fetch(`${url}/${code}.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrency = async (code: string) => {
  const url = process.env.REACT_CURRENCY_API;

  try {
    const response = await fetch(`${url}/${code}.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

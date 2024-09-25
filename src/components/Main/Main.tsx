import { ChangeEvent, useEffect, useState } from 'react';
//@ts-ignore
import Select, { Option } from 'react-select';

import { getCurrencies } from '../../api/getCurrencies';
import { formatCurrency } from '../../utils/formatCurrency';
import { ConverterContainer, MainContainer, MainHeader } from './Main.style';
import { getCurrency } from '../../api/getCurrency';
import { CurrencyRow } from '../CurrencyRow/CurrencyRow';

import exchangeImage from '../../../public/images/exchange.png';

export const Main = () => {
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrencyFrom, setSelectedCurrencyFrom] =
    useState<Option | null>();
  const [selectedCurrencyTo, setSelectedCurrencyTo] = useState<Option | null>();
  const [conversionRate, setConversionRate] = useState<number>(1);
  const [amount, setAmount] = useState<number>(1);
  const [amountInFromCurrency, setAmountInFromCurrency] =
    useState<boolean>(true);

  const getAllCurrencies = async () => {
    const values = await getCurrencies();
    setCurrencies(values);
  };

  useEffect(() => {
    getAllCurrencies();
  }, []);

  useEffect(() => {
    const setDefaultCurrencies = async () => {
      const currencyOptions = formatCurrency(currencies);

      const eur = currencyOptions.find((currency) => currency.value === 'EUR');
      const uah = currencyOptions.find((currency) => currency.value === 'UAH');

      if (eur && uah) {
        setSelectedCurrencyFrom(eur);
        setSelectedCurrencyTo(uah);
      }
    };

    if (currencies.length > 0) {
      setDefaultCurrencies();
    }
  }, [currencies]);

  useEffect(() => {
    const updateConversionRate = async () => {
      if (selectedCurrencyFrom && selectedCurrencyTo) {
        const currencyData = await getCurrency(selectedCurrencyFrom.value);
        const rate =
          currencyData[selectedCurrencyFrom.value]?.[selectedCurrencyTo.value];
        if (rate) {
          setConversionRate(rate);
        } else {
          console.error(
            `Rate not found for ${selectedCurrencyFrom.value} to ${selectedCurrencyTo.value}`
          );
        }
      }
    };

    if (selectedCurrencyFrom && selectedCurrencyTo) {
      updateConversionRate();
    }
  }, [selectedCurrencyFrom, selectedCurrencyTo]);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * conversionRate;
  } else {
    toAmount = amount;
    fromAmount = amount / conversionRate;
  }

  const handleSelectChange = (
    selectedOption: Option | null,
    type: 'from' | 'to'
  ): void => {
    if (!selectedOption) return;

    if (type === 'from') {
      setSelectedCurrencyFrom(selectedOption);
    } else {
      setSelectedCurrencyTo(selectedOption);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: 'from' | 'to'
  ): void => {
    const value = parseFloat(e.target.value);
    setAmount(value);
    setAmountInFromCurrency(false);

    type === 'from'
      ? setAmountInFromCurrency(true)
      : setAmountInFromCurrency(false);
  };

  return (
    <MainContainer>
      <MainHeader>Currency converter</MainHeader>
      <ConverterContainer>
        <CurrencyRow
          currencyOptions={formatCurrency(currencies)}
          currencyAmount={parseFloat(fromAmount.toFixed(4))}
          handleSelectChange={(selectedOption: Option) =>
            handleSelectChange(selectedOption, 'from')
          }
          handleInputChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e, 'from')
          }
          selectedCurrency={selectedCurrencyFrom}
        />

        <img src={exchangeImage} width={40} />

        <CurrencyRow
          currencyOptions={formatCurrency(currencies)}
          currencyAmount={parseFloat(toAmount.toFixed(4))}
          handleSelectChange={(selectedOption: Option) =>
            handleSelectChange(selectedOption, 'to')
          }
          handleInputChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e, 'to')
          }
          selectedCurrency={selectedCurrencyTo}
        />
      </ConverterContainer>
    </MainContainer>
  );
};

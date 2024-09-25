import { useEffect, useState } from 'react';
import { getCurrency } from '../../api/getCurrency';
import { HeaderCurrencies, HeaderSpan } from './Header.style';
import dollarImg from '../../../public/images/dollar.png';
import euroImg from '../../../public/images/euro.png';

export const Header = () => {
  const [euro, setEuro] = useState<number>();
  const [dollar, setDollar] = useState<number>();

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const eurData = await getCurrency('eur');
        setEuro(eurData?.eur.uah.toFixed(2));

        const usdData = await getCurrency('usd');
        setDollar(usdData?.usd.uah.toFixed(2));
      } catch (error) {
        console.log('Error fetching currency data:', error);
      }
    };
    fetchCurrency();
  }, []);

  return (
    <HeaderCurrencies>
      {euro && (
        <HeaderSpan>
          <img src={euroImg} width={25} />
          {euro} EUR
        </HeaderSpan>
      )}
      {dollar && (
        <HeaderSpan>
          <img src={dollarImg} width={25} /> {dollar} USD
        </HeaderSpan>
      )}
    </HeaderCurrencies>
  );
};

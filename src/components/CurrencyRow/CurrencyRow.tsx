import {
  CurrencyRowContainer,
  CurrencyRowInput,
  CurrencyRowSelect,
} from './CurrencyRow.style';
//@ts-ignore
import Select, { Option, SingleValue } from 'react-select';

interface CurrencyRowProps {
  currencyOptions: Option[];
  currencyAmount: number;
  handleSelectChange: (selectedOption: SingleValue<Option>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCurrency: Option;
}

export const CurrencyRow = ({
  currencyOptions,
  currencyAmount,
  handleSelectChange,
  handleInputChange,
  selectedCurrency,
}: CurrencyRowProps) => {
  return (
    <CurrencyRowContainer>
      <CurrencyRowInput
        type="number"
        value={currencyAmount}
        onChange={handleInputChange}
      />
      <CurrencyRowSelect
        className="basic-single"
        classNamePrefix="select"
        isSearchable={true}
        placeholder="Select currency..."
        name="currencies"
        onChange={handleSelectChange}
        options={currencyOptions}
        //@ts-ignore
        selectOption={selectedCurrency}
        styles={{
          container: (baseStyles) => ({
            ...baseStyles,
            border: 'none',
          }),
          control: (baseStyles) => ({
            ...baseStyles,
            borderColor: '#191036',
            borderRadius: 15,
            width: 200,
          }),
          option: (baseStyles) => ({
            ...baseStyles,
            borderBottom: '1px solid #191036',
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            border: '1px solid #191036',
            borderRadius: 15,
            overflow: 'hidden',
          }),
        }}
      />
    </CurrencyRowContainer>
  );
};

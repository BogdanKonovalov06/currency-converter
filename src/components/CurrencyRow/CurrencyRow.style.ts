import styled from 'styled-components';
import Select from 'react-select';

export const CurrencyRowContainer = styled.div`
  display: flex;
  gap: 5px;
`;
export const CurrencyRowInput = styled.input`
  border: 1px solid #191036;
  border-radius: 15px;
  padding: 5px;
  font-size: 16px;
`;

export const CurrencyRowSelect = styled(Select)`
  border: 1px solid #191036;
  border-radius: 15px;
`
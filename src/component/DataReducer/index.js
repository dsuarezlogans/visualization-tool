import { useState } from 'react';
import {
  getTotalByinitiatingCountry,
  getTotalByReceivingCountry,
  getConnectionsByinitiatingCountry,
  getCountries,
} from './formatData';

export const initialState = {
  data: [],
};

export const chartDataType = {
  TOTAL_LEVEL: 'total',
  CONNECTIONS_LEVEL: 'connections',
  INITIATING_ROL: 'initiating country',
  RECEIVING_ROL: 'recieving country',
};

const dataReducer = (state, action) => {
  switch (true) {
    case action.level === chartDataType.TOTAL_LEVEL && action.rol === chartDataType.INITIATING_ROL:
      return getTotalByinitiatingCountry(state);
    case action.level === chartDataType.TOTAL_LEVEL && action.rol === chartDataType.RECEIVING_ROL:
      return getTotalByReceivingCountry(state);
    case action.level === chartDataType.CONNECTIONS_LEVEL &&
      action.rol === chartDataType.INITIATING_ROL:
      return getConnectionsByinitiatingCountry(state, action.reference);
    case action.level === chartDataType.CONNECTIONS_LEVEL &&
      action.rol === chartDataType.RECEIVING_ROL:
      return [];
    default:
      return getTotalByinitiatingCountry(state);
  }
};

function useDataProcessor() {
  const [csvData, setCsvData] = useState(initialState);
  const [chartData, setChartData] = useState([]);

  const setWorldMapData = inputsValue => {
    const data = dataReducer(csvData, inputsValue);
    setChartData(data);
  };

  return { setCsvData, getCountries, chartData, setWorldMapData };
}

export default useDataProcessor;

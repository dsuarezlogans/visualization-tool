import { useState } from 'react';
import {
  getTotalByinitiatingCountry,
  getTotalByReceivingCountry,
  getConnectionsByInitiatingCountry,
  getConnectionsByReceivingCountry,
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
    case action.countries === chartDataType.INITIATING_ROL:
      return getCountries(state);
    case action.level === chartDataType.TOTAL_LEVEL && action.rol === chartDataType.INITIATING_ROL:
      return getTotalByinitiatingCountry(state);
    case action.level === chartDataType.TOTAL_LEVEL && action.rol === chartDataType.RECEIVING_ROL:
      return getTotalByReceivingCountry(state);
    case action.level === chartDataType.CONNECTIONS_LEVEL &&
      action.rol === chartDataType.INITIATING_ROL:
      return getConnectionsByInitiatingCountry(state, action.reference);
    case action.level === chartDataType.CONNECTIONS_LEVEL &&
      action.rol === chartDataType.RECEIVING_ROL:
      return getConnectionsByReceivingCountry(state, action.reference);
    default:
      return getTotalByinitiatingCountry(state);
  }
};

function useDataProcessor() {
  const [csvData, setCsvData] = useState(initialState);
  const [chartData, setChartData] = useState(initialState);
  const [refCountries, setRefCountries] = useState([]);

  const setCountries = (data, inputsValue = { countries: chartDataType.INITIATING_ROL }) => {
    const countries = dataReducer(data, inputsValue);
    setRefCountries(countries);
  };

  const setWorldMapData = (inputsValue, data = csvData) => {
    setCsvData(data);
    setCountries(data);
    const initChartData = dataReducer(data, inputsValue);
    setChartData(initChartData);
  };

  return { chartData, setWorldMapData, refCountries };
}

export default useDataProcessor;

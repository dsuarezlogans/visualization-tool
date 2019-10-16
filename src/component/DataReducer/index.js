import { useState } from 'react';
import { getTotalByinitiatingCountry, getTotalByReceivingCountry } from './formatData';

export const initialState = {
  data: [],
};

export const chartDataType = {
  TOTAL_LEVEL: 'total',
  CONNECTIONS_LEVEL: 'connections',
  INITIATING_ROL: 'initiating country',
  RECEIVING_ROL: 'recieving country',
  SET_DATA: 'SET_DATA',
};

const dataReducer = (state, action) => {
  switch (true) {
    case action.level === chartDataType.TOTAL_LEVEL && action.rol === chartDataType.INITIATING_ROL:
      return getTotalByinitiatingCountry(state);
    case action.level === chartDataType.TOTAL_LEVEL && action.rol === chartDataType.RECEIVING_ROL:
      return getTotalByReceivingCountry(state);
    case action.level === chartDataType.CONNECTIONS_LEVEL &&
      action.rol === chartDataType.INITIATING_ROL:
      return [];
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
    const nextState = dataReducer(csvData, inputsValue);
    console.log('nextState', nextState);
    setChartData(nextState);
  };

  return { setCsvData, chartData, setWorldMapData };
}

export default useDataProcessor;

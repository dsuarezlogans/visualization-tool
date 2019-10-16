import getTotalByClientCountry from './formatData';

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
  switch (action.type) {
    case chartDataType.TOTAL_LEVEL:
      return { ...state, data: getTotalByClientCountry(action.data) };
    case chartDataType.INITIATING_ROL:
      return { ...state, data: [] };
    case chartDataType.SET_DATA:
      return { ...state, data: action.data };
    default:
      return state;
  }
};

export default dataReducer;

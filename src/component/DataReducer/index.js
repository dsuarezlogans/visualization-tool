import getTotalByClientCountry from './formatData';

const initialState = {
  data: [],
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'TOTAL_CLIENT_COUNTRY':
      return { ...state, data: getTotalByClientCountry(action) };
    case 'TOTAL_CLIENT_COUNTRY1':
      return { ...state, data: action.data };
    default:
      throw state;
  }
};

export { dataReducer, initialState };

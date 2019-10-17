const CLIENT_COUNTRY = 'Client Country';
const PROVIDER_COUNTRY = 'Provider Country';
const NUMBER_COLABORATIONS = 'Number collaborations';
const SUM_CLIENT_COUNTRY = 'Sum number of projects in client country';
const SUM_PROVIDER_COUNTRY = 'Sum number of projects in provider country';

export const getCountries = () => [{ label: 'Argentina', value: 'argentina' }];

export const getTotalByinitiatingCountry = ({ data }) => {
  const filteredData = data
    .filter(item => item[CLIENT_COUNTRY] && item[SUM_CLIENT_COUNTRY])
    .map(item => [item[CLIENT_COUNTRY], item[SUM_CLIENT_COUNTRY]]);
  return filteredData;
};

export const getTotalByReceivingCountry = ({ data }) => {
  const filteredData = data
    .filter(item => item[PROVIDER_COUNTRY] !== null)
    .map(item => [item[PROVIDER_COUNTRY], item[SUM_PROVIDER_COUNTRY]]);
  return filteredData;
};

export const getConnectionsByinitiatingCountry = ({ data }, reference) => {
  const filteredData = data
    .filter(item => item[CLIENT_COUNTRY].toLowerCase() === reference)
    .map(item => [item[PROVIDER_COUNTRY], item[NUMBER_COLABORATIONS]]);

  return filteredData;
};

import uniqBy from 'lodash/uniqBy';

const CLIENT_COUNTRY = 'Client Country';
const PROVIDER_COUNTRY = 'Provider Country';
// const NUMBER_COLABORATIONS = 'Sum number of projects in client country';
const SUM_CLIENT_COUNTRY = 'Sum number of projects in client country';
const SUM_PROVIDER_COUNTRY = 'Sum number of projects in provider country';

const cleanData = (data, key, value) =>
  data
    .map(item => ({
      key: item[key],
      value: item[value],
    }))
    .filter(item => item.key !== null && item.value !== null);

const getChartData = parsedData =>
  uniqBy(parsedData, item => item.key).map(country => [country.key, country.value]);

const getTotalByinitiatingCountry = ({ data }) => {
  const parsedData = cleanData(data, CLIENT_COUNTRY, SUM_CLIENT_COUNTRY);
  return getChartData(parsedData);
};
const getTotalByReceivingCountry = ({ data }) => {
  const parsedData = cleanData(data, PROVIDER_COUNTRY, SUM_PROVIDER_COUNTRY);
  return getChartData(parsedData);
};

export { getTotalByinitiatingCountry, getTotalByReceivingCountry };

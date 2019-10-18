import uniqBy from 'lodash/uniqBy';
import maxBy from 'lodash/maxBy';
import minBy from 'lodash/minBy';

const CLIENT_COUNTRY = 'Client Country';
const PROVIDER_COUNTRY = 'Provider Country';
const NUMBER_COLABORATIONS = 'Number collaborations';
const SUM_CLIENT_COUNTRY = 'Sum number of projects in client country';
const SUM_PROVIDER_COUNTRY = 'Sum number of projects in provider country';

const getMinMaxValues = data => {
  const { value: max } = maxBy(data, 'value');
  const { value: min } = minBy(data, 'value');
  return { max, min };
};

const getFilteredDataForTotal = (data, key, value) =>
  data
    .filter(item => item[key] && item[value])
    .map(item => ({
      name: item[key],
      value: item[value],
      tooltip: {
        show: true,
      },
    }));

const getFilteredDataForConnections = (data, key, reference, country) =>
  data
    .filter(item => item[reference] && item[key])
    .filter(item => item[reference].toLowerCase() === country)
    .map(item => {
      if (item[key].toLowerCase() === country) {
        return {
          name: item[key],
          value: item[NUMBER_COLABORATIONS],
          tooltip: {
            show: true,
          },
          itemStyle: {
            borderColor: 'gold',
            borderWidth: 2,
          },
        };
      }
      return {
        name: item[key],
        value: item[NUMBER_COLABORATIONS],
        tooltip: {
          show: true,
        },
      };
    });

export const getTotalByinitiatingCountry = ({ data }) => {
  const filteredData = getFilteredDataForTotal(data, CLIENT_COUNTRY, SUM_CLIENT_COUNTRY);

  return { data: uniqBy(filteredData, 'name'), ...getMinMaxValues(filteredData) };
};

export const getTotalByReceivingCountry = ({ data }) => {
  const filteredData = getFilteredDataForTotal(data, PROVIDER_COUNTRY, SUM_PROVIDER_COUNTRY);

  return { data: uniqBy(filteredData, 'name'), ...getMinMaxValues(filteredData) };
};

export const getConnectionsByInitiatingCountry = ({ data }, country) => {
  const filteredData = getFilteredDataForConnections(
    data,
    PROVIDER_COUNTRY,
    CLIENT_COUNTRY,
    country
  );

  return { data: uniqBy(filteredData, 'name'), ...getMinMaxValues(filteredData) };
};

export const getConnectionsByReceivingCountry = ({ data }, country) => {
  const filteredData = getFilteredDataForConnections(
    data,
    CLIENT_COUNTRY,
    PROVIDER_COUNTRY,
    country
  );

  return { data: uniqBy(filteredData, 'name'), ...getMinMaxValues(filteredData) };
};

export const getCountries = ({ data }, key = CLIENT_COUNTRY) => {
  const uniqCountries = uniqBy(data, key);

  return uniqCountries
    .filter(item => item[key])
    .map(country => ({ label: country[key], value: country[key].toLowerCase() }));
};

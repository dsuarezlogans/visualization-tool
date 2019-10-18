import uniqBy from 'lodash/uniqBy';
import maxBy from 'lodash/maxBy';
import minBy from 'lodash/minBy';

const CLIENT_COUNTRY = 'Client Country';
const PROVIDER_COUNTRY = 'Provider Country';
const NUMBER_COLABORATIONS = 'Number collaborations';
const SUM_CLIENT_COUNTRY = 'Sum number of projects in client country';
const SUM_PROVIDER_COUNTRY = 'Sum number of projects in provider country';

export const getCountries = ({ data }, key = CLIENT_COUNTRY) => {
  const uniqCountries = uniqBy(data, key);

  return uniqCountries
    .filter(item => item[key])
    .map(country => ({ label: country[key], value: country[key].toLowerCase() }));
};

const getMinMaxValues = data => {
  const { value: max } = maxBy(data, 'value');
  const { value: min } = minBy(data, 'value');
  return { max, min };
};

export const getTotalByinitiatingCountry = ({ data }) => {
  const filteredData = data
    .filter(item => item[CLIENT_COUNTRY] && item[SUM_CLIENT_COUNTRY])
    .map(item => ({
      name: item[CLIENT_COUNTRY],
      value: item[SUM_CLIENT_COUNTRY],
      tooltip: {
        show: true,
      },
    }));

  return { data: uniqBy(filteredData, 'name'), ...getMinMaxValues(filteredData) };
};

export const getTotalByReceivingCountry = ({ data }) => {
  const filteredData = data
    .filter(item => item[PROVIDER_COUNTRY] && item[SUM_PROVIDER_COUNTRY])
    .map(item => ({
      name: item[PROVIDER_COUNTRY],
      value: item[SUM_PROVIDER_COUNTRY],
      tooltip: {
        show: true,
      },
    }));

  return { data: uniqBy(filteredData, 'name'), ...getMinMaxValues(filteredData) };
};

export const getConnectionsByinitiatingCountry = ({ data }, reference) => {
  const filteredData = data
    .filter(item => item[CLIENT_COUNTRY])
    .filter(item => item[CLIENT_COUNTRY].toLowerCase() === reference)
    .map(item => [item[PROVIDER_COUNTRY], item[NUMBER_COLABORATIONS]]);

  return filteredData;
};

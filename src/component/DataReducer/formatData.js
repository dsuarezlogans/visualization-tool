import _ from 'lodash';

const CLIENT_COUNTRY = 'Client Country';
const PROJECTS_IN_COUNTRY = 'Sum number of projects in client country';

function getTotalByClientCountry({ data }) {
  const preData = data
    .map(item => ({
      key: item[CLIENT_COUNTRY],
      value: item[PROJECTS_IN_COUNTRY],
    }))
    .filter(item => item.key !== null && item.value !== null);

  return _.uniqBy(preData, item => item.key).map(country => [country.key, country.value]);
}

export default getTotalByClientCountry;

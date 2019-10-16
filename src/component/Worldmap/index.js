import './index.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'react-google-charts';

function Worldmap({ data }) {
  return (
    <Chart
      width='100%'
      height='100%'
      chartType='GeoChart'
      data={[['Country', 'Projects'], ...data]}
      options={{
        colors: ['#FFF', 'rgb(11, 15, 68)'],
      }}
      mapsApiKey='YOUR_KEY_HERE'
      rootProps={{ 'data-testid': '1' }}
    />
  );
}

Worldmap.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Worldmap;

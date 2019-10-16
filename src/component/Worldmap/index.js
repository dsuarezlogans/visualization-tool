import './index.css';
import React from 'react';
import { Chart } from 'react-google-charts';
import PropTypes from 'prop-types';

function Worldmap({ chartData }) {
  return (
    <Chart
      width='100%'
      height='100%'
      chartType='GeoChart'
      data={[['Country', 'Connections'], ...chartData]}
      options={{
        colors: ['#9595aa', '#01366a'],
      }}
      mapsApiKey='YOUR_KEY_HERE'
      rootProps={{ 'data-testid': '1' }}
    />
  );
}

Worldmap.propTypes = {
  chartData: PropTypes.any.isRequired,
};

export default Worldmap;

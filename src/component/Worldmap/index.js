import './index.css';
import React from 'react';
import PropTypes from 'prop-types';

import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';

import 'echarts/lib/chart/map';

import 'echarts/map/js/world';

const initialOptionsState = {
  tooltip: {
    show: false,
    trigger: 'item',
    triggerOn: 'click',
  },
  visualMap: {
    type: 'piecewise',
    left: 'left',
    orient: 'horizontal',
    align: 'right',
    hoverLink: false,
    min: 0,
    max: 1,
    inRange: {
      color: ['#9595aa', '#01366a'],
    },
    calculable: true,
  },
  series: [
    {
      name: 'Connections',
      type: 'map',
      mapType: 'world',
      zoom: '1.2',
      label: {
        emphasis: {
          show: false,
        },
      },
      itemStyle: {
        emphasis: {
          areaColor: null,
        },
      },
      data: [],
    },
  ],
};

function Worldmap({ chartData }) {
  const options = {
    ...initialOptionsState,
    series: [
      {
        ...initialOptionsState.series[0],
        data: chartData,
      },
    ],
    visualMap: {
      ...initialOptionsState.visualMap,
      min: 0,
      max: 100000,
    },
  };
  console.log(options);
  return (
    <ReactEchartsCore
      echarts={echarts}
      option={options}
      style={{ height: '500px', width: '100%' }}
      className='react_for_echarts'
    />
  );
}

Worldmap.propTypes = {
  chartData: PropTypes.any.isRequired,
};

export default Worldmap;

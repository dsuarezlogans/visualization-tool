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
    borderColor: '#01366a',
    borderWidth: 1,
    backgroundColor: 'rgba(245, 250, 250, 0.9)',
    textStyle: {
      color: '#01366a',
    },
    formatter: series => `<b>${series.data.name}</b> <br/>
      ${series.seriesName}: ${series.data.value.toLocaleString()}
    `,
  },
  visualMap: {
    type: 'piecewise',
    orient: 'horizontal',
    splitNumber: 6,
    hoverLink: false,
    inRange: {
      color: ['#9595aa', '#01366a'],
    },
    calculable: true,
    formatter: a => {
      return `${Math.ceil(a).toLocaleString()}`;
    },
  },
  series: [
    {
      name: 'Connections',
      type: 'map',
      mapType: 'world',
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
        data: chartData.data,
      },
    ],
    visualMap: {
      show: Boolean(chartData.min),
      ...initialOptionsState.visualMap,
      min: chartData.min,
      max: chartData.max,
    },
  };

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

import './index.css';
import React, { useReducer } from 'react';
import Papa from 'papaparse';

import MapControl from '../MapControl';
import Worldmap from '../Worldmap';
import dataReducer, { initialState, chartDataType } from '../DataReducer';

function Main() {
  const [{ data }, setDataChart] = useReducer(dataReducer, initialState);

  const handleFile = ([fileInput]) => {
    Papa.parse(fileInput, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: results => {
        setDataChart({
          type: chartDataType.TOTAL_LEVEL,
          data: results,
        });
      },
    });
  };

  return (
    <div className='main'>
      <div className='main-item'>
        <MapControl handleFile={handleFile} />
      </div>
      <div className='main-item'>
        <Worldmap data={data} />
      </div>
    </div>
  );
}

export default Main;

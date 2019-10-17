import './index.css';
import React, { useState } from 'react';
import Papa from 'papaparse';

import MapControl from '../MapControl';
import Worldmap from '../Worldmap';
import useDataProcessor from '../DataReducer';

// TODO: handle error when a csv is not the right csv o.O

function Main() {
  const { chartData, setCsvData, setWorldMapData, getCountries } = useDataProcessor();
  const [fileMeta, setFileMeta] = useState(null);
  const handleFile = ([fileInput]) => {
    setFileMeta(fileInput);
    Papa.parse(fileInput, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: results => {
        setCsvData(results);
      },
    });
  };

  const onReloadSubmit = inputsValue => e => {
    e.preventDefault();
    if (
      !fileMeta ||
      fileMeta.type !== 'text/csv' ||
      (!inputsValue.reference && inputsValue.level === 'connections')
    ) {
      return;
    }
    setWorldMapData(inputsValue);
  };

  return (
    <div className='main'>
      <div className='main-item'>
        <MapControl
          handleFile={handleFile}
          onReloadSubmit={onReloadSubmit}
          countries={getCountries()}
        />
      </div>
      <div className='main-item worldmap'>
        <Worldmap chartData={chartData} />
      </div>
    </div>
  );
}

export default Main;

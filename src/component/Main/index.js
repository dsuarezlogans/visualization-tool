import './index.css';
import React from 'react';
import Papa from 'papaparse';

import MapControl from '../MapControl';
import Worldmap from '../Worldmap';
import useDataProcessor from '../DataReducer';

function Main() {
  const { chartData, setCsvData, setWorldMapData } = useDataProcessor();

  const handleFile = ([fileInput]) => {
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
    setWorldMapData(inputsValue);
  };

  return (
    <div className='main'>
      <div className='main-item'>
        <MapControl handleFile={handleFile} onReloadSubmit={onReloadSubmit} />
      </div>
      <div className='main-item'>
        <Worldmap chartData={chartData} />
      </div>
    </div>
  );
}

export default Main;

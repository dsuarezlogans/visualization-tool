import './index.css';
import React, { useState } from 'react';
import Papa from 'papaparse';

import MapControl from '../MapControl';
import Worldmap from '../Worldmap';
import useDataProcessor, { chartDataType } from '../DataReducer';

const { TOTAL_LEVEL, INITIATING_ROL } = chartDataType;

const INDEX_OF_CLIENT_COLUMN = 44;
const initialInputsValue = {
  level: TOTAL_LEVEL,
  rol: INITIATING_ROL,
  reference: '',
};

const isInvalidFile = meta => !meta || meta.type !== 'text/csv';

function Main() {
  const { chartData, setWorldMapData, refCountries } = useDataProcessor();
  const [fileMeta, setFileMeta] = useState(null);
  const [inputValues, setInputValues] = useState(initialInputsValue);

  const handleFile = ([fileInput]) => {
    if (isInvalidFile(fileInput)) {
      return;
    }
    setFileMeta(fileInput);
    Papa.parse(fileInput, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      beforeFirstChunk: results =>
        results
          .split(';')
          .slice(INDEX_OF_CLIENT_COLUMN)
          .join(';'),
      complete: results => {
        setWorldMapData(inputValues, results);
      },
    });
  };

  const onRadioChange = e => {
    const inputName = e.target ? e.target.name : 'reference';
    const inputValue = e.target ? e.target.value : e.value;
    const newState = {
      ...inputValues,
      [inputName]: inputValue,
    };

    setInputValues(newState);

    if (
      isInvalidFile(fileMeta, newState) ||
      (!newState.reference && newState.level === 'connections')
    ) {
      return;
    }

    setWorldMapData(newState);
  };

  return (
    <div className='main'>
      <div className='main-item'>
        <MapControl
          handleFile={handleFile}
          handleRadioChange={onRadioChange}
          inputValues={inputValues}
          countries={refCountries}
        />
      </div>
      <div className='main-item worldmap'>
        <Worldmap chartData={chartData} />
      </div>
    </div>
  );
}

export default Main;

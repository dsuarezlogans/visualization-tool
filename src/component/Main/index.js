import './index.css';
import React, { useReducer } from 'react';
import Papa from 'papaparse';

import MapControl from '../MapControl';
import Worldmap from '../Worldmap';
import { dataReducer, initialState } from '../DataReducer';

function Main() {
  const [{ data }, dispatch] = useReducer(dataReducer, initialState);

  const handleFile = ([fileInput]) => {
    Papa.parse(fileInput, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: results => {
        dispatch({
          type: 'TOTAL_CLIENT_COUNTRY',
          data: results.data,
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

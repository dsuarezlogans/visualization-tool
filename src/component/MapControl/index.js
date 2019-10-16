import './index.css';
import React, { useState, useReducer } from 'react';
import PropTypes from 'prop-types';

import dataReducer, { initialState, chartDataType } from '../DataReducer';
import RadioGroup from '../RadioGroup';
import CsvDropzone from '../CsvDropzone';

const { TOTAL_LEVEL, CONNECTIONS_LEVEL, INITIATING_ROL, RECEIVING_ROL } = chartDataType;

function MapControl({ handleFile }) {
  const [level, setLevel] = useState(TOTAL_LEVEL);
  const [role, setRol] = useState(INITIATING_ROL);
  const [reference, setReference] = useState('');
  const [, setDataChart] = useReducer(dataReducer, initialState);

  const handleRadioButton = e => {
    if (e.target.value === INITIATING_ROL) {
      setRol(e.target.value);
      setDataChart({ type: INITIATING_ROL });
    }
    if (e.target.value === RECEIVING_ROL) {
      setRol(e.target.value);
      setDataChart({ type: RECEIVING_ROL });
    }
    if (e.target.value === CONNECTIONS_LEVEL) {
      setLevel(e.target.value);
      setDataChart({ type: CONNECTIONS_LEVEL });
    }
    if (e.target.value === TOTAL_LEVEL) {
      setLevel(e.target.value);
      setDataChart({ type: TOTAL_LEVEL });
    }
  };

  return (
    <div className='map-control'>
      <div className='map-control-item title'>
        <h3>Header Text</h3>
        <input type='button' className='reload-btn' value='Reload data' />
      </div>
      <form className='map-control-item'>
        <RadioGroup
          label='Aggregation level'
          valueA={TOTAL_LEVEL}
          valueB={CONNECTIONS_LEVEL}
          handleChange={handleRadioButton}
          selected={level}
        />
        <RadioGroup
          label='Country role'
          valueA={INITIATING_ROL}
          valueB={RECEIVING_ROL}
          handleChange={handleRadioButton}
          selected={role}
        />
        <div className='input'>
          <label htmlFor='reference'>
            Reference country:
            <input
              type='input'
              id='reference'
              name='reference'
              value={reference}
              onChange={e => setReference(e.target.value)}
            />
          </label>
        </div>
        <CsvDropzone handleFile={handleFile} />
      </form>
    </div>
  );
}

MapControl.propTypes = {
  handleFile: PropTypes.func.isRequired,
};

export default MapControl;

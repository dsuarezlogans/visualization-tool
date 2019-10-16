import './index.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { chartDataType } from '../DataReducer';
import RadioGroup from '../RadioGroup';
import CsvDropzone from '../CsvDropzone';

const { TOTAL_LEVEL, CONNECTIONS_LEVEL, INITIATING_ROL, RECEIVING_ROL } = chartDataType;

const initialInputsValue = {
  level: TOTAL_LEVEL,
  rol: INITIATING_ROL,
  reference: '',
};

function MapControl({ handleFile, onReloadSubmit }) {
  const [inputValues, setInputValue] = useState(initialInputsValue);
  const handleInputChange = e => {
    setInputValue({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='map-control'>
      <div className='map-control-item title'>
        <h3>Header Text</h3>
        <input type='submit' form='mapControlForm' className='reload-btn' value='Reload data' />
      </div>
      <form onSubmit={onReloadSubmit(inputValues)} id='mapControlForm' className='map-control-item'>
        <RadioGroup
          name='level'
          label='Aggregation level'
          valueA={TOTAL_LEVEL}
          valueB={CONNECTIONS_LEVEL}
          handleChange={handleInputChange}
          selected={inputValues.level}
        />
        <RadioGroup
          name='rol'
          label='Country role'
          valueA={INITIATING_ROL}
          valueB={RECEIVING_ROL}
          handleChange={handleInputChange}
          selected={inputValues.rol}
        />
        <div className='input'>
          <label htmlFor='reference'>
            Reference country:
            <input
              type='input'
              id='reference'
              name='reference'
              value={inputValues.reference}
              onChange={handleInputChange}
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
  onReloadSubmit: PropTypes.func.isRequired,
};

export default MapControl;

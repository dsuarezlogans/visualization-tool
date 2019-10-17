import './index.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { chartDataType } from '../DataReducer';
import RadioGroup from '../RadioGroup';
import CsvDropzone from '../CsvDropzone';

const { TOTAL_LEVEL, CONNECTIONS_LEVEL, INITIATING_ROL, RECEIVING_ROL } = chartDataType;

const initialInputsValue = {
  level: TOTAL_LEVEL,
  rol: INITIATING_ROL,
  reference: '',
};

function MapControl({ handleFile, onReloadSubmit, countries }) {
  const [inputValues, setInputValue] = useState(initialInputsValue);
  const handleInputChange = e => {
    if (e.target) {
      setInputValue({
        ...inputValues,
        [e.target.name]: e.target.value,
      });
    } else {
      setInputValue({
        ...inputValues,
        reference: e.value,
      });
    }
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
        <div className='select-container'>
          <span>Reference country:</span>
          <div className='select-reference-container'>
            <Select
              type='input'
              id='reference'
              name='reference'
              isDisabled={inputValues.level !== CONNECTIONS_LEVEL}
              options={countries}
              onChange={handleInputChange}
            />
            {inputValues.level === CONNECTIONS_LEVEL && !inputValues.reference && (
              <span className='reference-error'>Please select a country for reference!</span>
            )}
          </div>
        </div>
        <CsvDropzone handleFile={handleFile} />
      </form>
    </div>
  );
}

MapControl.defaultProps = {
  countries: [],
};
MapControl.propTypes = {
  handleFile: PropTypes.func.isRequired,
  onReloadSubmit: PropTypes.func.isRequired,
  countries: PropTypes.any,
};

export default MapControl;

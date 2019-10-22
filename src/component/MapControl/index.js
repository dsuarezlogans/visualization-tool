import './index.css';
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { chartDataType } from '../DataReducer';
import RadioGroup from '../RadioGroup';
import CsvDropzone from '../CsvDropzone';

const { TOTAL_LEVEL, CONNECTIONS_LEVEL, INITIATING_ROL, RECEIVING_ROL } = chartDataType;

function MapControl({ inputValues, handleFile, countries, handleRadioChange }) {
  return (
    <div className='map-control'>
      <div className='map-control-item title'>
        <h3>Header Text</h3>
      </div>
      <form id='mapControlForm' className='map-control-item'>
        <RadioGroup
          name='level'
          label='Aggregation level'
          valueA={TOTAL_LEVEL}
          valueB={CONNECTIONS_LEVEL}
          handleChange={handleRadioChange}
          selected={inputValues.level}
        />
        <RadioGroup
          name='rol'
          label='Country role'
          valueA={INITIATING_ROL}
          valueB={RECEIVING_ROL}
          handleChange={handleRadioChange}
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
              onChange={handleRadioChange}
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
  handleRadioChange: PropTypes.func.isRequired,
  inputValues: PropTypes.object.isRequired,
  countries: PropTypes.any,
};

export default MapControl;

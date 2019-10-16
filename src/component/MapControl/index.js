import './index.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import RadioGroup from '../RadioGroup';
import CsvDropzone from '../CsvDropzone';

const DEFAULT_LEVEL = 'total';
const DEFAULT_ROL = 'initiating country';

function MapControl({ handleFile }) {
  const [level, setLevel] = useState(DEFAULT_LEVEL);
  const [role, setRol] = useState(DEFAULT_ROL);
  const [reference, setReference] = useState('');

  const handleLevel = e => setLevel(e.target.value);
  const handleRol = e => setRol(e.target.value);

  return (
    <div className='map-control'>
      <div className='map-control-item title'>
        <h3>Header Text</h3>
        <input type='button' className='reload-btn' value='Reload data' />
      </div>
      <form className='map-control-item'>
        <RadioGroup
          label='Aggregation level'
          valueA='total'
          valueB='connections'
          handleChange={handleLevel}
          selected={level}
        />
        <RadioGroup
          label='Country role'
          valueA='initiating country'
          valueB='receiving country'
          handleChange={handleRol}
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

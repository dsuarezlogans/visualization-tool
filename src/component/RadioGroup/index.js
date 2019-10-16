import './index.css';
import React from 'react';
import PropTypes from 'prop-types';

function RadioGroup({ label, handleChange, selected, valueA, valueB, name }) {
  return (
    <div className='radio-group'>
      <span>{label}:</span>
      <div className='radio-input'>
        <label htmlFor={valueA}>
          <input
            type='radio'
            name={name}
            id={valueA}
            value={valueA}
            checked={selected === valueA}
            onChange={handleChange}
          />
          {valueA}
        </label>
      </div>
      <div className='radio-input'>
        <label htmlFor={valueB}>
          <input
            type='radio'
            name={name}
            id={valueB}
            value={valueB}
            checked={selected === valueB}
            onChange={handleChange}
          />
          {valueB}
        </label>
      </div>
    </div>
  );
}
RadioGroup.defaultProps = {
  label: 'My Values',
  valueA: 'valueA',
  valueB: 'valueB',
};
RadioGroup.propTypes = {
  handleChange: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  label: PropTypes.string,
  valueA: PropTypes.string,
  valueB: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default RadioGroup;

import './index.css';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';

function CsvDropzone({ handleFile }) {
  const onDrop = useCallback(handleFile, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className='csv-dropzone' {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag & drop some files here, or click to select files</p>
      )}
    </div>
  );
}

CsvDropzone.propTypes = {
  handleFile: PropTypes.func.isRequired,
};
export default CsvDropzone;

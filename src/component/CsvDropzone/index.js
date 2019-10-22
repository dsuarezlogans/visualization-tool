import './index.css';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';

function CsvDropzone({ handleFile }) {
  const onDrop = useCallback(handleFile, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: 'text/csv',
  });
  return (
    <div className='csv-dropzone' {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag & drop some files here, or click to select files</p>
      )}
      {acceptedFiles[0] && (
        <i style={{ color: 'green' }}>{acceptedFiles[0].name} has been loaded!</i>
      )}
    </div>
  );
}

CsvDropzone.propTypes = {
  handleFile: PropTypes.func.isRequired,
};
export default CsvDropzone;

import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loader() {
  return (
    <div>
      <Spinner
        animation='border'
        role='status'
        style={{
          width: '50px',
          height: '50px',
          margin: 'auto',
          display: 'block',
        }}
        variant='primary'
      >
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loader;

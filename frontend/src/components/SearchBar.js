import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState('');

  function submitHandler(e) {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  }

  return (
    <Form onSubmit={submitHandler} style={{ display: 'inline' }}>
      <Form.Control
        type='text'
        name='q'
        onChange={e => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='me-sm-2 ms-sm-5'
        style={{ display: 'inline-block', width: 'auto' }}
      ></Form.Control>
      <Button type='submit' variant='secondary' className='p-2'>
        Search
      </Button>
    </Form>
  );
}

export default SearchBar;

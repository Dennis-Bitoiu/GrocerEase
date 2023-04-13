import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  // Fetch data using Axios from API once the component load
  // Use promise API to change the state of products once the data came back from the backend
  // If the promise was resolved, update the state of products
  // Otherwise catch and log the error for debug
  // To bypass the CORS error, install the `cors` dependency
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <h1>Latest products</h1>
      <Row>
        {products.map(product => (
          <Col
            key={product._id}
            className='column'
            sm={12}
            md={6}
            lg={4}
            xl={3}
          >
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;

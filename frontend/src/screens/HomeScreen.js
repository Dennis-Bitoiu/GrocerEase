import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { fetchProducts } from '../actions/productsActions';
import Loader from '../components/Loader';
import Categories from '../components/Categories';

const HomeScreen = () => {
  // Initializes the dispatch constant using the useDispatch hook from Redux.
  const dispatch = useDispatch();
  const params = useParams();

  // Destructure the keyword parameter
  // Used when users search for a product
  const { keyword } = params;

  // Dispatches the fetchProducts action when the component mounts.
  // The "dispatch" function is added as a dependency to the dependency array
  // To prevent the "useEffect" hook from causing an infinite loop.
  // Get products from the reducer and store them into the 'productsList' state
  useEffect(() => {
    dispatch(fetchProducts(keyword));
  }, [dispatch, keyword]);

  const producstList = useSelector(state => state.productsList);
  const { products, loading, error } = producstList;

  return (
    <>
      <Categories></Categories>
      <h1>Latest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <h5>{error}</h5>
      ) : (
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
      )}
    </>
  );
};

export default HomeScreen;

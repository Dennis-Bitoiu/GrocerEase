import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import QuantityBtn from '../components/QuantityBtn';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../actions/productsActions';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';

import {
  Row,
  Col,
  Image,
  Button,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';

const ProductScreen = () => {
  // Use state for the cart button to render a different component depending on the state of 'added'
  const [added, setAdded] = useState(false);

  // const [product, setProduct] = useState({});

  const dispatch = useDispatch();

  function addedToCart() {
    setAdded(true);
  }

  // Used useParams() hook to return and object with all the parameters to this route (which is '/route/:id')
  const paramsObject = useParams();

  // If the promise is resolved, update the state of `product` to be the `data` field of the response

  // Fetch product from api and change the state of the product
  // Destructuring can be used to replace res with { data }, however we preffer doing it this way
  useEffect(() => {
    dispatch(fetchProduct(paramsObject.id));
  }, [dispatch, paramsObject]);

  const productDetails = useSelector(state => state.product);

  const { product, loading, error } = productDetails;
  return (
    <>
      {loading ? (
        <Loader />
      ) : !error ? (
        <div>
          <Link className='btn btn-primary my-3' to='/'>
            Go Back
          </Link>

          <Row>
            <Col md={8}>
              <Image
                className='prod-display-col'
                src={product.image}
                alt={product.name}
              ></Image>
            </Col>
            <Col md={4}>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <h2>
                    <strong>{product.name}</strong>
                  </h2>
                </ListGroupItem>

                <ListGroupItem className='py-3'>
                  <h5>EUR €{product.price}</h5>
                </ListGroupItem>

                <ListGroupItem className='py-3'>
                  {product.description}
                </ListGroupItem>

                <ListGroupItem
                  style={{ color: 'hsl(164, 71%, 34%)', fontSize: '1.2rem' }}
                  className='py-4'
                >
                  <strong>{product.countInStock}</strong> left in stock{' '}
                </ListGroupItem>
              </ListGroup>
              {added === false ? (
                <Button
                  variant='primary'
                  type='button'
                  className='py-2'
                  onClick={addedToCart}
                >
                  <i className='fa-solid fa-cart-shopping me-3'></i>
                  Add to Cart
                </Button>
              ) : (
                <QuantityBtn maxQuantity={product.countInStock} />
              )}
            </Col>
          </Row>
        </div>
      ) : (
        <ErrorMessage />
      )}
    </>
  );
};

export default ProductScreen;

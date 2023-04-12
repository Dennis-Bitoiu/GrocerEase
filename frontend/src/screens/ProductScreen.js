import React from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  Row,
  Col,
  Image,
  Card,
  Button,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import products from '../products';

const ProductScreen = () => {
  // Used useParams() hook to return and object with all the parameters to this route (which is '/route/:id')
  const paramsObject = useParams();

  // This will find the product which id's matches the one passed
  // To the route parameter of the ProductScreen Route (/product/:id)
  const product = products.find(prod => prod._id === paramsObject.id);

  return (
    <>
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
          <Button variant='primary' type='button' className='py-2'>
            <i class='fa-solid fa-cart-shopping me-3'></i>
            Add to Cart
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;

import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Product = ({ product }) => {
  return (
    <Card className='mb-3 p-2 rounded'>
      <Card.Text className='price' as='h3'>
        €{product.price}
      </Card.Text>

      {/* Replace <a> tag with Link component */}
      {/* This will stop the website to refresh the page when accessing it */}
      {/* And creates sort of a `Single Page App` */}
      <Link to={`/product/${product._id}`}>
        <Card.Img variant='top' src={product.image} />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
      </Card.Body>
    </Card>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
};
export default Product;

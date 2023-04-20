import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Cart() {
  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;

  return (
    <Button
      type='button'
      className='btn px-3'
      size='lg'
      style={{ backgroundColor: 'hsl(162, 63%, 41%)' }}
    >
      <Row className='header-cart'>
        <Col md={5}>
          <i className='fa-solid fa-basket-shopping fa-lg'></i>
        </Col>
        <Col md={7} style={{ fontSize: '1.1rem' }}>
          <div>
            €
            {cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)}
          </div>
        </Col>
      </Row>
    </Button>
  );
}

export default Cart;

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  ListGroupItem,
} from 'react-bootstrap';
import Message from '../components/Message';
import QuantityBtn from '../components/QuantityBtn';
import { removeFromCart } from '../actions/cartActions';

function CartScreen() {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function removeFromCartHandler(id) {
    dispatch(removeFromCart(id));
  }

  function checkOutHandler() {
    navigate('/login?redirect=shipping');
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty{' '}
            <Link to='/' style={{ color: 'black' }}>
              Go Back
            </Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map(item => {
              return (
                <ListGroupItem key={item.id}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                      ></Image>
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>€{item.price}</Col>
                    <Col md={2}>
                      <QuantityBtn
                        id={item.id}
                        toggled={true}
                        maxQuantity={item.countInStock}
                        quantity={item.qty}
                      ></QuantityBtn>
                    </Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item.id)}
                      >
                        <i className='fa-solid fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card style={{ height: 'auto' }}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h2>
                Subtotal (
                {cartItems.reduce((acc, item) => (acc += item.qty), 0)}) items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroupItem>
            <ListGroupItem>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;

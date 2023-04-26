import React, { useState, useEffect } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { orderPayReset, resetOrderCreate } from '../slices/orderSlice';

function OrderScreen() {
  const dispatch = useDispatch();
  const paramsObject = useParams();
  const orderId = paramsObject.id;

  // State to check if the JS SDK script is ready
  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector(state => state.orderDetails);
  const { order, orderItems, loading, error } = orderDetails;

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  useEffect(() => {
    //  Async Function to add the SDK script to the body of the HTML

    const addPayPalScript = async () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=sb`;
      script.async = true;

      // When the script is loaded, set sdkReady to true
      script.onload = () => {
        setSdkReady(true);
      };

      document.body.appendChild(script);
    };
    // Check if there is an 'order' object or if the 'successPay' variable is truthy
    // Or if an order exist, check if its id is different from the one passed in the URL
    if (!order || successPay || order._id !== orderId) {
      // If any of the conditions is true, dispatch orderPayReset() to reset the success status of the payment to false;;
      dispatch(orderPayReset());
      dispatch(resetOrderCreate());
      // Then dispatch getOrderDetails to retrieve the details of the order
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      // Otherwise, if there is an order which was not paid
      // Check if the PayPal script was loaded on the window object
      if (!window.paypal) {
        // If it hasn't been loaded, call the 'addPayPalScript' function to load it
        addPayPalScript();
      } else {
        // If it has been loaded, set the 'sdkReady' state variable to true to indicate that the PayPal SDK is ready to use
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, order, successPay]);

  // Call this method when a payment was made succesfully
  function succesPaymentHandler(paymentResult) {
    // dispatch the payOrder action, which makes a PUT request, updating the order with id == orderId
    dispatch(payOrder(orderId, paymentResult));
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1> Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>

              {order.isDelivered ? (
                <Message variant='success'>Delivered</Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>

              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((product, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={product.image}
                            alt={product.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/product/${product.id}`}>
                            {product.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {product.qty} x {product.price} = $
                          {(product.qty * product.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card className='order-summary-card'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Products Price:</Col>
                  <Col>
                    €
                    {orderItems
                      .reduce(
                        (acc, current) => acc + current.price * current.qty,
                        0
                      )
                      .toFixed(2)}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Delivery Fee:</Col>
                  <Col>€{order.deliveryPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {order.isDelivered ? 'Delivered' : 'Waiting For Delivery'}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Total</strong>
                  </Col>
                  <Col>
                    <strong>€{order.totalPrice.toFixed(2)}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}{' '}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={succesPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default OrderScreen;

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import QuantityBtn from '../components/QuantityBtn';
import { fetchProduct } from '../actions/productsActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { addToCartAction } from '../actions/cartActions';

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
  const [productIsStored, setStored] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  function addToCartHandler() {
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

  // Retrieve product state from Redux
  const productDetails = useSelector(state => state.product);
  const { product, loading, error } = productDetails;

  // Retrieve cartState from Redux
  const cartState = useSelector(state => state.cart);
  const { cartItems } = cartState;

  // Find in the cart state the product whose id equals the  id in the route's parameters
  // To use its quantity in the Quantity Button props.
  const productFromCart = cartItems.find(
    product => product.id === paramsObject.id
  );

  // On render of the ProductScreen component, retrieve the content of the cart
  // If the product whose id equals the id in the route's parameters is in the cart, store it in a variable called storedProduct
  // That means the product is in the cart, and there is no need to render the 'Add To Cart button'
  // Instead render directly the Quantity Button component
  // And set 'added' to `true` meaning that at some point in time, the product was added in the cart.
  useEffect(() => {
    const storedValue = localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [];

    const storedProduct = storedValue.find(
      stored => stored.id === paramsObject.id
    );
    if (storedProduct) {
      setStored(true);
      setAdded(true);
    }
  }, [productIsStored, paramsObject.id, quantity]);

  // Trigger this effect when the user clicks on the 'Add to cart' button
  // On the first press of the 'Add to cart button, set the quantity to 1'
  // If the product was added on the cart at some point in time, then this useEffect will not happen, since
  // 'stored' was set to true on the render of the page
  useEffect(() => {
    if (added && !productIsStored) {
      setQuantity(1);
      dispatch(addToCartAction(paramsObject.id, quantity));
    }
  }, [added, dispatch, paramsObject.id]);

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
              {productIsStored === false && added === false ? (
                <Button
                  variant='primary'
                  type='button'
                  className='py-2'
                  onClick={addToCartHandler}
                >
                  <i className='fa-solid fa-cart-shopping me-3'></i>
                  Add to Cart
                </Button>
              ) : (
                <QuantityBtn
                  maxQuantity={product.countInStock}
                  id={product._id}
                  toggled={added}
                  quantity={productFromCart ? productFromCart.qty : quantity}
                />
              )}
            </Col>
          </Row>
        </div>
      ) : (
        <Message variant='danger'>Product not Found</Message>
      )}
    </>
  );
};

export default ProductScreen;

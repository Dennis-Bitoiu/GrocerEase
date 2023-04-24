import {
  addItem,
  removeItem,
  cartSaveShippingAddress,
} from '../slices/cartSlice';
import axios from 'axios';

export const addToCartAction = (id, qty) => async (dispatch, getState) => {
  const response = await axios.get(`http://localhost:5000/api/products/${id}`);
  const { data } = response;

  dispatch(
    addItem({
      name: data.name,
      id: data._id,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      brand: data.brand,
      qty: qty,
    })
  );

  // Save the current state of the shopping cart to the browser's localStorage API.
  // This will ensure that the items in the cart persist across page reloads and browser sessions.
  // The 'cartItems' key is used to store the serialized version of the cartItems array from the Redux store.
  // The JSON.stringify method is used to convert the array to a JSON string, which can be stored as a value in localStorage.
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = id => async (dispatch, getState) => {
  dispatch(removeItem({ id: id }));

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = data => async dispatch => {
  dispatch(cartSaveShippingAddress(data));

  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

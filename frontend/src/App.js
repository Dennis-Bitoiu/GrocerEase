import Header from './components/Header';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UsersListScreen from './screens/UsersListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductsListScreen from './screens/ProductsListScreens';
import ProductEditScreen from './screens/ProductEditScreen';
import OrdersListScreen from './screens/OrdersListScreen';

const App = () => {
  return (
    // Define routes to each page
    // '/' - renders the home page
    // '/product/:id' - renders the page of the product with the id of :id
    <Router>
      <Header />
      <main>
        <Container fluid>
          <Routes>
            <Route exact path='/' element={<HomeScreen />} />
            <Route exact path='/search/:keyword' element={<HomeScreen />} />

            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/admin/userslist' element={<UsersListScreen />} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
            <Route
              path='/admin/productslist'
              element={<ProductsListScreen />}
            />
            <Route
              path='/admin/product/:id/edit'
              element={<ProductEditScreen />}
            />
            <Route path='/admin/orderslist' element={<OrdersListScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

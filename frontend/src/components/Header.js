import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import Cart from './Cart';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);

  const { userInfo } = userLogin;
  console.log(userInfo);
  function logoutHandler() {
    dispatch(logout());
  }

  return (
    <Navbar className='py-2' bg='primary' variant='primary' expand='lg' collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand className='brand'>GrocerEase</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto' style={{ display: 'flex', alignItems: 'center' }}>
            {/* Wrapping the Nav.Link component into a LinkContainer stops the page from refreshing when accessing the page */}

            <LinkContainer to='/cart' className='ms-3'>
              <Nav.Link>
                <Cart />
              </Nav.Link>
            </LinkContainer>

            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login' style={{ fontSize: '1.2rem' }}>
                <Nav.Link href='/login'>
                  {' '}
                  <i className='fas fa-user me-2'></i>Sign In
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

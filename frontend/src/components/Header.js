import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Cart from './Cart';

const Header = () => {
  return (
    <Navbar
      className='py-2'
      bg='primary'
      variant='primary'
      expand='lg'
      collapseOnSelect
    >
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand className='brand'>GrocerEase</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav
            className='ms-auto'
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {/* Wrapping the Nav.Link component into a LinkContainer stops the page from refreshing when accessing the page */}
            <LinkContainer to='/login' style={{ fontSize: '1.2rem' }}>
              <Nav.Link href='/login'>
                {' '}
                <i className='fas fa-user me-2'></i>Sign In
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to='/cart' className='ms-3'>
              <Nav.Link>
                <Cart />
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

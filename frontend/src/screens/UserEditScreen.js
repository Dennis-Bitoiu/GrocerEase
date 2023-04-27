import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';
import { getUserDetails } from '../actions/userActions';

function UserEditScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const userId = params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // Retrieve the user reducer and destructure the loading, error and userInfo
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!user.name || user._id !== userId) {
      // If a user doesn't exist (normally would happen on the first load of the page),
      // Or the user.id is different from the id parameter in the URL (would happen when trying to access the route multiple times)
      // Dispatch the getUserDetails action
      dispatch(getUserDetails(userId));
    } else {
      // If a user exists, update the state of the name, email and isAdmin
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user, dispatch]);

  function submitHandler(event) {
    event.preventDefault();
  }

  return (
    <>
      <Link to='/admin/userslist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={e => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is admin'
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button className='mt-3' type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
}

export default UserEditScreen;

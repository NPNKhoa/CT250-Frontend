import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '@assets/login.png';
import userIcon from '@assets/user.png';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@components/Alert';
import { loginThunk, loginWithGoogleThunk } from '@redux/thunk/authThunk';
import PasswordInput from '@components/common/PasswordInput';
import { getLoggedInUser } from '@redux/thunk/userThunk';

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [notification, setNotification] = useState({ message: '', type: '' });
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const authUser = useSelector(state => state.auth.authUser);

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleSuccess = async response => {
    const { email, name, picture } = jwtDecode(response?.credential);
    const user = { fullname: name, email: email, avatarImagePath: picture };
    await dispatch(loginWithGoogleThunk(user));
    const timer = setTimeout(() => navigate('/'), 1000);
    return () => clearTimeout(timer);
  };

  const handleError = error => {
    console.error('Login Failed:', error);
  };

  const handleChange = useCallback(e => {
    const { id, value } = e.target;
    setCredentials(prev => ({ ...prev, [id]: value }));
  }, []);

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      dispatch(loginThunk(credentials));
    },
    [credentials, dispatch]
  );

  useEffect(() => {
    if (authUser) {
      setNotification({ message: 'Login successful!', type: 'success' });
      dispatch(getLoggedInUser(localStorage.getItem('accessToken')));
      const timer = setTimeout(() => navigate('/'), 1000);
      return () => clearTimeout(timer);
    } else if (error) {
      setNotification({
        message: 'Login failed! Please try again.',
        type: 'error',
      });
    }
  }, [authUser, error, navigate, dispatch]);

  const loginForm = useMemo(
    () => (
      <form onSubmit={handleSubmit}>
        {['email', 'password'].map(field => (
          <div key={field} className='mb-4'>
            {field === 'password' ? (
              <PasswordInput
                id={field}
                value={credentials[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary'
              />
            ) : (
              <input
                type={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                required
                id={field}
                value={credentials[field]}
                onChange={handleChange}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary'
              />
            )}
          </div>
        ))}
        <button
          type='submit'
          className='w-full bg-primary text-white py-3 rounded-lg hover:bg-hover-primary transition duration-300'
          disabled={loading}
        >
          {loading ? (
            <CircularProgress color='inherit' size={20} />
          ) : (
            'Đăng nhập'
          )}
        </button>
      </form>
    ),
    [handleSubmit, credentials, handleChange, loading]
  );

  return (
    <section className='flex items-center justify-center py-10'>
      <div className='max-w-3xl mx-auto bg-gray-100 p-5 rounded-lg shadow-md flex items-center'>
        <div className='w-1/2 hidden lg:block'>
          <img src={loginImg} alt='Login' className='rounded-lg' />
        </div>
        <div className='w-full lg:w-1/2'>
          <div className='flex justify-center mb-3'>
            <img src={userIcon} alt='User Icon' className='w-20 h-20' />
          </div>
          <h2 className='text-2xl font-semibold text-center mb-7'>Đăng nhập</h2>
          {loginForm}
          <div className='my-4 flex items-center justify-between'>
            <span className='border-t border-gray-300 flex-grow mr-3'></span>
            <span className='text-gray-500'>Hoặc</span>
            <span className='border-t border-gray-300 flex-grow ml-3'></span>
          </div>
          <div className='mb-4 flex justify-center'>
            <GoogleOAuthProvider clientId={clientId}>
              <div>
                <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
              </div>
            </GoogleOAuthProvider>
          </div>
          <p className='text-center mt-4'>
            <span className='cursor-pointer hover:text-primary'>
              Quên mật khẩu?
            </span>
            <Link to='/signup' className='text-primary hover:underline'>
              {' '}
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
      {notification.message && (
        <Alert message={notification.message} type={notification.type} />
      )}
    </section>
  );
};

export default LoginPage;

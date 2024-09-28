import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '@assets/login.png';
import userIcon from '@assets/user.png';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk, loginWithSocialThunk } from '@redux/thunk/authThunk';
import PasswordInput from '@components/common/PasswordInput';
import { getLoggedInUser } from '@redux/thunk/userThunk';
import { LoginSocialFacebook, LoginSocialGoogle } from 'reactjs-social-login';
import { toast } from 'react-toastify';
import { getCartByUser } from '@redux/thunk/cartThunk';

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const authUser = useSelector(state => state.auth.authUser);

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const appId = import.meta.env.VITE_FACEBOOK_APP_ID;

  const handleSuccess = async (response, social) => {
    const { email, name, picture } = response;
    let user = {};
    if (social === 'google') {
      user = { fullname: name, email: email, avatarImagePath: picture };
    } else if (social === 'facebook') {
      user = {
        fullname: name,
        email: email,
        avatarImagePath: picture.data.url,
      };
    }
    dispatch(loginWithSocialThunk(user));
    navigate('/');
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
      toast.success('Đăng nhập thành công');
      localStorage.setItem('loggedInUserId', authUser.userId);
      const accessToken = localStorage.getItem('accessToken');
      dispatch(getCartByUser(accessToken));
      dispatch(getLoggedInUser(accessToken));
      navigate('/');
    } else if (error) {
      toast.error('Đăng nhập thất bại. Vui lòng thử lại!');
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
          className='w-full bg-primary text-white py-3 rounded-lg hover:bg-hover-primary transition duration-300 flex justify-center items-center'
          disabled={loading}
        >
          {loading ? (
            <div className='w-6 h-6 border-4 border-white border-dotted rounded-full animate-spin'></div>
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
      <div className='sm:max-w-3xl w-full mx-5 bg-gray-100 p-2 sm:p-5 rounded-lg shadow-md flex items-center'>
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
            <LoginSocialGoogle
              client_id={clientId}
              onResolve={response => {
                handleSuccess(response.data, 'google');
              }}
              onReject={error => {
                handleError(error);
              }}
              className='w-full'
            >
              <button className='w-full group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100'>
                <div className='relative flex items-center space-x-4 justify-center'>
                  <img
                    src='https://img.icons8.com/?size=100&id=17949&format=png&color=000000'
                    className='absolute left-0 w-5'
                    alt='google logo'
                  />
                  <span className='block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base'>
                    Đăng nhập với Google
                  </span>
                </div>
              </button>
            </LoginSocialGoogle>
          </div>
          <div className='mb-4 flex justify-center'>
            <LoginSocialFacebook
              appId={appId}
              onResolve={response => {
                handleSuccess(response.data, 'facebook');
              }}
              onReject={error => {
                handleError(error);
              }}
              className='w-full justify-center'
            >
              <button className='w-full group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100'>
                <div className='relative flex items-center space-x-4 justify-center'>
                  <img
                    src='https://img.icons8.com/?size=100&id=13912&format=png&color=000000'
                    className='absolute left-0 w-5'
                    alt='google logo'
                  />
                  <span className='block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base'>
                    Đăng nhập với Facebook
                  </span>
                </div>
              </button>
            </LoginSocialFacebook>
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
    </section>
  );
};

export default LoginPage;

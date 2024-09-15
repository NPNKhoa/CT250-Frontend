import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignUpImg from '@assets/register.png';
import userIcon from '@assets/user.png';
import authService from '@services/auth.service';
import Alert from '@components/Alert';
import PasswordInput from '@components/common/PasswordInput';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    fullname: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });
  const [notification, setNotification] = useState({ message: '', type: '' });
  // const [imageFile, setImageFile] = useState(null);

  const handleChange = useCallback(e => {
    const { id, value } = e.target;
    setCredentials(prev => ({ ...prev, [id]: value }));
  }, []);

  // const handleFileChange = useCallback(e => {
  //   setImageFile(e.target.files[0]);
  // }, []);

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(
        () => setNotification({ message: '', type: '' }),
        2000
      );
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      if (credentials.password !== credentials.confirmPassword) {
        setNotification({ message: 'Passwords do not match!', type: 'error' });
        return;
      }

      const formData = new FormData();
      Object.keys(credentials).forEach(key =>
        formData.append(key, credentials[key])
      );
      // formData.append('imageFile', imageFile);

      try {
        await authService.signup(formData);
        setNotification({ message: 'Signup successful!', type: 'success' });
        setTimeout(() => navigate('/login'), 2000);
      } catch (error) {
        setNotification({
          message: error.response?.data?.error || 'Signup failed!',
          type: 'error',
        });
      }
    },
    [credentials, navigate]
  );

  const formFields = useMemo(
    () => [
      { id: 'fullname', type: 'text', placeholder: 'Full Name' },
      { id: 'email', type: 'email', placeholder: 'Email' },
      { id: 'phone', type: 'text', placeholder: 'Phone' },
      { id: 'password', type: 'password', placeholder: 'Password' },
      {
        id: 'confirmPassword',
        type: 'password',
        placeholder: 'Confirm Password',
      },
    ],
    []
  );

  const signUpForm = useMemo(
    () => (
      <form onSubmit={handleSubmit}>
        {formFields.map(({ id, type, placeholder }) => (
          <div key={id} className='mb-4'>
            {type === 'password' ? (
              <PasswordInput
                id={id}
                value={credentials[id]}
                onChange={handleChange}
                placeholder={placeholder}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary'
              />
            ) : (
              <input
                type={type}
                placeholder={placeholder}
                required
                id={id}
                value={credentials[id]}
                onChange={handleChange}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary'
              />
            )}
          </div>
        ))}
        <button
          type='submit'
          className='w-full bg-primary text-white py-3 rounded-lg hover:bg-hover-primary transition duration-300'
        >
          Đăng ký tài khoản
        </button>
      </form>
    ),
    [handleSubmit, credentials, handleChange, formFields]
  );

  return (
    <section className='flex items-center justify-center bg-white py-5'>
      <div className='sm:max-w-3xl w-full mx-5 bg-gray-100 p-5 rounded-lg shadow-md flex items-center'>
        <div className='w-1/2 hidden lg:block'>
          <img src={SignUpImg} alt='Sign Up' className='rounded-lg' />
        </div>
        <div className='w-full lg:w-1/2'>
          <div className='flex justify-center mb-3'>
            <img src={userIcon} alt='User Icon' className='w-20 h-20' />
          </div>
          <h2 className='text-2xl font-semibold text-center mb-5'>
            Đăng ký tài khoản
          </h2>

          {signUpForm}

          <p className='text-center mt-4'>
            <span>Đã có tài khoản? </span>
            <Link to='/login' className='text-primary hover:underline'>
              Đăng nhập
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

export default SignUpPage;

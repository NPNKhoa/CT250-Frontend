import { useState, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignUpImg from '@assets/register.png';
import userIcon from '@assets/user.png';
import authService from '@services/auth.service';
import PasswordInput from '@components/common/PasswordInput';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';

const SignUpPage = () => {
  const [credentials, setCredentials] = useState({
    fullname: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // Để lưu trữ thông báo lỗi

  const validateEmail = useCallback(email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }, []);

  const validatePhone = useCallback(phone => {
    const regex = /^[0-9]{10,15}$/; // Kiểm tra số điện thoại từ 10 đến 15 ký tự
    return regex.test(phone);
  }, []);

  const validatePassword = useCallback(password => {
    return password.length >= 8; // Độ dài tối thiểu của mật khẩu
  }, []);

  const handleChange = useCallback(e => {
    const { id, value } = e.target;
    setCredentials(prev => ({ ...prev, [id]: value }));
  }, []);

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      setErrors({}); // Reset thông báo lỗi

      const newErrors = {};

      // Kiểm tra tính hợp lệ của các trường
      if (!credentials.fullname) newErrors.fullname = 'Tên đầy đủ là bắt buộc!';
      if (!validateEmail(credentials.email))
        newErrors.email = 'Email không hợp lệ!';
      if (!validatePhone(credentials.phone))
        newErrors.phone = 'Số điện thoại không hợp lệ!';
      if (!validatePassword(credentials.password))
        newErrors.password = 'Mật khẩu tối thiểu 8 ký tự!';
      if (credentials.password !== credentials.confirmPassword) {
        newErrors.confirmPassword = 'Mật khẩu không trùng khớp!';
      }

      // Nếu có lỗi, hiển thị thông báo và không gửi form
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      const formData = new FormData();
      Object.keys(credentials).forEach(key =>
        formData.append(key, credentials[key])
      );

      try {
        setLoading(true);
        await authService.signup(formData);
        toast.success(
          'Đăng ký tài khoản thành công! Vui lòng xác thực email để tiếp tục'
        );
        // navigate('/verify-email');
      } catch (error) {
        setLoading(false);
        console.log(error);
        if (error.response && error.response.status === 409) {
          toast.error('Email đã tồn tại!');
        } else {
          toast.error('Đăng ký thất bại!');
        }
      } finally {
        setLoading(false);
      }
    },
    [credentials, validateEmail, validatePhone, validatePassword]
  );

  const formFields = useMemo(
    () => [
      { id: 'fullname', type: 'text', placeholder: 'Tên đầy đủ' },
      { id: 'email', type: 'email', placeholder: 'Email' },
      { id: 'phone', type: 'text', placeholder: 'Số điện thoại' },
      { id: 'password', type: 'password', placeholder: 'Mật khẩu' },
      {
        id: 'confirmPassword',
        type: 'password',
        placeholder: 'Xác nhận mật khẩu',
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
            {errors[id] && <p className='text-red-500 text-sm'>{errors[id]}</p>}{' '}
            {/* Hiển thị thông báo lỗi */}
          </div>
        ))}
        <button
          disabled={loading}
          type='submit'
          className='w-full bg-primary text-white py-3 rounded-lg hover:bg-hover-primary transition duration-300'
        >
          {loading ? (
            <CircularProgress size={17} color='inherit' />
          ) : (
            'Đăng ký tài khoản'
          )}
        </button>
      </form>
    ),
    [handleSubmit, formFields, loading, credentials, handleChange, errors]
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
    </section>
  );
};

export default SignUpPage;

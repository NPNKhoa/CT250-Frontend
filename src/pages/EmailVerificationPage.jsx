import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import authService from '@services/auth.service';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button } from '@mui/material';

const EmailVerificationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await authService.verifyEmail(token);

        setStatus('success');
        setMessage(
          response.message || 'Your email has been verified successfully.'
        );
      } catch (error) {
        setStatus('failed');
        setMessage(
          error.response.data.error ||
            'There was an issue verifying your email.'
        );
      }
    };

    if (token) {
      verifyEmail();

      if (status === 'success') {
        toast.success('Xác thực Email thành công');
        setTimeout(() => {
          navigate('/login');
        }, 100000);
      } else {
        toast.error('Đã xảy ra lỗi trong quá trình xác thực Email');
        setTimeout(() => {
          navigate('/');
        }, 10000);
      }
    }
  }, [location, navigate, status, token]);

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col justify-center items-center'>
      <div className='bg-white w-2/5 p-16 rounded-lg shadow-lg text-center'>
        {status === 'success' ? (
          <div className='flex flex-col justify-center items-center gap-8'>
            <h1 className='text-3xl font-bold text-primary'>
              Xác thực email thành công
            </h1>
            <CheckCircleIcon color='success' style={{ fontSize: '6rem' }} />
            <p className='mt-4 text-gray-700 text-xl'>
              Email của bạn đã được xác minh thành công. Đăng nhập vào tài khoản
              và mua sắm ngay!!!
            </p>
            <Link to={'/login'}>
              <Button variant='contained' sx={{ px: '2rem', py: '1rem' }}>
                Đăng nhập ngay!
              </Button>
            </Link>
          </div>
        ) : (
          <div className='flex flex-col justify-center items-center gap-8'>
            <h1 className='text-3xl font-bold text-primary'>
              Xác thực email thất bại
            </h1>
            <CancelIcon color='error' style={{ fontSize: '6rem' }} />
            <p className='mt-4 text-gray-700 text-xl'>
              Đã xảy ra sự cố khi xác minh email của bạn. Bạn sẽ sớm được chuyển
              hướng đến trang chủ.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationPage;

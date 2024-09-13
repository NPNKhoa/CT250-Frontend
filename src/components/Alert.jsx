import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const Alert = ({ message, type }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hiển thị thông báo nếu có message
    if (message) {
      setVisible(true);
      // Ẩn thông báo sau 2 giây
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2000);

      // Dọn dẹp timer khi component bị hủy
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!visible || !message) return null;

  const alertConfig = {
    success: {
      icon: (
        <svg
          className='shrink-0 size-4'
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z'></path>
          <path d='m9 12 2 2 4-4'></path>
        </svg>
      ),
      bgColor: 'border-teal-200 bg-teal-300',
    },
    error: {
      icon: (
        <svg
          className='shrink-0 size-4'
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M18 6 6 18'></path>
          <path d='m6 6 12 12'></path>
        </svg>
      ),
      bgColor: 'border-red-200 bg-red-300',
    },
    warning: {
      icon: (
        <svg
          className='shrink-0 size-4'
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M12 2L2 22h20L12 2z'></path>
          <path d='M12 16v2'></path>
          <path d='M12 8v4'></path>
        </svg>
      ),
      bgColor: 'border-orange-200 bg-orange-300',
    },
  };

  const { icon, bgColor } = alertConfig[type] || {};

  return (
    <div
      className='fixed bottom-4 right-4 p-1 transition-opacity duration-500 ease-in-out'
      role='alert'
      tabIndex='-1'
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className='flex items-center border p-4 rounded-lg bg-white shadow-lg'>
        <div className='shrink-0'>
          <span
            className={`inline-flex justify-center items-center size-8 rounded-full border-4 ${bgColor}`}
          >
            {icon}
          </span>
        </div>
        <div className='ms-3'>
          <p className='text-md text-black'>{message}</p>
        </div>
      </div>
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning']).isRequired,
};

export default Alert;

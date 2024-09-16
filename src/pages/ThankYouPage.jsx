import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ThankYouPage = () => {
  return (
    <div className='flex flex-col justify-center items-center bg-gradient-to-r from-blue-50 to-blue-100 p-6'>
      <div className='bg-white shadow-lg rounded-lg p-10 md:p-14 max-w-xl w-full text-center m-5'>
        <CheckCircleIcon
          className='text-green-500 mb-4'
          style={{ fontSize: '4rem' }}
        />
        <h1 className='text-3xl font-extrabold text-gray-800 mb-4'>
          Cảm ơn bạn đã thanh toán!
        </h1>
        <p className='text-gray-600 mb-6'>
          Đơn hàng của bạn đã được xử lý thành công. Chúng tôi sẽ thông báo khi
          đơn hàng của bạn được giao. Bạn có thể kiểm tra thông tin đơn hàng của
          mình bất cứ lúc nào.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
          <Link
            to='/profile?tab=orders'
            className='bg-primary hover:bg-hover-primary text-white py-3 px-5 rounded-lg shadow-md transition duration-300 ease-in-out'
          >
            Xem lại đơn hàng
          </Link>
          <Link
            to='/'
            className='bg-gray-500 hover:bg-gray-600 text-white py-3 px-5 rounded-lg shadow-md transition duration-300 ease-in-out'
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;

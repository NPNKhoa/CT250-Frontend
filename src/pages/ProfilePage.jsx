import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserById } from '@redux/thunk/userThunk';
// ProfilePage.jsx

function ProfilePage() {
  const dispatch = useDispatch();
  const { error, loading } = useSelector(
    state => state.users || { user: null, error: '', loading: false }
  );
  const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
  console.log(currentUser);
  useEffect(() => {
    dispatch(getUserById(currentUser?.userId));
  }, [currentUser]);

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='container mx-auto px-4 py-10'>
      <h1 className='text-2xl font-bold mb-6'>Thông tin tài khoản</h1>
      <p className='text-gray-700 mb-5 italic'>
        Xin chào,{' '}
        <span className='text-primary font-bold'>
          {' '}
          {currentUser?.fullname || 'Người dùng không xác định'}
        </span>
      </p>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-white p-6 rounded-lg shadow-md md:col-span-1'>
          <h2 className='text-2xl font-bold mb-4'>Thông tin khách hàng</h2>
          <ul className='space-y-2'>
            <li>
              <span className='font-medium'>Họ tên:</span>{' '}
              {currentUser?.fullname || 'Chưa cập nhật'}
            </li>
            <li>
              <span className='font-medium'>Số điện thoại:</span>{' '}
              {currentUser?.phone || 'Chưa cập nhật'}
            </li>
            <li>
              <span className='font-medium'>Địa chỉ:</span>{' '}
              {currentUser?.address?.detail || 'Chưa cập nhật'}
            </li>
          </ul>
          <button className='bg-primary hover:bg-hover-primary text-white font-semibold py-2 px-4 rounded mt-6 transition-colors duration-200'>
            <Link to='/accountinfo'>Sửa thông tin</Link>
          </button>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-md md:col-span-2'>
          <h2 className='text-2xl font-bold mb-4'>Đơn hàng của bạn</h2>
          {/* Hiển thị danh sách đơn hàng ở đây */}
          {/* Giả sử orders là một phần của state hoặc props */}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

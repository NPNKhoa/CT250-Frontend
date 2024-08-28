import { useState } from 'react';
import { Link } from 'react-router-dom';

function AccountInfo() {
  const [userData, setUserData] = useState({
    email: 'test1@gmail.com',
    fullName: 'Nguyen Minh Tu',
    phoneNumber: '0845969757',
    gender: '',
    dateOfBirth: '',
  });

  const handleChange = event => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    alert(
      `Email: ${userData.email}\nHọ và tên: ${userData.fullName}\nSố điện thoại: ${userData.phoneNumber}\nGiới tính: ${userData.gender}\nNgày sinh: ${userData.dateOfBirth}`
    );
  };

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmitPasswordReset = event => {
    event.preventDefault();
    // Kiểm tra mật khẩu mới và mật khẩu xác nhận có khớp không
    if (newPassword !== confirmPassword) {
      alert('Mật khẩu mới không khớp!');
      return;
    }

    // Hiển thị thông tin mật khẩu qua alert
    alert(
      `Mật khẩu hiện tại: ${currentPassword}\nMật khẩu mới: ${newPassword}\nXác nhận mật khẩu mới: ${confirmPassword}`
    );
  };

  return (
    <div className='container mx-auto px-4 w-full md:w-2/3  py-5'>
      <h1 className='text-3xl font-bold text-gray-800 my-6'>
        Thông tin tài khoản
      </h1>
      <button className='bg-primary hover:bg-hover-primary text-white font-bold py-2 px-4 rounded mb-6'>
        <Link to='/profile'>Quay lại</Link>
      </button>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-6 rounded-lg shadow-md'
      >
        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-gray-700 text-sm font-bold mb-2'
          >
            Email:
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={userData.email}
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='fullName'
            className='block text-gray-700 text-sm font-bold mb-2'
          >
            Họ và tên:
          </label>
          <input
            type='text'
            id='fullName'
            name='fullName'
            value={userData.fullName}
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full  p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='phoneNumber'
            className='block text-gray-700 text-sm font-bold mb-2'
          >
            Số điện thoại:
          </label>
          <input
            type='tel'
            id='phoneNumber'
            name='phoneNumber'
            value={userData.phoneNumber}
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='gender'
            className='block text-gray-700 text-sm font-bold mb-2'
          >
            Giới tính:
          </label>
          <select
            id='gender'
            name='gender'
            value={userData.gender}
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full  p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          >
            <option value=''>Chọn giới tính</option>
            <option value='male'>Nam</option>
            <option value='female'>Nữ</option>
            <option value='other'>Khác</option>
          </select>
        </div>
        <div className='mb-4'>
          <label
            htmlFor='dateOfBirth'
            className='block text-gray-700 text-sm font-bold mb-2'
          >
            Ngày sinh:
          </label>
          <input
            type='date'
            id='dateOfBirth'
            name='dateOfBirth'
            value={userData.dateOfBirth}
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full  p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <button
          type='submit'
          className='bg-primary hover:bg-hover-primary w-full text-white font-bold  p-4 rounded'
        >
          Cập nhật
        </button>
      </form>

      {/* Reset Password */}
      <h2 className='text-2xl font-bold text-gray-800 my-6'>Đổi mật khẩu</h2>
      <form
        onSubmit={handleSubmitPasswordReset}
        className='bg-white p-6 rounded-lg shadow-md'
      >
        <div className='mb-4'>
          <label
            htmlFor='currentPassword'
            className='block text-gray-700 text-sm font-bold mb-2'
          >
            Mật khẩu hiện tại:
          </label>
          <input
            type='password'
            id='currentPassword'
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            className='shadow appearance-none border rounded w-full  p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='newPassword'
            className='block text-gray-700 text-sm font-bold mb-2'
          >
            Mật khẩu mới:
          </label>
          <input
            type='password'
            id='newPassword'
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className='shadow appearance-none border rounded w-full  p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='confirmPassword'
            className='block text-gray-700 text-sm font-bold mb-2'
          >
            Nhập lại mật khẩu mới:
          </label>
          <input
            type='password'
            id='confirmPassword'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className='shadow appearance-none border rounded w-full  p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>
        <button
          type='submit'
          className='bg-primary hover:bg-hover-primary w-full text-white font-bold  p-4 rounded'
        >
          Đổi mật khẩu
        </button>
      </form>
    </div>
  );
}

export default AccountInfo;

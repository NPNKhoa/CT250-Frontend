import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@assets/user.png';
import PasswordInput from '@components/PasswordInput';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUser, updateUserInfoThunk } from '@redux/thunk/userThunk';

function AccountInfo() {
  const dispatch = useDispatch();

  // Lấy thông tin người dùng từ Redux store
  const user = useSelector(state => state.users.user);
  const accessToken = localStorage.getItem('accessToken');

  // Gọi API lấy thông tin người dùng khi component được mount
  useEffect(() => {
    if (accessToken) {
      dispatch(getLoggedInUser(accessToken));
    }
  }, [dispatch, accessToken]);

  // Cập nhật userData khi dữ liệu người dùng thay đổi
  useEffect(() => {
    if (user) {
      const formattedDateOfBirth = user.dateOfBirth
        ? new Date(user.dateOfBirth).toISOString().split('T')[0]
        : '';

      setUserData({
        email: user.email || '',
        fullName: user.fullname || '',
        phoneNumber: user.phone || '',
        gender: user.gender || '',
        dateOfBirth: formattedDateOfBirth,
        avatarImagePath: user.avatarImagePath || Avatar,
      });
    }
  }, [user]);

  const [userData, setUserData] = useState({
    email: '',
    fullName: '',
    phoneNumber: '',
    gender: '',
    dateOfBirth: '',
    avatarImagePath: Avatar,
  });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;
    setUserData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const updatedData = {
      email: userData.email || '',
      fullname: userData.fullName || '',
      phone: userData.phoneNumber || '',
      gender: userData.gender || '',
      dateOfBirth: userData.dateOfBirth || '',
      avatarImagePath: avatar
        ? URL.createObjectURL(avatar)
        : userData.avatarImagePath,
    };

    try {
      console.log('Updating with data:', updatedData); // Debug output
      await dispatch(
        updateUserInfoThunk({ updatedData, accessToken })
      ).unwrap();

      // Tải lại dữ liệu người dùng sau khi cập nhật thành công
      dispatch(getLoggedInUser(accessToken));

      alert('Thông tin tài khoản đã được cập nhật thành công.');
    } catch (error) {
      alert(`Có lỗi xảy ra khi cập nhật thông tin: ${error.message || error}`);
    }
  };

  const handleSubmitPasswordReset = event => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Mật khẩu mới không khớp!');
      return;
    }

    alert(
      `Mật khẩu hiện tại: ${currentPassword}\nMật khẩu mới: ${newPassword}\nXác nhận mật khẩu mới: ${confirmPassword}`
    );
  };

  const handleAvatarChange = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(file);
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='container mx-auto px-4 w-full md:w-2/3 py-5'>
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
        <div className='mb-4 flex items-center'>
          <div className='flex items-center border py-3 px-5 rounded-xl bg-gray-200'>
            <label
              htmlFor='avatar'
              className='block text-gray-700 text-sm font-bold mb-2 mr-4'
            >
              Avatar:
            </label>
            <input
              type='file'
              id='avatar'
              accept='image/*'
              onChange={handleAvatarChange}
              className='mb-4'
            />
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt='Avatar Preview'
                className='w-24 h-24 object-cover rounded-full'
              />
            ) : (
              <div className='border rounded-lg'>
                <img
                  src={Avatar}
                  alt='Avatar Preview'
                  className='w-24 h-24 object-cover rounded-full'
                />
              </div>
            )}
          </div>
        </div>

        {['email', 'fullName', 'phoneNumber', 'gender', 'dateOfBirth'].map(
          field => (
            <div key={field} className='mb-4'>
              <label
                htmlFor={field}
                className='block text-gray-700 text-sm font-bold mb-2'
              >
                {field.charAt(0).toUpperCase() +
                  field.slice(1).replace(/([A-Z])/g, ' $1')}
                :
              </label>
              {field === 'gender' ? (
                <select
                  id={field}
                  name={field}
                  value={userData[field]}
                  onChange={handleChange}
                  className='shadow appearance-none border rounded w-full p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                >
                  <option value=''>Chọn giới tính</option>
                  <option value='male'>Nam</option>
                  <option value='female'>Nữ</option>
                  <option value='other'>Khác</option>
                </select>
              ) : (
                <input
                  type={field === 'dateOfBirth' ? 'date' : 'text'}
                  id={field}
                  name={field}
                  value={userData[field]}
                  onChange={handleChange}
                  className='shadow appearance-none border rounded w-full p-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  required
                />
              )}
            </div>
          )
        )}

        <button
          type='submit'
          className='bg-primary hover:bg-hover-primary w-full text-white font-bold p-4 rounded'
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
        {['currentPassword', 'newPassword', 'confirmPassword'].map(field => (
          <div key={field} className='mb-4'>
            <label
              htmlFor={field}
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              {field.charAt(0).toUpperCase() +
                field.slice(1).replace(/([A-Z])/g, ' $1')}
              :
            </label>
            <PasswordInput
              id={field}
              value={
                field === 'currentPassword'
                  ? currentPassword
                  : field === 'newPassword'
                  ? newPassword
                  : confirmPassword
              }
              onChange={e => {
                if (field === 'currentPassword')
                  setCurrentPassword(e.target.value);
                if (field === 'newPassword') setNewPassword(e.target.value);
                if (field === 'confirmPassword')
                  setConfirmPassword(e.target.value);
              }}
            />
          </div>
        ))}
        <button
          type='submit'
          className='bg-primary hover:bg-hover-primary w-full text-white font-bold p-4 rounded'
        >
          Đổi mật khẩu
        </button>
      </form>
    </div>
  );
}

export default AccountInfo;

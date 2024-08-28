import { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@assets/user.png';
import PasswordInput from '@components/PasswordInput';

function AccountInfo() {
  const [userData, setUserData] = useState({
    email: 'test1@gmail.com',
    fullName: 'Nguyen Minh Tu',
    phoneNumber: '0845969757',
    gender: '',
    dateOfBirth: '',
    avatarImagePath: '',
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

  const handleSubmit = event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('email', userData.email);
    formData.append('fullName', userData.fullName);
    formData.append('phoneNumber', userData.phoneNumber);
    formData.append('gender', userData.gender);
    formData.append('dateOfBirth', userData.dateOfBirth);
    formData.append('avatarImagePath', avatar || userData.avatarImagePath);

    let avatarImagePath = avatar
      ? URL.createObjectURL(avatar)
      : userData.avatarImagePath;

    const message = `
      Email: ${userData.email}
      Họ và tên: ${userData.fullName}
      Số điện thoại: ${userData.phoneNumber}
      Giới tính: ${userData.gender}
      Ngày sinh: ${userData.dateOfBirth}
      Avatar: ${avatar ? 'Đã cập nhật' : 'Không thay đổi'}
      (Avatar Preview: ${avatarImagePath})
    `;

    alert(message);
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

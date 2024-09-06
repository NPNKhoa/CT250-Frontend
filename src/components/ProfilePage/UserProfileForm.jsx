import Avatar from '@assets/user.png';
import { getLoggedInUser, updateUserInfoThunk } from '@redux/thunk/userThunk';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function UserProfileForm() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (accessToken) {
      dispatch(getLoggedInUser(accessToken));
    }
  }, [dispatch, accessToken]);

  const [userData, setUserData] = useState({
    email: '',
    fullName: '',
    phoneNumber: '',
    gender: '',
    dateOfBirth: '',
    avatarImagePath: '',
  });

  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');

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

  const handleChange = event => {
    const { name, value } = event.target;
    setUserData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const updatedData = {
      email: userData.email,
      fullname: userData.fullName,
      phone: userData.phoneNumber,
      gender: userData.gender,
      dateOfBirth: userData.dateOfBirth,
      avatarImagePath: avatar
        ? URL.createObjectURL(avatar)
        : userData.avatarImagePath,
    };

    try {
      await dispatch(
        updateUserInfoThunk({ updatedData, accessToken })
      ).unwrap();
      dispatch(getLoggedInUser(accessToken));
      alert('Thông tin tài khoản đã được cập nhật.');
    } catch (error) {
      alert(`Cập nhật thông tin thất bại: ${error.message}`);
    }
  };
  return (
    <form onSubmit={handleSubmit} className=''>
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
                className='shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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
                className='shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                required
              />
            )}
          </div>
        )
      )}

      <button
        type='submit'
        className='bg-primary hover:bg-hover-primary w-full text-white font-bold p-3 rounded'
      >
        Cập nhật
      </button>
    </form>
  );
}

export default UserProfileForm;

import Avatar from '@assets/user.png';
import {
  changeAvatarThunk,
  getLoggedInUser,
  updateUserInfoThunk,
} from '@redux/thunk/userThunk';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function UserProfileForm() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const accessToken = localStorage.getItem('accessToken');

  const [userData, setUserData] = useState({
    email: '',
    fullName: '',
    phoneNumber: '',
    gender: '',
    dateOfBirth: '',
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(Avatar);
  const [avatarUpdated, setAvatarUpdated] = useState(false); // Trạng thái theo dõi avatar đã cập nhật
  const fileInputRef = useRef(null);

  // Lấy thông tin người dùng khi trang tải lần đầu hoặc accessToken thay đổi
  useEffect(() => {
    if (accessToken) {
      dispatch(getLoggedInUser(accessToken));
    }
  }, [dispatch, accessToken]);

  // Cập nhật thông tin người dùng và preview avatar khi người dùng thay đổi
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
      });

      // Nếu người dùng đã có avatar thì hiển thị ảnh từ server
      setAvatarPreview(
        user.avatarImagePath
          ? `http://localhost:5000/${user.avatarImagePath.replace(/\\/g, '/')}`
          : Avatar
      );
    }
  }, [user]);

  // useEffect(() => {
  //   if (avatarUpdated && accessToken) {
  //     dispatch(getLoggedInUser(accessToken));
  //     setAvatarUpdated(false);
  //   }
  // }, [avatarUpdated, accessToken, dispatch]);

  const handleChange = event => {
    const { name, value } = event.target;
    setUserData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAvatarChange = e => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);

      // Hiển thị avatar preview ngay lập tức
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeAvatar = async () => {
    if (!avatarFile) {
      alert('Please select an avatar image.');
      return;
    }

    try {
      await dispatch(changeAvatarThunk({ avatarFile, accessToken }));
      alert('Avatar updated successfully!');
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Reset giá trị của input file
      }
      setAvatarUpdated(true); // Đánh dấu rằng avatar đã được cập nhật
    } catch (error) {
      console.log(error);
      alert('Failed to update avatar.');
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const updatedData = {
      email: userData.email,
      fullname: userData.fullName,
      phone: userData.phoneNumber,
      gender: userData.gender,
      dateOfBirth: userData.dateOfBirth,
    };

    try {
      await dispatch(
        updateUserInfoThunk({ updatedData, accessToken })
      ).unwrap();
      alert('Thông tin tài khoản đã được cập nhật.');
    } catch (error) {
      alert(`Cập nhật thông tin thất bại: ${error.message}`);
    }

    dispatch(getLoggedInUser(accessToken));
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
            ref={fileInputRef}
            accept='image/*'
            onChange={handleAvatarChange}
            className='mb-4'
          />
          <img
            src={avatarPreview} // Hiển thị avatar preview
            alt='Avatar Preview'
            className='w-24 h-24 object-cover rounded-full'
          />
        </div>
        <button
          type='button'
          onClick={handleChangeAvatar}
          className='ml-4 bg-primary text-white px-4 py-2 rounded-lg'
        >
          Update Avatar
        </button>
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

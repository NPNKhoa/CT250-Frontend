import Avatar from '@assets/user.png';
import {
  changeAvatarThunk,
  getLoggedInUser,
  updateUserInfoThunk,
} from '@redux/thunk/userThunk';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { toast } from 'react-toastify';

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
  // const [avatarUpdated, setAvatarUpdated] = useState(false); // Trạng thái theo dõi avatar đã cập nhật
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
        user?.avatarImagePath
          ? user?.avatarImagePath.startsWith('http')
            ? user?.avatarImagePath
            : `http://localhost:5000/${user?.avatarImagePath.replace(
                /\\/g,
                '/'
              )}`
          : Avatar
      );
    }
  }, [user]);

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
      toast.error('Vui lòng chọn ảnh đại diện');

      return;
    }

    try {
      await dispatch(changeAvatarThunk({ avatarFile, accessToken }));

      toast.success('Đổi ảnh đại diện thành công');
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Reset giá trị của input file
      }
      // setAvatarUpdated(true); // Đánh dấu rằng avatar đã được cập nhật
    } catch (error) {
      console.log(error);
      toast.error('Đổi ảnh đại diện thất bại');
    }
    dispatch(getLoggedInUser(accessToken));
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
      toast.success('Cập nhật thông tin tài khoản thành công');
    } catch (error) {
      console.log(error);

      toast.error('Cập nhật thông tin thất bại');
    }

    dispatch(getLoggedInUser(accessToken));
  };

  const fieldLabels = {
    email: 'Email',
    fullName: 'Họ và tên',
    phoneNumber: 'Số điện thoại',
    gender: 'Giới tính',
    dateOfBirth: 'Ngày sinh',
  };

  return (
    <form onSubmit={handleSubmit} className=''>
      <div className='flex items-center mb-4'>
        <div className='relative'>
          <img
            src={avatarPreview}
            alt='Avatar Preview'
            className='w-32 h-32 object-cover rounded-full border-2 border-gray-300'
          />

          <label
            htmlFor='avatar'
            className='absolute bottom-1 right-1 bg-gray-100 p-1 rounded-full cursor-pointer hover:bg-gray-200 transition'
          >
            <input
              type='file'
              id='avatar'
              ref={fileInputRef}
              accept='image/*'
              onChange={handleAvatarChange}
              className='hidden'
            />
            <CameraAltIcon className='text-gray-700' fontSize='small' />
          </label>
        </div>
        <button
          type='button'
          onClick={handleChangeAvatar}
          className='ml-4 bg-primary text-white px-4 py-2 rounded-lg'
        >
          Đổi ảnh đại diện
        </button>
      </div>

      {['email', 'fullName', 'phoneNumber', 'gender', 'dateOfBirth'].map(
        field => (
          <div key={field} className='mb-4'>
            <label
              htmlFor={field}
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              {fieldLabels[field]}:
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

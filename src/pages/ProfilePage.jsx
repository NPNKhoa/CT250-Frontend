import { useEffect, useState } from 'react';
import {
  AccountCircle,
  CreditCard,
  LocationOn,
  Lock,
  Notifications,
  Security,
  ShoppingCart,
} from '@mui/icons-material'; // Import icons từ Material UI
import Avatar from '@assets/user.png';
import UserProfileForm from '@components/ProfilePage/UserProfileForm'; // Đường dẫn component của bạn
import PasswordResetForm from '@components/ProfilePage/PasswordResetForm'; // Đường dẫn component của bạn
// import AddressSection from './AddressSection'; // Đường dẫn component của bạn
import {
  getLoggedInUser,
  updatePasswordThunk,
  updateUserInfoThunk,
} from '@redux/thunk/userThunk';
import { useDispatch, useSelector } from 'react-redux';

function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState('profile'); // Mặc định là "profile"

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

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmitPasswordReset = async event => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Mật khẩu mới không khớp!');
      return;
    }

    try {
      await dispatch(
        updatePasswordThunk({
          updatedData: {
            oldPassword: currentPassword,
            password: newPassword,
            confirmPassword,
          },
          accessToken,
        })
      ).unwrap();

      alert('Mật khẩu đã được thay đổi thành công.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      alert(`Đổi mật khẩu thất bại: ${error.message}`);
    }
  };

  const handleChangePassword = e => {
    const { name, value } = e.target;
    if (name === 'currentPassword') setCurrentPassword(value);
    if (name === 'newPassword') setNewPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'profile':
        return (
          <UserProfileForm
            userData={userData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleAvatarChange={handleAvatarChange}
            avatarPreview={avatarPreview}
          />
        );
      // case 'bank':
      //   return <BankComponent />;
      // case 'address':
      //   return <AddressSection />;
      case 'change-password':
        return (
          <PasswordResetForm
            currentPassword={currentPassword}
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            handleChangePassword={handleChangePassword}
            handleSubmitPasswordReset={handleSubmitPasswordReset}
          />
        );
      // case 'notification-settings':
      //   return <NotificationSettingsComponent />;
      // case 'privacy-settings':
      //   return <PrivacySettingsComponent />;
      // case 'orders':
      //   return <OrdersComponent />;
      // default:
      //   return <ProfileComponent />;
    }
  };

  return (
    <div className='container mx-auto py-6 px-4'>
      <div className='flex flex-col lg:flex-row gap-6'>
        {/* Sidebar */}
        <div className='w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-md'>
          <div className='text-center mb-4'>
            <img
              src={Avatar}
              alt='User avatar'
              className='mx-auto rounded-full mb-2 size-24 border-2 border-primary'
            />
            <p className='text-lg font-bold'>{user?.fullname}</p>
            <button className='text-blue-500 hover:underline'>Sửa Hồ Sơ</button>
          </div>
          <ul className='space-y-3'>
            <li>
              <button
                className={`flex items-center gap-2 w-full text-left py-2 px-4 rounded-lg transition-colors ${
                  selectedTab === 'profile'
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setSelectedTab('profile')}
              >
                <AccountCircle /> <span>Hồ Sơ</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center gap-2 w-full text-left py-2 px-4 rounded-lg transition-colors ${
                  selectedTab === 'bank'
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setSelectedTab('bank')}
              >
                <CreditCard /> <span>Ngân Hàng</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center gap-2 w-full text-left py-2 px-4 rounded-lg transition-colors ${
                  selectedTab === 'address'
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setSelectedTab('address')}
              >
                <LocationOn /> <span>Địa Chỉ</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center gap-2 w-full text-left py-2 px-4 rounded-lg transition-colors ${
                  selectedTab === 'change-password'
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setSelectedTab('change-password')}
              >
                <Lock /> <span>Đổi Mật Khẩu</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center gap-2 w-full text-left py-2 px-4 rounded-lg transition-colors ${
                  selectedTab === 'notification-settings'
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setSelectedTab('notification-settings')}
              >
                <Notifications /> <span>Cài Đặt Thông Báo</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center gap-2 w-full text-left py-2 px-4 rounded-lg transition-colors ${
                  selectedTab === 'privacy-settings'
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setSelectedTab('privacy-settings')}
              >
                <Security /> <span>Những Thiết Lập Riêng Tư</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center gap-2 w-full text-left py-2 px-4 rounded-lg transition-colors ${
                  selectedTab === 'orders'
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setSelectedTab('orders')}
              >
                <ShoppingCart /> <span>Đơn Mua</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Nội dung thay đổi */}
        <div className='w-full lg:w-3/4 bg-white p-6 rounded-lg shadow-md'>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

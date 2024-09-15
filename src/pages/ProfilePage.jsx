import { useEffect, useState } from 'react';
import {
  AccountCircle,
  // CreditCard,
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
import { getLoggedInUser } from '@redux/thunk/userThunk';
import { useDispatch, useSelector } from 'react-redux';
import AddressSection from '@components/ProfilePage/AddressSection';

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

  const tabs = [
    { id: 'profile', label: 'Hồ Sơ', icon: <AccountCircle /> },
    { id: 'address', label: 'Địa Chỉ', icon: <LocationOn /> },
    { id: 'change-password', label: 'Đổi Mật Khẩu', icon: <Lock /> },
    { id: 'orders', label: 'Đơn Mua', icon: <ShoppingCart /> },
    {
      id: 'notification-settings',
      label: 'Cài Đặt Thông Báo',
      icon: <Notifications />,
    },
    {
      id: 'privacy-settings',
      label: 'Những Thiết Lập Riêng Tư',
      icon: <Security />,
    },
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case 'profile':
        return <UserProfileForm />;
      // case 'bank':
      //   return <BankComponent />;
      case 'address':
        return <AddressSection />;
      case 'change-password':
        return <PasswordResetForm />;
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
              src={
                user && user?.avatarImagePath
                  ? user?.avatarImagePath.startsWith('http')
                    ? user?.avatarImagePath
                    : `http://localhost:5000/${user?.avatarImagePath.replace(
                        /\\/g,
                        '/'
                      )}`
                  : Avatar
              }
              alt='User avatar'
              className='mx-auto rounded-full mb-2 size-24 border-2 border-primary'
            />
            <p className='text-lg font-bold'>{user?.fullname}</p>
            <button
              className='text-blue-500 hover:underline'
              onClick={() => setSelectedTab('profile')}
            >
              Sửa Hồ Sơ
            </button>
          </div>
          <ul className='space-y-3'>
            {tabs.map(tab => (
              <li key={tab.id}>
                <button
                  className={`flex items-center gap-2 w-full text-left py-2 px-4 rounded-lg transition-colors ${
                    selectedTab === tab.id
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedTab(tab.id)}
                >
                  {tab.icon} <span>{tab.label}</span>
                </button>
              </li>
            ))}
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

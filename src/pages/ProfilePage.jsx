import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Correct import statement
import {
  AccountCircle,
  LocationOn,
  Lock,
  // Notifications,
  Security,
  ShoppingCart,
} from '@mui/icons-material'; // Import icons from Material UI
import Avatar from '@assets/user.png';
import UserProfileForm from '@components/ProfilePage/UserProfileForm'; // Correct component path
import PasswordResetForm from '@components/ProfilePage/PasswordResetForm'; // Correct component path
import AddressSection from '@components/ProfilePage/AddressSection'; // Correct component path
import OrderHistory from '@components/ProfilePage/OrderHistory'; // Correct component path
import { getLoggedInUser } from '@redux/thunk/userThunk';
import { useDispatch, useSelector } from 'react-redux';
import VoucherManager from '@components/ProfilePage/VoucherManager';
import { Gift } from 'lucide-react';

function ProfilePage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('tab') || 'profile';
  const [selectedTab, setSelectedTab] = useState(initialTab);

  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (accessToken) {
      dispatch(getLoggedInUser(accessToken));
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    setSelectedTab(initialTab);
  }, [initialTab]);

  const tabs = [
    { id: 'profile', label: 'Hồ Sơ', icon: <AccountCircle /> },
    { id: 'address', label: 'Địa Chỉ', icon: <LocationOn /> },
    { id: 'change-password', label: 'Đổi Mật Khẩu', icon: <Lock /> },
    { id: 'orders', label: 'Đơn Mua', icon: <ShoppingCart /> },
    { id: 'vouchers', label: 'Kho Vouchers', icon: <Gift /> },
    // {
    //   id: 'notification-settings',
    //   label: 'Cài Đặt Thông Báo',
    //   icon: <Notifications />,
    // },
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
      case 'address':
        return <AddressSection />;
      case 'change-password':
        return <PasswordResetForm />;
      case 'orders':
        return <OrderHistory />;
      case 'vouchers':
        return <VoucherManager />;
      default:
        return <UserProfileForm />;
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

        {/* Content */}
        <div className='w-full lg:w-3/4 bg-white p-6 rounded-lg shadow-md'>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

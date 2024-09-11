import NavBar from '@components/NavBar';
import LogoImg from '@assets/logo.svg';
import SearchComponent from '@components/SearchComponent';
import CartComponent from '@components/CartComponent';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setCredentials } from '@redux/slices/authSlice';
import { getCartByUser } from '@redux/thunk/cartThunk';

import {
  AccountCircleSharp as AccountCircleSharpIcon,
  AddShoppingCartSharp as AddShoppingCartSharpIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  PersonSearchRounded as PersonSearchRoundedIcon,
  PhoneCallbackSharp as PhoneCallbackSharpIcon,
  PlaceSharp as PlaceSharpIcon,
} from '@mui/icons-material';
import Avatar from '@assets/user.png';
import { getLoggedInUser } from '@redux/thunk/userThunk';
// import { getLoggedInUser } from '@redux/thunk/userThunk';

// Custom hook for handling modal states
const useModalState = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);
  return [isOpen, handleMouseEnter, handleMouseLeave];
};

const Header = () => {
  const [isModalAccount, handleMouseEnterAccount, handleMouseLeaveAccount] =
    useModalState();
  const [isModalContact, handleMouseEnterContact, handleMouseLeaveContact] =
    useModalState();
  const [isModalCart, handleMouseEnterCart, handleMouseLeaveCart] =
    useModalState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const cartItems = cart.cart?.cartItems || [];
  const user = useSelector(state => state.auth.authUser);

  const userExist = useSelector(state => state.users.user);
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    dispatch(getCartByUser(accessToken));

    if (refreshToken && accessToken) {
      dispatch(setCredentials({ accessToken, refreshToken }));
    }

    if (accessToken) {
      dispatch(getLoggedInUser(accessToken));
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <>
      <div className='bg-white '>
        <div className='container mx-auto px-4 flex justify-center items-center'>
          <div className='px-6 py-3'>
            <Link to='/'>
              <img src={LogoImg} alt='Logo' className='w-[60px]' />
            </Link>
          </div>

          <div className='px-6 flex flex-col items-center'>
            <ul className='flex gap-10'>
              <li className='flex gap-3 items-center'>
                <PhoneCallbackSharpIcon className='text-primary' />
                <p className='font-bold text-sm'>
                  HOTLINE:{' '}
                  <span className='text-primary px-2 hover:text-black'>
                    0977508430 | 0792677415
                  </span>
                </p>
              </li>

              <li className='flex gap-3 relative'>
                <SearchComponent />
              </li>
            </ul>
            <hr className='mt-3 w-full text-gray-300' />
          </div>

          <div className='flex justify-center gap-6'>
            <div className='flex justify-center gap-6 relative'>
              <div
                className='flex flex-col items-center justify-center text-center space-x-2 cursor-pointer'
                onMouseEnter={handleMouseEnterContact}
                onMouseLeave={handleMouseLeaveContact}
              >
                <span className='border border-gray-300 p-1 flex justify-center items-center rounded-full bg-white w-10 h-10'>
                  <PersonSearchRoundedIcon className='text-primary' />
                </span>
                <h3 className='font-semibold text-sm uppercase mt-1'>
                  Tra cứu
                </h3>
              </div>
              {isModalContact && (
                <div
                  className='absolute top-12 mt-2 right-0 w-40 bg-white rounded-lg shadow-lg z-50'
                  onMouseEnter={handleMouseEnterContact}
                  onMouseLeave={handleMouseLeaveContact}
                >
                  <div className='flex flex-col space-y-2 rounded-lg'>
                    <Link
                      to='/checkorder'
                      className='hover:bg-primary hover:text-white rounded-t-lg p-2 text-center'
                    >
                      Kiểm tra đơn hàng
                    </Link>
                    <Link
                      to='/checkwarranty'
                      className='hover:bg-primary hover:text-white rounded-b-lg p-2 text-center'
                    >
                      Kiểm tra bảo hành
                    </Link>
                  </div>
                </div>
              )}
              <div
                className='flex flex-col items-center justify-center text-center space-x-2 cursor-pointer'
                onMouseEnter={handleMouseEnterAccount}
                onMouseLeave={handleMouseLeaveAccount}
              >
                <span className='border border-gray-300 flex justify-center items-center p-1 rounded-full bg-white w-10 h-10'>
                  {user ? (
                    <img
                      src={
                        user && userExist?.avatarImagePath
                          ? `http://localhost:5000/${userExist?.avatarImagePath.replace(
                              /\\/g,
                              '/'
                            )}`
                          : Avatar
                      }
                      alt='User avatar'
                      className='rounded-full '
                    />
                  ) : (
                    <AccountCircleSharpIcon className='text-primary' />
                  )}
                </span>
                <h3 className='font-semibold text-sm  uppercase mt-1'>
                  {user ? userExist?.fullname : 'Tài khoản'}
                </h3>
              </div>
              {isModalAccount && (
                <div
                  className='absolute top-12 mt-2 left-0 w-40 bg-white rounded-lg shadow-lg z-50'
                  onMouseEnter={handleMouseEnterAccount}
                  onMouseLeave={handleMouseLeaveAccount}
                >
                  <div className='flex flex-col space-y-2 rounded-lg'>
                    {user ? (
                      <>
                        <Link
                          to='/profile'
                          className='hover:bg-primary hover:text-white rounded-t-lg p-2 text-center'
                        >
                          Thông tin tài khoản
                        </Link>
                        <button
                          onClick={handleLogout}
                          className='hover:bg-primary hover:text-white rounded-b-lg p-2 text-center'
                        >
                          Đăng xuất
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to='/signup'
                          className='hover:bg-primary hover:text-white rounded-t-lg p-2 text-center'
                        >
                          <PersonAddIcon /> Đăng ký
                        </Link>
                        <Link
                          to='/login'
                          className='hover:bg-primary hover:text-white rounded-b-lg p-2 text-center'
                        >
                          <LoginIcon /> Đăng nhập
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className='flex flex-col items-center justify-center text-center space-x-2 relative cursor-pointer'>
              <Link
                to='/cart'
                onMouseEnter={handleMouseEnterCart}
                onMouseLeave={handleMouseLeaveCart}
              >
                <span className='border border-gray-300 p-1 flex justify-center items-center rounded-full bg-white w-10 h-10'>
                  <AddShoppingCartSharpIcon className='text-primary' />
                </span>
                <h3 className='font-semibold text-sm  uppercase mt-1'>
                  Giỏ hàng
                </h3>
                <span className='absolute -top-1 right-6 bg-primary rounded-full text-white p-1 w-4 h-4 flex items-center justify-center text-xs'>
                  {cartItems.length}
                </span>
              </Link>
              {isModalCart && (
                <div
                  className='absolute top-12 right-0 w-96 bg-white rounded-lg shadow-lg z-50'
                  onMouseEnter={handleMouseEnterCart}
                  onMouseLeave={handleMouseLeaveCart}
                >
                  <CartComponent />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <NavBar />
    </>
  );
};

export default Header;

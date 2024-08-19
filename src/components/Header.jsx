// eslint-disable-next-line no-unused-vars
import NavBar from "@components/NavBar";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import AddShoppingCartSharpIcon from "@mui/icons-material/AddShoppingCartSharp";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import PhoneCallbackSharpIcon from "@mui/icons-material/PhoneCallbackSharp";
import PlaceSharpIcon from "@mui/icons-material/PlaceSharp";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import { useState } from "react";
import { Link } from "react-router-dom";
import CartIcon from "@assets/cart-icon.png";
import LogoImg from "@assets/logo.svg";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(true);

  const handleMouseEnter = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleContact = () => {
    setIsOpen(!isOpen);
  };

  const handleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <>
      <div className="bg-white flex justify-center items-center">
        <div className=""></div>
        <div className="p-3">
          <Link to="/">
            <img src={LogoImg} alt="" className="w-[60px]" />
          </Link>
        </div>
        <div className="px-5 flex flex-col items-center">
          <ul className=" flex gap-5">
            <li className="flex gap-2 items-center">
              <PhoneCallbackSharpIcon className="text-primary " />
              <p className="font-bold text-sm">
                HOTLINE:
                <span className="text-primary text-center px-2 hover:text-black ">
                  0977508430 | 0792677415
                </span>
              </p>
            </li>
            <li className="flex gap-2 items-center">
              <PlaceSharpIcon className="text-primary" />
              <p className="font-semibold uppercase text-sm">
                Hệ thống cửa hàng
              </p>
            </li>
            <li className="flex gap-3 relative">
              <form action="#">
                <input
                  type="text"
                  className="bg-gray-200 w-[300px] rounded-lg p-1"
                  placeholder="Tìm sản phẩm..."
                />
                <button className="absolute top-1 right-2 m-0">
                  <SearchSharpIcon className="text-primary" />
                </button>
              </form>
            </li>
          </ul>
          <hr className="mt-3 w-full text-gray-300" />
        </div>

        <div className=" flex justify-center gap-5 ">
          <div className="flex justify-center gap-5 relative">
            {/* Tra cứu */}
            <div
              className="flex flex-col items-center justify-center text-center space-x-2 cursor-pointer"
              onMouseEnter={handleContact}
            >
              <span className="border border-gray-300 p-1 flex justify-center items-center rounded-full bg-white w-10 h-10">
                <PersonSearchRoundedIcon className="text-primary" />
              </span>
              <h3 className="font-thin text-xs uppercase mt-1">Tra cứu</h3>
            </div>

            {isOpen && (
              <div
                onMouseLeave={handleContact}
                className="absolute top-full mt-2 right-0 w-40 bg-white rounded-lg shadow-lg z-50"
              >
                <div className="flex flex-col space-y-2 rounded-lg">
                  <Link
                    to="/"
                    className="hover:bg-primary hover:text-white rounded-t-lg p-2 text-center"
                  >
                    Kiểm tra đơn hàng
                  </Link>
                  <Link
                    to="/"
                    className="hover:bg-primary hover:text-white rounded-b-lg p-2 text-center"
                  >
                    Kiểm tra bảo hành
                  </Link>
                </div>
              </div>
            )}

            {/* Tài khoản */}
            <div
              className="flex flex-col items-center justify-center text-center space-x-2 cursor-pointer"
              onMouseEnter={handleMouseEnter}
            >
              <span className="border border-gray-300 p-1 flex justify-center items-center rounded-full bg-white w-10 h-10">
                <AccountCircleSharpIcon className="text-primary" />
              </span>
              <h3 className="font-thin text-xs uppercase mt-1">Tài khoản</h3>
            </div>

            {isModalOpen && (
              <div
                onMouseLeave={handleMouseEnter}
                className="absolute top-full mt-2 right-0 w-40 bg-white rounded-lg shadow-lg z-50"
              >
                <div className="flex flex-col space-y-2 rounded-lg">
                  <Link
                    to="/signup"
                    className="hover:bg-primary hover:text-white rounded-t-lg p-2 text-center"
                  >
                    <PersonAddIcon /> Đăng ký
                  </Link>
                  <Link
                    to="/login"
                    className="hover:bg-primary hover:text-white rounded-b-lg p-2 text-center"
                  >
                    <LoginIcon /> Đăng nhập
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div
            onMouseEnter={handleCart}
            className="flex flex-col items-center justify-center text-center space-x-2 relative cursor-pointer"
          >
            <span className="border border-gray-300 p-1 flex justify-center items-center rounded-full bg-white w-10 h-10">
              <AddShoppingCartSharpIcon className="text-primary" />
            </span>
            <h3 className="font-thin text-xs uppercase mt-1">Giỏ hàng</h3>
            <span className="absolute -top-1 right-2 bg-primary rounded-full text-white p-1 w-4 h-4 flex items-center justify-center text-xs">
              0
            </span>

            {isCartOpen && (
              <div
                onMouseLeave={handleCart}
                className="absolute top-12 right-0 p-5 w-64 bg-white rounded-lg shadow-lg z-50"
              >
                <div className="mt-4 flex flex-col space-y-2 text-center items-center">
                  <img src={CartIcon} alt="" className="w-24" />
                  <h3>Không có sản phẩm nào trong giỏ hàng của bạn</h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <NavBar />
    </>
  );
};

export default Header;

// eslint-disable-next-line no-unused-vars
import React from "react";
import LogoImg from "../../assets/logo.svg";
import PhoneCallbackSharpIcon from "@mui/icons-material/PhoneCallbackSharp";
import PlaceSharpIcon from "@mui/icons-material/PlaceSharp";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";

const Header = () => {
  return (
    <div className="bg-slate-300 flex justify-center items-center px-10 ">
      <div className=""></div>
      <div className="p-3">
        <img src={LogoImg} alt="" className="w-[60px]" />
      </div>
      <div className="px-10 flex flex-col items-center">
        <ul className=" flex gap-14">
          <li className="flex gap-4 items-center">
            <PhoneCallbackSharpIcon className="text-red-500 " />
            <p className="font-bold text-sm">
              HOTLINE:
              <span className="text-red-500 text-center">
                0123457889 | 0098757899
              </span>
            </p>
          </li>
          <li className="flex gap-2 items-center">
            <PlaceSharpIcon className="text-red-500" />
            <p className="font-semibold uppercase text-sm">Hệ thống cửa hàng</p>
          </li>
          <li className="flex gap-3 relative">
            <form action="#">
              <input
                type="text"
                className="bg-gray-200 w-[300px] rounded-lg p-1 out"
                placeholder="Tìm sản phẩm..."
              />
              <button className="absolute top-1 right-2 m-0">
                <SearchSharpIcon className="text-red-500" />
              </button>
            </form>
          </li>
        </ul>
        <hr className="mt-3 w-full text-gray-300" />
      </div>

      <div className=" flex justify-center gap-5 ">
        <div className="flex flex-col items-center justify-center text-center space-x-2">
          <span className="border border-gray-300 p-1 flex justify-center items-center rounded-full bg-white w-10 h-10">
            <AccountCircleSharpIcon className="text-red-500" />
          </span>
          <h3 className="font-thin text-xs uppercase">Tài khoản</h3>
        </div>

        <div className="flex flex-col items-center justify-center text-center space-x-2">
          <span className="border border-gray-300 p-1 flex justify-center items-center rounded-full bg-white w-10 h-10">
            <AccountCircleSharpIcon className="text-red-500" />
          </span>
          <h3 className="font-thin text-xs uppercase">Tài khoản</h3>
        </div>
        <div className="flex flex-col items-center justify-center text-center space-x-2">
          <span className="border border-gray-300 p-1 flex justify-center items-center rounded-full bg-white w-10 h-10">
            <AccountCircleSharpIcon className="text-red-500" />
          </span>
          <h3 className="font-thin text-xs uppercase">Tài khoản</h3>
        </div>
      </div>
    </div>
  );
};

export default Header;

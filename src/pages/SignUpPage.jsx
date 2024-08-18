import { useState } from "react";
import { Link } from "react-router-dom";

import SignUpImg from "../../src/assets/register.png";
import userIcon from "../../src/assets/user.png";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <section className="flex items-center justify-center ">
      <div className="max-w-3xl mx-auto bg-gray-100  p-8 rounded-lg shadow-md flex">
        <div className="w-1/2 hidden lg:block">
          <img src={SignUpImg} alt="Register" className="rounded-lg" />
        </div>
        <div className="w-full lg:w-1/2">
          <div className="flex justify-center mb-8">
            <img src={userIcon} alt="User Icon" className="w-20 h-20" />
          </div>
          <h2 className="text-2xl font-semibold text-center mb-8">
            Đăng ký tài khoản
          </h2>

          <form>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Username"
                required
                id="username"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                required
                id="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Phone"
                required
                id="phone"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                required
                id="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-hover-primary transition duration-300"
            >
              Đăng ký tài khoản
            </button>
          </form>

          <p className="text-center mt-4">
            <span>Đã có tài khoản? </span>
            <Link to="/login" className="text-primary hover:underline">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;

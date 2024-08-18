import { useState } from "react";
import { Link } from "react-router-dom";

import loginImg from "@assets/login.png";
import userIcon from "@assets/user.png";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <section className="flex items-center justify-center py-10">
      <div className="max-w-3xl mx-auto bg-gray-100 p-8 rounded-lg shadow-md flex">
        <div className="w-1/2 hidden lg:block">
          <img src={loginImg} alt="Login" className="rounded-lg" />
        </div>
        <div className="w-full lg:w-1/2">
          <div className="flex justify-center mb-7">
            <img src={userIcon} alt="User Icon" className="w-20 h-20" />
          </div>
          <h2 className="text-2xl font-semibold text-center mb-7">Đăng nhập</h2>

          <form>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                required
                id="email"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                required
                id="password"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-hover-primary transition duration-300"
            >
              Đăng nhập
            </button>
          </form>

          <p className="text-center mt-4">
            <span className="cursor-pointer hover:text-primary">
              Quên mật khẩu?{" "}
            </span>
            <Link to="/signup" className="text-primary hover:underline">
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;

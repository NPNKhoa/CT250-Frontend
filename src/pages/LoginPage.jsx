import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import loginImg from "@assets/login.png";
import userIcon from "@assets/user.png";

import authService from "@services/auth.service";

const LoginPage = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(credentials);
      console.log("Login successful:", response);
      setNotification({ message: "Login successful!", type: "success" });
    } catch (error) {
      console.error("Login failed:", error);
      setNotification({ message: "Login failed. Please try again.", type: "error" });
    }
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

          <form onSubmit={handleSubmit}>
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

      {notification.message && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 px-20 rounded-lg shadow-lg">
            <p
              className={`text-lg ${
                notification.type === "success" ? "text-green-700" : "text-red-700"
              }`}
            >
              {notification.message}
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => {
                  if (notification.type === "success") handleNavigate("/");
                  setNotification({ message: "", type: "" });
                }}
                className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-hover-primary transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LoginPage;
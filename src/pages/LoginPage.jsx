import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import loginImg from "@assets/login.png";
import userIcon from "@assets/user.png";
import authService from "@services/auth.service";
import Alert from "@components/Alert";

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await authService.login(credentials);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      setNotification({ message: "Login successful!", type: "success" });
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Login failed:", error);
      setNotification({ message: "Login failed! Please try again.", type: "error" });
    }
  };

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => setNotification({ message: "", type: "" }), 2000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

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
            {['email', 'password'].map((field) => (
              <div key={field} className="mb-4">
                <input
                  type={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  required
                  id={field}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-hover-primary transition duration-300"
            >
              Đăng nhập
            </button>
          </form>
          <p className="text-center mt-4">
            <span className="cursor-pointer hover:text-primary">Quên mật khẩu? </span>
            <Link to="/signup" className="text-primary hover:underline">Đăng ký</Link>
          </p>
        </div>
      </div>
      {notification.message && <Alert message={notification.message} type={notification.type} />}
    </section>
  );
};

export default LoginPage;

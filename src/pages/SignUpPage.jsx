import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import SignUpImg from "@assets/register.png";
import userIcon from "@assets/user.png";

import authService from "@services/auth.service";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    fullname: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const formData = new FormData();
    formData.append("fullname", credentials.fullname);
    formData.append("phone", credentials.phone);
    formData.append("email", credentials.email);
    formData.append("password", credentials.password);
    formData.append("confirmPassword", credentials.confirmPassword);
    formData.append("gender", credentials.gender);
    formData.append("imageFile", imageFile);

    try {
      const response = await authService.signup(formData);
      alert("Signup successful:", response);
      navigate("/login");
      // Handle successful signup 
    } catch (error) {
      alert("Signup failed:", error);
      console.error("Signup failed:", error);
      // Handle signup failure 
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md flex">
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

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Full Name"
                required
                id="fullname"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
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
                type="text"
                placeholder="Phone"
                required
                id="phone"
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
            <div className="mb-4">
              <input
                type="password"
                placeholder="Confirm Password"
                required
                id="confirmPassword"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <select
                id="gender"
                required
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <input
                type="file"
                required
                onChange={handleFileChange}
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
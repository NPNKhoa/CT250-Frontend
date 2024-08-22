import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import SignUpImg from "@assets/register.png";
import userIcon from "@assets/user.png";
import authService from "@services/auth.service";
import Alert from "@components/Alert";

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
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => setNotification({ message: "", type: "" }), 2000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      setNotification({ message: "Passwords do not match!", type: "error" });
      return;
    }

    const formData = new FormData();
    Object.keys(credentials).forEach((key) => formData.append(key, credentials[key]));
    formData.append("imageFile", imageFile);

    try {
      await authService.signup(formData);
      setNotification({ message: "Signup successful!", type: "success" });
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setNotification({ message: `${error.response.data.error}`, type: "error" });
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
            {[
              { id: "fullname", type: "text", placeholder: "Full Name" },
              { id: "email", type: "email", placeholder: "Email" },
              { id: "phone", type: "text", placeholder: "Phone" },
              { id: "password", type: "password", placeholder: "Password" },
              { id: "confirmPassword", type: "password", placeholder: "Confirm Password" },
            ].map(({ id, type, placeholder }) => (
              <div key={id} className="mb-4">
                <input
                  type={type}
                  placeholder={placeholder}
                  required
                  id={id}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            ))}
            <div className="mb-4">
              <select
                id="gender"
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

      {notification.message && (
        <Alert message={notification.message} type={notification.type} />
      )}
    </section>
  );
};

export default SignUpPage
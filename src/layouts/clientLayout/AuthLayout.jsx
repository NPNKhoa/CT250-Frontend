import Footer from "@components/common/Footer";
import Header from "@components/common/Header";
import PropTypes from "prop-types";

const AuthLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center py-10">{children}</div>
      <Footer />
    </>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.any,
};

export default AuthLayout;

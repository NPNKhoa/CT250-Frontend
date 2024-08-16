import Footer from "@components/common/Footer";
import Header from "@components/common/Header";
// import NavBar from "@components/Navbar";
import PropTypes from "prop-types";

const HomeLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {/* <NavBar /> */}
      {children}
      <Footer />
    </div>
  );
};

HomeLayout.propTypes = {
  children: PropTypes.node,
};

export default HomeLayout;

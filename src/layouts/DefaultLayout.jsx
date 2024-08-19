import Footer from "@components/Footer";
import Header from "@components/Header";
import PropTypes from "prop-types";

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node,
};

export default DefaultLayout;

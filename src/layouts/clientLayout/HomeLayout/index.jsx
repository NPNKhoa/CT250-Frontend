import Header from "@components/Header";
import PropTypes from "prop-types";

const HomeLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

HomeLayout.propTypes = {
  children: PropTypes.node,
};

export default HomeLayout;

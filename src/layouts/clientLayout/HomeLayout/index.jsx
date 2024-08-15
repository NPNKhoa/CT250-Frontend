import PropTypes from "prop-types";

const HomeLayout = ({ children }) => {
  return (
    <div>
      <h1>Home Layout</h1>
      {children}
    </div>
  );
};

HomeLayout.propTypes = {
  children: PropTypes.node,
};

export default HomeLayout;

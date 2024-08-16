// eslint-disable-next-line no-unused-vars
import PropTypes from "prop-types";

const HomePage = ({ ...props }) => {
  return (
    <div {...props}>
      <h1 className="text-blue-500">Home page</h1>
    </div>
  );
};

HomePage.propTypes = {};

export default HomePage;

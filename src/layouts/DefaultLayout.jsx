import Footer from '@components/Footer';
import Header from '@components/Header';
import PropTypes from 'prop-types';
import ScrollToTop from 'react-scroll-to-top';

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <ScrollToTop
        smooth
        color='#000'
        className='fixed bottom-5 right-5 rounded-full border-2 border-primary bg-white shadow-lg w-12 h-12 flex items-center justify-center'
      />
      {children}
      <Footer />
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node,
};

export default DefaultLayout;

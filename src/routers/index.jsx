import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';
import SignUpPage from '@pages/SignUpPage';
import AboutUsPage from '@pages/AboutUsPage';
import CheckOrder from '@pages/CheckOrder';
import CheckWarranty from '@pages/CheckWarranty';
import ContactPage from '@pages/ContactPage';
import ProductDetail from '@pages/ProductDetail';
import Products from '@pages/Products';
import CartPage from '@pages/CartPage';
import SearchPage from '@pages/SearchPage';
import ProfilePage from '@pages/ProfilePage';
import ThankYouPage from '@pages/ThankYouPage';
import OrderPage from '@pages/OrderPage';
import OrderHistoryPage from '@pages/OrderHistoryPage';
// import AccountInfo from '@pages/AccountInfo';

const routes = [
  {
    id: 'home',
    path: '/',
    element: <HomePage />,
  },

  {
    id: 'login',
    path: '/login',
    element: <LoginPage />,
  },

  {
    id: 'signup',
    path: '/signup',
    element: <SignUpPage />,
  },

  {
    id: 'about',
    path: '/about',
    element: <AboutUsPage />,
  },

  {
    id: 'checkorder',
    path: '/checkorder',
    element: <CheckOrder />,
  },

  {
    id: 'checkwarranty',
    path: '/checkwarranty',
    element: <CheckWarranty />,
  },

  {
    id: 'contact',
    path: '/contact',
    element: <ContactPage />,
  },

  {
    id: 'product_detail',
    path: '/products/detail/:id',
    element: <ProductDetail />,
  },

  {
    id: 'products',
    path: '/products',
    element: <Products />,
  },

  {
    id: 'cart',
    path: '/cart',
    element: <CartPage />,
  },

  {
    id: 'search',
    path: '/search',
    element: <SearchPage />,
  },

  {
    id: 'profile',
    path: '/profile',
    element: <ProfilePage />,
  },

  {
    id: 'order',
    path: '/order',
    element: <OrderPage />,
  },

  {
    id: 'thankyou',
    path: '/thankyou',
    element: <ThankYouPage />,
  },

  {
    id: 'order-history',
    path: '/order-history',
    element: <OrderHistoryPage />,
  },
];

export default routes;

import PrivateRoute from './PrivateRoute';
import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';
import SignUpPage from '@pages/SignUpPage';
import AboutUsPage from '@pages/AboutUsPage';
import CheckOrder from '@pages/CheckOrder';
import ContactPage from '@pages/ContactPage';
import ProductDetail from '@pages/ProductDetail';
import Products from '@pages/Products';
import CartPage from '@pages/CartPage';
import SearchPage from '@pages/SearchPage';
import ProfilePage from '@pages/ProfilePage';
import ThankYouPage from '@pages/ThankYouPage';
import OrderPage from '@pages/OrderPage';
import TestPage from '@pages/TestPage';
import SafeOffPage from '@pages/SafeOffPage';
import EmailVerificationPage from '@pages/EmailVerificationPage';
import PolicyPage from '@pages/PolicyPage';
import ArticleCardDetail from '@components/PolicyPage/ArticleCardDetail';

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
    id: 'saleoff',
    path: '/saleoff',
    element: <SafeOffPage />,
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
    element: (
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    ),
  },

  {
    id: 'order',
    path: '/order',
    element: (
      <PrivateRoute>
        <OrderPage />
      </PrivateRoute>
    ),
  },

  {
    id: 'thankyou',
    path: '/thankyou',
    element: (
      <PrivateRoute>
        <ThankYouPage />
      </PrivateRoute>
    ),
  },

  {
    id: '/email-verification',
    path: '/email-verification',
    element: <EmailVerificationPage />,
  },

  {
    id: 'test',
    path: '/test',
    element: <TestPage />,
  },

  {
    id: 'policy',
    path: '/policy',
    element: <PolicyPage />,
  },
  {
    id: 'policydetail',
    path: '/policydetail',
    element: <ArticleCardDetail />,
  },
];

export default routes;

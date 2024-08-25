import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';
import SignUpPage from '@pages/SignUpPage';
import AboutUsPage from '@pages/AboutUsPage';
import CheckOrder from '@pages/CheckOrder';
import CheckWarranty from '@pages/CheckWarranty';
import ContactPage from '@pages/ContactPage';
import ProductDetail from '@pages/ProductDetail';

import Products from '@pages/Products';


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
    path: '/products/:id',
    element: <ProductDetail />,
  },{
    id: 'products',
    path: '/products',
    element: <Products />,
  },
  {
    id: 'cart',
    path: '/cart',
    element: <CartPage />,
  },
];

export default routes;

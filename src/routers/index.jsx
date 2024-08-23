import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';
import SignUpPage from '@pages/SignUpPage';
import AboutUsPage from '@pages/AboutUsPage';
import CheckOrder from '@pages/CheckOrder';

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
    id: 'about',
    path: '/about',
    element: <AboutUsPage />,
  },
];

export default routes;

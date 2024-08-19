import CheckOrder from "@pages/CheckOrder";
import CheckWarranty from "@pages/CheckWarranty";
import HomePage from "@pages/HomePage";
import LoginPage from "@pages/LoginPage";
import SignUpPage from "@pages/SignUpPage";

const routes = [
  {
    id: "home",
    path: "/",
    element: <HomePage />,
  },
  {
    id: "login",
    path: "/login",
    element: <LoginPage />,
  },
  {
    id: "signup",
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    id: "checkorder",
    path: "/checkorder",
    element: <CheckOrder />,
  },
  {
    id: "checkwarranty",
    path: "/checkwarranty",
    element: <CheckWarranty />,
  },
];

export default routes;

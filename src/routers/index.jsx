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
];

export default routes;
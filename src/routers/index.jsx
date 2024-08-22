import HomePage from "@pages/HomePage";
import LoginPage from "@pages/LoginPage";
import SignUpPage from "@pages/SignUpPage";
import AboutUsPage from "@pages/AboutUsPage";

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
    id: "about",
    path: "/about",
    element: <AboutUsPage />,
  }
];

export default routes;
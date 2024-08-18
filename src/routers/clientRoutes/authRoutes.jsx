import { v4 as uuidv4 } from "uuid";
import LoginPage from "../../pages/clientPages/LoginPage";
import SignUpPage from "../../pages/clientPages/SignUpPage";

const authRoutes = [
  {
    id: `auth-${uuidv4()}`,
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
];

export default authRoutes;

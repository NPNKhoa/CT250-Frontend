import { v4 as uuidv4 } from "uuid";
import HomePage from "@pages/clientPages/HomePage";

const HomeRoute = [
  {
    id: `auth-${uuidv4()}`,
    path: "/",
    element: <HomePage />,
  },
];

export default HomeRoute;

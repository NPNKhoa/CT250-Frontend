import { v4 as uuidv4 } from "uuid";
import HomePage from "@pages/clientPages/HomePage";

const homeRoute = [
  {
    id: `auth-${uuidv4()}`,
    path: "/home",
    element: <HomePage />,
  },
];

export default homeRoute;

import loginRoutes from "./login";
import dashboardRoutes from "./dashboard";
import signupRoutes from "./signup";
import userManagement from "./user-management";
import products from "./products";

const routes = [
  ...loginRoutes,
  ...signupRoutes,
  ...dashboardRoutes,
  ...userManagement,
  ...products,
];

export default routes;

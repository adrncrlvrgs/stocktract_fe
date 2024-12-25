import loginRoutes from "./login";
import dashboardRoutes from "./dashboard";
import signupRoutes from "./signup";
import userManagement from "./user-management";
import products from "./products";
import tablesRoutes from "./testRoutes";
import sales from "./sales";

const routes = [
  ...loginRoutes,
  ...signupRoutes,
  ...dashboardRoutes,
  ...userManagement,
  ...products,
  ...tablesRoutes,
  ...sales,
];

export default routes;

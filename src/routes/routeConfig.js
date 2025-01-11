import loginRoutes from "./login";
import dashboardRoutes from "./dashboard";
import signupRoutes from "./signup";
import userManagement from "./user-management";
import products from "./products";
import sales from "./sales";
import stocks from "./stocks";
import logs from "./logs";

const routes = [
  ...loginRoutes,
  ...signupRoutes,
  ...dashboardRoutes,
  ...userManagement,
  ...products,
  ...sales,
  ...stocks,
  ...logs,
];

export default routes;

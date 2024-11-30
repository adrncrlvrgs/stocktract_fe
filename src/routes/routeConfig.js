import loginRoutes from "./login";
import dashboardRoutes from "./dashboard";
import signupRoutes from "./signup";


const routes = [
  ...loginRoutes,
  ...signupRoutes,        
  ...dashboardRoutes,
  
];

export default routes;

import loginRoutes from "./login";
import dashboardRoutes from "./dashboard";


const routes = [
  ...loginRoutes,        
  ...dashboardRoutes,  
];

export default routes;

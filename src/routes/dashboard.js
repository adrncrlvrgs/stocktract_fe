import Dashboard from "views/dashboard";
import UserManagement from "views/user-management"
const dashboardRoutes = [
  {
    path: "/dashboard",
    component: Dashboard,
    access: "private",
    // subRoutes: [
    //   {
    //     path: "/dashboard/users",
    //     component: UserOverview,
    //     access: "private",
    //   },
    //   {
    //     path: "/dashboard/analytics",
    //     component: Analytics,
    //     access: "private",
    //   },
    // ],
  },
  {
    path: '/user-management',
    component: UserManagement,
    access: "private"
  }
];

export default dashboardRoutes;

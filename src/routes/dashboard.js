import Dashboard from "views/dashboard";

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
];

export default dashboardRoutes;

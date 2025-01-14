import Dashboard from "views/dashboard";

const dashboardRoutes = [
  {
    path: "/dashboard",
    component: Dashboard,
    access: "private",
  },
];

export default dashboardRoutes;

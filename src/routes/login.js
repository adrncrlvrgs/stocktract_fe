import Login from "views/login";

const loginRoutes = [
  {
    path: "/login",
    component: Login,
    access: "public",
  },
];

export default loginRoutes;

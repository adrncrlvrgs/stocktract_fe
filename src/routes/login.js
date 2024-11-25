import Login from "views/login";

const loginRoutes = [
  {
    path: "/",
    component: Login,
    access: "public",
  },
];

export default loginRoutes;

import UserManagement from "views/user-management"
const userManagement = [
  {
    path: "/user-management",
    component: UserManagement,
    access: "private",
    requiredRole: ["admin"]
  },
];

export default userManagement;

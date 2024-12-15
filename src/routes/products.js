import Products from "views/products";
import UserManagement from "views/user-management";
const products = [
  {
    path: "/products", 
    access: "private",
    subRoutes: [
      {
        path: "/products/category", 
        component: UserManagement, 
        access: "private",
      },
      {
        path: "/products/items", 
        component: UserManagement, 
        access: "private",
      },
    ],
  },
];

export default products;

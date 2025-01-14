import Categories from "views/category";
import Items from "views/products";
import AddItem from "modules/products/add-item/view";
import ItemManagement from "modules/products/items/view";
const products = [
  {
    path: "/products/category",
    component: Categories,
    access: "private",
    requiredRole: ["admin"],
  },
  {
    path: "/products",
    component: Items,
    access: "private",
    subRoutes: [
      {
        path: "/products/items",
        component: ItemManagement,
        access: "private",
      },
      {
        path: "/products/addItem",
        component: AddItem,
        access: "private",
        requiredRole: ["admin"],
      },
    ],
  },
];

export default products;

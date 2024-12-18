import Categories from "views/category";
import Items from "views/items";
const products = [
  {
    path: "/products/category",
    component: Categories,
    access: "private",
  },
  {
    path: "/products/items",
    component: Items,
    access: "private",
  },
];

export default products;

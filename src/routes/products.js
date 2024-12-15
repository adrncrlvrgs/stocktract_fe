import Products from "views/products";
import Items from "views/items";
const products = [
  {
    path: "/products/category",
    component: Products,
    access: "private",
  },
  {
    path: "/products/items",
    component: Items,
    access: "private",
  },
];

export default products;

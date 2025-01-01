import Categories from "views/category";
import Items from "views/items";
import ItemManagement from "modules/products/items/view";
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
    subRoutes: [
      { path: "/products/items", component: ItemManagement, access: "private" },
      // { path: "/products/addItem", component: AddSale, access: "private" },
    ],
  },
];

export default products;

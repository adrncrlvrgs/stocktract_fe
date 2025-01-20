import Sales from "views/sales";
import SalesManagement from "modules/sales/sales-management/view";
import AddSale from "modules/sales/add-sale/view";
import SaleStats from "modules/sales/sale-stats/view"
const sales = [
  {
    path: "/sales",
    component: Sales,
    access: "private",
    subRoutes: [
      {
        path: "/sales/sales-management",
        component: SalesManagement,
        access: "private",
      },
      { path: "/sales/addSale", component: AddSale, access: "private" },
      { path: "/sales/stats", component: SaleStats, access: "private" },
    ],
  },
];

export default sales;

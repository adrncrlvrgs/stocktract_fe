import Stocks from "views/stocks";
import StockManagement from "modules/stocks/stock-management/view";
import AddSale from "modules/sales/add-sale/view";
const sales = [
  {
    path: "/stocks",
    component: Stocks,
    access: "private",
    subRoutes: [
      {
        path: "/stocks/stocks-management",
        component: StockManagement,
        access: "private",
      },
      {
        path: "/stocks/stats",
        component: AddSale,
        access: "private",
      },
    ],
  },
];

export default sales;

import Stocks from "views/stocks";
import StockManagement from "modules/stocks/stock-management/view";
import StockStats from "modules/stocks/stock-stats/view";
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
        component: StockStats,
        access: "private",
      },
    ],
  },
];

export default sales;

import Stocks from "views/stocks";
import StockManagement from "modules/stocks/stock-management/view";
import StockStats from "modules/stocks/stock-stats/view";
import StocksReport from "modules/stocks/stock-report/view";
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
  {
    path: "/stocks/report",
    component: StocksReport,
    access: "private",
  },
];

export default sales;

export const navItems = {
  dashboard: {
    label: "Dashboard",
    icon: "home",
    path: "/dashboard",
  },
  userManagement: {
    label: "User Management",
    icon: "user",
    path: "/user-management",
    requiredRole: "admin",
  },
  stocks: {
    label: "Stocks",
    icon: "truck-ramp-box",
    subItems: {
      stocksManagement: {
        label: "Stocks Management",
        path: "/stocks/stocks-management",
        icon: "list",
      },
      stocksReport: {
        label: "Stocks Report",
        path: "/stocks/report",
        icon: "chart-line",
      },
    },
  },
  products: {
    label: "Products",
    icon: "dolly",
    subItems: {
      categories: {
        label: "Categories",
        path: "/products/category",
        icon: "list",
        requiredRole: "admin",
      },
      productItems: {
        label: "Product Items",
        path: "/products/items",
        icon: "shopping-bag",
      },
    },
  },
  sales: {
    label: "Sales",
    icon: "chart-line",
    subItems: {
      salesManagement: {
        label: "Sales Management",
        path: "/sales/sales-management",
        icon: "list",
      },
      salesReport: {
        label: "Sales Report",
        path: "/sales/report",
        icon: "shopping-bag",
      },
    },
  },
  activityLogs: {
    label: "Activity Logs",
    path: "/activity-logs",
    icon: "list-check",
    requiredRole: "admin",
  },
};
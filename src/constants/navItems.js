export const navItems = [
  { label: "Dashboard", icon: "home", path: "/dashboard" },
  { label: "User Management", icon: "user", path: "/user-management" },
  {
    label: "Stocks",
    icon: "truck-ramp-box",
    subItems: [
      {
        label: "Stocks Management",
        path: "/stocks/stocks-management",
        icon: "list",
      },
      { label: "Stats", path: "/stocks/stats", icon: "chart-line" },
    ],
  },
  {
    label: "Products",
    icon: "dolly",
    subItems: [
      { label: "Categories", path: "/products/category", icon: "list" },
      { label: "Product Items", path: "/products/items", icon: "shopping-bag" },
    ],
  },
  {
    label: "Sales",
    icon: "chart-line",
    subItems: [
      {
        label: "Sales Management",
        path: "/sales/sales-management",
        icon: "list",
      },
      { label: "Product Items", path: "/sales/report", icon: "shopping-bag" },
    ],
  },
  { label: "Settings", icon: "cog", path: "/settings" },
];

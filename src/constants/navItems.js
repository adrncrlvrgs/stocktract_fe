export const navItems = [
  { label: "Dashboard", icon: "home", path: "/dashboard" },
  { label: "User Management", icon: "user", path: "/user-management" },
  {
    label: "Products",
    icon: "box",
    subItems: [
      { label: "Categories", path: "/products/category", icon: "list" },
      { label: "Product Items", path: "/products/items", icon: "shopping-bag" },
    ],
  },
  {
    label: "Sales",
    icon: "box",
    subItems: [
      { label: "Sales Management", path: "/sales/sales-management", icon: "list" },
      { label: "Product Items", path: "/sales/report", icon: "shopping-bag" },
    ],
  },
  { label: "Settings", icon: "cog", path: "/settings" },
];

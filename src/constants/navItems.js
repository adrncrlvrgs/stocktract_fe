export const navItems = [
  { label: "Dashboard", icon: "home", path: "/dashboard" },
  { label: "User Management", icon: "user", path: "/user-management" },
  {
    label: "Products",
    icon: "box",
    path: "/products",
    subItems: [
      { label: "Category", path: "/products/category", icon: "list" },
      { label: "Product Items", path: "/products/items", icon: "shopping-bag" },
    ],
  },
  { label: "Settings", icon: "cog", path: "/settings" },
];

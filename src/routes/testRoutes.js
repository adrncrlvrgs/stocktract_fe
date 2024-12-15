import TablesLayout from "../views/testroute/index";
import TableA from "../views/testroute/TableA";
import TableB from "../views/testroute/TableB";

const tablesRoutes = [
  {
    path: "/tables",
    component: TablesLayout,
    access: "private",
    subRoutes: [
      { path: "/tables/a", component: TableA, access: "private" },
      { path: "/tables/b", component: TableB, access: "private" },
    ],
  },
];

export default tablesRoutes;

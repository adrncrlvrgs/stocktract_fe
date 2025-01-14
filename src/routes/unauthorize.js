import Unauthorized from "views/unauthorized";

const unauthorize = [
  { path: "/unauthorized", component: Unauthorized, access: "public" },
];

export default unauthorize;

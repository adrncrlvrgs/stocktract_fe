import Logs from "views/activity-logs";
const logs = [
  {
    path: "/activity-logs",
    component: Logs,
    access: "private",
    requiredRole: ["admin"]
  },
];

export default logs;

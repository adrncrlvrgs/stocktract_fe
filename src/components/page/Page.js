import React from "react";
import PageHeader from "./PageHeader";
import PageMain from "./PageMain";
import PageFooter from "./PageFooter";
import PageSideBar from "./PageSideBar";

export default function Page(props) {
  const { children } = props;

  const navItems = [
    { label: "Dashboard", icon: "home" },
    { label: "User Management", icon: "user" },
    { label: "Settings", icon: "cog" },
    { label: "Logout", icon: "sign-out" },
  ]; //temp
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader />
      <div className="flex flex-1">
        <PageSideBar navItems={navItems} />
        <PageMain>{children}</PageMain>
      </div>
      <PageFooter />
    </div>
  );
}

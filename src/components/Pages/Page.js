import React from "react";
import PageHeader from "./PageHeader";
import PageMain from "./PageMain";
import PageFooter from "./PageFooter";
import PageSideBar from "./PageSideBar";

export default function Page(props) {
  const { children } = props;

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader />
      <div className="flex flex-1">
        <PageSideBar />
        <PageMain>{children}</PageMain>
      </div>
      <PageFooter />
    </div>
  );
}

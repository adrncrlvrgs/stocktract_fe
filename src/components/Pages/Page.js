import React from "react";
import PageHeader from "./PageHeader";
import PageMain from "./PageMain";
import PageFooter from "./PageFooter";
import PageSideBar from "./PageSideBar";
import { useAuth } from "context/AuthContext";

export default function Page(props) {
  const { children } = props;
  
  return (
    <div className="min-h-screen flex flex-col justify-center content-center">
      <PageHeader />
      <div className="flex flex-1">
        <PageSideBar />
        <PageMain>{children}</PageMain>
      </div>
      <PageFooter />
    </div>
  );
}

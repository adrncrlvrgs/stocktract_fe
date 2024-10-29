import React from "react";
import PageNav from "./PageNav";
import PageMain from "./PageMain";
import PageFooter from "./PageFooter";

export default function Page(props) {
  const { children } = props;
  return (
    <div className="min-h-screen flex flex-col">
      <PageNav />
      <PageMain>{children}</PageMain>
      <PageFooter />
    </div>
  );
}

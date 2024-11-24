import React from "react";

export default function PageMain(props) {
  const { children } = props;
  return <div className="flex-1 bg-slate-50">{children}</div>;
}

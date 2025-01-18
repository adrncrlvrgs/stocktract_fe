import React from "react";

export default function PageMain(props) {
  const { children } = props;
  return <main className="flex-1 overflow-y-auto">{children}</main>;
}

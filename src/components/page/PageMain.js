import React from "react";

export default function PageMain(props) {
  const { children } = props;
  return <div className="flex-1">{children}</div>;
}

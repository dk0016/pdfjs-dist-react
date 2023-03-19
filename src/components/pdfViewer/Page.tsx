import React from "react";

const Page = (props: any) => {
  const { children, style } = props;
  const internalStyle = {
    ...style,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    outline: "1px solid #ccc",
  };
  return <div style={internalStyle}>{children}</div>;
};

export default Page;

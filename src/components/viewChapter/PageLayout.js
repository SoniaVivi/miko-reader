import React from "react";
import PageLayoutButton from "./PageLayoutButton";

const PageLayout = () => {
  return (
    <div className="page-layout sidebar">
      <PageLayoutButton mode="dual" />
      <div className="divider vertical"></div>
      <PageLayoutButton mode="single" />
    </div>
  );
};

export default PageLayout;

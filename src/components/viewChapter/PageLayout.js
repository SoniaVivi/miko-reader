import React from "react";
import PageLayoutButton from "./PageLayoutButton";
import styled from "styled-components";
import Divider from "../styled/Divider";

const Container = styled.div`
  width: 50%;
  height: 30px;
`;

const PageLayout = () => {
  return (
    <Container>
      <PageLayoutButton mode="dual" />
      <Divider dividerType="vertical" />
      <PageLayoutButton mode="single" />
    </Container>
  );
};

export default PageLayout;

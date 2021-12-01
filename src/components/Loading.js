import React from "react";
import { ReactComponent as Bars } from "../assets/bars.svg";
import styled from "styled-components";

const Container = styled.div`
  display: block;
  margin: auto;
`;

const Loading = () => (
  <Container>
    <Bars />
  </Container>
);

export default Loading;

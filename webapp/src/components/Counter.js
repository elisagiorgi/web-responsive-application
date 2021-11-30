import React from "react";
import styled from "styled-components";

const Container = styled.div`
  font-size: 40px;
  font-weight: bold;
`;

const Counter = ({ number }) => {
  return <Container>{number}</Container>;
};

export default Counter;

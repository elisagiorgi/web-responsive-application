import React from "react";
import styled from "styled-components";

import Counter from "./Counter";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  max-width: 300px;
  margin: 20px auto;
  padding: 15px 10px;
  background: #8c7386;
  font-family: "Advent Pro", sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 25px;
  min-height: 100px;
  color: #fff;
  cursor: pointer;
`;

const Card = ({ post }) => {
  return (
    <Container>
      <Counter number={post.id} />
      {post.title}
    </Container>
  );
};

export default Card;

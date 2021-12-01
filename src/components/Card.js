import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/ThemeContext";

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
  background: ${(props) => props.backgroundColor};
  font-family: "Advent Pro", sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 25px;
  min-height: 90px;
  color: #fff;
  cursor: pointer;
`;

const Card = ({ index, post, onClickEvent, setContent }) => {
  const { palette } = useContext(ThemeContext);

  return (
    <Container
      backgroundColor={index % 2 === 0 ? palette[0] : palette[1]}
      onClick={() => {
        onClickEvent();
        setContent(post.body);
      }}
    >
      <Counter number={post.id} />
      {post.title}
    </Container>
  );
};

export default Card;

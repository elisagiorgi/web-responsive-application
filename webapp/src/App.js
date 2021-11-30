import React, { useEffect, useState, useCallback } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";

//Components
import Loading from "./components/Loading";
import Card from "./components/Card";

export default function App() {
  const URL = "https://jsonplaceholder.typicode.com/posts";
  const [postsList, setPostsList] = useState([]);

  const [page, setPage] = useState(0);
  const [total, setTotal] = useState();
  const [hasMore, setHasMore] = useState(true);

  const Container = styled.div`
    padding: 10px;
    text-align: center;
    background: #e8d6cf;
  `;

  const Wrapper = styled.div`
    background: #e8d6cf;
    height: 100%;
  `;

  const Title = styled.div`
    text-align: center;
    font-size: 60px;
    font-weight: bold;
    font-family: "Advent Pro", sans-serif;
    position: sticky;
    top: 0;
    background: #e8d6cf;
    width: 100%;
  `;

  useEffect(() => {
    //counting totals element
    fetch(URL)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("something went wrong while requesting postsList");
      })
      .then((postsList) => setTotal(postsList?.length))
      .catch((error) => console.log("error: ", error));
  }, []);

  const moreData = () => {
    if (postsList?.length >= total) {
      setHasMore(false);
      return;
    }
    setPage(page + 10);
  };

  const getPosts = useCallback(async () => {
    let url = `${URL}?_start=${page}&_limit=10`;
    await fetch(url)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("something went wrong while requesting postsList");
      })
      .then((posts) => setPostsList([...postsList, ...posts]))
      .catch((e) => console.log(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Wrapper>
      <Title>{"POSTS"}</Title>
      <InfiniteScroll
        dataLength={postsList?.length}
        next={() => moreData()}
        hasMore={hasMore}
        loader={postsList?.length === total ? null : <Loading />}
      >
        <Container>
          {postsList?.map((post, index) => (
            <Card key={index} post={post} />
          ))}
        </Container>
      </InfiniteScroll>
    </Wrapper>
  );
}

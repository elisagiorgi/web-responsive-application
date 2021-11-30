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
    background: #e8d6cf;
    padding: 10px;
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
  );
}

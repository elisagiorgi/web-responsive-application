import React, { useEffect, useState, useCallback } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import { GrLinkDown } from "react-icons/gr";

//Components
import Loading from "./components/Loading";
import Card from "./components/Card";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./modal-styling.css";

export default function App() {
  const URL = "https://jsonplaceholder.typicode.com/posts";
  const [postsList, setPostsList] = useState([]);

  const [page, setPage] = useState(0);
  const [total, setTotal] = useState();
  const [hasMore, setHasMore] = useState(true);
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const Container = styled.div`
    background: #e8d6cf;
    padding: 50px 10px;
    text-align: center;
  `;

  const Title = styled.span`
    text-align: center;
    font-size: 40px;
    font-weight: bold;
    font-family: "Advent Pro", sans-serif;
    background: #e8d6cf;
    width: 100%;
    overflow: hidden;
    position: fixed;
    top: 0;
    display: flex;
    flex-direction: column;
  `;

  const Sub = styled.span`
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    font-family: "Advent Pro", sans-serif;
    padding-bottom: 5px;
    align-items: center;
    justify-content: center;
    display: flex;
}
  `;

  const SubText = styled.span`
    margin: 0 10px;
}
  `;

  const ModalText = styled.span`
    font-family: "Advent Pro", sans-serif;
    font-size: 15px;
    padding: 30px;
}
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
    <>
      <Title>
        {"POSTS"}
        <Sub>
          <GrLinkDown />
          <SubText>{"Click on each post to see its content"} </SubText>
          <GrLinkDown />
        </Sub>
      </Title>

      <InfiniteScroll
        dataLength={postsList?.length}
        next={() => moreData()}
        hasMore={hasMore}
        loader={postsList?.length === total ? null : <Loading />}
      >
        <Container>
          {/* <Title>{"POSTS"}</Title> */}
          {postsList?.map((post, index) => (
            <Card
              key={index}
              post={post}
              onClickEvent={onOpenModal}
              setContent={setContent}
            />
          ))}
        </Container>
        <Modal
          open={open}
          onClose={onCloseModal}
          center
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            overlayAnimationIn: "customEnterOverlayAnimation",
            overlayAnimationOut: "customLeaveOverlayAnimation",
            modalAnimationIn: "customEnterModalAnimation",
            modalAnimationOut: "customLeaveModalAnimation",
          }}
        >
          <ModalText>{content}</ModalText>
        </Modal>
      </InfiniteScroll>
    </>
  );
}
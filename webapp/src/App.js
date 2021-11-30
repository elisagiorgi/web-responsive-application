import React, { useEffect, useState, useCallback } from "react";

//Components
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./components/Loading";

export default function App() {
  const URL = "https://jsonplaceholder.typicode.com/posts";
  const [postsList, setPostsList] = useState([]);

  const [page, setPage] = useState(0);
  const [total, setTotal] = useState();
  const [hasMore, setHasMore] = useState(true);

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
      <div>
        {postsList?.map((el, index) => (
          <div style={{ height: "150px" }}>
            {el.id} {el.title}
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}

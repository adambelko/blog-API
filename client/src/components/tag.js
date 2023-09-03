import styled from "styled-components";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

import PostList from "./postList";

const TagWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h2`
  font-size: 2em;
  color: #000000;
  font-weight: bold;
  margin: 0.4em 0 1.5em 0;
`;

const Tag = ({ formatDate }) => {
  const [postList, setPostList] = useState([]);
  const { tag } = useParams();
  const location = useLocation();
  const displayTag = location.state?.tag;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/tags/${tag}`)
      .then((res) => setPostList(res.data.postList))
      .catch((err) => console.log(err));
  }, [tag]);

  return (
    <TagWrapper>
      <SectionTitle>Posts with tag "{displayTag}"</SectionTitle>
      {postList && <PostList postList={postList} formatDate={formatDate} />}
    </TagWrapper>
  );
};

export default Tag;

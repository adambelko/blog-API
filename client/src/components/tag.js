import { Wrapper, Title } from "../styles/CommonStyledComponents";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

import PostList from "./PostList";

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
    <Wrapper>
      <Title>Posts with tag "{displayTag}"</Title>
      {postList && (
        <PostList
          postList={postList}
          formatDate={formatDate}
          onlyPublished={true}
        />
      )}
    </Wrapper>
  );
};

export default Tag;

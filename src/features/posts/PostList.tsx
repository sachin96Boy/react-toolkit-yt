import { useDispatch, useSelector } from "react-redux";
import BogPost from "../../components/BogPost";
import {
  fetchPosts,
  getPostError,
  getPostsStatus,
  selectAllPosts,
  status,
} from "./postSlice";
import { useEffect } from "react";
import { AppDispatch } from "../../app/store";

function PostList() {
  const dispatch = useDispatch<AppDispatch>();

  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostError);

  useEffect(() => {
    if (postStatus === status.idle) {
      dispatch(fetchPosts());
    }
  }, [dispatch, postStatus]);

  let content;

  if (postStatus === status.loading) {
    content = <p>loading</p>;
  } else if (postStatus === status.success) {
    const renderedPosts = posts.map((post) => (
      <BogPost
        key={post.id}
        id={post.id}
        title={post.title}
        content={post.body}
        userId={post.userId}
      />
    ));
    content = renderedPosts;
  } else if (postStatus === status.failure) {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
}

export default PostList;

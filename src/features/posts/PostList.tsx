import { useSelector } from "react-redux";
import BogPost from "../../oomponents/BogPost";
import { selectAllPosts } from "./postSlice";

function PostList() {
  const posts = useSelector(selectAllPosts);

  const renderedPosts = posts.map((post) => (
    <BogPost
      key={post.id}
      id={post.id}
      title={post.title}
      content={post.content}
      userId={post.userId}
    />
  ));

  return <section>{renderedPosts}</section>;
}

export default PostList;

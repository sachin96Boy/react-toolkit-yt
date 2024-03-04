import { useSelector } from "react-redux";
import { selectAllUsers } from "../features/users/usersSlice";
import { Text } from "@chakra-ui/react";

type PostAuthorTypes = {
  userId: string;
};

function PostAuthor(props: PostAuthorTypes) {
  const { userId } = props;
  const users = useSelector(selectAllUsers);

  const author = users.find((user) => user.id == userId);

  return <Text as={"span"}>by {author ? author.name : "unknown"}</Text>;
}

export default PostAuthor;

import { Box, Divider } from "@chakra-ui/react";
import PostList from "./features/posts/PostList";
import AddForm from "./oomponents/AddForm";

function App() {
  return (
    <>
      <Box gap={2} bgColor={"whitesmoke"}>
        <AddForm />
        <Divider my={2} />
        <PostList />
      </Box>
    </>
  );
}

export default App;

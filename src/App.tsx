import { Box, Divider } from "@chakra-ui/react";
import PostList from "./features/posts/PostList";
import AddForm from "./components/AddForm";

function App() {
  return (
    <>
      <Box
        gap={2}
        bgColor={"whitesmoke"}
        minH={"100vh"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <AddForm />
        <Divider my={2} />
        <PostList />
      </Box>
    </>
  );
}

export default App;

import { Box, Center, Heading, Image, Stack, Text } from "@chakra-ui/react";

type BlogPostTypes = {
  id: string;
  title: string;
  content: string;
};

function BogPost(props: BlogPostTypes) {
  const { id, title, content } = props;
  return (
    <Center py={6}>
      <Box
        maxW={"445px"}
        w={"full"}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
        >
          <Image
            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="cover"
            fit={"cover"}
          />
        </Box>
        <Stack>
          <Text
            color={"green.500"}
            fontWeight={"800"}
            fontSize={"small"}
            letterSpacing={1.1}
          >
            Blog-{id}
          </Text>
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {title}
          </Heading>
          <Text color={"gray.500"} textAlign={"center"}>
            {content}
          </Text>
        </Stack>
      </Box>
    </Center>
  );
}

export default BogPost;

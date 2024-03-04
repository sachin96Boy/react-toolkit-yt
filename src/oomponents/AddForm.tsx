import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { postAdded } from "../features/posts/postSlice";
import { useEffect } from "react";

const PostFormSchema = z.object({
  title: z
    .string({
      required_error: "Title is Required",
    })
    .trim()
    .min(3)
    .max(20),
  content: z
    .string({
      required_error: "Content is required",
      invalid_type_error: "Invalid type error",
    })
    .trim()
    .min(1),
});

type PostFormSchemaType = z.infer<typeof PostFormSchema>;

function AddForm() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, touchedFields, isSubmitSuccessful },
  } = useForm<PostFormSchemaType>({
    resolver: zodResolver(PostFormSchema),
  });

  // handle form submit
  const postSubmitHandler: SubmitHandler<PostFormSchemaType> = (data) => {
    try {
      dispatch(postAdded(data.title, data.content));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  return (
    <Container>
      <Heading>Add a new Post</Heading>
      <form onSubmit={handleSubmit(postSubmitHandler)}>
        <FormControl isInvalid={errors.title && touchedFields.title}>
          <FormLabel htmlFor="title">Post Title</FormLabel>
          <Input id="title" placeholder="Post title" {...register("title")} />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.content && touchedFields.content}>
          <FormLabel htmlFor="content">Post Content</FormLabel>
          <Textarea
            id="content"
            placeholder="Post content"
            {...register("content")}
          />
          <FormErrorMessage>
            {errors.content && errors.content.message}
          </FormErrorMessage>
        </FormControl>
        <Button mt={4} isLoading={isSubmitting} type="submit" color={"teal"}>
          Add Post
        </Button>
      </form>
    </Container>
  );
}

export default AddForm;

import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, status } from "../features/posts/postSlice";
import { useEffect, useState } from "react";
import { selectAllUsers } from "../features/users/usersSlice";
import { AppDispatch } from "../app/store";

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
  userId: z
    .string({
      required_error: "userId is required",
    })
    .trim()
    .min(1),
});

type PostFormSchemaType = z.infer<typeof PostFormSchema>;

function AddForm() {
  const dispatch = useDispatch<AppDispatch>();

  const users = useSelector(selectAllUsers);

  const [addRequestState, setAddRequestState] = useState(status.idle);

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
      setAddRequestState(status.loading);
      dispatch(
        addNewPost({
          title: data.title,
          body: data.content,
          userId: data.userId,
        })
      );
    } catch (err) {
      console.log(err);
    } finally {
      setAddRequestState(status.idle);
    }
  };

  const userOptions = users.map((user, index) => (
    <option key={index} value={user.id}>
      {user.name}
    </option>
  ));

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Container>
      <Heading>Add a new Post</Heading>
      <form onSubmit={handleSubmit(postSubmitHandler)}>
        <FormControl isInvalid={errors.title && !touchedFields.title}>
          <FormLabel htmlFor="title">Post Title</FormLabel>
          <Input id="title" placeholder="Post title" {...register("title")} />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.content && !touchedFields.content}>
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
        <FormControl isInvalid={errors.userId && !touchedFields.userId}>
          <FormLabel htmlFor="userId">Select user</FormLabel>
          <Select id="userId" {...register("userId")}>
            <option value={""}></option>
            {userOptions}
          </Select>
          <FormErrorMessage>
            {errors.userId && errors.userId.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          isLoading={isSubmitting && addRequestState === status.loading}
          type="submit"
          color={"teal"}
        >
          Add Post
        </Button>
      </form>
    </Container>
  );
}

export default AddForm;

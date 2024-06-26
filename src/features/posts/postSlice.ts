import { PayloadAction, createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axiosInstance from "../../utils/axiosInstance";

export const status = {
    idle: 'idle',
    loading: 'loading',
    success: 'success',
    failure: 'failure'
}

type PostObjectState = {
    posts: PostState[],
    status: 'idle' | 'loading' | 'success' | 'failure',
    error: string | undefined
}
type PostState = {
    id: string;
    title: string;
    body: string;
    userId: string;
}

const initialState: PostObjectState = {
    posts: [],
    status: 'idle',
    error: ''
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axiosInstance.get('posts/');
    return response.data;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost: { title: string, body: string, userId: string }) => {
    const response = await axiosInstance.post('posts/', initialPost);
    return response.data;
})

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action: PayloadAction<PostState>) => {
                state.posts.push(action.payload);
            },
            prepare: (title: string, body: string, userId: string) => {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        body,
                        userId,
                    }
                }
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(
            fetchPosts.pending, (state) => {
                state.status = 'loading';

            }
        )
            .addCase(
                fetchPosts.fulfilled, (state, action) => {
                    state.status = 'success';
                    state.posts = action.payload;
                }
            )
            .addCase(
                fetchPosts.rejected, (state, action) => {
                    state.status = 'failure';
                    state.error = action.error.message
                }
            )
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
    },
});

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostError = (state: RootState) => state.posts.error;

export const { postAdded } = postSlice.actions

export default postSlice.reducer;
import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type PostObjectState = {
    posts: PostState[],
    status: 'idle' | 'loading' | 'success' | 'failure',
    error: null
}
type PostState = {
    id: string;
    title: string;
    content: string;
    userId: string;
}

const initialState: PostObjectState = {
    posts: [],
    status: 'idle',
    error: null
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action: PayloadAction<PostState>) => {
                state.posts.push(action.payload);
            },
            prepare: (title: string, content: string, userId: string) => {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId,
                    }
                }
            }
        }
    }
});

export const selectAllPosts = (state: RootState) => state.posts;

export const { postAdded } = postSlice.actions

export default postSlice.reducer;
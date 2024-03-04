import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type PostState = {
    id: string;
    title: string;
    content: string;
    userId: string;
}

const initialState: PostState[] = [
    {
        id: '1',
        title: 'learn RTK',
        content: 'Good to learn RTK',
        userId: '1'
    },
    {
        id: '2',
        title: 'learn slies',
        content: 'Good to learn slices in rtk',
        userId: '2'
    },
    {
        id: '3',
        title: 'learn  new slies',
        content: 'Good to learn slices in rtk 2',
        userId: '1'
    },
]

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action: PayloadAction<PostState>) => {
                state.push(action.payload);
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
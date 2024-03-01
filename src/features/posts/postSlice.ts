import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type PostState = {
    id: string;
    title: string;
    content: string;
}

const initialState: PostState[] = [
    {
        id: '1',
        title: 'learn RTK',
        content: 'Good to learn RTK'
    },
    {
        id: '2',
        title: 'learn slies',
        content: 'Good to learn slices in rtk'
    },
    {
        id: '3',
        title: 'learn  new slies',
        content: 'Good to learn slices in rtk 2'
    },
]

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {}
});

export const selectAllPosts = (state: RootState) => state.posts;

export default postSlice.reducer;
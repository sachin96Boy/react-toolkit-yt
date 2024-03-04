import { configureStore } from '@reduxjs/toolkit'

import PostsReducer from '../features/posts/postSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
    reducer: {
        posts: PostsReducer,
        users: usersReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
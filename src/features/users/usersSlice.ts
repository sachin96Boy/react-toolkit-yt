import {  createSlice, } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type UserState = {
    id: string;
    name: string;
}

const initialState: UserState[] = [
    {
        id: '1',
        name: 'Sachin supunthaka',
    },
    {
        id: '2',
        name: 'Lamanga Wihenga',
    },
    {
        id: '3',
        name: 'Gojo saratobi',
    },
]

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        
    }
});

export const selectAllUsers = (state: RootState) => state.users;

// export const { postAdded } = userSlice.actions

export default userSlice.reducer;
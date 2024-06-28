import {  createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axiosInstance from "../../utils/axiosInstance";

type UserState = {
    id: string;
    name: string;
}

const initialState: UserState[] = [
    // {
    //     id: '1',
    //     name: 'Sachin supunthaka',
    // },
    // {
    //     id: '2',
    //     name: 'Lamanga Wihenga',
    // },
    // {
    //     id: '3',
    //     name: 'Gojo saratobi',
    // },
];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axiosInstance.get('users/');
    return response.data;
});

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        
    },
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (_,action)=>{
            return action.payload;
        })
    },
});

export const selectAllUsers = (state: RootState) => state.users;

// export const { postAdded } = userSlice.actions

export default userSlice.reducer;
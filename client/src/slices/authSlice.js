import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    UserInfo: localStorage.getItem("UserInfo")
        ? JSON.parse(localStorage.getItem("UserInfo"))
        : null,
    // token: sessionStorage.getItem("token") || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            // state.UserInfo = action.payload.UserInfo;
            state.UserInfo = action.payload;
            // state.token = action.payload.token;
            // console.log(state.UserInfo);
            localStorage.setItem(
                "UserInfo",
                JSON.stringify(action.payload)
            );
            // sessionStorage.setItem("token", action.payload.token);
        },
        logout: (state) => {
            state.UserInfo = null;
            // state.token = null;
            localStorage.removeItem("UserInfo");
            // sessionStorage.removeItem("token");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

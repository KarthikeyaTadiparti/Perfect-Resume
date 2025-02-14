import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ResumeInfo: localStorage.getItem("ResumeInfo")
        ? JSON.parse(localStorage.getItem("ResumeInfo"))
        : null,
};

const resumeSlice = createSlice({
    name: "resume",
    initialState,
    reducers: {
        setResumeInfo: (state, action) => {
            state.ResumeInfo = action.payload;
            // console.log(state.ResumeInfo);
            localStorage.setItem("ResumeInfo", JSON.stringify(action.payload));
        },
        removeResumeInfo: (state, action) => {
            (state.ResumeInfo = null), localStorage.removeItem("ResumeInfo");
        },
    },
});

export const { setResumeInfo, removeResumeInfo } = resumeSlice.actions;

export default resumeSlice.reducer;

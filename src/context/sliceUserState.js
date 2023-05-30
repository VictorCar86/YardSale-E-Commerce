import { createSlice } from "@reduxjs/toolkit";
// import simpleLocalStorage from "../utils/simpleLocalStorage";
// const [value, setValueInLocalStorage] = simpleLocalStorage('yardsale_token');

export const sliceUserState = createSlice({
    name: 'userState',
    initialState: {
        userInfo: null,
        fetching: false,
        error: false,
    },
    reducers: {
        requestUserGeneral: (state) => {
            state.error = false;
            state.fetching = true;
        },

        resultUserGeneral: (state) => {
            state.fetching = false;
        },
        resultUserInfo: (state, action) => {
            const data = action.payload;
            state.userInfo = data;
            state.fetching = false;
        },
        resultUserReset: (state) => {
            state.userInfo = null;
            state.fetching = false;
            state.error = false;
        },

        errorUserGeneral: (state) => {
            state.error = true;
            state.fetching = false;
        }
    }
});

export const userState = (state) => state.sliceUserState;
export const {
    requestUserGeneral,
    resultUserGeneral,
    resultUserInfo,
    resultUserReset,
    errorUserGeneral
} = sliceUserState.actions;
export default sliceUserState.reducer;
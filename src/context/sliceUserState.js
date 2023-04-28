import { createSlice } from "@reduxjs/toolkit";
import simpleLocalStorage from "../utils/simpleLocalStorage";

const [value, setValueInLocalStorage] = simpleLocalStorage('yardsale_token');

export const sliceUserState = createSlice({
    name: 'userState',
    initialState: {
        email: "",
        token: Boolean(value),
        fetching: false,
        error: false,
    },
    reducers: {
        requestUserGeneral: (state) => {
            state.error = false;
            state.fetching = true;
        },
        resultUserGeneral: (state) => {
            state.error = false;
            state.fetching = true;
        },
        resultUserLogin: (state, action) => {
            const data = action.payload;
            setValueInLocalStorage(data.token);
            state.fetching = false;
            state.email = data.email;
            state.token = true;
        },
        errorUserGeneral: (state) => {
            state.error = true;
            state.fetching = false;
        }
    }
})

export const userState = (state) => state.sliceUserState;
export const { requestUserGeneral, resultUserGeneral, resultUserLogin, errorUserGeneral } = sliceUserState.actions;
export default sliceUserState.reducer;
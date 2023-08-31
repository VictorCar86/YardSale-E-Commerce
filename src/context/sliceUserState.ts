import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./reduxState";
// import simpleLocalStorage from "../utils/simpleLocalStorage";
// const [value, setValueInLocalStorage] = simpleLocalStorage('yardsale_token');

export type UserInfo = {
    firstName: string,
    lastName: string,
    email: `${string}@${string}.${string}` | '',
    role: 'customer' | 'admin',
};

const userInfoInitial: UserInfo = {
    firstName: '',
    lastName: '',
    email: '',
    role: 'customer',
};

export const sliceUserState = createSlice({
    name: 'userState',
    initialState: {
        userInfo: userInfoInitial,
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
        resultUserInfo: (state, action: PayloadAction<UserInfo>) => {
            const data = action.payload;
            state.userInfo = data;
            state.fetching = false;
        },

        resetUserState: (state) => {
            state.userInfo = userInfoInitial;
            state.fetching = false;
            state.error = false;
        },
        errorUserGeneral: (state) => {
            state.error = true;
            state.fetching = false;
        }
    }
});

export const userState = (state: RootState) => state.sliceUserState;
export type UserState = ReturnType<typeof userState>;
export const {
    requestUserGeneral,
    resultUserGeneral,
    resultUserInfo,
    resetUserState,
    errorUserGeneral
} = sliceUserState.actions;
export default sliceUserState.reducer;
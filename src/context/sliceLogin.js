import { createSlice } from "@reduxjs/toolkit";
import simpleLocalStorage from "../utils/simpleLocalStorage";

const [value, setValueInLocalStorage] = simpleLocalStorage('yardsale_token');

export const sliceUserState = createSlice({
    name: 'userState',
    initialState: {
        token: Boolean(value),
        fetching: false,
        error: false,
    },
    reducers: {
        requestUser: (state) => {
            state.error = false;
            state.fetching = true;
        },
        resultUserLogin: (state, action) => {
            const token = action.payload.token;
            setValueInLocalStorage(token);
            state.token = true;
            state.fetching = false;
        },
        errorUser: (state) => {
            state.error = true;
            state.fetching = false;
        }
    }
})

export const userState = (state) => state.sliceUserState;
export const { requestUser, resultUserLogin, errorUser } = sliceUserState.actions;
export default sliceUserState.reducer;


// Fetch Methods


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// async function GET(goalId) {
//     const options = {
//         method: 'GET',
//         headers: { 'content-type': 'application/json' },
//     };

//     try {
//         dispatcher(requestUser());

//         const response = await fetch(`${BACKEND_URL}/api/v1/login/goal/${goalId}`, options)
//         const jsonResponse = await response.json();

//         dispatcher(resultUserLogin(jsonResponse));
//     }
//     catch (err) {
//         console.error(err);
//         dispatcher(errorUser());
//     }
// }

async function LOGIN(config, dispatch) {
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(config.body),
    };

    try {
        dispatch(requestUser);

        const response = await fetch(`${BACKEND_URL}/api/v1/auth/login`, options);
        const jsonResponse = await response.json();

        if (jsonResponse.error) throw jsonResponse.message;

        dispatch(resultUserLogin(jsonResponse));

        if (config.onSuccess) config.onSuccess();
    }
    catch (err) {
        dispatch(errorUser);

        if (config.onError) config.onError(err);
    }
    finally {
        if (config.finally) config.finally();
    }
}

async function RECOVER_BY_EMAIL(config){
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(config.body),
    };

    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/auth/recovery`, options);
        const jsonResponse = await response.json();

        if (jsonResponse.error) throw jsonResponse.message;

        if (config.onSuccess) config.onSuccess();
    }
    catch (err) {
        if (config.onError) config.onError(err);
    }
    finally {
        if (config.finally) config.finally();
    }
}

export const fetchUser = { LOGIN, RECOVER_BY_EMAIL };
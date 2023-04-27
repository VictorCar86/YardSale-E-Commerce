import { createSlice } from "@reduxjs/toolkit";
import simpleLocalStorage from "../utils/simpleLocalStorage";

const [value, setValueInLocalStorage] = simpleLocalStorage('yardsale_token');

export const sliceLogin = createSlice({
    name: 'login',
    initialState: {
        token: Boolean(value),
        fetching: false,
        error: false,
    },
    reducers: {
        requestLogin: (state) => {
            state.error = false;
            state.fetching = true;
        },
        resultLogin: (state, action) => {
            const token = action.payload.token;
            setValueInLocalStorage(token);
            state.token = true;
            state.fetching = false;
        },
        errorLogin: (state) => {
            state.error = true;
            state.fetching = false;
        }
    }
})

export const loginState = (state) => state.sliceLogin;
export const { requestLogin, resultLogin, errorLogin } = sliceLogin.actions;
export default sliceLogin.reducer;


// Fetch Methods


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// async function GET(goalId) {
//     const options = {
//         method: 'GET',
//         headers: { 'content-type': 'application/json' },
//     };

//     try {
//         dispatcher(requestLogin());

//         const response = await fetch(`${BACKEND_URL}/api/v1/login/goal/${goalId}`, options)
//         const jsonResponse = await response.json();

//         dispatcher(resultLogin(jsonResponse));
//     }
//     catch (err) {
//         console.error(err);
//         dispatcher(errorLogin());
//     }
// }

async function POST(config, dispatch) {
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(config.body),
    };

    try {
        dispatch(requestLogin);

        const response = await fetch(`${BACKEND_URL}/api/v1/auth/login`, options);
        const jsonResponse = await response.json();

        if (jsonResponse.error) throw jsonResponse.message;

        dispatch(resultLogin(jsonResponse));

        if (config.onSuccess){
            config.onSuccess();
        }
    }
    catch (err) {
        dispatch(errorLogin);

        if (config.onError){
            config.onError(err);
        }
    }
    finally {
        if (config.finally){
            config.finally();
        }
    }
}

export const fetchLogin = { POST };
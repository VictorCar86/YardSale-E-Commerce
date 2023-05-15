import axios from 'axios';
import { errorUserGeneral, requestUserGeneral, resultUserGeneral, resultUserLogin } from "../context/sliceUserState";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function LOGIN(config, dispatch) {
    const axiosOptions = {
        method: 'POST',
        url: `${BACKEND_URL}/api/v1/auth/login`,
        headers: { 'content-type': 'application/json' },
        data: JSON.stringify(config.body),
    };

    try {
        dispatch(requestUserGeneral());
        const response = await axios(axiosOptions);

        dispatch(resultUserLogin(response.data));
        if (config.onSuccess) config.onSuccess(response.data.message);
    }
    catch (err) {
        dispatch(errorUserGeneral());
        if (config.onError) config.onError(err.response.data.message);
    }
    finally {
        if (config.finally) config.finally();
    }
}

async function SIGNUP(config, dispatch) {
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(config.body),
    };

    try {
        dispatch(requestUserGeneral());

        const response = await fetch(`${BACKEND_URL}/api/v1/customers`, options);
        const jsonResponse = await response.json();

        if (jsonResponse.error) throw jsonResponse.message;

        dispatch(resultUserLogin(jsonResponse));

        if (config.onSuccess) config.onSuccess(jsonResponse.message);
    }
    catch (err) {
        dispatch(errorUserGeneral());

        if (config.onError) config.onError(err);
    }
    finally {
        if (config.finally) config.finally();
    }
}

async function RECOVER_BY_EMAIL(config, dispatch){
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(config.body),
    };

    try {
        dispatch(requestUserGeneral());

        const response = await fetch(`${BACKEND_URL}/api/v1/auth/recovery`, options);
        const jsonResponse = await response.json();

        if (jsonResponse.error) throw jsonResponse.message;

        dispatch(resultUserGeneral());

        if (config.onSuccess) config.onSuccess(jsonResponse.message);
    }
    catch (err) {
        dispatch(errorUserGeneral());

        if (config.onError) config.onError(err);
    }
    finally {
        if (config.finally) config.finally();
    }
}

// async function SESSION_STATUS(){
//     const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/session-status`);
//     console.log(response)
// }

export default { LOGIN, SIGNUP, RECOVER_BY_EMAIL };
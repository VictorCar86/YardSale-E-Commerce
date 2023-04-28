import { errorUserGeneral, requestUserGeneral, resultUserGeneral, resultUserLogin } from "../context/sliceUserState";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function LOGIN(config, dispatch) {
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(config.body),
    };

    try {
        dispatch(requestUserGeneral());

        const response = await fetch(`${BACKEND_URL}/api/v1/auth/login`, options);
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

export default { LOGIN, SIGNUP, RECOVER_BY_EMAIL };
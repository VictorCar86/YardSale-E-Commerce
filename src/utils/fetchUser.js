import axios from 'axios';
import {
    errorUserGeneral,
    requestUserGeneral,
    resultUserGeneral,
    resultUserSignout,
    resultUserInfo
} from "../context/sliceUserState";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function LOGIN(config = {}, dispatch) {
    const options = {
        method: 'POST',
        url: `${BACKEND_URL}/api/v1/auth/login`,
        headers: { 'content-type': 'application/json' },
        data: JSON.stringify(config.body),
    };

    try {
        dispatch(requestUserGeneral());
        const response = await axios(options);

        dispatch(resultUserGeneral());
        if (config.onSuccess) config.onSuccess(response.data.message);

        USER_INFO({}, dispatch);
    }
    catch (err) {
        dispatch(errorUserGeneral());
        if (config.onError) config.onError(err.response.data.message);
    }
    finally {
        if (config.finally) config.finally();
    }
}

async function SIGNUP(config = {}, dispatch) {
    const options = {
        method: 'POST',
        url: `${BACKEND_URL}/api/v1/customers`,
        headers: { 'content-type': 'application/json' },
        data: JSON.stringify(config.body),
    };

    try {
        dispatch(requestUserGeneral());
        const response = await axios(options);

        dispatch(resultUserGeneral());
        if (config.onSuccess) config.onSuccess(response.data.message);

        USER_INFO({}, dispatch);
    }
    catch (err) {
        dispatch(errorUserGeneral());
        if (config.onError) config.onError(err.response.data.message);
    }
    finally {
        if (config.finally) config.finally();
    }
}

async function SIGNOUT(config = {}, dispatch) {
    const options = {
        method: 'POST',
        url: `${BACKEND_URL}/api/v1/auth/signout`,
        headers: { 'content-type': 'application/json' },
    };

    try {
        dispatch(requestUserGeneral());
        const response = await axios(options);

        dispatch(resultUserSignout());
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

async function UPDATE_DATA(config = {}, dispatch) {
    const options = {
        method: 'PATCH',
        url: `${BACKEND_URL}/api/v1/users`,
        headers: { 'content-type': 'application/json' },
    };

    try {
        dispatch(requestUserGeneral());
        const response = await axios(options);

        dispatch(resultUserInfo(response.data));
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

async function RECOVER_BY_EMAIL(config = {}, dispatch){
    const options = {
        method: 'POST',
        url: `${BACKEND_URL}/api/v1/auth/recovery`,
        headers: { 'content-type': 'application/json' },
        data: JSON.stringify(config.body),
    };

    try {
        dispatch(requestUserGeneral());
        const response = await axios(options);

        dispatch(resultUserGeneral());
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

async function USER_INFO(config = {}, dispatch){
    try {
        dispatch(requestUserGeneral());
        const response = await axios.get(`${BACKEND_URL}/api/v1/users/info`);

        dispatch(resultUserInfo(response.data));
        if (config.onSuccess) config.onSuccess(response.data.message);
    }
    catch (err){
        dispatch(errorUserGeneral());
        if (config.onError) config.onError(err.response.data.message);
    }
    finally {
        if (config.finally) config.finally();
    }
}

export default { LOGIN, SIGNUP, SIGNOUT, UPDATE_DATA, RECOVER_BY_EMAIL, USER_INFO };
import axios from 'axios';

class MakeRequest {
    #BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    async makeRequest(dispatch, dispatchConfig = {}, requestConfig = {},) {
        const { method, url, body, params, onSuccess, onError, onFinally } = requestConfig;
        const { beforeRequest, afterRequest, catchError, catchFinally } = dispatchConfig;

        const axiosOptions = {
            method,
            url: `${this.#BACKEND_URL}${url}`,
            headers: { 'content-type': 'application/json' },
            data: JSON.stringify(body),
            params,
        };

        function dispatchItems(configToDisptach, parameters = null) {
            if (Array.isArray(configToDisptach)) {
                configToDisptach.forEach(itemToDispatch => {
                    dispatch(itemToDispatch(parameters));
                });
            }
            else {
                dispatch(configToDisptach(parameters));
            }
        }

        try {
            if (beforeRequest) dispatchItems(beforeRequest);
            const response = await axios(axiosOptions);

            if (afterRequest) dispatchItems(afterRequest, response.data);
            if (onSuccess) onSuccess(response.data.message);
        }
        catch (err) {
            if (catchError) dispatchItems(catchError);
            if (onError) onError(err.response.data.message);
        }
        finally {
            if (catchFinally) dispatchItems(catchFinally);
            if (onFinally) onFinally();
        }
    }
}

export default MakeRequest;
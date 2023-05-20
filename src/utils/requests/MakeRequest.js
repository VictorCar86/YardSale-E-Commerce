import axios from 'axios';

class MakeRequest {
    #BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    async makeRequest(dispatch, dispatchConfig = {}, requestConfig = {},) {
        const { method, url, body, onSuccess, onError } = requestConfig;
        const { beforeRequest, afterRequest, catchError, catchFinally } = dispatchConfig;

        const axiosOptions = {
            method,
            url: `${this.#BACKEND_URL}${url}`,
            headers: { 'content-type': 'application/json' },
            data: JSON.stringify(body),
        };

        try {
            if (beforeRequest) dispatch(beforeRequest());
            const response = await axios(axiosOptions);

            if (afterRequest) dispatch(afterRequest(response.data));
            if (onSuccess) onSuccess(response.data.message);
        }
        catch (err) {
            if (catchError) dispatch(catchError());
            if (onError) onError(err.response.data.message);
        }
        finally {
            if (catchFinally) dispatch(catchFinally());
            if (requestConfig.finally) requestConfig.finally();
        }
    }
}

export default MakeRequest;
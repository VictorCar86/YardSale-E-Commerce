import axios, { Method } from 'axios';
import { Dispatcher } from '../../context/reduxState';
import { ActionCreator } from "@reduxjs/toolkit";

type ActionCreatorDTO = ActionCreator<any> | ActionCreator<any>[];

export type DispatchConfig = {
    beforeRequest?: ActionCreatorDTO,
    afterRequest?: ActionCreatorDTO,
    catchError?: ActionCreatorDTO,
    catchFinally?: ActionCreatorDTO,
}

export type RequestConfig = {
    method: Method,
    url: string,
    body?: any,
    params?: object,
    onSuccess?: (message: string) => any,
    onError?: (error: string) => any,
    onFinally?: () => any,
}

export type FetchConfig = Omit<RequestConfig, 'method' | 'url'>;

class MakeRequest {

    #BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    async makeRequest(dispatch: Dispatcher, requestConfig: RequestConfig, dispatchConfig: DispatchConfig) {
        const { method, url, body, params, onSuccess, onError, onFinally } = requestConfig;
        const { beforeRequest, afterRequest, catchError, catchFinally } = dispatchConfig;

        const axiosOptions = {
            method,
            url: `${this.#BACKEND_URL}${url}`,
            headers: { 'content-type': 'application/json' },
            data: JSON.stringify(body),
            params,
        };

        function dispatchItems(configToDispatch: ActionCreatorDTO, parameters?: any) {
            if (Array.isArray(configToDispatch)) {
                configToDispatch.forEach(itemToDispatch => {
                    dispatch(itemToDispatch(parameters));
                });
            }
            else {
                dispatch(configToDispatch(parameters));
            }
        }

        try {
            if (beforeRequest) dispatchItems(beforeRequest);

            const response = await axios(axiosOptions);

            if (afterRequest) dispatchItems(afterRequest, response.data);
            if (onSuccess) onSuccess(response.data.message);
        }
        catch (err: any) {
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
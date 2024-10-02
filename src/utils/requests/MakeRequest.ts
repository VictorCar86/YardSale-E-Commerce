import axios, { Method } from 'axios';
import { DispatcherStore } from '../../context/reduxState';
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
    body?: { [key: string]: any },
    params?: { [key: string]: any },
    onSuccess?: (message: string) => any,
    onError?: (error: string) => any,
    onFinally?: () => any,
}

export type FetchConfig = Omit<RequestConfig, 'method' | 'url'>;

class MakeRequest {

    #BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    async makeRequest(dispatch: DispatcherStore, requestConfig: RequestConfig, dispatchConfig: DispatchConfig) {
        const { method, url, body, params, onSuccess, onError, onFinally } = requestConfig;
        const { beforeRequest, afterRequest, catchError, catchFinally } = dispatchConfig;

        const axiosOptions = {
            method,
            url: `${this.#BACKEND_URL}${url}`,
            headers: { 'content-type': 'application/json' },
            data: JSON.stringify(body),
            params,
        };

        try {
            if (beforeRequest) this.dispatchItems(dispatch, beforeRequest);

            const response = await axios(axiosOptions);

            if (afterRequest) this.dispatchItems(dispatch, afterRequest, response.data);
            if (onSuccess) onSuccess(response.data.message);
        }
        catch (err: any) {
            if (catchError) this.dispatchItems(dispatch, catchError);
            if (onError) onError(err.response.data.message);
        }
        finally {
            if (catchFinally) this.dispatchItems(dispatch, catchFinally);
            if (onFinally) onFinally();
        }
    }

    private dispatchItems(dispatcher: DispatcherStore, configToDispatch: ActionCreatorDTO, parameters?: any) {
        if (Array.isArray(configToDispatch)) {
            configToDispatch.forEach(itemToDispatch => {
                dispatcher(itemToDispatch(parameters));
            });
        }
        else {
            dispatcher(configToDispatch(parameters));
        }
    }
}

export default MakeRequest;
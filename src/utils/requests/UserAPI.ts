import MakeRequest, {
    DispatchConfig,
    RequestConfig,
    FetchConfig,
} from "./MakeRequest";
import {
    errorUserGeneral,
    requestUserGeneral,
    resultUserGeneral,
    resultUserInfo,
    resetUserState,
} from "../../context/sliceUserState";
import { resetShopCartState } from "../../context/sliceShoppingCartState";
import { resetOrdersState } from "../../context/sliceOrdersState";
import { DispatcherStore } from "../../context/reduxState";
import shoppingCartAPI from './ShoppingCartAPI';

class UserAPI extends MakeRequest {
    async LOGIN(config: FetchConfig, dispatcher: DispatcherStore) {
        const requestConfig: RequestConfig = {
            method: 'POST',
            url: '/api/v1/auth/login',
            ...config,
        };
        const dispatchConfig: DispatchConfig = {
            beforeRequest: requestUserGeneral,
            afterRequest: resultUserGeneral,
            catchError: errorUserGeneral,
        };

        await this.makeRequest(
            dispatcher,
            requestConfig,
            dispatchConfig,
        );

        await this.USER_INFO({}, dispatcher);
        await shoppingCartAPI.CART_ITEMS({}, dispatcher);
    }

    async SIGNUP(config: FetchConfig, dispatcher: DispatcherStore) {
        const requestConfig: RequestConfig = {
            method: 'POST',
            url: '/api/v1/customers',
            ...config,
        };
        const dispatchConfig: DispatchConfig = {
            beforeRequest: requestUserGeneral,
            afterRequest: resultUserGeneral,
            catchError: errorUserGeneral,
        };

        await this.makeRequest(
            dispatcher,
            requestConfig,
            dispatchConfig,
        );

        await this.USER_INFO({}, dispatcher);
    }

    async SIGNOUT(config: FetchConfig, dispatcher: DispatcherStore) {
        const requestConfig: RequestConfig = {
            method: 'POST',
            url: '/api/v1/auth/signout',
            ...config,
        };
        const dispatchConfig: DispatchConfig = {
            beforeRequest: requestUserGeneral,
            afterRequest: [resetUserState, resetShopCartState, resetOrdersState],
            catchError: errorUserGeneral,
        };

        await this.makeRequest(
            dispatcher,
            requestConfig,
            dispatchConfig,
        );
    }

    async UPDATE_DATA(config: FetchConfig, dispatcher: DispatcherStore) {
        const requestConfig: RequestConfig = {
            method: 'PATCH',
            url: '/api/v1/users',
            ...config,
        };
        const dispatchConfig: DispatchConfig = {
            beforeRequest: requestUserGeneral,
            afterRequest: resultUserInfo,
            catchError: errorUserGeneral,
        };

        await this.makeRequest(
            dispatcher,
            requestConfig,
            dispatchConfig,
        );
    }

    async USER_INFO(config: FetchConfig, dispatcher: DispatcherStore) {
        const requestConfig: RequestConfig = {
            method: 'GET',
            url: '/api/v1/users/info',
            ...config,
        };
        const dispatchConfig: DispatchConfig = {
            beforeRequest: requestUserGeneral,
            afterRequest: resultUserInfo,
            catchError: resetUserState,
        };

        await this.makeRequest(
            dispatcher,
            requestConfig,
            dispatchConfig,
        );
    }

    async RECOVER_BY_EMAIL(config: FetchConfig, dispatcher: DispatcherStore) {
        const requestConfig: RequestConfig = {
            method: 'POST',
            url: '/api/v1/auth/recovery',
            ...config,
        };
        const dispatchConfig: DispatchConfig = {
            beforeRequest: requestUserGeneral,
            afterRequest: resultUserGeneral,
            catchError: errorUserGeneral,
        };

        await this.makeRequest(
            dispatcher,
            requestConfig,
            dispatchConfig,
        );
    }

    async CHANGE_PASSWORD(config: FetchConfig, dispatcher: DispatcherStore) {
        const requestConfig: RequestConfig = {
            method: 'POST',
            url: '/api/v1/auth/new-password',
            ...config,
        };
        const dispatchConfig: DispatchConfig = {
            beforeRequest: requestUserGeneral,
            afterRequest: resultUserGeneral,
            catchError: errorUserGeneral,
        };

        await this.makeRequest(
            dispatcher,
            requestConfig,
            dispatchConfig,
        );
    }
}

const userAPI = new UserAPI();
export default userAPI;
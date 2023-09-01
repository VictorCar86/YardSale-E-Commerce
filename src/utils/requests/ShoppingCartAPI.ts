import MakeRequest, {
    DispatchConfig,
    RequestConfig,
    FetchConfig,
} from "./MakeRequest";
import {
    requestShopCartGeneral,
    resultShopCartData,
    errorShopCartGeneral,
} from "../../context/sliceShoppingCartState";
import { DispatcherStore } from "../../context/reduxState";

class ShoppingCartAPI extends MakeRequest {
    #SHOPCART_URL = '/api/v1/shopping-cart/';

    async CART_ITEMS(config: FetchConfig = {}, dispatcher: DispatcherStore) {
        const requestConfig: RequestConfig = {
            method: 'GET',
            url: this.#SHOPCART_URL,
            ...config,
        };
        const dispatchConfig: DispatchConfig = {
            beforeRequest: requestShopCartGeneral,
            afterRequest: resultShopCartData,
            catchError: errorShopCartGeneral,
        };

        await this.makeRequest(
            dispatcher,
            requestConfig,
            dispatchConfig
        );
    }

    async ADD_ITEM(config: FetchConfig = {}, dispatcher: DispatcherStore) {
        const requestConfig: RequestConfig = {
            method: 'POST',
            url: this.#SHOPCART_URL + config.body?.productId,
            ...config,
        };
        const dispatchConfig: DispatchConfig = {
            beforeRequest: requestShopCartGeneral,
            afterRequest: resultShopCartData,
            catchError: errorShopCartGeneral,
        };

        await this.makeRequest(
            dispatcher,
            requestConfig,
            dispatchConfig
        );
    }

    async UPDATE_ITEM(config: FetchConfig = {}, dispatcher: DispatcherStore) {
        const requestConfig: RequestConfig = {
            method: 'PATCH',
            url: this.#SHOPCART_URL + config.body?.productId,
            ...config,
        };
        const dispatchConfig: DispatchConfig = {
            beforeRequest: requestShopCartGeneral,
            afterRequest: resultShopCartData,
            catchError: errorShopCartGeneral,
        };

        await this.makeRequest(
            dispatcher,
            requestConfig,
            dispatchConfig
        );
    }

    async DELETE_ITEM(config: FetchConfig = {}, dispatcher: DispatcherStore) {
        const requestConfig: RequestConfig = {
            method: 'DELETE',
            url: this.#SHOPCART_URL + config.body?.productId,
            ...config,
        };
        const dispatchConfig: DispatchConfig = {
            beforeRequest: requestShopCartGeneral,
            afterRequest: resultShopCartData,
            catchError: errorShopCartGeneral,
        };

        await this.makeRequest(
            dispatcher,
            requestConfig,
            dispatchConfig
        );
    }
}

const shoppingCartAPI = new ShoppingCartAPI();
export default shoppingCartAPI;

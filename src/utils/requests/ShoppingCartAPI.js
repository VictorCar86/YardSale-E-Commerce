import MakeRequest from "./MakeRequest";
import {
    requestShopCartGeneral,
    resultShopCartData,
    errorShopCartGeneral,
} from "../../context/sliceShoppingCartState";

class ShoppingCartAPI extends MakeRequest {
    #SHOPCART_URL = '/api/v1/shopping-cart/';

    async CART_ITEMS(config = {}, dispatcher) {
        const dispatchConfig = {
            beforeRequest: requestShopCartGeneral,
            afterRequest: resultShopCartData,
            catchError: errorShopCartGeneral,
        };

        await this.makeRequest(
            dispatcher,
            dispatchConfig,
            { method: 'GET', url: this.#SHOPCART_URL, ...config, },
        );
    }

    async ADD_ITEM(config = {}, dispatcher) {
        const dispatchConfig = {
            beforeRequest: requestShopCartGeneral,
            afterRequest: resultShopCartData,
            catchError: errorShopCartGeneral,
        };

        await this.makeRequest(
            dispatcher,
            dispatchConfig,
            { method: 'POST', url: (this.#SHOPCART_URL + config.body.productId), ...config, },
        );
    }

    async UPDATE_ITEM(config = {}, dispatcher) {
        const dispatchConfig = {
            beforeRequest: requestShopCartGeneral,
            afterRequest: resultShopCartData,
            catchError: errorShopCartGeneral,
        };

        await this.makeRequest(
            dispatcher,
            dispatchConfig,
            { method: 'PATCH', url: (this.#SHOPCART_URL + config.body.productId), ...config, },
        );
    }

    async DELETE_ITEM(config = {}, dispatcher) {
        const dispatchConfig = {
            beforeRequest: requestShopCartGeneral,
            afterRequest: resultShopCartData,
            catchError: errorShopCartGeneral,
        };

        await this.makeRequest(
            dispatcher,
            dispatchConfig,
            { method: 'DELETE', url: (this.#SHOPCART_URL + config.body.productId), ...config, },
        );
    }
}

const shoppingCartAPI = new ShoppingCartAPI();
export default shoppingCartAPI;
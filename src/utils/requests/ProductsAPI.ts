import MakeRequest, {
    DispatchConfig,
    RequestConfig,
    FetchConfig,
} from "./MakeRequest";
import {
    beforeProductsGeneral,
    afterProductsGeneral,
    resultProductsData,
    errorProductsGeneral,
    finallyProductsGeneral,
    createProductPreview,
} from "../../context/sliceProductsState";
import { DispatcherStore } from "../../context/reduxState";
import { itemsPerPage } from "../itemsPerPage";

class ProductsAPI extends MakeRequest {
    async PRODUCTS_LIST(config: FetchConfig, dispatcher: DispatcherStore) {
        config.params = {
            ...config.params,
            itemsPerPage: itemsPerPage(),
        };

        const requestConfig: RequestConfig = {
            method: 'GET',
            url: '/api/v1/products',
            ...config,
        };
        const dispatchConfig: DispatchConfig = {
            beforeRequest: beforeProductsGeneral,
            afterRequest: [resultProductsData, afterProductsGeneral],
            catchError: errorProductsGeneral,
            catchFinally: finallyProductsGeneral,
        };

        await this.makeRequest(
            dispatcher,
            requestConfig,
            dispatchConfig
        );
    }

    async PRODUCT_INFO(config: FetchConfig, dispatcher: DispatcherStore) {
        const requestConfig: RequestConfig = {
            method: 'GET',
            url: '/api/v1/products/' + config.body?.productId,
            ...config,
        };
        const dispatchConfig: DispatchConfig = {
            beforeRequest: beforeProductsGeneral,
            afterRequest: [createProductPreview, afterProductsGeneral],
            catchError: errorProductsGeneral,
            catchFinally: finallyProductsGeneral,
        };

        await this.makeRequest(
            dispatcher,
            requestConfig,
            dispatchConfig
        );
    }
}

const productsAPI = new ProductsAPI();
export default productsAPI;

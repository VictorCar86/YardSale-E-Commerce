import MakeRequest, {
    DispatchConfig,
    RequestConfig,
    FetchConfig,
} from "./MakeRequest";
import {
    requestProductsGeneral,
    resultProductsGeneral,
    resultProductsData,
    createProductPreview,
    errorProductsGeneral,
} from "../../context/sliceProductsState";
import { DispatcherStore } from "../../context/reduxState";

class ProductsAPI extends MakeRequest {
    async PRODUCTS_LIST(config: FetchConfig, dispatcher: DispatcherStore) {
        config.params = {
            ...config.params,
            itemsPerPage: window.innerWidth > 768 ? 20 : 10,
        };

        const requestConfig: RequestConfig = {
            method: 'GET',
            url: '/api/v1/products',
            ...config,
        };
        const dispatchConfig: DispatchConfig = {
            beforeRequest: requestProductsGeneral,
            afterRequest: resultProductsData,
            catchError: errorProductsGeneral,
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
            beforeRequest: requestProductsGeneral,
            afterRequest: [createProductPreview, resultProductsGeneral],
            catchError: errorProductsGeneral,
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

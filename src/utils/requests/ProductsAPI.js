import MakeRequest from "./MakeRequest";
import {
    requestProductsGeneral,
    resultProductsGeneral,
    resultProductsData,
    createProductPreview,
    errorProductsGeneral,
} from "../../context/sliceProductsState";

class ProductsAPI extends MakeRequest {
    async PRODUCTS_LIST(config = {}, dispatcher) {
        const dispatchConfig = {
            beforeRequest: requestProductsGeneral,
            afterRequest: resultProductsData,
            catchError: errorProductsGeneral,
        };

        await this.makeRequest(
            dispatcher,
            dispatchConfig,
            { method: 'GET', url: '/api/v1/products', ...config, },
        );
    }

    async PRODUCT_INFO(config = {}, dispatcher) {
        const dispatchConfig = {
            beforeRequest: requestProductsGeneral,
            afterRequest: [createProductPreview, resultProductsGeneral],
            catchError: errorProductsGeneral,
        };

        await this.makeRequest(
            dispatcher,
            dispatchConfig,
            { method: 'GET', url: ('/api/v1/products/' + config.body.productId), ...config, },
        );
    }
}

const productsAPI = new ProductsAPI();
export default productsAPI;
import MakeRequest from "./MakeRequest";
import {
    requestProductsGeneral,
    resultProductsGeneral,
    resultProductsData,
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
}

const productsAPI = new ProductsAPI();
export default productsAPI;
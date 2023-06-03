import MakeRequest from "./MakeRequest";
import {
    requestOrdersGeneral,
    resultOrdersData,
    errorOrdersGeneral,
} from "../../context/sliceOrdersState";

class OrdersAPI extends MakeRequest {
    #ORDERS_URL = '/api/v1/orders/';

    async ORDERS_LIST(config = {}, dispatcher) {
        const dispatchConfig = {
            beforeRequest: requestOrdersGeneral,
            afterRequest: resultOrdersData,
            catchError: errorOrdersGeneral,
        };

        await this.makeRequest(
            dispatcher,
            dispatchConfig,
            { method: 'GET', url: (this.#ORDERS_URL + 'user'), ...config, },
        );
    }

    async CREATE_ORDER(config = {}, dispatcher) {
        const dispatchConfig = {
            beforeRequest: requestOrdersGeneral,
            afterRequest: resultOrdersData,
            catchError: errorOrdersGeneral,
        };

        await this.makeRequest(
            dispatcher,
            dispatchConfig,
            { method: 'POST', url: (this.#ORDERS_URL + 'items'), ...config, },
        );
    }
}

const ordersAPI = new OrdersAPI();
export default ordersAPI;
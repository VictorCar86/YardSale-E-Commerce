import MakeRequest, {
    DispatchConfig,
    RequestConfig,
    FetchConfig,
} from "./MakeRequest";
import {
    requestOrdersGeneral,
    resultOrdersData,
    errorOrdersGeneral,
} from "../../context/sliceOrdersState";
import { DispatcherStore } from "../../context/reduxState";

class OrdersAPI extends MakeRequest {
    #ORDERS_URL = '/api/v1/orders/';

    async ORDERS_LIST(config: FetchConfig, dispatcher: DispatcherStore) {
        const requestConfig: RequestConfig = {
            method: 'GET',
            url: this.#ORDERS_URL + 'user',
            ...config,
        };
        const dispatchConfig: DispatchConfig = {
            beforeRequest: requestOrdersGeneral,
            afterRequest: resultOrdersData,
            catchError: errorOrdersGeneral,
        };

        await this.makeRequest(
            dispatcher,
            requestConfig,
            dispatchConfig
        );
    }

    async CREATE_ORDER(config: FetchConfig, dispatcher: DispatcherStore) {
        const requestConfig: RequestConfig = {
            method: 'POST',
            url: this.#ORDERS_URL + 'items',
            ...config,
        };
        const dispatchConfig: DispatchConfig = {
            beforeRequest: requestOrdersGeneral,
            afterRequest: resultOrdersData,
            catchError: errorOrdersGeneral,
        };

        await this.makeRequest(
            dispatcher,
            requestConfig,
            dispatchConfig
        );
    }
}

const ordersAPI = new OrdersAPI();
export default ordersAPI;

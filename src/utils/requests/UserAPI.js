import MakeRequest from "./MakeRequest";
import {
    errorUserGeneral,
    requestUserGeneral,
    resultUserGeneral,
    resultUserSignout,
    resultUserInfo,
} from "../../context/sliceUserState";

class UserAPI extends MakeRequest {
    async LOGIN(config = {}, dispatcher) {
        const dispatchConfig = {
            beforeRequest: requestUserGeneral,
            afterRequest: resultUserGeneral,
            catchError: errorUserGeneral,
        };

        await this.makeRequest(
            dispatcher,
            dispatchConfig,
            { method: 'POST', url: '/api/v1/auth/login', ...config, },
        );

        await this.USER_INFO({}, dispatcher);
    }

    async SIGNUP(config = {}, dispatcher) {
        const dispatchConfig = {
            beforeRequest: requestUserGeneral,
            afterRequest: resultUserGeneral,
            catchError: errorUserGeneral,
        };

        await this.makeRequest(
            dispatcher,
            dispatchConfig,
            { method: 'POST', url: '/api/v1/customers', ...config }
        );

        await this.USER_INFO({}, dispatcher);
    }

    async SIGNOUT(config = {}, dispatcher) {
        const dispatchConfig = {
            beforeRequest: requestUserGeneral,
            afterRequest: resultUserSignout,
            catchError: errorUserGeneral,
        };

        await this.makeRequest(
            dispatcher,
            dispatchConfig,
            { method: 'POST', url: '/api/v1/auth/signout', ...config }
        );
    }

    async UPDATE_DATA(config = {}, dispatcher) {
        const dispatchConfig = {
            beforeRequest: requestUserGeneral,
            afterRequest: resultUserInfo,
            catchError: errorUserGeneral,
        };

        await this.makeRequest(
            dispatcher,
            dispatchConfig,
            { method: 'PATCH', url: '/api/v1/users', ...config }
        );
    }

    async RECOVER_BY_EMAIL(config = {}, dispatcher) {
        const dispatchConfig = {
            beforeRequest: requestUserGeneral,
            afterRequest: resultUserGeneral,
            catchError: errorUserGeneral,
        };

        await this.makeRequest(
            dispatcher,
            dispatchConfig,
            { method: 'POST', url: '/api/v1/auth/recovery', ...config }
        );
    }

    async USER_INFO(config = {}, dispatcher) {
        const dispatchConfig = {
            beforeRequest: requestUserGeneral,
            afterRequest: resultUserInfo,
            catchError: resultUserSignout,
        };

        await this.makeRequest(
            dispatcher,
            dispatchConfig,
            { method: 'GET', url: '/api/v1/users/info', ...config }
        );
    }
}

const userAPI = new UserAPI();
export default userAPI;
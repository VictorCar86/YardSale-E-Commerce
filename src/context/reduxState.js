import { configureStore } from "@reduxjs/toolkit";
import sliceUserState from "./sliceUserState";
import sliceProductsState from "./sliceProductsState";
import sliceShoppingCartState from "./sliceShoppingCart";

export const store = configureStore({
    reducer: {
        sliceUserState,
        sliceProductsState,
        sliceShoppingCartState,
    }
});
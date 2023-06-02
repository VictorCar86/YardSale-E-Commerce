import { configureStore } from "@reduxjs/toolkit";
import sliceUserState from "./sliceUserState";
import sliceProductsState from "./sliceProductsState";
import sliceShoppingCartState from "./sliceShoppingCartState";
import sliceOrdersState from "./sliceOrdersState";
import sliceModalsState from "./sliceModalsState";

export const store = configureStore({
    reducer: {
        sliceUserState,
        sliceProductsState,
        sliceShoppingCartState,
        sliceOrdersState,
        sliceModalsState,
    }
});
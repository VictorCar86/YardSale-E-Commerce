import { configureStore } from "@reduxjs/toolkit";
import sliceUserState from "./sliceUserState";
import sliceProductsState from "./sliceProductsState";

export const store = configureStore({
    reducer: {
        sliceUserState,
        sliceProductsState,
    }
});
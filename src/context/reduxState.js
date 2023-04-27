import { configureStore } from "@reduxjs/toolkit";
import sliceLogin from "./sliceLogin";

export const store = configureStore({
    reducer: {
        sliceLogin,
    }
});
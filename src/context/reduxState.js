import { configureStore } from "@reduxjs/toolkit";
import sliceUserState from "./sliceUserState";

export const store = configureStore({
    reducer: {
        sliceUserState,
    }
});
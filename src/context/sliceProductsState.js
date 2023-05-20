import { createSlice } from "@reduxjs/toolkit";

export const sliceProductsState = createSlice({
    name: 'productsState',
    initialState: {
        productsData: null,
        fetching: false,
        error: false,
    },
    reducers: {
        requestProductsGeneral: (state) => {
            state.fetching = true;
            state.error = false;
        },

        resultProductsGeneral: (state) => {
            state.fetching = false;
        },
        resultProductsData: (state, action) => {
            const data = action.payload;
            state.productsData = data;
            state.fetching = false;
        },

        errorProductsGeneral: (state) => {
            state.fetching = false;
            state.error = true;
        }
    }
});

export const productsState = (state) => state.sliceProductsState;
export const {
    requestProductsGeneral,
    resultProductsGeneral,
    resultProductsData,
    errorProductsGeneral,
} = sliceProductsState.actions;
export default sliceProductsState.reducer;
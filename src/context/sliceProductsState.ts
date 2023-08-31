import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./reduxState";

export const sliceProductsState = createSlice({
    name: 'productsState',
    initialState: {
        productsData: null,
        productPreview: null,
        fetching: false,
        error: false,
    },
    reducers: {
        requestProductsGeneral: (state) => {
            state.productsData = null;
            state.fetching = true;
            state.error = false;
        },

        resultProductsGeneral: (state) => {
            state.fetching = false;
            state.error = false;
        },
        resultProductsData: (state, action) => {
            const data = action.payload;
            state.productsData = data;
            state.fetching = false;
            state.error = false;
        },

        createProductPreview: (state, action) => {
            const data = action.payload;
            state.productPreview = data;
        },
        deleteProductPreview: (state) => {
            state.productPreview = null;
        },

        errorProductsGeneral: (state) => {
            state.fetching = false;
            state.error = true;
        },
    }
});

export const productsState = (state: RootState) => state.sliceProductsState;
export const {
    requestProductsGeneral,
    resultProductsGeneral,
    resultProductsData,
    errorProductsGeneral,
    createProductPreview,
    deleteProductPreview,
} = sliceProductsState.actions;
export default sliceProductsState.reducer;
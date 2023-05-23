import { createSlice } from "@reduxjs/toolkit";

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
        },

        createProductPreview: (state, action) => {
            const data = action.payload;
            state.productPreview = data;
        },
        deleteProductPreview: (state) => {
            state.productPreview = null;
        },
    }
});

export const productsState = (state) => state.sliceProductsState;
export const {
    requestProductsGeneral,
    resultProductsGeneral,
    resultProductsData,
    errorProductsGeneral,
    createProductPreview,
    deleteProductPreview,
} = sliceProductsState.actions;
export default sliceProductsState.reducer;
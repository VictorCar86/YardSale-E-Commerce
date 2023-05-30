import { createSlice } from "@reduxjs/toolkit";

export const sliceShoppingCartState = createSlice({
    name: 'shoppingCartState',
    initialState: {
        itemsList: null,
        fetching: false,
        error: false,
    },
    reducers: {
        requestShopCartGeneral: (state) => {
            state.fetching = true;
            state.error = false;
        },

        resultShopCartGeneral: (state) => {
            state.fetching = false;
        },
        resultShopCartData: (state, action) => {
            const data = action.payload;
            state.itemsList = data;
            state.fetching = false;
        },
        resultShopCartReset: (state) => {
            state.itemsList = null;
            state.fetching = false;
            state.error = false;
        },

        errorShopCartGeneral: (state) => {
            state.fetching = false;
            state.error = true;
        },
    }
});

export const shoppingCartState = (state) => state.sliceShoppingCartState;
export const {
    requestShopCartGeneral,
    resultShopCartGeneral,
    resultShopCartData,
    resultShopCartReset,
    errorShopCartGeneral,
} = sliceShoppingCartState.actions;
export default sliceShoppingCartState.reducer;
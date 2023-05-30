import { createSlice } from "@reduxjs/toolkit";

export const sliceModalsState = createSlice({
    name: 'modalsState',
    initialState: {
        currentModal: null,
    },
    reducers: {
        shoppingCartModal: (state) => {
            state.currentModal = 'SHOPPING_CART';
        },
        productPreviewModal: (state) => {
            state.currentModal = 'PRODUCT_PREVIEW';
        },
        navbarMobileModal: (state) => {
            state.currentModal = 'NAVBAR_MOBILE';
        },
        resetCurrentModal: (state) => {
            state.currentModal = null;
        },
    }
});

export const modalsState = (state) => state.sliceModalsState;
export const {
    shoppingCartModal,
    productPreviewModal,
    navbarMobileModal,
    resetCurrentModal,
} = sliceModalsState.actions;
export default sliceModalsState.reducer;
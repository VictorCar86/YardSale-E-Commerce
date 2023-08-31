import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./reduxState";

export const enum ModalOptions {
    'NONE',
    'SHOPPING_CART',
    'NAVBAR_MOBILE',
    'PRODUCT_PREVIEW',
}

export const sliceModalsState = createSlice({
    name: 'modalsState',
    initialState: {
        currentModal: ModalOptions.NONE,
    },
    reducers: {
        shoppingCartModal: (state) => {
            state.currentModal = ModalOptions.SHOPPING_CART;
        },
        productPreviewModal: (state) => {
            state.currentModal = ModalOptions.PRODUCT_PREVIEW;
        },
        navbarMobileModal: (state) => {
            state.currentModal = ModalOptions.NAVBAR_MOBILE;
        },
        resetCurrentModal: (state) => {
            state.currentModal = ModalOptions.NONE;
        },
    }
});

export const modalsState = (state: RootState) => state.sliceModalsState;
export const {
    shoppingCartModal,
    productPreviewModal,
    navbarMobileModal,
    resetCurrentModal,
} = sliceModalsState.actions;
export default sliceModalsState.reducer;
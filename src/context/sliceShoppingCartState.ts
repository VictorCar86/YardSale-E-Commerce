import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./reduxState";
import { ProductInfo } from "./sliceProductsState";

export type ItemCartInfo = {
    cartInfo: {
        productAmount: number,
    },
} & Omit<ProductInfo, 'category' | 'categoryId'>;

const itemsListInitial: ItemCartInfo[] = [];

export const sliceShoppingCartState = createSlice({
    name: 'shoppingCartState',
    initialState: {
        itemsList: itemsListInitial,
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
        resultShopCartData: (state, action: PayloadAction<ItemCartInfo[]>) => {
            const data = action.payload;
            state.itemsList = data;
            state.fetching = false;
        },

        resetShopCartState: (state) => {
            state.itemsList = itemsListInitial;
            state.fetching = false;
            state.error = false;
        },
        errorShopCartGeneral: (state) => {
            state.fetching = false;
            state.error = true;
        },
    }
});

export const shoppingCartState = (state: RootState) => state.sliceShoppingCartState;
export type ShoppingCartState = ReturnType<typeof shoppingCartState>
export const {
    requestShopCartGeneral,
    resultShopCartGeneral,
    resultShopCartData,
    errorShopCartGeneral,
    resetShopCartState,
} = sliceShoppingCartState.actions;
export default sliceShoppingCartState.reducer;
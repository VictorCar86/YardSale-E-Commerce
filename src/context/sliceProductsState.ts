import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./reduxState";
import { ItemCartInfo } from "./sliceShoppingCartState";
import { OrderInfo } from "./sliceOrdersState";

export type ProductInfo = {
    id: number;
    name: string;
    image: string;
    price: number;
    rating: string | null;
    description: string;
    categoryId: number;
    category: Category;
}

export type Category = {
    id: number;
    name: string;
    image: string;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export type ProductsData = {
    products: ProductInfo[],
    currentPage: number,
    maxPage: number,
};

let productPreviewInitial!: ProductInfo | ItemCartInfo | OrderInfo;

const productsDataInitial: ProductsData = {
    products: [],
    currentPage: 0,
    maxPage: 0,
};

export const sliceProductsState = createSlice({
    name: 'productsState',
    initialState: {
        productsData: productsDataInitial,
        productPreview: productPreviewInitial,
        hasFetched: false,
        fetching: false,
        error: false,
    },
    reducers: {
        beforeProductsGeneral: (state) => {
            state.productsData = productsDataInitial;
            state.fetching = true;
            state.error = false;
        },
        resultProductsData: (state, action: PayloadAction<ProductsData>) => {
            const data = action.payload;
            state.productsData = data;
        },
        afterProductsGeneral: (state) => {
            state.fetching = false;
            state.error = false;
        },
        errorProductsGeneral: (state) => {
            state.error = true;
        },
        finallyProductsGeneral: (state) => {
            state.hasFetched = true;
        },

        createProductPreview: (state, action: PayloadAction<ProductInfo | ItemCartInfo | OrderInfo>) => {
            const data = action.payload;
            state.productPreview = data;
        },
        deleteProductPreview: (state) => {
            state.productPreview = productPreviewInitial;
        },
    }
});

export const productsState = (state: RootState) => state.sliceProductsState;
export type ProductsState = ReturnType<typeof productsState>;
export const {
    beforeProductsGeneral,
    resultProductsData,
    afterProductsGeneral,
    errorProductsGeneral,
    finallyProductsGeneral,
    createProductPreview,
    deleteProductPreview,
} = sliceProductsState.actions;
export default sliceProductsState.reducer;
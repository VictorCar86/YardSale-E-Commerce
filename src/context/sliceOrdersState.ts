import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./reduxState";
import { ProductInfo } from "./sliceProductsState";

export type OrderInfo = {
    Order_Product: {
        id:            number,
        productId:     number,
        productAmount: number,
        orderId:       number,
        updatedAt:     Date | string | null,
        createdAt:     Date | string | null,
    }
} & Omit<ProductInfo, 'category'>;

export type OrderList = {
    createdAt: Date | string | null,
    items:     OrderInfo[]
};

const orderListInitial: OrderList[] = [];

let selectedOrderInitial!: number | null;

export const sliceOrdersState = createSlice({
    name: 'ordersState',
    initialState: {
        ordersList: orderListInitial,
        selectedOrder: selectedOrderInitial,
        fetching: false,
        error: false,
    },
    reducers: {
        requestOrdersGeneral: (state) => {
            state.fetching = true;
            state.error = false;
        },

        resultOrdersGeneral: (state) => {
            state.fetching = false;
        },
        resultOrdersData: (state, action: PayloadAction<OrderList[]>) => {
            const data = action.payload;
            state.ordersList = data;
            state.fetching = false;
        },

        createSelectedOrder: (state, action: PayloadAction<number>) => {
            const data = action.payload;
            state.selectedOrder = data;
        },
        deleteSelectedOrder: (state) => {
            state.selectedOrder = null;
        },

        resetOrdersState: (state) => {
            state.ordersList = orderListInitial;
            state.selectedOrder = null;
            state.fetching = false;
            state.error = false;
        },
        errorOrdersGeneral: (state) => {
            state.fetching = false;
            state.error = true;
        },
    }
});

export const ordersState = (state: RootState) => state.sliceOrdersState;
export type OrdersState = ReturnType<typeof ordersState>;
export const {
    requestOrdersGeneral,
    resultOrdersGeneral,
    resultOrdersData,
    createSelectedOrder,
    deleteSelectedOrder,
    resetOrdersState,
    errorOrdersGeneral,
} = sliceOrdersState.actions;
export default sliceOrdersState.reducer;
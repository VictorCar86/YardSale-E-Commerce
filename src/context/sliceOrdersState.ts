import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./reduxState";

export const sliceOrdersState = createSlice({
    name: 'ordersState',
    initialState: {
        ordersList: null,
        selectedOrder: null,
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
        resultOrdersData: (state, action) => {
            const data = action.payload;
            state.ordersList = data;
            state.fetching = false;
        },

        createSelectedOrder: (state, action) => {
            const data = action.payload;
            state.selectedOrder = data;
        },
        deleteSelectedOrder: (state) => {
            state.selectedOrder = null;
        },

        resetOrdersState: (state) => {
            state.ordersList = null;
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
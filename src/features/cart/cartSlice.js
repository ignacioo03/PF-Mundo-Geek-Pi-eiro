import { createSlice } from "@reduxjs/toolkit";
import { calculate_total_price } from "../../utils/functions";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: {
            cartItems: [],
            user: "demo",
            total: null,
            cartLenght: 0,
            receipts: [], // Lista de recibos
            updatedAt: Date.now().toLocaleString() // unix timestamp
        }
    },
    reducers: {
        addItem: (state, action) => {
            const productInCart = state.value.cartItems.find(item => item.id === action.payload.id);
            if (!productInCart) {
                state.value.cartItems.push(action.payload);
                state.value.cartLenght += 1;
            } else {
                state.value.cartItems.map(item => {
                    if (item.id === action.payload.id) {
                        item.quantity += 1;
                        return item;
                    }
                    return item;
                });
            }
            state.value.total = calculate_total_price(state.value.cartItems);
        },
        removeItem: (state, action) => {
            state.value.cartItems = state.value.cartItems.filter(item => item.id !== action.payload);
            state.value.total = calculate_total_price(state.value.cartItems);
            state.value.cartLenght -= 1;
        },
        clearCart: (state) => {
            state.value.cartItems = [];
            state.value.total = null;
            state.value.cartLenght = 0;
        },
        generateReceipt: (state) => {
            const receipt = {
                id: state.value.receipts.length + 1,
                createdAt: Date.now(),
                items: [...state.value.cartItems],
                total: state.value.total
            };
            state.value.receipts.push(receipt);
            state.value.cartItems = [];
            state.value.total = null;
            state.value.cartLenght = 0;
        },
        removeReceipt: (state, action) => {
            state.value.receipts = state.value.receipts.filter(receipt => receipt.id !== action.payload);
            state.value.updatedAt = Date.now().toLocaleString();
        },
        viewReceipt: (state, action) => {
            state.value.receipts = state.value.receipts.map(receipt => {
                if (receipt.id === action.payload) {
                    receipt.view = true;
                }
                return receipt;
            });
        }
    }
});

export const { addItem, removeItem, clearCart, generateReceipt, removeReceipt, viewReceipt } = cartSlice.actions;

export default cartSlice.reducer;
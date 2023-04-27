import { useState } from "react";

const initialState = {
    cart: [],
}

function useInitialState() {
    const [state, setState] = useState(initialState)

    const addToCart = (payload) => {
        setState({
            ...state,
            cart: [...state.cart, payload]
        })
    }

    const removeFromCart = (indexProduct) => {
        setState({
            ...state,
            cart: state.cart.filter((item, indexItem) => {
                return indexItem !== indexProduct
            })
        })
    }

    return {
        state,
        addToCart,
        removeFromCart,
    }
}

export default useInitialState
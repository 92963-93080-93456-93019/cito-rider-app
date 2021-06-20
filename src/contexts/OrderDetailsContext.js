import React, {createContext, useReducer} from "react";
import {OrderDetailsReducer} from "./OrderDetailsReducer";
import { ENGINE_RIDER_ENDPOINT } from "../environment";

export const OrderDetailsContext = createContext();

const initialState = {};

const OrderDetailsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(OrderDetailsReducer, initialState);
    console.log(children);

    const changeStatus = (orderId,status) => {

        const payload = {
            orderId : orderId,
            status : status,
        };

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify(payload)
        };

        const url_post_order = ENGINE_RIDER_ENDPOINT + orderId + '/orders';

        fetch(url_post_order, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.code == 201) {
                    dispatch({type: "CHECKOUT_201", msg: ""});
                } else {
                    dispatch({type: "CHECKOUT_403", msg: data.message});
                }
            });


    };

    const contextValues = {
        changeStatus,
        ...state,
    };

    return (
        <OrderDetailsContext.Provider value={contextValues}>
            {children}
        </OrderDetailsContext.Provider>
    );
};

export default OrderDetailsContextProvider;

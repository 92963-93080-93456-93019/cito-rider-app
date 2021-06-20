export const OrderDetailsReducer = (state, action) => {
    switch (action.type) {
        default:
            return {
                changeStatus: { msg:"Checkout successful.", status:true },
            }
    }
}
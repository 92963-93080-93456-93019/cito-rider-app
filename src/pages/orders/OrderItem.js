import React from 'react';
import { Link } from 'react-router-dom';
import { formatNumber } from '../../helpers/utils';

const OrderItem = ({order}) => {

    return ( 
        <div className="card card-body">
            <img style={{display: "block", margin: "0 auto 10px", maxHeight: "200px"}} className="img-fluid" 
            src={order.photo + '?v=' + order.id} alt=""/>
            <h4>{order.app.name}</h4>
            <p>{order.productListItems.length} items to buy</p>
            <p>From: {order.app.address}</p>
            <p>To: {order.address}</p>
            <h4>{order.orderStatusEnum}</h4>
            <h3 className="text-left">{formatNumber(order.price)}</h3>
            <div className="text-right">
                <Link className="btn btn-link btn-sm mr-2" to={{pathname:"/orderdetails/" + order.orderId, state: { order: order }}}>Details</Link>
            </div>
        </div>
     );
}
 
export default OrderItem;
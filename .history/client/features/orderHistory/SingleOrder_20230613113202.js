import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
const SingleOrder = (props) => {
  const { order } = props;

  return (
    <div className="orderhistory" id="orderBox">
        <Link to={`/orderHistory/${order[0].orderId}`}><h5>Order Details</h5></Link>
        <h5>Products Ordered</h5>
        {order.map(orderProduct => {
            return (
                <div key={uuidv4()}>
                    <p>{orderProduct.product.name}</p>
                    <p>Quantity: {orderProduct.productQty}</p>
                    <img src={orderProduct.product.imageUrl} />
                </div>
            );
        })}
    </div>
  );
};

export default SingleOrder;

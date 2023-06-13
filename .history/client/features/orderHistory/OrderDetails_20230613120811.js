import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderDetails } from "./OrderDetailsSlice";
import { useParams } from "react-router-dom";


const OrderDetails = () => {
  let orderId = useParams().orderId; /
  const orderDetails = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(orderId);
    dispatch(fetchOrderDetails(orderId));
  }, [dispatch]);

  return (
    <div className="orderhistory" id="orderBox">
        <h4>Order Number: {orderId}</h4>
        <p>Total: {orderDetails.total}</p>
        <p>Shipping: {orderDetails.shipping}</p>
        <p>Tax: {orderDetails.tax}</p>
        <p>Date: {orderDetails.date}</p>
    </div>
  );
};

export default OrderDetails;
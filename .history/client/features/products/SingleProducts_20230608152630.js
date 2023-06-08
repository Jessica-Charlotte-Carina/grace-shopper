import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { addToStorage } from "./ProductSlice";

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  let productId = useParams().productId

  useEffect(() => {
    // Fetch products from the server
    fetch(`/api/products/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error(error));
  }, [dispatch]);

  const addToCart = () => {
    // Fetch the product details from the server
    fetch("/api/products")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Product not found");
        }
      })
      .then((product) => {
        dispatch({ type: "ADD_TO_CART", payload: product });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className='singleProduct-box'>
        <h2 className='product-name'>{product.name}</h2>
        <div>
          <img src={product.imageUrl}/></div>
        <h3 id='price'>Price: ${product.price}</h3>
        <h3>Description: </h3>
        <p>{product.description}</p>
        <button onClick={() => addToStorage(product)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default SingleProduct;
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addToStorage } from "./ProductSlice";

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  let productId = useParams().productId

  useEffect(() => {
    fetch(`/api/products/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error(error));
  }, [dispatch]);

  const addToCart = () => {
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
          <img src={product.imageUrl} className='single-img'/>
        <h3 id='price'>Price: ${product.price}</h3>
        <h3>Description: </h3>
        <p>{product.description}</p>
        <button onClick={() => addToStorage(product)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default SingleProduct;
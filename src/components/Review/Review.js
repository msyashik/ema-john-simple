import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import happyImage from "../../images/giphy.gif";
import { useHistory } from "react-router-dom";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const history = useHistory();
  const handleProceedCheckOut = () => {
    history.push("/shipment");
  };

  const handleRemoveProduct = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };
  //cart data
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
  }, []);

  let thankYou;
  if (orderPlaced) {
    thankYou = <img src={happyImage} alt=""></img>;
  }

  return (
    <div className="twin-container">
      <div className="product-container">
        {cart.map((pd) => {
          return (
            <ReviewItem
              key={pd.key}
              product={pd}
              handleRemoveProduct={handleRemoveProduct}
            ></ReviewItem>
          );
        })}
        {thankYou}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handleProceedCheckOut} className="main-button">
            Proceed Checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;

import React from "react";
import { useHistory } from "react-router";
import useCart from "../../hooks/useCart";
import useProducts from "../../hooks/useProducts";
import { clearTheCart, removeFromDb } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";

const OrderReview = () => {
  const [products] = useProducts();
  const [cart, setCart] = useCart(products);
  const history = useHistory();
  const handleRemove = (key) => {
    const newCart = cart.filter((product) => product.key !== key);
    setCart(newCart);
    removeFromDb(key);
  };
  const handleProceedToShipping = () => {
    history.push("/shipping");
    /*    setCart([]);
    clearTheCart(); */
  };
  return (
    <div
      className="container-shop "
      style={{ padding: "30px 20px 30px 30px " }}
    >
      <div className="product-container">
        {cart.map((product) => (
          <ReviewItem
            key={product.key}
            product={product}
            handleRemove={handleRemove}
          ></ReviewItem>
        ))}
      </div>
      <div className="cart-container">
        <Cart key={cart.key} cart={cart}>
          <button onClick={handleProceedToShipping} className="button-style">
            {" "}
            Proceed to Shipping{" "}
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default OrderReview;

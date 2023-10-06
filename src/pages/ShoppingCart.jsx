import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/slices/cartSlice";
import axios from "axios";
import { clearCart } from "../redux/slices/cartSlice";

const ShoppingCart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleBuyAll = async () => {
    const cartData = cart.map((item) => ({ name: item.title }));

    try {
      const response = await axios.post("http://localhost:8080/buyAll", {
        cart: cartData,
      });
      console.log("Buy All button clicked");
      if (response.status === 200) {
        dispatch(clearCart());
        alert("Purchase successful");
      }
    } catch (error) {
      console.error("Error during purchase:", error);
      alert("Error during purchase");
    }
  };

  return (
    <div
      className={`${
        cart.length === 0 ? "h-screen" : "h-full"
      } py-12 px-10 text-slate-200`}
    >
      <h2 className='text-4xl font-bold'>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className='mt-10'>Your cart is empty.</p>
      ) : (
        <div className='mt-10 w-11/12 mx-auto h-full'>
          {cart.map((item) => (
            <div
              key={item.id}
              className='flex items-center justify-between border-b border-slate-700 last:border-b-0 p-4 '
            >
              <div className='flex items-center'>
                <img
                  src={item.images[0]}
                  alt='product'
                  className='w-16 h-16 object-cover'
                />
                <span className='ml-3'>{item.title}</span>
              </div>
              <div className='flex items-center justify-between gap-10'>
                <div>${item.price}</div>
                <button
                  onClick={() => handleRemoveFromCart(item)}
                  className='ml-2 bg-red-500 px-2 py-1 rounded-md hover:bg-red-700 active:scale-95 transition-all duration-200'
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className='mt-5 text-right'>
            <button
              onClick={handleBuyAll}
              className='bg-green-500 px-4 py-2 text-white font-semibold rounded-md hover:bg-green-700 active:scale-95 transition-all duration-200'
            >
              Buy All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;

import React from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { FaRegCreditCard } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } =
    useCart();
  const Base_URI = import.meta.env.VITE_BASE_API;

  const handlePayment = async () => {
    try {
      const payload = {
        items: cartItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice: getCartTotal(),
      };

      const response = await axios.post(`${Base_URI}/app/checkout`, payload);
      console.log("Order placed:", response.data);
      alert("Order placed successfully!");
      clearCart();
    } catch (error) {
      console.log("Error occurred", error.message);
      alert("Failed to place order");
    }
  };

  return (
    <div className="w-full px-5 sm:px-10 md:px-30 xl:px-50 2xl:px-50 py-3 gap-4">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
          <img
            src="/empty-cart.svg"
            alt="Empty cart"
            className="w-40 h-40 mb-6 opacity-50"
          />
          <h3 className="text-xl font-semibold mb-2 text-gray-500">
            Your cart is empty
          </h3>
          <p className="text-sm max-w-md text-gray-500">
            Looks like you haven’t added anything yet. Browse products and add
            your favorites to the cart.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.master_menu_item_id}
              className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-3 sm:gap-4"
            >
              {/* Product Info */}
              <div className="flex items-center gap-3 w-full sm:w-[40%]">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md border"
                />
                <div className="min-w-[120px]">
                  <h3 className="text-base font-medium truncate">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">₹{item.price}</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-1 justify-center text-sm">
                <button
                  className="px-2 py-1 border rounded-md text-sm"
                  onClick={() =>
                    updateQuantity(item.master_menu_item_id, item.quantity - 1)
                  }
                >
                  −
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  className="px-2 py-1 border rounded-md"
                  onClick={() =>
                    updateQuantity(item.master_menu_item_id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>

              {/* Price + Remove */}
              <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto text-sm">
                <p className="font-semibold whitespace-nowrap">
                  ₹{item.price * item.quantity}
                </p>
                <button
                  className="text-sm text-red-500 hover:underline"
                  onClick={() => removeFromCart(item.master_menu_item_id)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}

          {/* Cart Summary */}
          <div className=" text-gray-800 font-semibold px-4 py-2 px-4 py-2 rounded-md flex flex-row items-center justify-between gap-2">
            <p className="text-base sm:text-xl font-semibold">
              Total: ₹{getCartTotal().toFixed(2)}
            </p>
            <div className="flex gap-4">
              <button
                className="bg-gray-400 text-gray-800 font-semibold px-4 py-2 hover:bg-gray-600 hover:text-white px-4 py-2 rounded-md flex flex-row items-center justify-between gap-2"
                onClick={clearCart}
              >
                <GrClearOption />
                <span className="hidden sm:inline">Clear Cart</span>
              </button>
              <button
                className="bg-gray-600 text-white font-semibold px-4 py-2 hover:bg-gray-400 hover:text-gray-800 rounded-md flex flex-row items-center justify-between gap-2"
                onClick={handlePayment}
              >
                <FaRegCreditCard />
                <span className="hidden sm:inline">Proceed to Payment</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

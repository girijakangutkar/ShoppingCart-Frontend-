import React from "react";
import { useCart } from "../context/CartContext";
import { IoIosCloseCircle } from "react-icons/io";

export default function ProductDetails({ product, onClose }) {
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <div className="relative flex flex-col gap-4 overflow-y-auto p-2 pt-2">
      <div className="relative aspect-square w-full overflow-hidden rounded-md border-[#ccc] shadow-md">
        {/* Close Icon */}
        <button
          className="absolute top-2 right-2 z-10 text-muted-foreground hover:text-black transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <IoIosCloseCircle size={32} />
        </button>

        {/* Product Image */}
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover"
          crossOrigin="anonymous"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-sm text-muted-foreground">
          Category: {product.category}
        </p>
        <p className="text-sm text-muted-foreground">Color: {product.color}</p>
        <p className="font-semibold">${product.price.toFixed(2)}</p>
        <p className="text-sm leading-relaxed">{product.description}</p>
      </div>

      {/* Add to Cart Button */}
      <button
        className="rounded-md bg-gray-200 border-[#ccc] px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg"
        onClick={() => {
          addToCart({
            master_menu_item_id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
          });
          alert("Product added to the cart");
        }}
      >
        Add to cart
      </button>
    </div>
  );
}

import React from "react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product, onOpen }) {
  const { addToCart } = useCart();

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border bg-card transition border-[#ccc] shadow-md hover:shadow-sm ">
      <button
        className="relative aspect-square w-full overflow-hidden"
        onClick={() => onOpen(product)}
        aria-label={`Open ${product.name}`}
      >
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
          crossOrigin="anonymous"
        />
      </button>

      <div className="flex flex-1 flex-col justify-between p-3">
        <div>
          <h3 className="line-clamp-1 text-sm font-medium">{product.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {product.category}
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-semibold">₹{Number(product.price || 0)}</span>

          <button
            className="rounded-md bg-gray-200 border-[#ccc] px-2 py-1 text-sm font-medium text-primary-foreground hover:bg-gray-800 hover:text-white transition-colors shadow-lg"
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
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

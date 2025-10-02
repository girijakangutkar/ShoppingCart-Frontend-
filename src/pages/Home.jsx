import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCart";
import ProductDetails from "./ProductsDetails";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("relevance");
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/app/products");
        setProducts(response.data.list);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];
    if (search)
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    if (category !== "all")
      result = result.filter((p) => p.category === category);
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    setFiltered(result);
  }, [products, search, category, sort]);

  return (
    <div className="w-full flex flex-col md:flex-row px-5 sm:px-10 md:px-10 xl:px-50 2xl:px-50 py-3 gap-4">
      {/* Product List */}
      <section
        aria-label="Products list"
        className={`flex-1 ${selected ? "md:w-2/3" : "md:w-full"} ${
          selected ? "blur-sm md:blur-none" : ""
        }`}
      >
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square animate-pulse rounded-lg border bg-muted/40"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((p, index) => (
              <ProductCard
                key={p.id || index}
                product={p}
                onOpen={setSelected}
              />
            ))}

            {filtered.length === 0 && (
              <p className="col-span-full text-sm text-muted-foreground">
                No products match your filters.
              </p>
            )}
          </div>
        )}
      </section>

      {/* Sidebar for large screens */}
      {selected && (
        <div className="hidden md:flex md:w-1/3">
          <ProductDetails
            product={selected}
            onClose={() => setSelected(null)}
          />
        </div>
      )}

      {/* Modal for mobile screens */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm md:hidden">
          <div className="bg-white w-[90%] max-w-sm rounded-lg shadow-lg overflow-y-auto max-h-[90vh] p-4">
            <ProductDetails
              product={selected}
              onClose={() => setSelected(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

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

  const Base_URI = import.meta.env.VITE_BASE_API;

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${Base_URI}/app/products`);
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
    <div>
      <div className="w-full overflow-x-auto whitespace-nowrap px-4 py-3 bg-white shadow-md rounded-lg flex gap-3 items-center sm:flex-wrap sm:justify-start sm:whitespace-normal sm:overflow-visible hide-scrollbar">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search products..."
          className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[150px]"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[120px]"
        >
          <option value="all">All</option>
          <option value="clothes">Clothes</option>
          <option value="electronics">Electronics</option>
          <option value="shoes">Shoes</option>
          <option value="accessories">Accessories</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px]"
        >
          <option value="">-- Sort by price --</option>
          <option value="price-asc">Low to High</option>
          <option value="price-desc">High to Low</option>
        </select>
      </div>

      <div className="w-full flex flex-col md:flex-row px-5 sm:px-10 md:px-10 xl:px-50 2xl:px-50 py-3 gap-4">
        {/* Product List */}
        <section
          aria-label="Products list"
          className={`flex-1 ${
            selected ? "md:w-2/3" : "md:w-full"
          } overflow-y-auto max-h-[calc(100vh-150px)] pr-2 hide-scrollbar`}
        >
          {isLoading ? (
            <div className="space-y-4">
              <div className="text-center text-sm text-muted-foreground">
                The server is deployed on a free-tier service, so the first
                response may take a little time. Please be patient and we truly
                appreciate your understanding.
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square animate-pulse rounded-lg border bg-muted/40"
                  />
                ))}
              </div>
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
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard.jsx";
import CategoryDropdown from "../components/CategoryDropdown.jsx";
import Cart from "./Cart.jsx";
import { fetchProducts, fetchCategories, fetchProductsByCategory } from "../api/fakeStoreApi.js";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCart, setShowCart] = useState(false);

  // Fetch categories
  const { data: categories = [], isLoading: catLoading, error: catError } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Fetch products (all or by category)
  const { data: products = [], isLoading: prodLoading, error: prodError } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () =>
      selectedCategory ? fetchProductsByCategory(selectedCategory) : fetchProducts(),
  });

  if (catLoading || prodLoading) return <p>Loading...</p>;
  if (catError) return <p>Error loading categories: {catError.message}</p>;
  if (prodError) return <p>Error loading products: {prodError.message}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Advanced React E-Commerce</h1>

      <button onClick={() => setShowCart(!showCart)} style={{ marginBottom: "20px" }}>
        {showCart ? "Back to Home" : "Go to Cart"}
      </button>

      {showCart ? (
        <Cart />
      ) : (
        <>
          <CategoryDropdown
            categories={categories}
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />

          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
            {products.length > 0 ? (
              products.map(product => <ProductCard key={product.id} product={product} />)
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;

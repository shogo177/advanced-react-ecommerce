import axios from "axios";

// Fetch all products
export const fetchProducts = async () => {
  const { data } = await axios.get("https://fakestoreapi.com/products");
  return data;
};

// Fetch all categories
export const fetchCategories = async () => {
  const { data } = await axios.get("https://fakestoreapi.com/products/categories");
  return data;
};

// Fetch products by category
export const fetchProductsByCategory = async (category) => {
  const { data } = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
  return data;
};

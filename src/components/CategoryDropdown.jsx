import React from "react";

const CategoryDropdown = ({ categories, selected, setSelected }) => {
  return (
    <select value={selected} onChange={(e) => setSelected(e.target.value)}>
      <option value="">All Categories</option>
      {categories.map(cat => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
  );
};

export default CategoryDropdown;

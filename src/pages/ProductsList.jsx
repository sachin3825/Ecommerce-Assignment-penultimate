import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../components/Cards";
import Sidebar from "../components/Sidebar";

const ProductsList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Fetch and set all products initially
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      const fetchedProducts = response.data.products;
      setAllProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleFilter = (filterOptions) => {
    const { searchText, categories } = filterOptions;

    // Filter products based on search text and selected categories
    let filtered = allProducts;

    if (searchText) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (categories.length > 0) {
      filtered = filtered.filter((product) =>
        categories.includes(product.category)
      );
    }

    // Update the filtered products state
    setFilteredProducts(filtered);
  };

  return (
    <div className='flex'>
      <Sidebar
        onFilter={handleFilter}
        products={allProducts}
        setFilteredProducts={setFilteredProducts}
      />
      <Cards filteredProducts={filteredProducts} />
    </div>
  );
};

export default ProductsList;

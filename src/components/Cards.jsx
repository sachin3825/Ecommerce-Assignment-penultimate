import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/slices/productSlice";
import { toast } from "react-hot-toast";

import Card from "./Card";

const Cards = ({ filteredProducts }) => {
  // Receive filtered products as a prop
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.items);
  const isLoading = allProducts.length === 0;

  useEffect(() => {
    // Fetch products data from API and dispatch to Redux store
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        const fetchedProducts = response.data.products;
        dispatch(setProducts(fetchedProducts)); // Dispatch the fetched products
        toast.success("Products Listed");
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // Fetch products only if allProducts is empty
    if (allProducts.length === 0) {
      fetchProducts();
    }
  }, [dispatch, allProducts]);

  return (
    <div className='w-full flex items-center justify-center'>
      <div>
        {isLoading ? (
          <div className='flex flex-col text-white '>
            <div className='spinner'></div>
            <p>Loading...</p>
          </div>
        ) : (
          <div className='p-4 flex flex-col gap-5'>
            <h2 className='text-5xl font-bold text-slate-200 uppercase mt-5'>
              Products
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4'>
              {filteredProducts.map((product) => (
                <Card key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cards;

import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/slices/productSlice";
import { toast } from "react-hot-toast";

import Card from "./Card";

const Cards = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);

  const isLoading = products.length === 0;

  useEffect(() => {
    // fetch products data from API
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        console.log(response);
        const fetchedProducts = response.data.products;
        console.log(fetchedProducts);
        toast.success("Products Listed");
        dispatch(setProducts(fetchedProducts));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <div>
      {isLoading ? (
        <div className='flex flex-col text-white h-screen items-center justify-center w-screen"'>
          <div className='spinner'></div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className='p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cards;

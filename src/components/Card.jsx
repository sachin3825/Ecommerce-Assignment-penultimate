import React from "react";
import ReactStars from "react-rating-stars-component";
import { BsFillCartPlusFill } from "react-icons/bs";

const Card = ({ product }) => {
  return (
    <div className='bg-black text-slate-300 shadow-md rounded-lg overflow-hidden cursor-pointer'>
      <img
        src={product.images[0]}
        alt={product.title}
        className='w-full h-40 object-cover'
      />
      <div className='p-4 flex flex-col justify-between gap-2'>
        <div>
          <h3 className='text-xl font-semibold'>{product.title}</h3>
          <p className='text-sm text-gray-500 overflow-hidden max-h-16 line-clamp-2'>
            {product.description}
          </p>
        </div>

        <div className='flex justify-between items-center'>
          <ReactStars
            count={5}
            value={product.rating}
            isHalf={true}
            size={24}
            edit={false}
          />
          <p className='text-lg'>Price: ${product.price}</p>
        </div>
        <div className='flex mt-2 justify-between'>
          <button className='flex items-center gap-2 bg-blue-500 hover-bg-blue-700 text-white font-semibold py-1 px-2 rounded'>
            <BsFillCartPlusFill />
            <span>Add to Cart</span>
          </button>
          <button className='text-white bg-yellow-500 font-semibold py-1 px-2 rounded'>
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;

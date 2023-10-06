import ProductsList from "./pages/ProductsList";
import ProductDetails from "./pages/ProductDetails";
import ShoppingCart from "./pages/ShoppingCart";

import { Routes, Route } from "react-router-dom";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function App() {
  const cart = useSelector((state) => state.cart);
  return (
    <div className='bg-slate-800 relative h-full'>
      <Link
        to='/shoppingCart'
        className=' top-4 right-10 absolute cursor-pointer'
      >
        <div className='relative text-white text-4xl'>
          <LiaShoppingCartSolid />
          <p className='absolute -top-1 -right-1  bg-red-600 w-1/2 h-1/2 rounded-full text-center text-xs'>
            {cart.length}
          </p>
        </div>
      </Link>

      <Routes>
        <Route path='/' element={<ProductsList />} />
        <Route path='/product/:productId' element={<ProductDetails />} />
        <Route path='/shoppingCart' element={<ShoppingCart />} />
      </Routes>
    </div>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import ProductsList from "./pages/ProductsList";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <div className='bg-slate-800'>
      <Routes>
        <Route path='/' element={<ProductsList />} />
        <Route path='/product/:productId' element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;

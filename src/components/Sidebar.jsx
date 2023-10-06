import React, { useState, useEffect } from "react";

const Sidebar = ({ onFilter, products, setSelectedRecommendation }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (products) {
      const uniqueCategories = [
        ...new Set(products.map((product) => product.category)),
      ];
      setCategories(uniqueCategories);
    }
  }, [products]);

  const handleSearch = () => {
    onFilter({ searchText, categories: selectedCategories });
    setRecommendations([]);
  };

  const handleRecommendationClick = (product) => {
    setSearchText(product.title);
    setRecommendations([]);
    setSelectedRecommendation(product); // Pass the selected recommendation to the parent
  };

  return (
    <aside className='bg-gray-100 p-4 w-1/6 sticky top-0 h-screen'>
      <h2 className='text-xl font-semibold'>Filter Products</h2>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Search Products'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className='w-full p-2 border rounded relative'
        />
        {recommendations.length > 0 && (
          <div className='bg-white border border-gray-200 absolute left-0 right-0 mt-1 rounded shadow-md'>
            {recommendations.map((product) => (
              <div
                key={product.id}
                className='px-4 py-2 cursor-pointer hover:bg-gray-100'
                onClick={() => handleRecommendationClick(product)}
              >
                {product.title}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='mb-4'>
        <h3 className='text-lg font-semibold'>Categories:</h3>
        {categories && (
          <>
            <div>
              <input
                type='checkbox'
                id='allCategories'
                value=''
                checked={selectedCategories.length === 0}
                onChange={() => handleCategorySelect("")}
              />
              <label htmlFor='allCategories' className='ml-2'>
                All Categories
              </label>
            </div>
            {categories.map((category) => (
              <div key={category} className='flex items-center'>
                <input
                  type='checkbox'
                  id={category}
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategorySelect(category)}
                />
                <label htmlFor={category} className='ml-2'>
                  {category}
                </label>
              </div>
            ))}
          </>
        )}
      </div>
      <button
        onClick={handleSearch}
        className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600'
      >
        Apply Filters
      </button>
    </aside>
  );

  function handleCategorySelect(category) {
    if (category === "") {
      setSelectedCategories([]);
    } else if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  }
};

export default Sidebar;

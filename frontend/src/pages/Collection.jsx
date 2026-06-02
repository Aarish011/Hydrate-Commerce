import React, { useState, useContext, useMemo } from 'react';
import { products } from '../assets/assets';
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';

const Collection = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const { search } = useContext(ShopContext);

  const filteredProducts = useMemo(() => {
    let items = [...products];

    // CATEGORY FILTER
    if (category.length > 0) {
      items = items.filter((item) => category.includes(item.category));
    }

    // SUBCATEGORY FILTER
    if (subCategory.length > 0) {
      items = items.filter((item) => subCategory.includes(item.subCategory));
    }

    // SEARCH FILTER
    if (search && search.trim() !== '') {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // SORTING
    if (sortType === 'low-high') {
      items.sort((a, b) => a.price - b.price);
    }

    if (sortType === 'high-low') {
      items.sort((a, b) => b.price - a.price);
    }

    return items;
  }, [category, subCategory, search, sortType]);
  // toggle category
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(category.filter((item) => item !== e.target.value));
    } else {
      setCategory([...category, e.target.value]);
    }
  };

  // toggle subcategory
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(subCategory.filter((item) => item !== e.target.value));
    } else {
      setSubCategory([...subCategory, e.target.value]);
    }
  };

  return (
    <div className='flex flex-col sm:flex-row gap-10 pt-10 px-5 sm:px-10'>
      {/* Filters */}
      <div className='min-w-60'>
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='text-xl cursor-pointer mb-4'
        >
          FILTERS
        </p>

        <div className={`${showFilter ? '' : 'hidden'} sm:block`}>
          {/* Categories */}
          <div className='border border-gray-300 p-4 mb-5'>
            <p className='mb-3 text-sm font-medium'>CATEGORIES</p>

            <div className='flex flex-col gap-2 text-sm text-gray-700'>
              <label>
                <input type='checkbox' value='Men' onChange={toggleCategory} />
                <span className='ml-2'>Men</span>
              </label>

              <label>
                <input
                  type='checkbox'
                  value='Women'
                  onChange={toggleCategory}
                />
                <span className='ml-2'>Women</span>
              </label>

              <label>
                <input type='checkbox' value='Kids' onChange={toggleCategory} />
                <span className='ml-2'>Kids</span>
              </label>
            </div>
          </div>

          {/* Sub Categories */}
          <div className='border border-gray-300 p-4'>
            <p className='mb-3 text-sm font-medium'>TYPE</p>

            <div className='flex flex-col gap-2 text-sm text-gray-700'>
              <label>
                <input
                  type='checkbox'
                  value='Topwear'
                  onChange={toggleSubCategory}
                />
                <span className='ml-2'>Topwear</span>
              </label>

              <label>
                <input
                  type='checkbox'
                  value='Bottomwear'
                  onChange={toggleSubCategory}
                />
                <span className='ml-2'>Bottomwear</span>
              </label>

              <label>
                <input
                  type='checkbox'
                  value='Winterwear'
                  onChange={toggleSubCategory}
                />
                <span className='ml-2'>Winterwear</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className='flex-1'>
        <div className='flex flex-col sm:flex-row justify-between items-center mb-6 gap-4'>
          <Title text1='All' text2='Collections' />

          <select
            onChange={(e) => setSortType(e.target.value)}
            className='border border-gray-300 text-sm px-3 py-2 outline-none'
          >
            <option value='relevant'>Sort by: Relevant</option>
            <option value='low-high'>Price: Low to High</option>
            <option value='high-low'>Price: High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filteredProducts.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              image={item.image[0]}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;

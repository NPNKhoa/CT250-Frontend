import { useState } from 'react';

const Filter = () => {
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [branch, setBranch] = useState('');

  const handlePriceChange = price => {
    setSelectedPrice(prev => {
      if (prev.includes(price)) {
        return prev.filter(p => p !== price);
      } else {
        return [...prev, price];
      }
    });
  };

  const handleBrandChange = brand => {
    setSelectedBrand(prev => {
      if (prev.includes(brand)) {
        return prev.filter(b => b !== brand);
      } else {
        return [...prev, brand];
      }
    });
  };

  return (
    <div className='w-full p-6 bg-gray-50 shadow-lg rounded-lg'>
  <h3 className='text-lg font-semibold mb-6'>Chọn Mức Giá</h3>
  <div className='space-y-4 mb-6'>
    {[
      { label: 'Giá dưới 500.000đ', value: 'under-500k' },
      { label: '500.000đ - 1 triệu', value: '500k-1m' },
      { label: '1 - 2 triệu', value: '1m-2m' },
      { label: '2 - 3 triệu', value: '2m-3m' },
      { label: 'Giá trên 3 triệu', value: 'above-3m' },
    ].map((price) => (
      <label key={price.value} className='block text-sm text-gray-700'>
        <input
          type='checkbox'
          className='mr-3 transform scale-125'
          value={price.value}
          onChange={() => handlePriceChange(price.value)}
        />
        {price.label}
      </label>
    ))}
  </div>

  <h3 className='text-lg font-semibold mb-6'>Thương Hiệu</h3>
  <div className='space-y-4'>
    {[
      { label: 'Yonex', value: 'yonex' },
      { label: 'Lining', value: 'lining' },
      { label: 'Victor', value: 'victor' },
      { label: 'Apacs', value: 'apacs' },
      { label: 'Kawasaki', value: 'kawasaki' },
    ].map((brand) => (
      <label key={brand.value} className='block text-sm text-gray-700'>
        <input
          type='checkbox'
          className='mr-3 transform scale-125'
          value={brand.value}
          onChange={() => handleBrandChange(brand.value)}
        />
        {brand.label}
      </label>
    ))}
  </div>
</div>

  );
};

export default Filter;

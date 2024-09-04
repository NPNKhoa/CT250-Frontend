import { useState, useEffect } from 'react';
import brandService from '@services/brand.service';
import PropTypes from 'prop-types';

const Filter = ({ onPriceChange, onBrandChange }) => {
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedMinPrice, setSelectedMinPrice] = useState(null);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await brandService.getAll();
        const brands = response.data.map(brand => brand.brandName);
        setBrands(brands);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    onPriceChange(selectedMinPrice, selectedMaxPrice);
  }, [selectedMinPrice, selectedMaxPrice, onPriceChange]);

  useEffect(() => {
    onBrandChange(selectedBrand);
  }, [selectedBrand, onBrandChange]);

  const handleBrandChange = brand => {
    setSelectedBrand(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedPrice('');
    setSelectedMinPrice(null);
    setSelectedMaxPrice(null);
    setSelectedBrand([]);
  };

  const PriceOptions = [
    { label: 'Giá dưới 500.000đ', value: 'under-500k', min: 0, max: 500000 },
    {
      label: '500.000đ - 1 triệu',
      value: '500k-1m',
      min: 500000,
      max: 1000000,
    },
    { label: '1 - 2 triệu', value: '1m-2m', min: 1000000, max: 2000000 },
    { label: '2 - 3 triệu', value: '2m-3m', min: 2000000, max: 3000000 },
    { label: 'Giá trên 3 triệu', value: 'above-3m', min: 3000000, max: null },
  ];

  const handlePriceChange = event => {
    const value = event.target.value;
    setSelectedPrice(value);

    const selectedOption = PriceOptions.find(option => option.value === value);
    if (selectedOption) {
      setSelectedMinPrice(selectedOption.min);
      setSelectedMaxPrice(selectedOption.max);
    } else {
      setSelectedMinPrice(null);
      setSelectedMaxPrice(null);
    }
  };

  const BrandOptions = brands.map(brand => ({ label: brand, value: brand }));

  const CheckboxGroup = ({ options, selected, onChange }) => (
    <div className='space-y-4'>
      {options.map(option => (
        <label key={option.value} className='block text-sm text-gray-700'>
          <input
            type='checkbox'
            className='mr-3 transform scale-125'
            value={option.value}
            checked={selected.includes(option.value)}
            onChange={() => onChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );

  const RadioGroup = ({ options, selected, onChange }) => (
    <div className='space-y-4'>
      {options.map(option => (
        <label key={option.value} className='block text-sm text-gray-700'>
          <input
            type='radio'
            className='mr-3 transform scale-125'
            name='price'
            value={option.value}
            checked={selected === option.value}
            onChange={onChange}
          />
          {option.label}
        </label>
      ))}
    </div>
  );

  return (
    <div className='w-full p-6 bg-gray-50 shadow-lg rounded-lg'>
      <h3 className='text-lg font-semibold mb-6'>Chọn Mức Giá</h3>
      <RadioGroup
        options={PriceOptions}
        selected={selectedPrice}
        onChange={handlePriceChange}
      />

      <h3 className='text-lg font-semibold my-6'>Thương Hiệu</h3>
      <CheckboxGroup
        options={BrandOptions}
        selected={selectedBrand}
        onChange={handleBrandChange}
      />
      <button
        className='mt-6 px-4 py-2 bg-primary hover:bg-hover-primary text-white rounded-lg'
        onClick={clearFilters}
      >
        Xóa lọc
      </button>
    </div>
  );
};

Filter.propTypes = {
  onPriceChange: PropTypes.func.isRequired,
  onBrandChange: PropTypes.func.isRequired,
};

export default Filter;

import { useState, useEffect } from 'react';
import brandService from '@services/brand.service';
import PropTypes from 'prop-types';

const Filter = ({
  onPriceChange,
  onDiscountChange,
  onBrandChange,
  priceOptions,
  discountOptions,
}) => {
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedMinPrice, setSelectedMinPrice] = useState(null);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(null);

  const [selectedDiscount, setSelectedDiscount] = useState('');
  const [selectedMinDiscount, setSelectedMinDiscount] = useState(null);
  const [selectedMaxDiscount, setSelectedMaxDiscount] = useState(null);

  const [selectedBrand, setSelectedBrand] = useState([]);
  const [brands, setBrands] = useState([]);

  // Fetch brands from the service
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

  // Handle price change
  useEffect(() => {
    if (onPriceChange) {
      onPriceChange(selectedMinPrice, selectedMaxPrice);
    }
  }, [selectedMinPrice, selectedMaxPrice, onPriceChange]);

  // Handle discount change
  useEffect(() => {
    if (onDiscountChange) {
      onDiscountChange(selectedMinDiscount, selectedMaxDiscount);
    }
  }, [selectedMinDiscount, selectedMaxDiscount, onDiscountChange]);

  // Handle brand change
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
    setSelectedDiscount('');
    setSelectedMinDiscount(null);
    setSelectedMaxDiscount(null);
    setSelectedBrand([]);
  };

  const handlePriceChange = event => {
    const value = event.target.value;
    setSelectedPrice(value);

    const selectedOption = priceOptions.find(option => option.value === value);
    if (selectedOption) {
      setSelectedMinPrice(selectedOption.min);
      setSelectedMaxPrice(selectedOption.max);
    } else {
      setSelectedMinPrice(null);
      setSelectedMaxPrice(null);
    }
  };

  const handleDiscountChange = event => {
    const value = event.target.value;
    setSelectedDiscount(value);

    const selectedOption = discountOptions.find(
      option => option.value === value
    );
    if (selectedOption) {
      setSelectedMinDiscount(selectedOption.min);
      setSelectedMaxDiscount(selectedOption.max);
    } else {
      setSelectedMinDiscount(null);
      setSelectedMaxDiscount(null);
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
            name='filter'
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
      {/* Nếu có prop priceOptions, hiển thị bộ lọc giá */}
      {priceOptions && (
        <>
          <h3 className='text-lg font-semibold mb-6'>Chọn Mức Giá</h3>
          <RadioGroup
            options={priceOptions}
            selected={selectedPrice}
            onChange={handlePriceChange}
          />
        </>
      )}

      {/* Nếu có prop discountOptions, hiển thị bộ lọc giảm giá */}
      {discountOptions && (
        <>
          <h3 className='text-lg font-semibold my-6'>Chọn Mức Giảm Giá</h3>
          <RadioGroup
            options={discountOptions}
            selected={selectedDiscount}
            onChange={handleDiscountChange}
          />
        </>
      )}

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
  onPriceChange: PropTypes.func, // Có thể không truyền nếu không lọc theo giá
  onDiscountChange: PropTypes.func, // Có thể không truyền nếu không lọc theo giảm giá
  onBrandChange: PropTypes.func.isRequired,
  priceOptions: PropTypes.array, // Có thể không truyền nếu không lọc theo giá
  discountOptions: PropTypes.array, // Có thể không truyền nếu không lọc theo giảm giá
};

export default Filter;

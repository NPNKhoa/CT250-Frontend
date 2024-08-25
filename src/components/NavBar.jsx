import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import productTypeService from '@services/productType.service';
import brandService from '@services/brand.service';

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const [productTypes, setProductTypes] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const responseType = await productTypeService.getAll();
        setProductTypes(responseType.data);
        const responsebrand = await brandService.getAll();
        setBrands(responsebrand.data);
      } catch (error) {
        console.error('Error fetching product types:', error);
      }
    };
    fetchProductTypes();
  }, []);

  const arr = [
    { value: '', label: 'Trang chủ' },
    { value: 'products', label: 'Sản phẩm' },
    { value: 'saleoff', label: 'Sale off' },
    { value: 'about', label: 'Giới thiệu' },
    { value: 'contact', label: 'Liên hệ' },
  ];

  const productCategories = productTypes.map(type => ({
    title: type.productTypeName,
    items: [
      ...brands.map(brand =>
        type.productTypeName.concat(` ${brand.brandName}`)
      ),
    ],
  }));

  return (
    <div className='w-full'>
      <div className='flex justify-center items-center gap-24 py-1 px-4 bg-primary relative'>
        {arr.map((item, index) => (
          <div
            key={index}
            className='relative group'
            onMouseEnter={() =>
              item.value === 'products' && setShowDropdown(!showDropdown)
            }
            onMouseLeave={() =>
              item.value === 'products' && setShowDropdown(!showDropdown)
            }
          >
            <Link
              to={item.value !== 'products' ? `/${item.value}` : null}
              className='py-1 text-white uppercase font-bold text-sm flex items-center'
            >
              {item.label}
              {item.value === 'products' && (
                <span className='ml-2'>
                  {showDropdown ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </span>
              )}
            </Link>

            {item.value === 'products' && showDropdown && (
              <div className='absolute -left-80 w-screen top-auto py-2 bg-white shadow-lg z-50'>
                <div className='max-w-screen-xl mx-auto flex flex-wrap justify-start p-4'>
                  {productCategories.map((category, idx) => (
                    <div key={idx} className='w-full sm:w-1/2 lg:w-1/4 mb-4'>
                      <h3 className='text-primary font-semibold mb-2'>
                        {category.title.toUpperCase()}
                      </h3>
                      <ul>
                        {category.items.map((product, i) => (
                          <li key={i} className='text-gray-600 mb-1'>
                            <Link
                              to={`/${item.value}/${product
                                .toLowerCase()
                                .replace(/ /g, '-')
                                .normalize('NFD')
                                .replace(/[\u0300-\u036f]/g, '')}`}
                            >
                              {product}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link
                        to={`/${item.value}`}
                        className='text-primary mt-2 inline-block'
                      >
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavBar;

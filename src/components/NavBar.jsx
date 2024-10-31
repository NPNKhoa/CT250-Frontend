import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloseIcon from '@mui/icons-material/Close';

import productTypeService from '@services/productType.service';
import categoryService from '@services/category.service';

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(true);
  const [showNavBar, setShowNavBar] = useState(true); // Thêm state mới

  const [productTypes, setProductTypes] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const responseType = await productTypeService.getAll();
        setProductTypes(responseType.data);
        const responseCategory = await categoryService.getAll();
        setCategories(responseCategory.data);
      } catch (error) {
        console.error('Error fetching product types:', error);
      }
    };
    fetchProductTypes();
  }, []);

  const arr = [
    { value: '', label: 'Trang chủ' },
    { value: 'products', label: 'Sản phẩm' },
    { value: 'saleoff', label: 'Khuyến mãi' },
    { value: 'about', label: 'Giới thiệu' },
    { value: 'contact', label: 'Liên hệ' },
  ];

  const Categories = productTypes.map(type => ({
    title: type.productTypeName,
    items: categories
      .filter(
        category =>
          category.productType.productTypeName === type.productTypeName
      )
      .map(category => category.categoryName),
    category: [...categories.map(category => `${category.categoryName}`)],
  }));

  const handleMenuToggle = () => {
    setShowMobileMenu(false);
    setShowNavBar(false);
  };

  return (
    <div
      className={`relative sm:w-full w-auto ${
        showNavBar ? 'h-[100vh] sm:h-full' : 'h-0'
      } bg-primary transition-all duration-300`}
    >
      <div
        className={`relative flex flex-col lg:flex-row lg:justify-center items-center gap-4 px-4 py-2 ${
          showMobileMenu ? 'block' : 'hidden'
        } max-w-screen-xl mx-auto`}
      >
        {/* Mobile Menu Button */}
        <div
          className={`sm:hidden flex absolute right-10 ${
            !showMobileMenu ? 'hidden' : ''
          }`}
        >
          <button className='text-white font-bold' onClick={handleMenuToggle}>
            <CloseIcon />
          </button>
        </div>

        {/* Navigation Links */}

        <div
          className={`flex flex-col lg:flex-row lg:items-center lg:gap-20 px-5 w-full sm:w-auto ${
            showMobileMenu ? 'block' : 'hidden'
          }`}
        >
          {arr.map((item, index) => (
            <div
              key={index}
              className='relative group'
              onMouseEnter={() =>
                item.value === 'products' && setShowDropdown(true)
              }
              onMouseLeave={() =>
                item.value === 'products' && setShowDropdown(false)
              }
            >
              <Link
                to={item.value !== 'products' ? `/${item.value}` : null}
                className='py-2 text-white uppercase font-bold text-sm flex items-center'
                onClick={
                  item.value !== 'products'
                    ? () => {
                        if (window.innerWidth < 1024) {
                          handleMenuToggle();
                        }
                      }
                    : undefined
                }
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
            </div>
          ))}
        </div>
      </div>

      {/* {showDropdown && (
        <div
          className='absolute top-12 w-full  lg:w-screen h-[70vh] bg-white shadow-lg z-50  overflow-y-auto no-scrollbar'
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div className='max-w-screen-xl mx-auto flex flex-col lg:flex-row flex-wrap justify-start p-4'>
            {Categories.map((category, idx) => (
              <div key={idx} className='w-full sm:w-1/2 lg:w-1/4 mb-4'>
                <h3 className='text-primary font-semibold mb-2 border-b-2'>
                  {category.title.toUpperCase()}
                </h3>
                <ul>
                  {category.items.map((product, i) => (
                    <li key={i} className='text-gray-600 mb-1'>
                      <Link
                        to={`/products?productType=${encodeURIComponent(
                          category.title
                        )}&category=${encodeURIComponent(category.category[i])}`}
                        onClick={() => {
                          setShowDropdown(false);
                        }}
                      >
                        {product}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  // to={`/${item.value}`}
                  className='text-primary mt-2 inline-block'
                  onClick={handleMenuToggle}
                ></Link>
              </div>
            ))}
          </div>
        </div>
      )} */}
      {showDropdown && (
        <div
          className='absolute top-12 w-full  lg:w-screen h-[70vh] bg-white shadow-lg z-50  overflow-y-auto no-scrollbar'
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div className='max-w-screen-xl mx-auto flex flex-col lg:flex-row flex-wrap justify-start p-4'>
            {Categories.map((category, idx) => (
              <div key={idx} className='w-full sm:w-1/2 lg:w-1/4 mb-4'>
                <h3 className='text-primary font-semibold mb-2 border-b-2'>
                  <Link
                    to={`/products?productType=${encodeURIComponent(
                      category.title
                    )}`}
                    onClick={() => {
                      setShowDropdown(false);
                    }}
                  >
                    {category.title.toUpperCase()}
                  </Link>
                </h3>
                <ul>
                  {category.items.map((item, i) => (
                    <li key={i} className='text-gray-600 mb-1'>
                      <Link
                        to={`/products?category=${encodeURIComponent(item)}`}
                        onClick={() => {
                          setShowDropdown(false);
                        }}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  // to={`/${item.value}`}
                  className='text-primary mt-2 inline-block'
                  onClick={handleMenuToggle}
                ></Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;

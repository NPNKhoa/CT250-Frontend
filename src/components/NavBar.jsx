import { Link } from 'react-router-dom';
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(true);

  const arr = [
    { value: '', label: 'Trang chủ' },
    { value: 'products', label: 'Sản phẩm' },
    { value: 'saleoff', label: 'Sale off' },
    { value: 'about', label: 'Giới thiệu' },
    { value: 'contact', label: 'Liên hệ' },
  ];

  const productCategories = [
    {
      title: 'Vợt cầu lông',
      items: [
        'Vợt cầu lông Yonex',
        'Vợt cầu lông Victor',
        'Vợt cầu lông Lining',
        'Vợt cầu lông Mizuno',
        'Vợt cầu lông Apacs',
        'Vợt cầu lông VNB',
        'Vợt cầu lông Proace',
        'Vợt cầu lông Forza',
        'Vợt cầu lông FlyPower',
        'Vợt cầu lông Tenway',
      ],
    },
    {
      title: 'Giày cầu lông',
      items: [
        'Giày cầu lông Yonex',
        'Giày cầu lông Victor',
        'Giày cầu lông Lining',
        'Giày cầu lông Kumpoo',
        'Giày cầu lông Promax',
        'Giày cầu lông Babolat',
        'Giày cầu lông Sunbatta',
        'Giày cầu lông Apacs',
      ],
    },
    {
      title: 'Áo cầu lông',
      items: [
        'Áo cầu lông Yonex',
        'Áo cầu lông VNB',
        'Áo cầu lông Kamito',
        'Áo cầu lông Victor',
        'Áo cầu lông Lining',
        'Áo cầu lông DonexPro',
        'Áo cầu lông Alien Armour',
        'Áo thể thao SFD',
        'Áo thể thao Kawasaki',
        'Áo thể thao Pebble Beach',
      ],
    },
    {
      title: 'Váy cầu lông',
      items: [
        'Váy cầu lông Yonex',
        'Váy cầu lông Victec',
        'Váy cầu lông Lining',
        'Váy cầu lông Donex Pro',
        'Váy cầu lông Victor',
        'Váy cầu lông Kamito',
      ],
    },
    {
      title: 'Quần cầu lông',
      items: [
        'Quần cầu lông Yonex',
        'Quần cầu lông Victor',
        'Quần cầu lông Lining',
        'Quần cầu lông VNB',
        'Quần cầu lông SFD',
        'Quần cầu lông Donex Pro',
        'Quần cầu lông Apacs',
        'Quần cầu lông Alien Armour',
        'Quần cầu lông Mizuno',
        'Quần cầu lông Kawasaki',
      ],
    },
  ];

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
              to={`/${item.value}`}
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
                        {category.title}
                      </h3>
                      <ul>
                        {category.items.map((product, i) => (
                          <li key={i} className='text-gray-600 mb-1'>
                            <Link
                              to={`/${item.value}/${product
                                .toLowerCase()
                                .replace(/ /g, '-')}`}
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
                        Xem thêm
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

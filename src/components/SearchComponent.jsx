import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import WhatshotSharpIcon from '@mui/icons-material/WhatshotSharp';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function SearchPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const inputRef = React.useRef(null);

  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    inputRef.current?.focus(); // Tự động focus vào input khi click
  };

  const handleSubmit = event => {
    event.preventDefault();
    const query = inputRef.current.value.trim(); // Lấy giá trị tìm kiếm
    if (query) {
      navigate(`/search?query=${encodeURIComponent(query)}`); // Chuyển hướng đến trang search với query
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'search-popover' : undefined;

  const categories = [
    { label: 'Vợt cầu lông', href: '/products/vot-cau-long' },
    { label: 'Cước cầu lông', href: '/products/cuoc-cau-long' },
    { label: 'Vợt tenis', href: '/products/vot-tenis' },
    { label: 'Minh Tu deptrai', href: '/profile/minh-tu' },
  ];

  const products = [
    {
      id: 1,
      image:
        'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-apacs-edge-saber-10-black-chinh-hang_1703023099.webp',
      name: 'Áo Cầu Lông Yonex VM1055 Nam - Xanh',
      price: 130000,
      href: '/products/detail/66cb4db4916b971633510a55',
    },
    {
      id: 2,
      image:
        'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-apacs-edge-saber-10-black-chinh-hang_1703023099.webp',
      name: 'Áo Cầu Lông Yonex VM1055 Nữ - Xanh',
      price: 130000,
      href: '/products/detail/66cb4db4916b971633510a55',
    },
    {
      id: 3,
      image:
        'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-apacs-edge-saber-10-black-chinh-hang_1703023099.webp',
      name: 'Áo Cầu Lông Yonex VM1056 Nữ - Xanh',
      price: 130000,
      href: '/products/detail/66cb4db4916b971633510a55',
    },
    {
      id: 4,
      image:
        'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-apacs-edge-saber-10-black-chinh-hang_1703023099.webp',
      name: 'Áo Cầu Lông Yonex VM1056 Nữ - Xanh',
      price: 130000,
      href: '/products/detail/66cb4db4916b971633510a55',
    },
    {
      id: 5,
      image:
        'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-apacs-edge-saber-10-black-chinh-hang_1703023099.webp',
      name: 'Áo Cầu Lông Yonex VM1056 Nữ - Xanh',
      price: 130000,
      href: '/products/detail/66cb4db4916b971633510a55',
    },
    {
      id: 6,
      image:
        'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-apacs-edge-saber-10-black-chinh-hang_1703023099.webp',
      name: 'Áo Cầu Lông Yonex VM1056 Nữ - Xanh',
      price: 130000,
      href: '/products/detail/66cb4db4916b971633510a55',
    },
  ];

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <div>
      <form action='#' className='relative' onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type='text'
          className='bg-gray-200 w-[300px] rounded-lg p-1'
          placeholder='Tìm sản phẩm...'
          onClick={handleClick}
          required
        />
        <button type='submit' className='absolute top-1 right-2 m-0'>
          <SearchSharpIcon className='text-primary' />
        </button>
      </form>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          style: {
            width: inputRef.current ? inputRef.current.offsetWidth : 'auto',
            maxHeight: '80vh', // Giới hạn chiều cao của Popover
            overflowY: 'auto', // Thêm thanh cuộn nếu nội dung vượt quá chiều cao
          },
        }}
      >
        <Typography sx={{ p: 2 }}>
          <div className='text-lg font-semibold border-b-2 flex items-center gap-2'>
            <WhatshotSharpIcon className='text-primary' />
            <h1 className=''>Tìm kiếm nhiều nhất</h1>
          </div>

          <div className='flex flex-wrap space-x-2 mb-4'>
            {categories.map(category => (
              <Link
                key={category.label}
                to={category.href}
                className='bg-gray-200 hover:bg-gray-300 text-xs mt-2 text-gray-800 font-bold p-1 rounded'
              >
                {category.label}
              </Link>
            ))}
          </div>

          <div className='grid grid-cols-1 gap-4'>
            {products.map(product => (
              <div
                key={product.id}
                className='bg-white shadow-md rounded-lg overflow-hidden flex items-center'
              >
                <Link to={'/products/detail/66cb4db4916b971633510a55'}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className='w-16 object-cover'
                  />
                </Link>

                <div className='p-2'>
                  <Link to={'/products/detail/66cb4db4916b971633510a55'}>
                    <h3 className='text-sm font-semibold   hover:text-primary '>
                      {product.name}
                    </h3>
                  </Link>
                  <p className='text-primary'>
                    {product.price.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Typography>
      </Popover>
    </div>
  );
}

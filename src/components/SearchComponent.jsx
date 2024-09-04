import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import WhatshotSharpIcon from '@mui/icons-material/WhatshotSharp';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import MicNoneIcon from '@mui/icons-material/MicNone';

export default function SearchPopover() {
  const [anchorEl, setAnchorEl] = useState(null);
  const inputRef = useRef(null);

  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('Trình duyệt không hỗ trợ SpeechRecognition');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'vi-VN';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = event => {
      const currentTranscript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      setQuery(currentTranscript);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (query) {
        navigate(`/search?productName=${encodeURIComponent(query)}`);
      }
    };

    recognitionRef.current = recognition;

    // Cleanup khi component unmount
    return () => {
      recognition.stop();
    };
  }, [query, navigate]);

  const handleVoiceSearch = () => {
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    inputRef.current?.focus(); // Tự động focus vào input khi click
  };

  const handleSubmit = event => {
    event.preventDefault();
    setQuery(inputRef.current.value.trim()); // Lấy giá trị tìm kiếm
    if (query) {
      navigate(`/search?productName=${encodeURIComponent(query)}`); // Chuyển hướng đến trang search với query
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
      href: '/products/detail/66cc4b1ad8974d0480cfb05a',
    },
    {
      id: 2,
      image:
        'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-apacs-edge-saber-10-black-chinh-hang_1703023099.webp',
      name: 'Áo Cầu Lông Yonex VM1055 Nữ - Xanh',
      price: 130000,
      href: '/products/detail/66cc4b1ad8974d0480cfb05a',
    },
    {
      id: 3,
      image:
        'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-apacs-edge-saber-10-black-chinh-hang_1703023099.webp',
      name: 'Áo Cầu Lông Yonex VM1056 Nữ - Xanh',
      price: 130000,
      href: '/products/detail/66cc4b1ad8974d0480cfb05a',
    },
    {
      id: 4,
      image:
        'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-apacs-edge-saber-10-black-chinh-hang_1703023099.webp',
      name: 'Áo Cầu Lông Yonex VM1056 Nữ - Xanh',
      price: 130000,
      href: '/products/detail/66cc4b1ad8974d0480cfb05a',
    },
    {
      id: 5,
      image:
        'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-apacs-edge-saber-10-black-chinh-hang_1703023099.webp',
      name: 'Áo Cầu Lông Yonex VM1056 Nữ - Xanh',
      price: 130000,
      href: '/products/detail/66cc4b1ad8974d0480cfb05a',
    },
    {
      id: 6,
      image:
        'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-apacs-edge-saber-10-black-chinh-hang_1703023099.webp',
      name: 'Áo Cầu Lông Yonex VM1056 Nữ - Xanh',
      price: 130000,
      href: '/products/detail/66cc4b1ad8974d0480cfb05a',
    },
  ];

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100); // Thử tăng delay để đảm bảo focus sau khi Popover hiển thị
    }
  }, [open]);

  return (
    <div>
      <form action='#' className='relative' onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type='text'
          className='bg-gray-200 w-full max-w-xs rounded-lg p-2'
          placeholder='Tìm sản phẩm...'
          value={query}
          onMouseDown={event => event.preventDefault()}
          onClick={handleClick}
          required
        />
        <button
          type='button'
          onClick={handleVoiceSearch}
          className='absolute top-1/2 transform -translate-y-1/2 right-12 p-2'
        >
          {isListening ? (
            <KeyboardVoiceIcon className='text-primary' />
          ) : (
            <MicNoneIcon className='text-primary' />
          )}
        </button>
        <button
          type='submit'
          className='absolute top-1/2 transform -translate-y-1/2 right-2 p-2'
        >
          <SearchSharpIcon className='text-primary' />
        </button>
      </form>

      {/* <Popover
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
        onEntered={() => {
          setTimeout(() => {
            inputRef.current?.focus(); // Focus khi Popover đã hiển thị
          }, 0);
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
                onClick={() => setAnchorEl(null)}
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
                <Link to={product.href}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className='w-16 object-cover'
                  />
                </Link>

                <div className='p-2'>
                  <Link to={product.href}>
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
      </Popover> */}
    </div>
  );
}

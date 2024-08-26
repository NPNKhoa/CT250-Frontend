import { useState } from 'react';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';

function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image:
        'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-apacs-edge-saber-10-black-chinh-hang_1703023099.webp',
      name: 'Vợt cầu lông Yonex NanoFlare 370 Speed (Blue) chính hãng',
      quantity: 1,
      price: 1919000,
    },
    {
      id: 2,
      image:
        'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-apacs-edge-saber-10-black-chinh-hang_1703023099.webp',
      name: 'Vợt Cầu Lông Apacs Power Concept 500 chính hãng',
      quantity: 2,
      price: 687000,
    },
    {
      id: 3,
      image:
        'https://cdn.shopvnb.com/uploads/gallery/vot-cau-long-apacs-edge-saber-10-black-chinh-hang_1703023099.webp',
      name: 'Vợt Cầu Lông Apacs Power Concept 500 chính hãng',
      quantity: 2,
      price: 687000,
    },
  ]);

  const handleQuantityChange = (id, delta) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta),
            }
          : item
      )
    );
  };

  const handleRemove = id => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  return (
    <div className=''>
      <h2 className='text-2xl font-bold text-white  mb-4 bg-primary sm:rounded-t-lg '>
        Giỏ hàng
      </h2>
      <div className='w-full px-5'>
        <div>
          {cartItems.map(item => (
            <div key={item.id} className='flex items-center mb-4'>
              <img src={item.image} alt={item.name} className='w-20 mr-2' />
              <div className='flex-1'>
                <div className='flex  items-center gap-3'>
                  <p className='text-sm font-medium'>{item.name}</p>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className='text-red-500 hover:text-red-700'
                  >
                    <DeleteForeverSharpIcon />
                  </button>
                </div>
                <div className='flex justify-between items-center mt-2'>
                  <div className='flex items-center'>
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-0 px-2 rounded-l-full'
                    >
                      -
                    </button>
                    <span className='mx-2 '>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-0 px-2 rounded-r-full'
                    >
                      +
                    </button>
                  </div>
                  <div className='text-right font-bold text-primary'>
                    {item.price.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex justify-between items-center px-5'>
        <p className='font-bold'>Tổng tiền: </p>

        <p className='font-bold text-primary'>
          {calculateTotal().toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </p>
      </div>
      <button className='bg-primary hover:bg-hover-primary w-full text-white font-bold mt-2 py-2 px-4 rounded'>
        Đặt hàng ngay
      </button>
    </div>
  );
}

export default Cart;

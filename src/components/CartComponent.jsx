import { useState, useEffect } from 'react';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import cartService from '@services/cart.service';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await cartService.getCartByUser(accessToken);
        setCartItems(response.data.cart.cartItems);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCart();
  });

  const handleRemove = id => {
    cartService.deleteItem(accessToken, id);
  };

  const handleQuantityChange = (id, delta) => {
    cartService.updateQuantity(accessToken, { productId: id, quantity: delta });
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.itemPrice * item.quantity,
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
            <div key={item} className='flex items-center mb-4'>
              <img
                src={item.product.productImagePath[0]}
                alt={item.product.productName}
                className='w-20 mr-2'
              />
              <div className='flex-1'>
                <div className='flex  items-center gap-3'>
                  <p className='text-sm font-medium'>
                    {item.product.productName}
                  </p>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className='text-red-500 hover:text-red-700'
                  >
                    <DeleteForeverSharpIcon />
                  </button>
                </div>
                <div className='flex justify-between items-center mt-2'>
                  <div className='flex items-center'>
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity - 1)
                      }
                      className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-0 px-2 rounded-l-full'
                    >
                      -
                    </button>
                    <span className='mx-2 '>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity + 1)
                      }
                      className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-0 px-2 rounded-r-full'
                    >
                      +
                    </button>
                  </div>
                  <div className='text-right font-bold text-primary'>
                    {item.itemPrice.toLocaleString('vi-VN', {
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
